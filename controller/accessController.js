const router = require('express').Router()
const bodyParser = require('body-parser')
const config = require('../config/config')
const dbGetter = require('../database/databaseSingleGetter')
const dbSetter = require('../database/databaseSetter')
const jwt = require('jsonwebtoken');

router.use(bodyParser.json())

router.post("/login", (req, res) => {
    const {
        username,
        password
    } = req.body

    const where = 'username=\'' + username + '\' and password=\'' + password + '\'';
    dbGetter.getData('Users', 'userID,preferred_currency', where, (data) => {
        if (data.length > 0) {
            dbGetter.getData('Currency', 'currency_name', 'currencyID=' + data[0].preferred_currency, (response) => {
                var token = jwt.sign({
                    userID: data[0].userID,
                    currency: response[0].currency_name
                }, config.security.key, {
                    expiresIn: 1800
                })
                res.status(200).send({
                    "message": "Successfully authenticated user",
                    "token": token
                })
            })
        } else
            res.status(401).send({
                "message": "Incorrect user or password"
            })
    });
});

router.post('/register', (req, res) => {
    dbSetter.addRow('Users', req.body, (err) => {
        if (err)
            res.status(500).send({
                "message": err
            })
        else
            res.status(200).send({
                "message": "Registered user successfully"
            })
    });
});

module.exports = router