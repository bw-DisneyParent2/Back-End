
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('parents')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('parents').insert([
        {id: 1, email: 'admin', password: 'password', name: "Admin", number_of_kids: 1, ride: "space mountain", time: "5:00 pm"},
        {id: 2, email: 'kylee@daley.com', password: 'PassWord2', name: "Kylee", number_of_kids: 3, ride: "splash mountain", time: "10:00 am"},
        {id: 3, email: 'Chris@daley.com', password: 'PassWord3', name: "Chris", number_of_kids: 3, ride: "Matterhorn", time: "8:00 pm"},
        {id: 4, email: "Hulk", password: "$2a$08$PmmGcseR7fdGefuHQ5suPuXbsUXBdLEA30jfIWvRaODEf.OBAlsdG", name: "Hulk", number_of_kids: 3, ride: "Hulk Coaster", time: "5:30 PM"}
      ]);
    })
};
