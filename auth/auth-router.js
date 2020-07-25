const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/secrets");
const passport = require("passport");
const validator = require("password-validator");
const Users = require("./auth-model");
//Middleware
const user_body = require("./user-body-middleware");
const authMiddleware = require("./requires-auth-middleware");

router.post("/register", user_body, (req, res) => {
  let user = req.body;
  const username = req.body.username;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.findBy({ username })
    .then((ifNew) => {
      if (ifNew) {
        res.status(409).json({ message: "You are already a user." });
      } else if (!ifNew) {
        Users.add(user)
          .then((newUser) => {
            // delete newUser.password;
            const token = generateToken(newUser);
            res.status(201).json({ user: newUser, token: token });
          })
          .catch((err) => {
            res.status(500).json({ message: "Internal server error." });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Internal server error." });
    });
});

router.post("/login", user_body, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found." });
      } else if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        delete user.password;
        res.status(200).json({
          user,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal server error." });
    });
});

router.delete("/delete", authMiddleware, (req, res) => {
  const id = req.body.user_id;

  Users.remove(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "No user exists by that ID!" });
      } else {
        res.status(200).json({ message: "deleted" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal server error." });
    });
});

router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/login/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    //Add /callback after .io when you have component
    const token = generateToken(req.user);

    res.redirect(
      `https://city-data-comparison-fe-1.vercel.app/callback?jwt=${token}&user=${JSON.stringify(
        req.user
      )}`
    );
  }
);

router.get("/login/linkedin", passport.authenticate("linkedin", {}));

router.get("/login/linkedin/redirect", (req, res, next) => {
  passport.authenticate("linkedin", (err, user, info) => {
    if (err) {
      // failureRedirect
      return res.redirect("https://city-data-comparison-fe-1.vercel.app");
    }

    if (!user) {
      // failureRedirect
      return res.redirect("https://city-data-comparison-fe-1.vercel.app");
    }

    // Note: https://github.com/jaredhanson/passport/blob/master/lib/middleware/authenticate.js#L52

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      // successRedirect
      const token = generateToken(req.user);

      res.redirect(
        `https://www.citrics.io/callback?jwt=${token}&user=${JSON.stringify(
          req.user
        )}`
      );
    });
  })(req, res, next);
});
//    (req, res) => {
//

router.get(
  "/login/facebook",
  passport.authenticate("facebook", {
    //   scope: ['profile']
  })
);

router.get(
  "/login/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    const token = generateToken(req.user);

    res.redirect(
      `https://www.citrics.io/callback?jwt=${token}&user=${JSON.stringify(
        req.user
      )}`
    );
  }
);

function generateToken(user) {
  const payload = {
    username: user.username,
    id: user.id,
  };
  const options = {
    expiresIn: "8h",
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
