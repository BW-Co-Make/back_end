const request = require('supertest')
const server = require('../api/server');
const db = require('../data/dbConfig');

let register ={
    username: 'dark_knight',
    password: 'iheartalfred',
    first_name: 'Bruce',
    last_name: 'Wayne',
    zip_code: '53540'
}

let login ={
    username: 'dark_knight',
    password: 'iheartalfred'
}

let testIssue = {
    title: 'Test Title',
    post: 'lorem ipsom, etc., etc.'
}

describe('issues-router', () => {
    afterEach(async () =>{
        await db('users').truncate()
    })
    describe('GET /', () => {
        it('should return 200 OK', async () => {
            return request(server)
            .post('/api/auth/register')
            .send(register)
            .then(res => {
                return request(server)
                .post('/api/auth/login')
                .send(login)
                .then(res =>{
                const token = res.body.token;
                    return request(server)
                    .post('/api/issues')
                    .set('Authorization', token)
                    .then(res => {
                        return request(server)
                        .get('/api/issues')
                        .then(res => {
                            expect(res.status).toBe(200)
                        })
                    });
                }); 
            });
        });
    });
    
    // user register and login for protected endpoints
    // return request(server)
    // .post('/api/auth/register')
    // .send(testUser).then(res => {
    //     return request(server)
    //     .post('/api/auth/login')
    //     .send(testUser)
    //     .then(res =>{
    //         const token = res.body.token;
    //         return request(server)
    //         .get('/api/jokes')
    //         .set('Authorization', token)
    //         .then(res => {
    //             expect(res.status).toBe(200)
    //         });
    //      }); 
    // });
});