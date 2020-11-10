const connection = require('../config/connection')
const conn = connection()

exports.getData = (table, fields, where, callback) => {
    conn.query(`select ${fields} from ${table} where ${where}`, (err, rows) => {
        if (err) throw "Error consulting the database"
        callback(rows)
    })
}

exports.verifyCrypto = (userID,symbol,callback) =>{
    conn.query(`select * from Wallet where userID=${userID} and symbol='${symbol}'`, (err, rows) => {        
        if (err) throw "Error consulting the database"
        callback(rows.length>0)
    })
}