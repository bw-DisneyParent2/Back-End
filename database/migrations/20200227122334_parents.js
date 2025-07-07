
exports.up = function(knex) {
  return knex.schema
    .createTable('parents', parents => {
      parents.increments();
      parents
        .string('email', 255)
        .notNullable()
        .unique();
      parents.string('password', 255).notNullable();
      parents.string('first_name', 255).notNullable();
      parents.string('last_name', 255).notNullable();
      parents.integer('number_of_kids').notNullable().defaultTo(0).checkBetween([1, 5]);
    })
    .createTable('swapRequests', tbl => {
      tbl.increments();
      tbl.string('ride').notNullable();
      tbl.string('connect_time').notNullable();
      tbl.integer('requester_id')
        .notNullable()
        .references('parents.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('swapConnect', tbl => {
      tbl.integer('request_id')
        .unsigned()
        .primary()
        .references('swapRequest.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.integer('volunteer_id')
        .notNullable()
        .references('parents.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })    
};

exports.down = function(knex, promise) {
  return knex.schema
    .dropTableIfExists('swapConnect')
    .dropTableIfExists('swapRequest')
    .dropTableIfExists('parents');
};
