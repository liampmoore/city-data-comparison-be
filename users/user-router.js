const router = require('express').Router();

const Users = require('./user-model');


//GET a users favorited cities based on users_id
router.get("/favs/:id", (req, res) => {
    Users.getFavs(req.params.id)
    .then(favs => {
        res.json(favs);
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({ message: "failed to get favs", error: err });
    });
})

//POST a favorite using a users_id in url and city_id in the body of the request
router.post("/favs/:id", (req, res) => {
    Users.addFav(req.body.city_id, req.params.id)
    .then(fav => {
        res.json(fav);
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({ message: "failed to add fav", error: err });
    });
})


//DELETE the favorite based on the id of the table entry
router.delete("/favs", (req, res) => {
    Users.removeFav(req.body.id)
    .then(fav => {
      res.json(fav);
    })
    .catch(err => {
      res.status(401).json({ message: "fav not deleted", error: err });
    });
})