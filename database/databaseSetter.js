const dbGetter = require('./databaseGetter')
const connection = require('../config/connection');
const conn = connection()

exports.addRow = (table, data, callback) => {
    let fields = '',
        values = '';

    fields += Object.keys(data).map(k => ('`' + k + '`'))
    values += Object.values(data).map(v => (typeof v === "string") ? ('\'' + v + '\'') : v)

    conn.query(`INSERT INTO  ${table} (${fields}) VALUES (${values})`, (err, res) => {
        if (err)
            callback({
                status: 500,
                message: 'Error inserting new row'
            })
        else
            callback({
                status: 200,
                message: 'Data inserted successfully'
            })
    });
}

exports.sumCrypto = (amount, userID, cryptoID, callback) => {
    dbGetter.getData('Wallet', 'amount', `userID=${userID} and cryptoID='${cryptoID}'`, (res) => {
        amount += res[0].amount
        conn.query(`UPDATE Wallet SET amount = '${amount}' WHERE (userID = ${userID}) and (cryptoID = '${cryptoID}')`, (err, res) => {
            if (err)
                callback({
                    status: 500,
                    message: 'Error inserting new row'
                })
            else
                callback({
                    status: 200,
                    message: 'Data successfully added'
                })
        });
    });

}