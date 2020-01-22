const router = require('express').Router();

// const bcrypt = require('bcryptjs');
// const secrets = require('../config/secrets');
// const passport = require('passport');
// const validator = require('password-validator')

const Users = require('./user-model');
const Preferences = require('../preferences/preference-model.js')

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


// TODO - POST new preferences using user's ID --- /api/users/:id/preferences
router.post('/:id/preferences', (req, res) => {
    const id = req.params.id;
    const preferences = req.body; 
    const newPreferences = {...preferences, user_id:id }

    Preferences
    .insert(newPreferences)
    .then(added => {
        res.status(200).json(added)
    })
    .catch(error => {
          res.status(500).json({error: error.stack})
     })
})


// TODO - GET user preferences using user's ID --- /api/users/:id/preferences
router.get('/:id/preferences', (req, res) => {
    const id = req.params.id;

    Preferences
    .findByUser(id)
    .then(preferences => {
        res.status(201).json(preferences)
    })
    .catch(error => {
          res.status(500).json({message: "Unable to find any preferences. Try again later."})
     })
})

module.exports = router;