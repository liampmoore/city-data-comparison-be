const express = require('express')
const router = express.Router()
const Preferences = require('./preference-model.js')


// TODO - GET all user preferences --- /api/preferences
router.get('/', (req,res) => {
     Preferences
     .findAll()
     .then(preferences => {
          res.status(201).json(preferences)
     })
     .catch(error => {
          res.status(500).json(error)
     })
})

// TODO - GET user preference by preference ID --- /api/preferences/:id
router.get('/:id', (req, res) => {
     const id = req.params.id

     Preferences
     .findById(id)
     .then(preferences => {
          res.status(201).json(preferences)
     })
     .catch(error => {
          res.status(500).json(error)
     })
})

// TODO - DELETE user preference --- /api/preferences/:id
router.delete('/:id', (req, res) => {
     const id = req.params.id

     Preferences
     .remove(id)
     .then(deleted => {
          res.status(201).json(deleted)
     })
     .catch(error => {
          res.status(500).json(error)
     })
})

// TODO - PUT user preference --- /api/preferences/:id
router.put('/:id', (req, res) => {
     const id = req.params.id
     const updatePreferences = req.body 

     Preferences
     .update(id, updatePreferences)
     .then(updated => {
          res.status(201).json(updated)
     })
     .catch(error => {
          res.status(500).json(error)
     })
})


module.exports = router;