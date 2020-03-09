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

    describe('/api/users', () => {
         // endpoint for .get() /api/users/profile
        it('should return an 200 status code .GET from /api/users/profile', async () => {
            await request(server).post('/api/auth/register').send(newUser);
            const login = await request(server).post('/api/auth/login').send(newUser);
            const token = login.body.token;
            const response = await request(server).get('/api/users/profile').set({ authorization: token });
            expect(response.status).toEqual(200);
        })
    });

    describe('/api/users', () => {
        // endpoint for .get() /api/users/profile
        it('should return an 200 status code .GET from /api/users/favs', async () => {
            await request(server).post('/api/auth/register').send(newUser);
            const login = await request(server).post('/api/auth/login').send(newUser);
            const token = login.body.token;
            const response = await request(server).get('/api/users/favs').set({ authorization: token });
            expect(response.status).toEqual(200);
        })
    });
});