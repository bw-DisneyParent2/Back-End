
exports.seed = function(knex) {
  
  return knex('parents')
    // Deletes ALL existing entries
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('parents').insert([
        {id: 1, email: 'carlos.alvarezberrio@gmail.com', password: '$2b$12$zhIIcpkaIQNTwXEICeDPpu6xjh7TNkrVo4skw2/kzsz2acPcC6Sda', first_name: "Carlos", last_name: "Alvarez", number_of_kids: 3},
        {id: 6, email: 'mary@mail.com	', password: '$2b$12$wsVJkqQnsNsb4QeigZ1oYuVLSpeJYGOKKcnJec/ZU..suYELebq76', first_name: "Mary", last_name: "Lovegood", number_of_kids: 2},
        {id: 7, email: 'jdaley@mail.com', password: '$2b$12$yGbIOljnWqO3/pGMQxqqWu5Sobya22x6KkTBerArrP56Rai/g1EWO', first_name: "John", last_name: "Daley", number_of_kids: 5},
        {id: 10, email: 'dmiles@mail.com', password: '$2b$12$A2YtCAaDh8a4gp9f1sPoz.tcAkbQex7GU8Hac1i2tHCBSB9GxHqmS', first_name: 'Drake', last_name: "Miles", number_of_kids: 1}
      ]);
    })
};
