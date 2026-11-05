const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "greenspace",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;