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

describe('issues-router', () => {
    afterEach(async () =>{
        await db('issues').truncate()
    })
    describe('GET /', () => {
        it('should return 200 OK', async () => {
            return request(server)
            .get('/api/issues')
            .then(res => {
                expect(res.status).toBe(200)
            })
        });
        it('should return an array of issue objects', async () => {
            return request(server)
            .post('/api/auth/register')
            .send(register)
            .then(res => {
                return request(server)
                .post('/api/auth/login')
                .send(login)
                .then(res =>{
                const token = res.body.token;
                console.log('test issue', testIssue)
                    return request(server)
                    .post('/api/issues')
                    .set('Authorization', token)
                    .send(testIssue)
                    .then(res => {
                        return request(server)
                        .get('/api/issues')
                        .then(res => {
                            console.log('res.body', res.body)
                            expect(res.body).toEqual(expect.arrayContaining(expectedIssue))
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