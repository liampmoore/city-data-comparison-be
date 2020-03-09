const db = require('../database/dbConfig');
const request = require('supertest');
const server = require('../api/server');


const newUser = {
  username: "Test12" + Date.now(),
  password: "Test12"
}

describe('auth-router.js', () => {

  beforeEach(async () => {
      await db.raw('TRUNCATE usersimage, users RESTART IDENTITY CASCADE');
    });

  describe('/api', () => {
      // endpoint for .get() /api/auth
      it('should return an 404 status code .GET from /api/auth', async () => {
      const response = await request(server).get('/api/auth');
      expect(response.status).toEqual(404);
      });

      it('should return a JSON object .GET from /api/auth', async () => {
      const response = await request(server).get('/api/auth');
      expect(response.type).toEqual('text/html');
      });

      // endpoint for .post /api/auth/register
      it('should return an 400 status code .POST from /register with no payload for login', async () => {
      const response = await request(server).post('/api/auth/register');
      expect(response.status).toEqual(400);
      });
  
      it('should return a JSON object .POST from /register', async () => {
      const response = await request(server).post('/api/auth/register').send(newUser)
      expect(response.status).toBe(201);
      expect(response.type).toEqual('application/json');
      });

      // endpoint for .post /api/register
      it('should return an 400 status code .POST from /register with no payload for login', async () => {
      const response = await request(server).post('/api/auth/login');
      expect(response.status).toEqual(400);
      });
  
      it('should return a JSON object .POST from /register', async () => {
      await request(server).post('/api/auth/register').send(newUser)
      const response = await request(server).post('/api/auth/login').send(newUser)
      expect(response.status).toBe(200);
      expect(response.type).toEqual('application/json');
      });
  });
});