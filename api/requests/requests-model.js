const db = require('../../database/dbconfig');


module.exports = {
      add: async request => {
        const dbClient = db.client.config.client || db.client.dialect;
        let id;

        if (['pg', 'postgresql'].includes(dbClient)) {
            const result = await db('swapRequests').insert(request).returning('id');
            id = typeof result[0] === 'object' ? result[0].id : result[0];
        } else {
            const [insertedId] = await db('swapRequests').insert(request);
            id = insertedId;
        }
        return await module.exports.findById(id);
      },
      find: () => {
        return db('swapRequests as sr')
            .leftJoin('parents as p', 'sr.requester_id', 'p.id')
            .select('sr.id', 
                'sr.ride', 
                'sr.connect_time', 
                'p.first_name as requester_first_name', 
                'p.last_name as requester_last_name', 
                'p.number_of_kids as requester_kids');
      },
      findBy: (filter) => {
        return db('swapRequests as sr')
            .leftJoin('parents as p', 'sr.requester_id', 'p.id')
            .select('sr.id', 
                'sr.ride', 
                'sr.connect_time', 
                'p.first_name as requester_first_name', 
                'p.last_name as requester_last_name', 
                'p.number_of_kids as requester_kids')
            .where(filter)
            .first();

      },
      findByParentId: id => {
        return db('swapRequests as sr')
            .leftJoin('parents as p', 'sr.requester_id', 'p.id')
            .select('sr.id', 
                'sr.ride', 
                'sr.connect_time', 
                'p.first_name as requester_first_name', 
                'p.last_name as requester_last_name', 
                'p.number_of_kids as requester_kids')
            .where('sr.requester_id', id);
      },
      findById: async id => {
        return db('swapRequests as sr')
            .leftJoin('parents as p', 'sr.requester_id', 'p.id')
            .select('sr.id', 
                'sr.ride', 
                'sr.connect_time', 
                'p.first_name as requester_first_name', 
                'p.last_name as requester_last_name', 
                'p.number_of_kids as requester_kids')
            .where('sr.id', id)
            .first();
      },
      update: (id, updatedData) => {
        return db('swapRequests')
            .where({ id })
            .update(updatedData);
      },
      remove: id => {
        return db('swapRequests')
            .where({ id })
            .del();
      }
  };