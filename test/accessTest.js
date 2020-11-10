const assert = require('assert')
const request = require('supertest')
const app = require('../server')

const test_user = Math.random().toString(36).substring(7)
const test_password = '12345678'
const fake_password = '54321'

describe('Access test', () => {
    
    it('.../register with all correct parameters', done => {
        request(app)
            .post('/access/register')
            .send({
                "first_name" : "test" ,
                "last_name" : "user" ,
                "username" : test_user ,
                "password" : test_password ,
                "preferred_currency" : 1
            })
            .end((err, res) => {
                assert(res.status == 200)
                done()
            })
    });

    it('.../register with short password', done => {
        request(app)
            .post('/access/register')
            .send({
                "first_name" : "test" ,
                "last_name" : "user" ,
                "username" : test_user ,
                "password" : fake_password ,
                "preferred_currency" : 1
            })
            .end((err, res) => {
                assert(res.status == 418)
                done()
            })
    });

    it('.../register without parameters', done => {
        request(app)
            .post('/access/register')
            .end((err, res) => {
                assert(res.status == 400)
                done()
            })
    });

    it('.../login with correct user and password', done => {
        request(app)
            .post('/access/login')
            .send({
                username: test_user,
                password: test_password
            })
            .end((err, res) => {
                assert(res.status == 200)
                done()
            })
    });

    it('.../login with correct user and incorrect password', done => {
        request(app)
            .post('/access/login')
            .send({
                username: test_user,
                password: fake_password
            })
            .end((err, res) => {
                assert(res.status == 401)
                done()
            })
    });

})