const assert = require('assert')
const request = require('supertest')
const app = require('../server')

describe('Crypto module test', () => {
    it('.../List all the available cryptocurrencies', done => {
        request(app)
            .post('/access/login')
            .send({
                username: 'osman',
                password: '1234'
            })
            .end((err, res) => {
                request(app)
                    .get('/crypto/list')
                    .set('Authorization', 'Brearer ' + res.body.token)
                    .end((err, res) => {
                        assert(res.status == 200)
                        done()
                    })
            })
    });

    it('.../List the top 2 of cryptocurrencies owned by a user', done => {
        request(app)
            .post('/access/login')
            .send({
                username: 'osman',
                password: '1234'
            })
            .end((err, res) => {
                request(app)
                    .get('/crypto/top/2')
                    .set('Authorization', 'Brearer ' + res.body.token)
                    .end((err, res) => {
                        assert(res.status == 200)
                        done()
                    })
            })
    });

    it('.../Add a new cryptocurrency to a user (correct parameters)', done => {
        request(app)
            .post('/access/login')
            .send({
                username: 'osman',
                password: '1234'
            })
            .end((err, res) => {
                request(app)
                    .post('/crypto/add')
                    .set('Authorization', 'Brearer ' + res.body.token)
                    .send({
                        "symbol": 'btc',
                        "amount": 1
                    })
                    .end((err, res) => {
                        assert(res.status == 200)
                        done()
                    })
            })
    });

    it('.../Add a new cryptocurrency to a user (symbol not existent)', done => {
        request(app)
            .post('/access/login')
            .send({
                username: 'osman',
                password: '1234'
            })
            .end((err, res) => {
                request(app)
                    .post('/crypto/add')
                    .set('Authorization', 'Brearer ' + res.body.token)
                    .send({
                        "symbol": 'zxy**' ,
                        "amount": 1
                    })
                    .end((err, res) => {
                        assert(res.status == 400)
                        done()
                    })
            })
    });
})