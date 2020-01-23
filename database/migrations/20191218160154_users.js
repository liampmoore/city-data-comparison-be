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
      users.string('first_name');
      users.string('last_name');
      users.string('email');
      users.string('city');
      users.string('state');
    })
    .createTable('cities' , cities => {
      cities.increments();

      cities.string('name', 255)
      .notNullable();
    })
    .createTable('users_cities', users_cities => {
      users_cities.increments();

      users_cities.integer('users_id')
      .references('id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    })
    .createTable('users_image', users_image => {
      users_image.increments();
      users_image.integer('users_id')
      .references('id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
      users_image.string('userimage');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users_cities')
    .dropTableIfExists('cities')
    .dropTableIfExists('users');
  };
  