const connection = require('../config/connection')
const conn = connection()

exports.addRow = (table, data, callback) => {
    let fields = '',
        values = '';

    fields += Object.keys(data).map(k => ('`' + k + '`'))
    values += Object.values(data).map(v => (typeof v === "string")?('\'' + v + '\''):v)

    console.log('INSERT INTO '+table+' ('+fields.substring(-2)+') VALUES ('+values+')')
        conn.query('INSERT INTO '+table+' ('+fields+') VALUES ('+values+')', (err, rows) => {
            if (err) 
                callback(new Error('Error inserting new row'))
            else
                callback(false)
        })
}