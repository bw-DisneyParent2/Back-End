const request = require('supertest');
const server = require('../api/server');
const Parent = require('../parents/parents-model');
const db = require('../database/dbconfig');
const authorized = require("../auth/authenticate-middleware");


describe('GET /api/parents', () => {
  it('should return registered users', async () => {
    const res = await request(server)
      .get('/api/parents');
      console.log(res.body);
      expect(res.type).toEqual('application/json');
  });
});

// ======================================================

describe('GET /parents/:id', () => {
  it('should get one parent via ID', async () => {
      const res = await request(server)
        .get('/api/parents/1', authorized);
        console.log(res.body);
        expect(res.type).toEqual('application/json');
        // expect(res.parents.name).toBe('Admin');
  });
});

describe('PUT /parents/:id', () => {
  it('Test my secure routes to update', async () => {
      const res = await request(server)
        .put('/api/parents/1', authorized )
        .send({ 
          "number_of_kids": 4
        });
        console.log(res.body);
        expect(res.type).toEqual('application/json');
        expect(res.status).toBe(401);    
  });
});

beforeEach( async () => {
  await db ('parents').truncate();
});