
exports.up = function(knex) {
  return knex.schema.createTable('preferences', tbl => {
      tbl.increments()
      tbl.string('median_rent', 128)
      tbl.string('homeowner_costs',128) 
      tbl.string('housing_by_rooms',128) 
      tbl.string('vacancy_rate',128) 
      tbl.string('year_home_built',128) 
      tbl.string('household_income',128) 
      tbl.string('health_insurance',128) 
      tbl.string('sex_of_labor_force',128) 
      tbl.string('commute',128) 
      tbl.string('unemployment_rate',128) 
      tbl.string('public_assistance',128) 
      tbl.string('population_growth',128) 
      tbl.string('gender',128) 
      tbl.string('ethnicies',128) 
      tbl.string('language',128) 
      tbl.string('marital_status',128) 
      tbl.string('education_attainment',128) 
      tbl.string('school_enrollment',128) 
      tbl.integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('preferences')
};
