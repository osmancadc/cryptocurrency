const connection = require('../config/connection')
const conn = connection()

exports.addRow = (table, fields, where, callback) => {
    conn.query('SELECT ' + fields + ' FROM ' + table + " WHERE " + where, (err, rows) => {
        if (err) throw "Error adding row to database"
        callback(rows)
    })
}