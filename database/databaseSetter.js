const dbGetter = require('./databaseGetter')
const connection = require('../config/connection');
const conn = connection()

exports.addRow = (table, data, callback) => {
    let fields = '',
        values = '';

    fields += Object.keys(data).map(k => ('`' + k + '`'))
    values += Object.values(data).map(v => (typeof v === "string") ? ('\'' + v + '\'') : v)

    console.log(`INSERT INTO  ${table} (${fields}) VALUES (${values})`)
    conn.query(`INSERT INTO  ${table} (${fields}) VALUES (${values})`, (err, res) => {
        if (err)
            callback({status:500,message:'Error inserting new row'})
        else
            callback({status:200,message:'Data inserted successfully'})
    });
}

exports.sumCrypto = (amount, userID, symbol, callback) => {
    dbGetter.getData('Wallet', 'amount', `userID=${userID} and symbol='${symbol}'`, (res) => {
        amount += res[0].amount

        console.log(`UPDATE Wallet SET amount = '${amount}' WHERE (userID = ${userID}) and (symbol = '${symbol}')`)
        conn.query(`UPDATE Wallet SET amount = '${amount}' WHERE (userID = ${userID}) and (symbol = '${symbol}')`, (err, res) => {
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
