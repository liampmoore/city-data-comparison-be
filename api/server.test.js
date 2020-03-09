const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig');

const newUser = {
    username: "Test12",
    password: "Test12"
}

describe.skip('server.js', () => {

    beforeEach(async () => {
        await db('users').truncate();
    })

    describe('/api', () => {
        // endpoint for .get() /api/
        it('should return an 200 status code .GET from /', async () => {
        const response = await request(server).get('/api/auth');
        expect(response.status).toEqual(200);
        });

        it('should return a JSON object .GET from /', async () => {
        const response = await request(server).get('/api/auth');
        expect(response.type).toEqual('application/json');
        });

        // endpoint for .post /api/register
        it('should return an 500 status code .POST from /register with no payload for login', async () => {
        const response = await request(server).post('/api/auth/register');
        expect(response.status).toEqual(500);
        });
    
        it('should return a JSON object .POST from /register', async () => {
        const response = await request(server).post('/api/auth/register').send(newUser)
        expect(response.status).toBe(201);
        expect(response.type).toEqual('application/json');
        });
    });
});