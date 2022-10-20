let mysql = require('mysql');

//create connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restapidb'
});

conn.connect((err) => {
    if(err) throw err;
    console.info('Mysql connected');
});

module.exports = conn;