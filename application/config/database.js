const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "photoapp",
    password: "spartanhevy927",
    database: "csc317db",
    connectionLimit: 50,
    debug: false,
});

//module.exports = pool;

const promisePool = pool.promise();
module.exports = promisePool;