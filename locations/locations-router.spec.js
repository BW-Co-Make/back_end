const request = require('supertest')
const server = require('../api/server');
const db = require('../data/dbConfig');

describe('locations-router', () => {
    describe('GET /', () => {
        it('should return 200 OK', async () => {
            return request(server)
            .get('/api/locations')
            .then(res => {
                expect(res.status).toBe(200)
            })
        });
    });
    describe('GET /:id', () => {
        it('should return 200 OK', async () => {
            return request(server)
            .get('/api/locations/1')
            .then(res => {
                expect(res.status).toBe(200)
            })
        });
    });

});