
const router = require('express').Router();
const multer = require('multer');
const db = require("../database/dbConfig.js");

// const bcrypt = require('bcryptjs');
// const secrets = require('../config/secrets');
// const passport = require('passport');
// const validator = require('password-validator')




router.get("/:id", (req, res) => {
    Users.getFavs(req.params.id)
    .then(favs => {
        res.json(favs);
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({ message: "failed to get favs", error: err });
    });
})

router.post("/", (req, res) => {
    Users.addFav(req.body)
    .then(fav => {
        res.json(fav);
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({ message: "failed to add fav", error: err });
    });
})

router.delete("/:id", (req, res) => {
    Users.removeFav(req.params.id)
    .then(fav => {
      res.json(fav);
    })
    .catch(err => {
      res.status(401).json({ message: "fav not deleted", error: err });
    });
})


module.exports = router;