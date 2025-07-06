
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('parents')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('parents').insert([
        {id: 1, email: 'admin', password: '$2a$12$t1yQoD2rig1oH0OD.uQI5eFoFUAXDR4u4w5ReNtTqv29pFiZvlLem', first_name: "Admin", last_name: "User", number_of_kids: 1},
        {id: 2, email: 'kylee@smith.com', password: '$2a$12$ALBT1IF591f.9l18mcvTpuzXPf2uRBtu68qSb3UCsXnqtU8E7pvzO', first_name: "Kylee", last_name: "Smith", number_of_kids: 3},
        {id: 3, email: 'Chris@daley.com', password: '$2a$12$WGMeiaQbBPILaoAWwoPmP./gik0i0lzx/zdklaOS15XthjIdwO88i', first_name: "Chris", last_name: "Daley", number_of_kids: 5},
      ]);
    })
};
