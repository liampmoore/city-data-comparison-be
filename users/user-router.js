
const router = require('express').Router();
const multer = require('multer');
const db = require("../database/dbConfig.js");

const bcrypt = require('bcryptjs');
// const secrets = require('../config/secrets');
// const passport = require('passport');
// const validator = require('password-validator')

const Users = require('./user-model');
const Preferences = require('../preferences/preference-model.js')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
  });

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
    cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

router.get('/:id/profile', (req, res) => {
    console.log(req.params.id)
  Users.findUserById(req.params.id)
  .then(user => {
      console.log(user)
      res.status(201).json(user)
  })
  .catch(err => {
      res.status(401).json({message: 'Unable to find user', error: err})
  });
})
 


router.post('/', upload.single('userimage'), (req, res, next) => {

    console.log(req.file);
    const userimg = ({users_id: req.body.users_id, userimage: req.file.path})

    Users.addImage(userimg)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(401).json({
            message: 'Failed to update!', err
        })
    })
})

router.put('/:id/profile/image', upload.single('userimage'), (req, res, next) => {
    console.log(req.file);
    const id = req.params.id
    const userimg = ({users_id: req.body.users_id, userimage: req.file.filename})

    Users.editImage(id, userimg)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(401).json({
            message: 'Failed to update!', err
        })
    })
  })

router.put('/:id/profile', (req,res) => {
    Users.updateUser(req.params.id, req.body)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({message: 'Unable to update', error: err})
    })
})


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