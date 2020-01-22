const router = require('express').Router();
const multer = require('multer');
const db = require("../data/dbConfig.js");

// const bcrypt = require('bcryptjs');
// const secrets = require('../config/secrets');
// const passport = require('passport');
// const validator = require('password-validator')

// storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload =multer({
    storage: storage
}).single('user-image')

const Users = require('./user-model');

router.post('/upload' , upload.single('user-image'), (req, res) => {
        const sql = db('users').insert({name: req.file.filename, type: req.file.mimetype, size: req.file.size})
        sql(upload.single('user-image'))
        .then(avatar => {
            res.status(200).json({message: 'Image Uploaded', avatar})
        })
        .catch(err => {
            res.status(401).json({message: 'failed to upload image', err})
        });
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