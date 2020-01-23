const db = require("../database/dbConfig.js");

module.exports = {
  addFav,
  removeFav,
  getFavs,
  findById,
  addImage
};


function addImage(image) {
  return db('users_avatar').insert(image)
}

//GET a users favorited cities based on users_id
function getFavs(userid) {
  return db("users_cities").where({ users_id: userid }).select('city_id');
}


//POST a favorite using a users_id in url and city_id in the body of the request
async function addFav(city, userid) {
  const [id] = await db("users_cities").insert([{city_id: city}, {users_id: userid}]);
  return findById(id);
}

//helper function for a return from adding cities
function findById(id) {
  return db("users_cities")
    .where({ id })
    .first();
}


//DELETE the favorite based on the id of the table entry
function removeFav(id) {
  return db("users_cities")
    .where({ id })
    .del();
}
