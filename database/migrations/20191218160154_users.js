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
      users.string('user-image');
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
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users_cities')
    .dropTableIfExists('cities')
    .dropTableIfExists('users');
  };
  