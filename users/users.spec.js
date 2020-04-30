const request = require("supertest");
const db = require("../data/dbConfig.js");
const server = require("../api/server.js");

const user01Register = {
    "username": "Spidergirl",
    "password": "newPass1",
    "first_name": "Gwen",
    "last_name": "Spider",
    "zip_code": "12345"
};

const user01Update = {
    "id": 1,
    "username": "Spidergirl",
    "password": "newPass1",
    "first_name": "Gwen",
    "last_name": "unknown",
    "zip_code": "12345"
};

const user01Login = {
    "username": "Spidergirl",
    "password": "newPass1"
};

const user02Register = {
    "username": "Spider-ham",
    "password": "newPass2",
    "first_name": "Spider",
    "last_name": "Pig",
    "zip_code": "54685"
};

const user02Login = {
    "username": "Spider-ham",
    "password": "newPass2"
};


describe('users router', () => {
    //Clear table before each test
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('GET /', () => {

         it('gets users', async done => {
            let res = await request(server).get('/api/users')
            expect(res.status).toBe(200);
            done();
        })

         it('check user amount',  async done => {
            //add user for test
            await request(server).post('/api/auth/register').send(user01Register);

            let res = await request(server).get('/api/users')
            expect(res.body.length).toBe(1);
            done();
         })        

         it('gets individual user', async done => {
            //add user for test
            await request(server).post('/api/auth/register').send(user01Register);

            let res = await request(server).get('/api/users/1')
            expect(res.body.id).toBe(1);
            done();
         })

    })
    
    describe('POST /', () => {
        //Clear table before each test
        beforeEach(async () => {
            await db('users').truncate();
        });

        it('register responds with 201', async done => {
            let res = await request(server)
                .post('/api/auth/register')
                .send(user01Register)
            expect(res.status).toBe(201);
            done();
        })

        it('should return a 201 created', async () => {
            return request(server)
            .post('/api/auth/register')
            .send(user02Register)
            .then(res => {
                return request(server)
                .post('/api/auth/login')
                .send(user02Login)
            expect(res.status).toBe(201);             
            }); 
        });

        it('returns user after registration', async done => {
            let res = await request(server)
                .post('/api/auth/register')
                .send(user02Register)
            expect(res.status).toBe(201);

            let inserted = await db('users').where({ username: 'Spider-ham' });

            expect(inserted).toHaveLength(1);
            done();
        })

        it('logs in user', async done => {
            //Create user to test
            await request(server).post('/api/auth/register').send(user01Register);

            let res = await request(server)
                .post('/api/auth/login')
                .send(user01Login)
            expect(res.status).toBe(200);
            done();
        })

    })

    describe('PUT /', () => {
        //Clear table before each test
        beforeEach(async () => {
            await db('users').truncate();
        });

        it('updating without token returns 404', async done => {
            //add user for test
            await request(server).post('/api/auth/register').send(user01Register);

            let res = await request(server)
                .put('/api/users/1')
                .send(user01Update);
            expect(res.status).toBe(400);
            done();
        })

        it('updating with token returns 200', async done => {
            await request(server).post('/api/auth/register').send(user01Register);

            let login = await request(server)
                .post('/api/auth/login')
                .send(user01Login)

            let token = login.body.token;

            let res = await request(server)
                .put('/api/users/1')
                .send(user01Update)
                .set('Authorization', token)

            expect(res.status).toBe(200);
            done();
        })

    })

    describe('DELETE /', () => {
        //Clear table before each test
        beforeEach(async () => {
            await db('users').truncate();
        });

        it('deleting without token returns 400', async done => {
            //add user for test
            await request(server).post('/api/auth/register').send(user01Register);

            let login = await request(server)
                .post('/api/auth/login')
                .send(user01Login)

            let res = await request(server)
                .delete(`/api/users/${login.body.id}`);

            expect(res.status).toBe(400);
            done();
        })

        it('deleting with token returns 200', async done => {
            //add user for test
            await request(server).post('/api/auth/register').send(user01Register);

            let login = await request(server)
                .post('/api/auth/login')
                .send(user01Login)

            let token = login.body.token;

            let res = await request(server)
                .delete('/api/users/1')
                .set('Authorization', token)

            expect(res.status).toBe(200);
            done();
        })   

    })



})