
exports.up = function(knex) {
  return knex.schema
  .createTable('parents', parents => {
    parents.increments();
    parents
      .string('email', 255)
      .notNullable()
      .unique();
    parents.string('password', 255).notNullable();
  });
};

exports.down = function(knex, promise) {
  return knex.schema
    .dropTableIfExists('parents')
    .dropTableIfExists('sitters')
};
