 const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",   // ← пароль от MySQL Workbench
    database: "greenspace",
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error("Ошибка подключения к БД:", err.message);
        return;
    }
    console.log("Подключение успешно!");
});

module.exports = connection;