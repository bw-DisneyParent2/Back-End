const request = require('supertest');
const server = require('../api/server');
const Parent = require('../parents/parents-model');
const db = require('../database/dbconfig');

describe('GET /api/parents', () => {
  it('should return registered users', async () => {
    const res = await request(server)
      .get('/api/parents')
      console.log(res.body);
      expect(res.type).toEqual('application/json');
  });
});

// ======================================================

describe('GET /parents/:id', () => {
  it('should get one parent via ID', async () => {
      const res = await request(server)
        .get('/api/parents/1')
        console.log(res.body);
        expect(res.type).toEqual('application/json');
        // expect(res.status).toEqual(200);
  });
});

beforeEach( async () => {
  await db ('parents').truncate();
});