// ============================================
// GreenSpace - JavaScript для практической работы №3
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ===== ДАННЫЕ О РАСТЕНИЯХ =====
    const plantsData = [
        {
            name: 'Монстера',
            shortDesc: 'Тропическая лиана с крупными резными листьями. Неприхотлива и быстро растёт.',
            fullDesc: 'Монстера — одно из самых популярных комнатных растений, родом из тропических лесов Центральной Америки. Её крупные резные листья могут достигать 90 см в длину.',
            care: 'Полив: 1-2 раза в неделю. Свет: рассеянный, без прямых солнечных лучей. Температура: 18-25°C. Влажность: высокая, рекомендуется опрыскивание.',
            features: ['Очищает воздух', 'Быстро растёт', 'Неприхотлива', 'Крупные декоративные листья'],
            img: 'images/монстера.jpg'
        },
        {
            name: 'Фикус',
            shortDesc: 'Эффектное растение с глянцевыми листьями. Очищает воздух и хорошо переносит тень.',
            fullDesc: 'Фикус — род растений семейства Тутовые. В домашних условиях чаще всего выращивают фикус Бенджамина и фикус каучуконосный. Может достигать 2 метров в высоту.',
            care: 'Полив: 1 раз в неделю летом, реже зимой. Свет: яркий рассеянный. Температура: 16-25°C. Не переносит сквозняки.',
            features: ['Очищает воздух от формальдегида', 'Хорошо переносит тень', 'Декоративный вид', 'Долгожитель'],
            img: 'images/фикус.jpg'
        },
        {
            name: 'Сансевиерия',
            shortDesc: 'Неубиваемый суккулент с полосатыми листьями. Идеален для новичков и редкого полива.',
            fullDesc: 'Сансевиерия (тёщин язык) — одно из самых неприхотливых комнатных растений. Отлично подходит для начинающих цветоводов. Выделяет кислород даже ночью.',
            care: 'Полив: раз в 2-3 недели. Свет: любой, от тени до яркого. Температура: 15-28°C. Практически не требует ухода.',
            features: ['Очень неприхотлива', 'Выделяет кислород ночью', 'Редкий полив', 'Идеальна для новичков'],
            img: 'images/сансевиерия.jpg'
        },
        {
            name: 'Спатифиллум',
            shortDesc: '«Женское счастье» с нежными белыми цветами. Любит тень и увлажняет воздух.',
            fullDesc: 'Спатифиллум — популярное комнатное растение с элегантными белыми цветами. В народе его называют «женским счастьем». Отлично увлажняет воздух в помещении.',
            care: 'Полив: 2-3 раза в неделю. Свет: полутень, без прямых солнечных лучей. Температура: 18-23°C. Любит высокую влажность.',
            features: ['Цветёт в домашних условиях', 'Увлажняет воздух', 'Любит тень', 'Символ благополучия'],
            img: 'images/спатифиллум.jpg'
        },
        {
            name: 'Драцена',
            shortDesc: 'Домашняя пальма с изящными листьями. Добавляет экзотики и не требует сложного ухода.',
            fullDesc: 'Драцена — экзотическое растение, напоминающее миниатюрную пальму. Существует более 40 видов. В домашних условиях может достигать 2-3 метров в высоту.',
            care: 'Полив: 1-2 раза в неделю. Свет: яркий рассеянный. Температура: 18-25°C. Не переносит застой воды.',
            features: ['Экзотический вид', 'Очищает воздух', 'Не требует сложного ухода', 'Долгожитель'],
            img: 'images/Драцена.jpg'
        },
        {
            name: 'Алоэ',
            shortDesc: 'Лекарственный суккулент. Почти не требует полива и любит яркий свет.',
            fullDesc: 'Алоэ — суккулент с мясистыми листьями, известный своими лекарственными свойствами. Используется в косметологии и народной медицине для лечения ожогов и ран.',
            care: 'Полив: раз в 2-3 недели. Свет: яркий, прямые солнечные лучи. Температура: 15-25°C. Хорошо переносит засуху.',
            features: ['Лекарственные свойства', 'Почти не требует полива', 'Любит солнце', 'Используется в косметологии'],
            img: 'images/алоэыы.jpg'
        }
    ];

    // ===== ЗАДАНИЕ 1: Анимация кнопок =====
    const allButtons = document.querySelectorAll('button, .hero__button, .card__button');
    allButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // ===== ЗАДАНИЕ 7: Переключение темы =====
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            body.removeAttribute('data-theme');
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });

    // ===== ЗАДАНИЕ 4: Бургер-меню =====
    const burger = document.getElementById('burgerBtn');
    const navMenu = document.querySelector('.header__nav');
    const menuLinks = document.querySelectorAll('.header__menu-link');

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

    // ===== ЗАДАНИЯ 2 и 3: Модальное окно заявки =====
    const modal = document.getElementById('modal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const requestForm = document.getElementById('requestForm');
    const openModalBtn = document.getElementById('openModalBtn');

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    openModalBtn.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

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

    // ===== Модальное окно деталей растения =====
    const plantModal = document.getElementById('plantModal');
    const plantModalOverlay = document.getElementById('plantModalOverlay');
    const plantModalClose = document.getElementById('plantModalClose');
    const plantModalBody = document.getElementById('plantModalBody');

    function openPlantModal(plantIndex) {
        const plant = plantsData[plantIndex];
        if (!plant) return;

        const featuresHTML = plant.features
            .map(f => `<span class="plant-detail__feature-item">${f}</span>`)
            .join('');

        plantModalBody.innerHTML = `
            <img src="${plant.img}" alt="${plant.name}" class="plant-detail__image">
            <h2 class="modal__title">${plant.name}</h2>
            <p class="plant-detail__desc">${plant.fullDesc}</p>
            <div class="plant-detail__care">
                <div class="plant-detail__care-title">🌱 Уход</div>
                ${plant.care}
            </div>
            <div class="plant-detail__features-title">✨ Особенности</div>
            <div class="plant-detail__features">
                ${featuresHTML}
            </div>
        `;

        plantModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePlantModal() {
        plantModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    plantModalClose.addEventListener('click', closePlantModal);
    plantModalOverlay.addEventListener('click', closePlantModal);

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal.classList.contains('active')) closeModal();
            if (plantModal.classList.contains('active')) closePlantModal();
        }
    });

    // Обработчики кнопок "Подробнее"
    const detailButtons = document.querySelectorAll('.card__button');
    detailButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            openPlantModal(index);
        });
    });

    // ===== ЗАДАНИЕ 5: Кнопка "Наверх" =====
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== ЗАДАНИЕ 6: Аккордеон FAQ =====
    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // ===== ЗАДАНИЕ 8: Галерея =====
    const mainGalleryImage = document.getElementById('mainGalleryImage');
    const thumbnails = document.querySelectorAll('.gallery__thumb');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('gallery__thumb--active'));
            thumb.classList.add('gallery__thumb--active');
            
            mainGalleryImage.style.opacity = '0';
            setTimeout(() => {
                mainGalleryImage.src = thumb.getAttribute('data-src');
                mainGalleryImage.alt = thumb.alt;
                mainGalleryImage.style.opacity = '1';
            }, 200);
        });
    });

});