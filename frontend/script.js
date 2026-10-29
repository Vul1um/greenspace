// ============================================
// GreenSpace - JavaScript (практическая №9 + БД)
// ============================================
document.addEventListener('DOMContentLoaded', () => {

    // ===== ЭЛЕМЕНТЫ DOM =====
    const body = document.body;
    const plantsGrid = document.getElementById('plantsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Тема
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    // Бургер
    const burger = document.getElementById('burgerBtn');
    const navMenu = document.querySelector('.header__nav');
    const menuLinks = document.querySelectorAll('.header__menu-link');

    // Модалка заявки
    const modal = document.getElementById('modal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const requestForm = document.getElementById('requestForm');
    const openModalBtn = document.getElementById('openModalBtn');

    // Модалка растения
    const plantModal = document.getElementById('plantModal');
    const plantModalOverlay = document.getElementById('plantModalOverlay');
    const plantModalClose = document.getElementById('plantModalClose');
    const plantModalBody = document.getElementById('plantModalBody');

    // Кнопка наверх
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // FAQ
    const faqItems = document.querySelectorAll('.faq__item');

    // Галерея
    const mainGalleryImage = document.getElementById('mainGalleryImage');
    const thumbnails = document.querySelectorAll('.gallery__thumb');

    let allPlants = [];

    // ===== ЗАГРУЗКА РАСТЕНИЙ ИЗ БД =====
    async function loadPlants(filter = 'all') {
        if (plantsGrid) {
            plantsGrid.innerHTML = '<p class="loading-text">Загрузка растений...</p>';
        }

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
            if (plantsGrid) {
                plantsGrid.innerHTML = `
                    <p class="error-text">
                        Не удалось загрузить растения. Убедитесь, что backend запущен.
                    </p>`;
            }
            console.error('Ошибка загрузки:', error);
        }
    }

    // ===== РЕНДЕР КАРТОЧЕК =====
    function renderPlants(plants) {
        if (!plantsGrid) return;

        if (plants.length === 0) {
            plantsGrid.innerHTML = '<p class="loading-text">Растения не найдены.</p>';
            return;
        }

        plantsGrid.innerHTML = plants.map((plant, index) => `
            <div class="card">
                <div class="card__image">
                    ${plant.picture
                        ? `<img src="/${plant.picture.replace(/\\/g, '/')}" alt="${plant.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'card__placeholder\\'>🌿</div>'">`
                        : `<div class="card__placeholder">🌿</div>`
                    }
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

    // ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
    function truncateText(text, maxLength) {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    function formatPrice(price) {
        return Number(price).toLocaleString('ru-RU');
    }

    // ===== МОДАЛКА РАСТЕНИЯ (ОТКРЫТИЕ/ЗАКРЫТИЕ) =====
    function openPlantModal(plant) {
        if (!plant || !plantModalBody) return;

        plantModalBody.innerHTML = `
           ${plant.picture
                ? `<img src="/${plant.picture.replace(/\\/g, '/')}" alt="${plant.name}" class="plant-detail__image" onerror="this.style.display='none'">`
                : '<div class="plant-detail__image-placeholder">🌿</div>'
            }
            <h2 class="modal__title">${plant.name}</h2>
            <p class="plant-detail__price-large">${formatPrice(plant.price)} ₽</p>
            <p class="plant-detail__desc">${plant.description || 'Описание отсутствует.'}</p>
        `;

        if (plantModal) {
            plantModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closePlantModal() {
        if (plantModal) {
            plantModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ===== ЗАКРЫТИЕ МОДАЛОК ПО КРЕСТИКУ, ОВЕРЛЕЮ И ESCAPE =====

    // Модалка заявки — крестик
    if (modalClose && modal) {
        modalClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    }

    // Модалка заявки — оверлей
    if (modalOverlay && modal) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // Модалка растения — крестик
    if (plantModalClose && plantModal) {
        plantModalClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closePlantModal();
        });
    }

    // Модалка растения — оверлей
    if (plantModalOverlay && plantModal) {
        plantModalOverlay.addEventListener('click', (e) => {
            if (e.target === plantModalOverlay) closePlantModal();
        });
    }

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal && modal.classList.contains('active')) closeModal();
            if (plantModal && plantModal.classList.contains('active')) closePlantModal();
        }
    });

    // ===== МОДАЛКА ЗАЯВКИ (ОТКРЫТИЕ/ЗАКРЫТИЕ) =====
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

    if (requestForm) {
        requestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('userName').value;
            const phone = document.getElementById('userPhone').value;
            if (name && phone) {
                alert(`Спасибо, ${name}! Мы свяжемся с вами по номеру ${phone}.`);
                requestForm.reset();
                closeModal();
            }
        });
    }

    // ===== ТЕМА =====
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
                if (themeIcon) themeIcon.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                if (themeIcon) themeIcon.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // ===== БУРГЕР-МЕНЮ =====
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

    // ===== КНОПКА НАВЕРХ =====
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== FAQ =====
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // ===== ГАЛЕРЕЯ =====
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

    // ===== АНИМАЦИЯ КНОПОК =====
    const allButtons = document.querySelectorAll('button, .hero__button');
    allButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => { this.style.transform = ''; }, 150);
        });
    });

    // ===== ОБРАБОТЧИКИ ФИЛЬТРОВ =====
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadPlants(btn.dataset.filter);
        });
    });

    // ===== ЗАГРУЗКА ПРИ СТАРТЕ =====
    loadPlants('all');
});