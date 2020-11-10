const config = require('../config/config')
const router = require('express').Router()
const bodyParser = require('body-parser')
const axios = require('axios')
const jwt = require('jsonwebtoken');
const dbGetter = require('../database/databaseGetter')
const dbSetter = require('../database/databaseSetter')

router.use(bodyParser.json())

router.get("/list", (req, res) => {
    try {
        let decoded = jwt.verify(req.headers.authorization.split(" ")[1], config.security.key);
        let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + decoded.currency + '&order=market_cap_desc&per_page=250&page=1&sparkline=false'
        axios.get(url)
            .then(response => {
                res.status(200).send(response.data.map(d => {
                    return {
                        "symbol": d.symbol,
                        "price": d.current_price,
                        "name": d.name,
                        "image": d.image,
                        "last_updated": d.last_updated
                    }
                }));
            })
            .catch(err => {
                console.log(err)
            });
    } catch (err) {
        res.sendStatus(403)
    }
});

router.post('/add', (req, res) => {
    let {
        symbol,
        amount
    } = req.body
    try {
        let decoded = jwt.verify(req.headers.authorization.split(" ")[1], config.security.key);
        dbGetter.verifyCrypto(decoded.userID, symbol, (exists) => {
            if (exists) {
                dbSetter.sumCrypto(amount, decoded.userID, symbol, (response) => {
                    res.status(response.status).send(response.message)
                });
            } else {
                dbSetter.addRow('Wallet', {'userID': decoded.userID,'symbol': symbol,'amount': amount,}, (response) => {
                    res.status(response.status).send(response.message)
                });
            }
        });
    } catch (err) {
        res.sendStatus(403)
    }
})

module.exports = router