var expect = require('assert');
var supertest = require('supertest');
var app = require('./mock.server');


describe('Test all the Edu Africa Task Endpoints', async () => {

    var request;

    var userLoginData = {
        email: 'alybaba567@gmail.com',
        password: 'manmustwak',
    }

    it('Register user, should return the user data', (done) => {

        let userRegistrationData = {
            name: 'alybaba567',
            email: 'alybaba567@gmail.com',
            password: 'manmustwak'
        }; // mock data

        request = supertest(app)
        .post('/auth/register')
        .send(userRegistrationData)
        .expect(function (res) {
                let { status, message, data } = res.body; // destructure response body
                expect.equal(res.status, 200);
                expect.equal(status, 'success');
                expect.equal(message, 'Registration successfull');
            }).end(done)
    })


    it('Log in user or user, should return a user or user data', (done) => {
        let userRegistrationData = {
            name: 'alybaba567',
            email: 'alybaba567@gmail.com',
            password: 'manmustwak'
        }; // mock data
        request = supertest(app)
            .post('/auth/login')
            .send({ ...userRegistrationData })
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect.equal(res.status, 200);
                expect.equal(status, 'success');
                expect.equal(message, 'Login successfull');
                expect.equal(userLoginData.email, data.email)
            }).end(done)
    })


    it('Log in user, should return user data', (done) => {
        var userLogInData = {
            email: 'alybaba567@gmail.com',
            password: 'manmustwak',
        }; // mock data
        request = supertest(app)
            .post('/auth/login')
            .send(userLogInData)
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect.equal(res.status, 200);
                expect.equal(status, 'success');
                expect.equal(message, 'Login successfull');
                expect.equal(userLogInData.email, data.email)
            }).end(done)
    })


    it('List all user, should return a list of registerd users', (done) => {

        let mock_data = [{
            userId: 1,
            name: "Aliyu Bello",
            email: "alybaba2009@gmail.com",
            role: "user"
        }]

        request = supertest(app)
            .get('/profiles')
            .send(mock_data)
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect.equal(res.status, 200);
                expect.equal(status, 'success');
                expect.equal(message, 'Users found');
                expect.deepEqual(mock_data, data);
            }).end(done)
    })


    it('Delete a user, should return a user id', (done) => {

        let userData = { 
            userId: 1 
        };

        request = supertest(app)
            .delete('/profiles')
            .send(userData)
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect.equal(res.status, 200);
                expect.equal(status, 'success');
                expect.equal(message, 'Delete successfull');
                expect.equal(userData.userId, data.userId);
            }).end(done)
    })



    it('Update a user, should return a user id', (done) => {

        let mock_data = { userId: 1 };

        request = supertest(app)
            .patch('/profiles')
            .send(mock_data)
            .expect(function (res) {
                let { status, message, data } = res.body; // destructure response
                expect.equal(res.status, 200);
                expect.equal(status, 'success');
                expect.equal(message, 'Update successfull');
                expect.deepEqual(mock_data, data);
            }).end(done)
    })


})