
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secrets');
const passport = require('passport');
const validator = require('password-validator')
const Users = require('./auth-model');


router.post('/register',  (req, res) => {
  let user = req.body;
  console.log(user)
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
      console.log(err, 'err')
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
       const id = user.id
        res.status(200).json({
          ...user, token
        });
      } else {
        res.status(401).json({message: "Invalid Credentials"})
      }
    })

});


router.delete('/:id', (req, res) => {
  Users.remove(req.params.id)
  .then(user => {
      console.log(user)
      if (!user) {
          res.status(404).json({message: "No user exists by that ID!"})
      } else {
          res.status(200).json({message: "deleted"})
      }
  })
  .catch(err => {
      console.log(err)
      res.status(500).json(err)
  })
})

router.get("/login/google", passport.authenticate("google", {
  scope: ['profile']
}));

router.get("/login/google/redirect", passport.authenticate("google"), (req, res) => {
  //Add /callback after .io when you have component
  const token = generateToken(req.user);
  
  console.log(req.user);
  res.redirect(`https://citrics.io/callback?jwt=${token}&user=${JSON.stringify(req.user)}`);
  

})

router.get("/login/linkedin", passport.authenticate("linkedin", {
  
}));

router.get("/login/linkedin/redirect", passport.authenticate("linkedin"), (req, res) => {
  const token = generateToken(req.user);

  res.redirect(`https://www.citrics.io/callback?jwt=${token}&user=${JSON.stringify(req.user)}`);
 
})

router.get("/login/facebook", passport.authenticate("facebook", {
//   scope: ['profile']
  
}));

router.get("/login/facebook/redirect", passport.authenticate("facebook"), (req, res) => {
  const token = generateToken(req.user);

  res.redirect(`https://www.citrics.io/callback?jwt=${token}&user=${JSON.stringify(req.user)}`); 
  
})

function generateToken(user) {
  const payload = {
    username: user.username,
    
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
