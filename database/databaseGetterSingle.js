const connection = require('../config/connection')
const conn = connection()

exports.getData = (table, fields, where, callback) => {
    conn.query('SELECT ' + fields + ' FROM ' + table + " WHERE " + where, (err, rows) => {
        if (err) throw "Error consulting the database"
        callback(rows)
    })
}