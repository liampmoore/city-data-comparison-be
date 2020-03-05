const db = require('../database/dbConfig');
const request = require('supertest');
const server = require('../api/server');



describe('auth-router.js', () => {
    beforeEach(async () => {
      await db.raw('TRUNCATE usersimage, users RESTART IDENTITY CASCADE');
    });
    
describe('POST to /api/auth/register', () => {
    it('responds with 201 OK', async done => {
      await request(server)
        .post('/api/auth/register')
        .send({ username: 'hahahahaha', password: 'hahahahaha'})
        .expect(201);

      done();
    });

    it('responds with JSON', async done => {
      await request(server)
        .post('/api/auth/register')
        .send({ username: 'test', password: 'test' })
        .expect('Content-Type', /json/i);

      done();
    });
  });

describe('POST  to /api/auth/login', () => {
    it('responds with 200 OK', async done => {
      await request(server)
        request(server)
        .post('/api/auth/login')
        .send({ username: 'TakeTest', password: 'MakeTest' })
        .expect(200);

      done();
    });

    it('responds with JSON', async done => {
      await request(server)
         request(server)
        .post('/api/auth/login')
        .send({ username: 'Muamer', password: 'Kukic' })
        .expect('Content-Type', /json/i);

      done();
    });
  });
  


});
