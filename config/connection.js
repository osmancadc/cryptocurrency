const mysql = require('mysql')

module.exports = () =>
    mysql.createConnection(
        {
            host:'sql9.freemysqlhosting.net',
            user:'sql9375227',
            password:'AvVTuavzmw',
            port:3306,
            database:'sql9375227',
        },'single'
    )