const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();

// Разрешаем запросы между доменами (если нужно)
app.use(cors());

// ===== ГЛАВНОЕ: раздаём статику из папки frontend =====
app.use(express.static(path.join(__dirname, "../frontend")));

app.use('/images', express.static(path.join(__dirname, "../frontend/images")));

// При обращении к корню сайта отдаём index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ===== API маршруты =====

// Все растения
app.get("/plants", (req, res) => {
    db.query("SELECT * FROM plants", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Только дешёвые растения (дополнительное задание)
app.get("/plants/cheap", (req, res) => {
    db.query("SELECT * FROM plants WHERE price <= 500", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сайт доступен: http://localhost:${PORT}`);
});