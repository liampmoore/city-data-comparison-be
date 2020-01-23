const db = require('../database/dbConfig.js')

module.exports = {
     insert,
     findAll,
     findByUser,
     findById,
     remove,
     update
}

// TODO - POST new user preference
function insert(userPreference){
     return db('preferences').insert(userPreference,'id').then(([id]) => findById(id))
}

// TODO - GET all user preferences
function findAll(){
     return db('preferences')
}

// TODO - GET user preference under user's ID
function findByUser(id){
     return db('preferences').where('user_id', '=', id)
}

// TODO - GET user preference by ID 
function findById(id){
     return db('preferences').where('id', '=', id).first()
}

// TODO - DELETE user preference by ID 
function remove(id){
     return db('preferences').where('id', '=', id).del()
}

// TODO - UPDATE user preference by ID 
function update(id, preference){
     return db('preferences').where('id', '=', id).update(preference)
}