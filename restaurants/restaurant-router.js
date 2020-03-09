const router = require('express').Router();
const axios = require('axios');

const token = 'p4qIBpVGeKPzmtJRAraHRIECiSNqRtn3YIMyLdeigKNlfZMbZsXpgbJGT6FRR15wl90efU1cxFIYQvrUOz9MDv6qoCnpDVGF7R6JDmSmwGOiW32kOkvJnfOpmHFhXnYx'

const config = {
    headers: {
        Authorization: 'Bearer ' + token  
    }
}

router.get('/restaurant/:latitude/:longitude', async (req, res) => {
    const info = await req.params

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

router.get('/events/:latitude/:longitude', async (req, res) => {
    const info = await req.params

    axios.get(`https://api.yelp.com/v3/events?latitude=${info.latitude}&longitude=${info.longitude}&limit=10`, config)
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