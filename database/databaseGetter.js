const connection = require('../config/connection')
const axios = require('axios')

const conn = connection()

exports.getData = (table, fields, where, callback) => {
    conn.query(`select ${fields} from ${table} where ${where}`, (err, rows) => {
        if (err) throw "Error consulting the database"
        callback(rows)
    })
}

exports.verifyCrypto = (userID, cryptoID, callback) => {
    conn.query(`select * from Wallet where userID=${userID} and cryptoID='${cryptoID}'`, (err, rows) => {
        if (err) throw "Error consulting the database"
        callback(rows.length > 0, rows)
    });
}

exports.getCryptoData = (symbol) => {
    return new Promise((resolve, reject) => {
        axios.get('https://api.coingecko.com/api/v3/coins/list')
            .then(response => {
                resolve(response.data.find(element => element.symbol === symbol))
            });
    });
}