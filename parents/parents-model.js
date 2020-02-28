const db = require('../database/dbConfig');


module.exports = {
      add,
      find,
      findBy,
      findById
  };

  function find() {
      return db('parents')
          .select('id', 'email');
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