const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbconfig');
const Parent = require('../parents/parents-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// describe.only() { will only run one test =) }
async function createUser(email, password) {
  const parent = {
      email: email,
      password: bcrypt.hashSync(password, 8)
  };

  await Parent.add(parent)
}

function genToken(parent) {
  const payload = {
    parentid: parent.id,
    email: parent.email,

    roles: ['parents']
  };

  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}


describe('should reigster a new user', () => {
  it('should return a JSON', async () => {
    const res = await request(server).post('/api/auth/register')
    .send({
      "email": "Grayson@daley.com",
      "password": "YesPleASE!"
    });
    console.log(res.body);
    expect(res.type).toEqual('application/json');
  })
});

describe('POST /login', () => {
  it('should accept valid credentials', async () => {
      await createUser("Hulk","smash");
      const res = await request(server).post('/api/auth/login')
      .send({
          "email": "Hulk",
          "password": "smash"
      });
      // console.log(res.body);
      expect(res.type).toEqual('application/json');
      expect(res.status).toEqual(200);
  });
});

beforeEach( async () => {
  await db ('parents').truncate();
})