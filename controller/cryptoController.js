const config = require('../config/config')
const router = require('express').Router()
const bodyParser = require('body-parser')
const axios = require('axios')
const jwt = require('jsonwebtoken');

router.use(bodyParser.json())

router.post("/list", (req, res) => {
    let url;
    /*Aca verifico el token */
    // try {
    //     var decoded = jwt.verify(token, 'wrong-secret');
    //   } catch(err) {
    //     // err
    //   }

    jwt.verify(req.body.token, config.security.key, (err, decoded) => {
        if (err) res.sendStatus(403)
        else {
            url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency='+decoded.currency+'&order=market_cap_desc&per_page=100&page=1&sparkline=false'
            axios.get(url)
                .then(response => {
                    res.status(200).send(response.data.map(d => {
                        return {
                            "symbol": d.symbol,
                            "price":d.current_price,
                            "name":d.name,
                            "image":d.image,
                            "last_updated":d.last_updated

                        }
                    }))
                })
                .catch(err => {
                    console.log(err)
                });
        }
    });

});

router.post('/validate', (req, res) => {

})

module.exports = router