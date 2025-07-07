exports.seed = function(knex) {
  
  return knex('swapRequests')
    // Delete ALL existing entries
    .truncate()
    .then(function () {
      // Insert seed entries
      return knex('swapRequests').insert([
        {id: 1, ride: 'Star Wars: Rise of the Resistance', connect_time: '9:00 AM', requester_id: 1},
        {id: 2, ride: 'Tron', connect_time: '11:30 AM', requester_id: 7},
        {id: 3, ride: 'Guardians Of The Galaxy', connect_time: '10:15 AM', requester_id: 10},
        {id: 4, ride: 'Test Track', connect_time: '10:15 AM', requester_id: 6},
        {id: 5, ride: 'Avatar: Flight of Passage', connect_time: '2:00 PM', requester_id: 10},
      ]);
    })
};
