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
        dbGetter.getCryptoData(symbol).then((crypto) => {
            if (crypto == undefined) {
                res.status(400).send("Cryptocurrency not existing")
                return
            }
            dbGetter.verifyCrypto(decoded.userID, crypto.id, (exists) => {
                if (exists) {
                    dbSetter.sumCrypto(amount, decoded.userID, crypto.id, (response) => {
                        res.status(response.status).send(response.message)
                    });
                } else {
                    dbSetter.addRow('Wallet', {
                        'userID': decoded.userID,
                        'cryptoID': crypto.id,
                        'amount': amount,
                    }, (response) => {
                        res.status(response.status).send(response.message)
                    });
                }
            });
        });
    } catch (err) {
        res.sendStatus(403)
    }
})

router.get("/top/:n", (req, res) => {
    try {
        let decoded = jwt.verify(req.headers.authorization.split(" ")[1], config.security.key);
        dbGetter.getData('Wallet', 'cryptoID', `userID=${decoded.userID}`, (rows) => {
            let ids = ''
            ids += rows.map(r => (r.cryptoID))
            let url_prices = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd%2Ceur%2Cars&include_market_cap=false`
            let url_cryptos = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
            axios.get(url_prices)
                .then(prices_response => {
                    axios.get(url_cryptos)
                        .then(crypto_response => {
                            let final_data = crypto_response.data.map(element => {
                                    return {
                                        symbol: element.symbol,
                                        ars: prices_response.data[element.id].ars,
                                        usd: prices_response.data[element.id].usd,
                                        eur: prices_response.data[element.id].eur,
                                        name: element.name,
                                        image: element.image,
                                        last_updated: element.last_updated
                                    }
                                })
                                .sort((a, b) => b[decoded.currency] - a[decoded.currency])
                                .slice(0, req.params.n)
                            res.send(final_data)
                        });
                });
        });
    } catch (err) {
        res.sendStatus(403)
    }
});

module.exports = router