const router = require('express').Router();
const axios = require('axios');

const token = 'p4qIBpVGeKPzmtJRAraHRIECiSNqRtn3YIMyLdeigKNlfZMbZsXpgbJGT6FRR15wl90efU1cxFIYQvrUOz9MDv6qoCnpDVGF7R6JDmSmwGOiW32kOkvJnfOpmHFhXnYx'

const config = {
    headers: {
        Authorization: 'Bearer ' + token  
    }
}

router.get('/', async (req, res) => {
    const info = await req.body

    axios.get(`https://api.yelp.com/v3/businesses/search?latitude=${info.latitude}&longitude=${info.longitude}`, config)
        .then(response => {
            // console.log(response.data)
            res.status(200).json(response.data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router