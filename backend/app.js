const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();
const PORT = 3000;
const SECRET_KEY = "greenspace_secret_key_2026";

app.use(express.json());

// Раздача статики из папки frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Главная страница сайта
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Админ-панель
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/admin.html"));
});

// ============================================
// РАСТЕНИЯ (Практическая №9)
// ============================================

// Получить все растения
app.get("/plants", async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM plants ORDER BY id_plant DESC");
        res.json(results);
    } catch (error) {
        console.error("Ошибка получения растений:", error);
        res.status(500).json({ error: error.message });
    }
});

// Получить только дешёвые растения (до 500 ₽)
app.get("/plants/cheap", async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM plants WHERE price <= 500 ORDER BY id_plant DESC");
        res.json(results);
    } catch (error) {
        console.error("Ошибка получения растений:", error);
        res.status(500).json({ error: error.message });
    }
});

// Создать растение
app.post("/plants", async (req, res) => {
    const { name, price, description, picture } = req.body;  // ← было image_path

    try {
        if (!name || !price || !description) {
            return res.status(400).json({ message: "Заполните все обязательные поля" });
        }

        const [result] = await db.query(
            "INSERT INTO plants (name, price, description, picture) VALUES (?, ?, ?, ?)",  // ← было image_path
            [name, price, description, picture || null]
        );

        res.status(201).json({
            message: "Растение добавлено",
            id: result.insertId
        });
    } catch (error) {
        console.error("Ошибка создания растения:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Удалить растение
app.delete("/plants/:id", async (req, res) => {
    try {
        const [result] = await db.query(
            "DELETE FROM plants WHERE id_plant = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Растение не найдено" });
        }

        res.json({ message: "Растение удалено" });
    } catch (error) {
        console.error("Ошибка удаления растения:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// ============================================
// СОТРУДНИКИ
// ============================================

// Получить всех сотрудников
app.get("/employees", async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM employees ORDER BY id_employ DESC");
        res.json(results);
    } catch (error) {
        console.error("Ошибка получения сотрудников:", error);
        res.status(500).json({ error: error.message });
    }
});

// Создать сотрудника
app.post("/employees", async (req, res) => {
    const { name, work_start_date, job_title } = req.body;

    try {
        if (!name || !work_start_date || !job_title) {
            return res.status(400).json({ message: "Заполните все поля" });
        }

        const [result] = await db.query(
            "INSERT INTO employees (name, work_start_date, job_title) VALUES (?, ?, ?)",
            [name, work_start_date, job_title]
        );

        res.status(201).json({
            message: "Сотрудник добавлен",
            id: result.insertId
        });
    } catch (error) {
        console.error("Ошибка создания сотрудника:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Удалить сотрудника
app.delete("/employees/:id", async (req, res) => {
    try {
        const [result] = await db.query(
            "DELETE FROM employees WHERE id_employ = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Сотрудник не найден" });
        }

        res.json({ message: "Сотрудник удалён" });
    } catch (error) {
        console.error("Ошибка удаления сотрудника:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// ============================================
// ПОЛЬЗОВАТЕЛИ (Практическая №10)
// ============================================

// Регистрация
app.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Заполните все поля" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Некорректный email" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Пароль должен содержать минимум 6 символов" });
        }

        const [existing] = await db.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: "Пользователь с таким email уже существует" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, role || "admin"]
        );

        res.status(201).json({ message: "Пользователь зарегистрирован" });
    } catch (error) {
        console.error("Ошибка регистрации:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Авторизация
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Заполните все поля" });
        }

        const [users] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: "Неверный пароль" });
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, role: user.role },
            SECRET_KEY,
            { expiresIn: "24h" }
        );

        res.json({
            message: "Авторизация успешна",
            token: token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error("Ошибка авторизации:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Получить всех пользователей
app.get("/users", async (req, res) => {
    try {
        const [users] = await db.query(
            "SELECT id, name, email, role, created_at FROM users ORDER BY id DESC"
        );
        res.json(users);
    } catch (error) {
        console.error("Ошибка получения пользователей:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Получить пользователя по ID
app.get("/users/:id", async (req, res) => {
    try {
        const [users] = await db.query(
            "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
            [req.params.id]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.json(users[0]);
    } catch (error) {
        console.error("Ошибка получения пользователя:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Удалить пользователя
app.delete("/users/:id", async (req, res) => {
    try {
        const [result] = await db.query(
            "DELETE FROM users WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.json({ message: "Пользователь удалён" });
    } catch (error) {
        console.error("Ошибка удаления пользователя:", error);
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`✅ Сайт: http://localhost:${PORT}`);
    console.log(`✅ Админ-панель: http://localhost:${PORT}/admin`);
    console.log(`✅ API растений: http://localhost:${PORT}/plants`);
    console.log(`✅ API сотрудников: http://localhost:${PORT}/employees`);
    console.log(`✅ API пользователей: http://localhost:${PORT}/users`);
});