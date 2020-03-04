
exports.up = function(knex) {
  return knex.schema
    .createTable('kidSwap', tbl => {
      tbl.increments();
      tbl.string('ride').notNullable();
      tbl.string('time').notNullable();
      tbl.integer('parent_id')
        .notNullable()
        .references('parents.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.integer('volunteer_id')
        .notNullable()
        .references('parents.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })

    .createTable('parents', parents => {
      parents.increments();
      parents
        .string('email', 255)
        .notNullable()
        .unique();
      parents.string('password', 255).notNullable();
      parents.string('name', 255).notNullable();
      parents.integer('number_of_kids').notNullable();
      parents.string('ride', 255).notNullable();
      parents.string('time').notNullable();
    });
};

exports.down = function(knex, promise) {
  return knex.schema
    .dropTableIfExists('parents')
    .dropTableIfExists('kidSwap')
};
