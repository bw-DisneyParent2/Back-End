const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbconfig');

// describe.only() { will only run one test =) }

describe('should reigster a new user', () => {
  it('should returns a JSON', async () => {
    const res = await request(server).post('/api/auth/register')
    .send({
      "email": "Grayson@daley.com",
      "password": "YesPleASE!"
    });
    console.log(res.body);
    expect(res.type).toEqual('application/json');
  })
});


beforeEach( async () => {
  await db ('parents').truncate();
})