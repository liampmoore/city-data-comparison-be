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

function getFavs(userid) {
  return db("users_cities").where({ user_id: userid });
}

async function addFav(city) {
  const [id] = await db("users_cities").insert(city);
  return findById(id);
}

function findById(id) {
  return db("users_cities")
    .where({ id })
    .first();
}

function removeFav(id) {
  return db("users_cities")
    .where({ id })
    .del();
}
