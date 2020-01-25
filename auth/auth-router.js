
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const passport = require('passport');
const validator = require('password-validator')
const Users = require('./auth-model');

router.post('/register',  (req, res) => {
  let user = req.body;
  var schema = new validator();

  schema
    .is().min(8)                                    
    .is().max(100)                                  
    .has().uppercase()                              
    .has().lowercase()                              
    .has().digits()            
    .has().symbols()                     
    .has().not().spaces()                           

   if ( !schema.validate (user.password )){
     res.status(500).json({
       message: 'Your password must be 8 or more characters long, should contain at least 1 Uppercase, 1 Lowercase, 1 Numeric, and 1 special character'
     })
   } 


  const hash = bcrypt.hashSync(user.password,10);
  user.password = hash;
  Users.add(user)
    .then(saved => {
    const token = generateToken(saved)
     res.status(201).json(token)
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
       const token = generateToken(user) 
        // const token = generateToekn(user);
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
  console.log(req.user);
  //Add /callback after .io when you have component
  // const token = generateToken(req.user);
  const token = '123456'; //this is just an example remove when you have generateToken working
  res.redirect(`https://www.citrics.io/callback?jwt=${req.user.googleid}&user=${JSON.stringify(req.user)}`);
  //res.json(req.user)
})

router.get("/login/linkedin", passport.authenticate("linkedin", {
  
}));

router.get("/login/linkedin/redirect", passport.authenticate("linkedin"), (req, res) => {
  res.redirect("https://www.citrics.io"); 
  res.json(req.user)
})

router.get("/login/facebook", passport.authenticate("facebook", {
//   scope: ['profile']
  
}));

router.get("/login/facebook/redirect", passport.authenticate("facebook"), (req, res) => {
  res.redirect("https://www.citrics.io"); 
  res.json(req.user)
})



module.exports = router;
