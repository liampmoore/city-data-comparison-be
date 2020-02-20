
const router = require('express').Router();
const multer = require('multer');
const db = require("../database/dbConfig.js");


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

router.get('/profile', (req, res) => {
    const id = req.body.user_id;

    Users.findUserById(id)
        .then(user => {
            delete user.password;
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(400).json({ message: 'Unable to find user' })
        });
})
 


router.post('/', upload.single('userimage'), (req, res, next) => {
    const userimg = ({users_id: req.body.user_id, userimage: req.file.path})

    Users.addImage(userimg)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to post' })
        })
})

router.put('/profile', (req, res) => {
    const id = req.body.user_id;

    Users.updateUser(id, req.body)
    .then(user => {
        delete user.password;
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json({ message: 'Unable to update' })
    })
})

router.delete('/profile/image', (req, res) => {
    const id = req.body.user_id;

    Users.deleteImage(id)
        .then(image => {
            res.status(200).json({ message: 'Image deleted' })
        })
        .catch(err => {
            res.status(500).json({ message: 'Image not deleted' })
        })
})

router.get('/profile/image', (req, res) => {
    const id = req.body.user_id;

    Users.findUsersImage(id)
        .then(image => {
            res.status(200).json(image)
        })
        .catch(err => {
            res.status(500).json({ message: 'Unable to find image' })
        })
})


//GET a users favorited cities based on users_id
router.get("/favs", (req, res) => {
    const id = req.body.user_id;

    Users.getFavs(id)
        .then(favs => {
            res.status(200).json(favs);
        })
        .catch(err => {
            res.status(500).json({ message: "failed to get favs" });
        });
})

//POST a favorite using a users_id in url and city_id in the body of the request
router.post("/favs", (req, res) => {
    const id = req.body.user_id;

    Users.addFav(req.body.city_id, parseInt(id))
        .then(fav => {
            res.json(fav[0]);
        })
        .catch(err => {
            res.status(500).json({ message: "failed to add fav" });
        });
})


//DELETE the favorite based on the id of the table entry
router.delete("/favs", (req, res) => {
    const id = req.body.user_id;

    Users.removeFav(req.body.city_id, id)
        .then(fav => {
            res.status(200).json(fav);
        })
        .catch(err => {
            res.status(500).json({ message: "fav not deleted" });
        });
})


// TODO - POST new preferences using user's ID --- /api/users/:id/preferences
router.post('/preferences', (req, res) => {
    const id = req.body.user_id;
    const preferences = req.body; 
    const newPreferences = {...preferences, user_id: id }

    Preferences.insert(newPreferences)
        .then(added => {
            res.status(200).json(added)
        })
        .catch(error => {
            res.status(500).json({ message: 'error with saving'})
        })
})


// TODO - GET user preferences using user's ID --- /api/users/:id/preferences
router.get('/:id/preferences', (req, res) => {
    const id = req.body.user_id;

    Preferences.findByUser(id)
        .then(preferences => {
            res.status(201).json(preferences)
        })
        .catch(error => {
            res.status(500).json({message: "Unable to find any preferences. Try again later."})
        })
})





module.exports = router;