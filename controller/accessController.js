const router = require('express').Router()
const bodyParser = require('body-parser')
const dbGetter = require('../database/databaseGetterSingle')

router.use(bodyParser.json())

router.post("/login", (req, res) => {
    const {user,password} = req.body
    const where = 'username=\'' + user + '\' and password=\'' + password + '\'';
    let x = dbGetter.getData('Users', 'first_name,last_name,preferred_currency', where, (data) => {
        if (data.length > 0)
            res.status(200).send({
                "data": "Successfully authenticated user"
            })
        else
            res.status(401).send({
                "message": "Incorrect user or password"
            })
    })
})

router.post('/register', (req, res) => {
    const {
        name,
        last_name,
        username,
        password,
        preferred_currency
    } = req.body

});

module.exports = router