const db = require('../../database/dbconfig');


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
          .select('id', 'email', 'first_name', 'last_name', 'number_of_kids');
  };
  
  function findBy(filter) {
      return db('parents')
          .where(filter);
  };
  
  async function add(parent) {
    const dbClient = db.client.config.client || db.client.dialect;

    let id;

    if (['pg', 'postgresql'].includes(dbClient)) {
        const result = await db('parents').insert(parent).returning('id');
        id = typeof result[0] === 'object' ? result[0].id : result[0];
    } else {
        const [insertedId] = await db("parents").insert(parent);
        id = insertedId
    }
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
        .where({ id })
        .del();
};