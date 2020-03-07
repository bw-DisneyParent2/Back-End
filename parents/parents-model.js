const db = require('../database/dbconfig');


module.exports = {
      add,
      find,
      findBy,
      findById,
      update,
      remove
  };

  function find() {
      return db('parents')
          .select('id', 'email', 'name', 'number_of_kids', 'ride', 'time');
  };
  
  function findBy(filter) {
      return db('parents')
          .where(filter);
  };
  
  async function add(parent) {
      const [id] = await db('parents').insert(parent);
  
      return findById(id);
  };
  
  function findById(id) {
      return db('parents')
          .where({ id })
          .first();
  };

  function update(data, id) {
    return db('parents')
        .where({ id })
        .update(data);
};

function remove(id) {
    return db('parents')
        .select('email', 'name', 'number_of_kids', 'ride', 'time')
        .where({ id })
        .del();
};