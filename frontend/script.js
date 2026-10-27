document.addEventListener('DOMContentLoaded', () => {

    // ===== ДИНАМИЧЕСКИЙ КАТАЛОГ ИЗ БД =====
    const plantsGrid = document.getElementById('plantsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let allPlants = []; // кэш данных из БД

    // Загрузка растений с сервера
    async function loadPlants(filter = 'all') {
        plantsGrid.innerHTML = '<p class="loading-text">Загрузка растений...</p>';

        const url = filter === 'cheap'
            ? 'http://localhost:3000/plants/cheap'
            : 'http://localhost:3000/plants';

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Ошибка сети');
            const plants = await response.json();
            allPlants = plants;
            renderPlants(plants);
        } catch (error) {
            plantsGrid.innerHTML = `
                <p class="error-text">
                    Не удалось загрузить растения. Убедитесь, что backend запущен (node app.js).
                </p>`;
            console.error(error);
        }
    }

    // Рендер карточек
    function renderPlants(plants) {
        if (plants.length === 0) {
            plantsGrid.innerHTML = '<p class="loading-text">Растения не найдены.</p>';
            return;
        }

        plantsGrid.innerHTML = plants.map((plant, index) => `
            <div class="card">
                <div class="card__image">
                    <div class="card__placeholder">🌿</div>
                </div>
                <div class="card__content">
                    <h3 class="card__title">${plant.name}</h3>
                    <p class="card__description">${truncateText(plant.description, 80)}</p>
                    <p class="card__price">${formatPrice(plant.price)} ₽</p>
                    <button class="card__button" data-index="${index}">Подробнее</button>
                </div>
            </div>
        `).join('');

        // Навешиваем обработчики на кнопки "Подробнее"
        document.querySelectorAll('.card__button').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index);
                openPlantModal(allPlants[idx]);
            });
        });
    }

    // Обрезка текста
    function truncateText(text, maxLength) {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    // Форматирование цены
    function formatPrice(price) {
        return Number(price).toLocaleString('ru-RU');
    }

    // Обработчики кнопок фильтра
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadPlants(btn.dataset.filter);
        });
    });

    // Загружаем каталог при старте
    loadPlants('all');

    // ===== МОДАЛЬНОЕ ОКНО ДЕТАЛЕЙ РАСТЕНИЯ (из БД) =====
    const plantModal = document.getElementById('plantModal');
    const plantModalOverlay = document.getElementById('plantModalOverlay');
    const plantModalClose = document.getElementById('plantModalClose');
    const plantModalBody = document.getElementById('plantModalBody');

    function openPlantModal(plant) {
        if (!plant) return;
        plantModalBody.innerHTML = `
            <div class="plant-detail__image-placeholder"></div>
            <h2 class="modal__title">${plant.name}</h2>
            <p class="plant-detail__price-large">${formatPrice(plant.price)} ₽</p>
            <p class="plant-detail__desc">${plant.description || 'Описание отсутствует.'}</p>
        `;
        plantModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePlantModal() {
        plantModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (plantModalClose) plantModalClose.addEventListener('click', closePlantModal);
    if (plantModalOverlay) plantModalOverlay.addEventListener('click', closePlantModal);

    // ===== ЗАДАНИЕ 1: Анимация кнопок =====
    const allButtons = document.querySelectorAll('button, .hero__button');
    allButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => { this.style.transform = ''; }, 150);
        });
    });

    // ===== ЗАДАНИЕ 7: Переключение темы =====
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.textContent = '☀️';
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                body.removeAttribute('data-theme');
                if (themeIcon) themeIcon.textContent = '';
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                if (themeIcon) themeIcon.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // ===== ЗАДАНИЕ 4: Бургер-меню =====
    const burger = document.getElementById('burgerBtn');
    const navMenu = document.querySelector('.header__nav');
    const menuLinks = document.querySelectorAll('.header__menu-link');
    if (burger && navMenu) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            burger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !burger.contains(e.target)) {
                burger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ===== ЗАДАНИЯ 2 и 3: Модальное окно заявки =====
    const modal = document.getElementById('modal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const requestForm = document.getElementById('requestForm');
    const openModalBtn = document.getElementById('openModalBtn');

    function openModal() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    if (openModalBtn) openModalBtn.addEventListener('click', openModal);
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    if (requestForm) {
        requestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('userName').value;
            const phone = document.getElementById('userPhone').value;
            if (name && phone) {
                alert(`Спасибо, ${name}! Мы свяжемся с вами по номеру ${phone} в ближайшее время.`);
                requestForm.reset();
                closeModal();
            }
        });
    }

    // ===== ЗАДАНИЕ 5: Кнопка "Наверх" =====
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) scrollTopBtn.classList.add('visible');
            else scrollTopBtn.classList.remove('visible');
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== ЗАДАНИЕ 6: Аккордеон FAQ =====
    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        question.addEventListener('click', () => item.classList.toggle('active'));
    });

    // ===== ЗАДАНИЕ 8: Галерея =====
    const mainGalleryImage = document.getElementById('mainGalleryImage');
    const thumbnails = document.querySelectorAll('.gallery__thumb');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('gallery__thumb--active'));
            thumb.classList.add('gallery__thumb--active');
            if (mainGalleryImage) {
                mainGalleryImage.style.opacity = '0';
                setTimeout(() => {
                    mainGalleryImage.src = thumb.getAttribute('data-src');
                    mainGalleryImage.alt = thumb.alt;
                    mainGalleryImage.style.opacity = '1';
                }, 200);
            }
        });
    });

    // Закрытие модалок по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closePlantModal();
        }
    });
});