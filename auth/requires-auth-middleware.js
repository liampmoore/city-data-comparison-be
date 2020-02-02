const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = secrets.jwtSecret;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if(err) {
        res.status(401).json('Unauthorized')
      } if (req.params.id && req.params.id !== decodedToken.id) {
        res.status(401).json({error: "you cannot edit other users"})
      } else {
        console.log("req.params.id", req.params.id)
        console.log("token id", decodedToken.id)
        req.decodedJwt = decodedToken;
        console.log(decodedToken)
        next();
      }
    });
  } else {
    res.status(401).json({ you: 'failed' });
  }
};