
const router = require('express').Router();
const multer = require('multer');
const Users = require('./user-model.js');
const db = require("../database/dbConfig.js");

// const bcrypt = require('bcryptjs');
// const secrets = require('../config/secrets');
// const passport = require('passport');
// const validator = require('password-validator')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date(). toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimtype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
    cb(null, false);
    }
}


const upload = multer({
    storage: storage, 
    limits: {
    fileSize: 1024 * 1024 *10
    },
    fileFilter: fileFilter
});


router.put('/:id', upload.single('user-image'), (req, res, next) => {
    const userimg = new 

    userimg
    .save()
    .then(res => {
        res.status(201).json({
            message: 'Image Uploaded'
        })
    })
    .catch(err => {
        res.status(401).json({
            message: 'Failed to upload image!', err
        })
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


module.exports = router;