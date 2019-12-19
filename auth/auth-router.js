const router = require('express').Router();
const bcrypt = require('bcryptjs');
const secrets = require('../config/secrets');

const passport = require('passport');

const Users = require('./auth-model');

router.post('/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password,10);
  user.password = hash;
  Users.add(user)
    .then(saved => {
     req.session.username = saved.username;
     res.status(201).json(saved)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  // implement registration
});

router.post('/login', (req, res) => {
  let {username, password} = req.body;

  Users.findBy({username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username; 
        res.status(200).json({
          message: `Welcome ${user.username}!`
        });
      } else {
        res.status(401).json({message: "Invalid Credentials"})
      }
    })

});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res
          .status(500)
          .json({
            message:
              "Failed to Logout"
          });
      } else {
        res.status(200).json({ message: "logged out successfully" });
      }
    });
  } else {
    res.status(200).json({ message: "Bye, Have a good time" });
  }
});

router.get("/login/google", passport.authenticate("google", {
  scope: ['profile']
}));

router.get("/login/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("http://localhost:3000");
  res.json(req.user)
})

router.get("/login/linkedin", passport.authenticate("linkedin", {
  
}));

router.get("/login/linkedin/redirect", passport.authenticate("linkedin"), (req, res) => {
  res.redirect("http://localhost:3000"); 
  res.json(req.user)
})

router.get("/login/facebook", passport.authenticate("facebook", {
//   scope: ['profile']
  
}));

router.get("/login/facebook/redirect", passport.authenticate("facebook"), (req, res) => {
  res.redirect("http://localhost:3000"); 
  res.json(req.user)
})



module.exports = router;
