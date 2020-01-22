exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
      users.increments();
  
      users
        .string('username', 255)
        .notNullable()
        .unique();
      users.string('password', 255)
      users.string("googleid", 255)
        .unique();
      users.string("linkedinid", 255)
        .unique();
        users.string("facebookid", 255)
        .unique();
    })
    .createTable('users_cities', users_cities => {
      users_cities.increments();

      users_cities.integer('users_id')
      .references('id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

      users_cities.integer('city_id')
      .notNullable()
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users_cities')
    .dropTableIfExists('users');
  };
  