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

let expectedIssue = [  
    {
        "id": 1,
        "zip_code": "53540",
        "title": "Test Title",
        "post": "lorem ipsom, etc., etc.",
        "upvote": 0
    }
]

let updateIssue = {
    title: 'Update Title',
    post: 'bob ross lorem ipsom'
}

describe('issues-router', () => {
    describe('GET /', () => {
        afterEach(async () =>{
            await db('issues').truncate();
            await db('users').truncate();
        })
        it('should return 200 OK', async () => {
            return request(server)
            .get('/api/issues')
            .then(res => {
                expect(res.status).toBe(200)
            })
        });
        it('should return an array with an issue object', async () => {
            return request(server)
            .post('/api/auth/register')
            .send(register)
            .then(res => {
                return request(server)
                .post('/api/auth/login')
                .send(login)
                .then(res =>{
                const token = res.body.token;
                // console.log('test issue', testIssue)
                    return request(server)
                    .post('/api/issues')
                    .set('Authorization', token)
                    .send(testIssue)
                    .then(res => {
                        return request(server)
                        .get('/api/issues')
                        .then(res => {
                            // console.log('res.body', res.body)
                            expect(res.body).toEqual(expect.arrayContaining(expectedIssue))
                        })
                    });
                }); 
            });
        });
    });

    describe('POST /', () => {
        afterEach(async () =>{
            await db('issues').truncate();
            await db('users').truncate();
        })
        it('should return a 201 created', async () => {
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
                    .send(testIssue)
                    .then(res => {
                        expect(res.status).toBe(201);
                    })
                });
            }); 
        });
        it('should return an object of the created issue', async () => {
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
                    .send(testIssue)
                    .then(res => {
                        expect(res.body).toMatchObject(expectedIssue[0]);
                    })
                });
            }); 
        });
    });

    describe('PUT /', () => {
        afterEach(async () =>{
            await db('issues').truncate();
            await db('users').truncate();
        })
        it('should return a 200 OK', async () => {
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
                    .send(testIssue)
                    .then(res => {
                        return request(server)
                        .put('/api/issues/1')
                        .set('Authorization', token)
                        .send(updateIssue)
                        .then(res => {
                            expect(res.status).toBe(200)
                        })
                    })
                });
            }); 
        })
        it.todo('should return an object of the updated issue'); 
    });
    describe('DELETE /', () => {
        afterEach(async () =>{
            await db('issues').truncate();
            await db('users').truncate();
        })
        it.todo('should return a 200 OK')
        it.todo('should return an object of the updated issue'); 
    });
});
