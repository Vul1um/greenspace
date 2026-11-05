const API_URL = "http://localhost:3000";

// Элементы DOM
const loginScreen = document.getElementById("loginScreen");
const adminPanel = document.getElementById("adminPanel");
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const userInfo = document.getElementById("userInfo");
const logoutBtn = document.getElementById("logoutBtn");

// Растения
const plantForm = document.getElementById("plantForm");
const plantMessage = document.getElementById("plantMessage");
const plantsTableBody = document.getElementById("plantsTableBody");

// Сотрудники
const employeeForm = document.getElementById("employeeForm");
const employeeMessage = document.getElementById("employeeMessage");
const employeesTableBody = document.getElementById("employeesTableBody");

// ===== УТИЛИТЫ =====
function getToken() {
    return localStorage.getItem("adminToken");
}

function setToken(token) {
    localStorage.setItem("adminToken", token);
}

function clearToken() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
}

function getUser() {
    const user = localStorage.getItem("adminUser");
    return user ? JSON.parse(user) : null;
}

function setUser(user) {
    localStorage.setItem("adminUser", JSON.stringify(user));
}

function showMessage(element, text, type = "success") {
    element.textContent = text;
    element.className = `form-message form-message--${type}`;
    setTimeout(() => {
        element.textContent = "";
        element.className = "form-message";
    }, 4000);
}

// ===== ПРОВЕРКА АВТОРИЗАЦИИ =====
function checkAuth() {
    const token = getToken();
    const user = getUser();

    if (token && user) {
        loginScreen.style.display = "none";
        adminPanel.style.display = "block";
        userInfo.textContent = `👤 ${user.name}`;
        loadPlants();
        loadEmployees();
    } else {
        loginScreen.style.display = "flex";
        adminPanel.style.display = "none";
    }
}

// ===== ВХОД =====
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginError.textContent = "";

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            loginError.textContent = data.message || "Ошибка входа";
            return;
        }

        setToken(data.token);
        setUser(data.user);
        checkAuth();
    } catch (error) {
        loginError.textContent = "Ошибка сети";
        console.error(error);
    }
});

// ===== ВЫХОД =====
logoutBtn.addEventListener("click", () => {
    if (confirm("Выйти из админ-панели?")) {
        clearToken();
        checkAuth();
    }
});

// ===== РАСТЕНИЯ =====

// Загрузка растений
async function loadPlants() {
    plantsTableBody.innerHTML = '<tr><td colspan="5" class="loading">Загрузка...</td></tr>';

    try {
        const response = await fetch(`${API_URL}/plants`);
        const plants = await response.json();
        renderPlants(plants);
    } catch (error) {
        plantsTableBody.innerHTML = '<tr><td colspan="5" class="loading">Ошибка загрузки</td></tr>';
    }
}

// Рендер таблицы растений
function renderPlants(plants) {
    if (plants.length === 0) {
        plantsTableBody.innerHTML = '<tr><td colspan="5" class="loading">Растений нет</td></tr>';
        return;
    }

    plantsTableBody.innerHTML = plants.map(plant => `
        <tr>
            <td>${plant.id_plant}</td>
            <td>${plant.name}</td>
            <td>${plant.price} ₽</td>
            <td>${plant.description?.substring(0, 50) || ''}...</td>
            <td>
                <button class="btn btn-danger" onclick="deletePlant(${plant.id_plant})">Удалить</button>
            </td>
        </tr>
    `).join("");
}

// Добавление растения
plantForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("plantName").value;
    const price = parseFloat(document.getElementById("plantPrice").value);
    const description = document.getElementById("plantDescription").value;
    const picture = document.getElementById("plantPicture").value;  // ← было image_path

    try {
        const response = await fetch(`${API_URL}/plants`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body: JSON.stringify({ name, price, description, picture })  // ← было image_path
        });

        const data = await response.json();

        if (!response.ok) {
            showMessage(plantMessage, data.message || "Ошибка", "error");
            return;
        }

        showMessage(plantMessage, `✅ Растение "${name}" добавлено!`);
        plantForm.reset();
        loadPlants();
    } catch (error) {
        showMessage(plantMessage, "Ошибка сети", "error");
    }
});
// Удаление растения
async function deletePlant(id) {
    if (!confirm("Удалить растение?")) return;

    try {
        const response = await fetch(`${API_URL}/plants/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${getToken()}` }
        });

        if (!response.ok) {
            alert("Ошибка удаления");
            return;
        }

        loadPlants();
    } catch (error) {
        alert("Ошибка сети");
    }
}

// ===== СОТРУДНИКИ =====

// Загрузка сотрудников
async function loadEmployees() {
    employeesTableBody.innerHTML = '<tr><td colspan="5" class="loading">Загрузка...</td></tr>';

    try {
        const response = await fetch(`${API_URL}/employees`);
        const employees = await response.json();
        renderEmployees(employees);
    } catch (error) {
        employeesTableBody.innerHTML = '<tr><td colspan="5" class="loading">Ошибка загрузки</td></tr>';
    }
}

// Рендер таблицы сотрудников
function renderEmployees(employees) {
    if (employees.length === 0) {
        employeesTableBody.innerHTML = '<tr><td colspan="5" class="loading">Сотрудников нет</td></tr>';
        return;
    }

    employeesTableBody.innerHTML = employees.map(emp => `
        <tr>
            <td>${emp.id_employ}</td>
            <td>${emp.name}</td>
            <td>${emp.job_title}</td>
            <td>${new Date(emp.work_start_date).toLocaleDateString('ru-RU')}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteEmployee(${emp.id_employ})">Удалить</button>
            </td>
        </tr>
    `).join("");
}

// Добавление сотрудника
employeeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("employeeName").value;
    const job_title = document.getElementById("employeeJob").value;
    const work_start_date = document.getElementById("employeeDate").value;

    try {
        const response = await fetch(`${API_URL}/employees`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body: JSON.stringify({ name, job_title, work_start_date })
        });

        const data = await response.json();

        if (!response.ok) {
            showMessage(employeeMessage, data.message || "Ошибка", "error");
            return;
        }

        showMessage(employeeMessage, `✅ Сотрудник "${name}" добавлен!`);
        employeeForm.reset();
        loadEmployees();
    } catch (error) {
        showMessage(employeeMessage, "Ошибка сети", "error");
    }
});

// Удаление сотрудника
async function deleteEmployee(id) {
    if (!confirm("Удалить сотрудника?")) return;

    try {
        const response = await fetch(`${API_URL}/employees/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${getToken()}` }
        });

        if (!response.ok) {
            alert("Ошибка удаления");
            return;
        }

        loadEmployees();
    } catch (error) {
        alert("Ошибка сети");
    }
}

// Глобальные функции для onclick
window.deletePlant = deletePlant;
window.deleteEmployee = deleteEmployee;

// ===== ЗАПУСК =====
checkAuth();