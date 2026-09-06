// ============================================
// GreenSpace - JavaScript для практической работы №3
// Все интерактивные элементы создаются динамически
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

    // ===== ДОБАВЛЕНИЕ СТИЛЕЙ ДЛЯ НОВЫХ ЭЛЕМЕНТОВ =====
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        /* ===== ТЁМНАЯ ТЕМА ===== */
        body[data-theme="dark"] {
            background-color: #1a1a1a;
            color: #e0e0e0;
        }
        body[data-theme="dark"] .header {
            background-color: #2d2d2d;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }
        body[data-theme="dark"] .header__menu-link {
            color: #e0e0e0;
        }
        body[data-theme="dark"] .catalog {
            background-color: #222;
        }
        body[data-theme="dark"] .card {
            background-color: #2d2d2d;
        }
        body[data-theme="dark"] .card__description {
            color: #bbb;
        }
        body[data-theme="dark"] .features {
            background-color: #1a1a1a;
        }
        body[data-theme="dark"] .feature-card {
            background-color: #2d2d2d;
        }
        body[data-theme="dark"] .feature-card__description {
            color: #bbb;
        }
        body[data-theme="dark"] .about {
            background-color: #222;
        }
        body[data-theme="dark"] .about-card {
            background-color: #2d2d2d;
        }
        body[data-theme="dark"] .about-card__description {
            color: #bbb;
        }
        body[data-theme="dark"] .about__description {
            color: #bbb;
        }
        body[data-theme="dark"] .faq {
            background-color: #1a1a1a;
        }
        body[data-theme="dark"] .faq__item {
            background-color: #2d2d2d;
        }
        body[data-theme="dark"] .faq__answer {
            color: #bbb;
        }
        body[data-theme="dark"] .gallery {
            background-color: #222;
        }
        body[data-theme="dark"] .gallery__thumb {
            border-color: #444;
        }
        body[data-theme="dark"] .gallery__thumb--active {
            border-color: #4CAF50;
        }
        body[data-theme="dark"] .hero {
            background: linear-gradient(135deg, #1e3a20 0%, #2d5a30 100%);
        }
        body[data-theme="dark"] .hero__description {
            color: #d0d0d0;
        }
        body[data-theme="dark"] .banner {
            background: linear-gradient(135deg, #1e3a20 0%, #2d5a30 100%);
        }
        body[data-theme="dark"] .banner__description {
            color: #d0d0d0;
        }
        body[data-theme="dark"] .modal__content {
            background-color: #2d2d2d;
            color: #e0e0e0;
        }
        body[data-theme="dark"] .modal__subtitle {
            color: #bbb;
        }
        body[data-theme="dark"] .form-input {
            background-color: #1a1a1a;
            color: #e0e0e0;
            border-color: #444;
        }
        body[data-theme="dark"] .form-label {
            color: #e0e0e0;
        }
        body[data-theme="dark"] .burger__line {
            background-color: #e0e0e0;
        }
        body[data-theme="dark"] .faq__question:hover {
            background-color: #3a3a3a;
        }
        body[data-theme="dark"] .plant-detail__care,
        body[data-theme="dark"] .plant-detail__features {
            color: #bbb;
        }
        body[data-theme="dark"] .plant-detail__feature-item {
            background-color: #1a1a1a;
            color: #e0e0e0;
        }

        /* ===== ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ ===== */
        .theme-toggle {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: 2px solid #4CAF50;
            background-color: transparent;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            transition: background-color 0.3s, transform 0.3s;
            margin-right: 0.5rem;
        }
        .theme-toggle:hover {
            background-color: #4CAF50;
            transform: rotate(180deg) scale(1.1);
        }

        /* ===== БУРГЕР-МЕНЮ ===== */
        .burger {
            display: none;
            flex-direction: column;
            justify-content: space-between;
            width: 30px;
            height: 22px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
            z-index: 101;
        }
        .burger__line {
            display: block;
            width: 100%;
            height: 3px;
            background-color: #333;
            border-radius: 2px;
            transition: transform 0.3s, opacity 0.3s, background-color 0.3s;
        }
        .burger.active .burger__line:nth-child(1) {
            transform: translateY(9px) rotate(45deg);
        }
        .burger.active .burger__line:nth-child(2) {
            opacity: 0;
        }
        .burger.active .burger__line:nth-child(3) {
            transform: translateY(-9px) rotate(-45deg);
        }

        /* ===== МОДАЛЬНОЕ ОКНО ===== */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            justify-content: center;
            align-items: center;
            padding: 1rem;
        }
        .modal.active {
            display: flex;
            animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .modal__overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            cursor: pointer;
        }
        .modal__content {
            position: relative;
            background-color: #fff;
            border-radius: 15px;
            padding: 2.5rem;
            max-width: 450px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.4s ease;
            z-index: 1;
            max-height: 90vh;
            overflow-y: auto;
        }
        .modal__content--large {
            max-width: 700px;
        }
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .modal__close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
            transition: color 0.3s, transform 0.3s;
            line-height: 1;
            z-index: 2;
        }
        .modal__close:hover {
            color: #e53935;
            transform: rotate(90deg);
        }
        .modal__title {
            font-size: 1.8rem;
            color: #2e7d32;
            margin-bottom: 0.5rem;
        }
        .modal__subtitle {
            color: #666;
            margin-bottom: 1.5rem;
            font-size: 0.95rem;
        }
        .modal__form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
        }
        .form-label {
            font-weight: 600;
            color: #333;
            font-size: 0.95rem;
        }
        .form-input {
            padding: 0.85rem 1rem;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
            font-family: inherit;
            transition: border-color 0.3s, box-shadow 0.3s, background-color 0.4s, color 0.4s;
            outline: none;
        }
        .form-input:focus {
            border-color: #4CAF50;
            box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
        }
        .modal__submit {
            padding: 1rem;
            background-color: #4CAF50;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 1.05rem;
            font-weight: 600;
            cursor: pointer;
            margin-top: 0.5rem;
            transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
        }
        .modal__submit:hover {
            background-color: #45a049;
            transform: scale(1.03);
            box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
        }

        /* ===== ДЕТАЛИ РАСТЕНИЯ ===== */
        .plant-detail__image {
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 1.5rem;
        }
        .plant-detail__desc {
            color: #555;
            line-height: 1.7;
            margin-bottom: 1.5rem;
        }
        .plant-detail__care {
            background-color: #f0f7f0;
            padding: 1.25rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
            color: #333;
            line-height: 1.7;
        }
        .plant-detail__care-title {
            font-weight: 700;
            color: #2e7d32;
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
        }
        .plant-detail__features-title {
            font-weight: 700;
            color: #2e7d32;
            margin-bottom: 0.75rem;
            font-size: 1.1rem;
        }
        .plant-detail__features {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            color: #555;
        }
        .plant-detail__feature-item {
            background-color: #e8f5e9;
            color: #2e7d32;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
        }

        /* ===== КНОПКА "НАВЕРХ" ===== */
        .scroll-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            background-color: #4CAF50;
            color: #fff;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
            box-shadow: 0 5px 20px rgba(76, 175, 80, 0.4);
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: opacity 0.3s, visibility 0.3s, transform 0.3s, background-color 0.3s;
            z-index: 99;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .scroll-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        .scroll-top:hover {
            background-color: #45a049;
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(76, 175, 80, 0.5);
        }

        /* ===== FAQ (АККОРДЕОН) ===== */
        .faq {
            padding: 4rem 2rem;
            background-color: #f9f9f9;
            transition: background-color 0.4s;
        }
        .faq__container {
            max-width: 800px;
            margin: 0 auto;
        }
        .faq__title {
            text-align: center;
            font-size: 2.5rem;
            color: #2e7d32;
            margin-bottom: 2rem;
        }
        .faq__list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .faq__item {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            transition: background-color 0.4s, box-shadow 0.3s;
        }
        .faq__item:hover {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.12);
        }
        .faq__question {
            width: 100%;
            padding: 1.25rem 1.5rem;
            background: none;
            border: none;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 1.1rem;
            font-weight: 600;
            color: #2e7d32;
            text-align: left;
            transition: background-color 0.3s;
        }
        .faq__question:hover {
            background-color: #f0f7f0;
        }
        .faq__icon {
            font-size: 1.5rem;
            font-weight: 300;
            transition: transform 0.3s;
            flex-shrink: 0;
            margin-left: 1rem;
        }
        .faq__item.active .faq__icon {
            transform: rotate(45deg);
        }
        .faq__answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease, padding 0.4s ease;
            padding: 0 1.5rem;
            color: #555;
            line-height: 1.7;
        }
        .faq__item.active .faq__answer {
            max-height: 300px;
            padding: 0 1.5rem 1.25rem;
        }

        /* ===== ГАЛЕРЕЯ ===== */
        .gallery {
            padding: 4rem 2rem;
            background-color: #fff;
            transition: background-color 0.4s;
        }
        .gallery__container {
            max-width: 1000px;
            margin: 0 auto;
        }
        .gallery__title {
            text-align: center;
            font-size: 2.5rem;
            color: #2e7d32;
            margin-bottom: 2rem;
        }
        .gallery__main {
            width: 100%;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            margin-bottom: 1.5rem;
        }
        .gallery__main img {
            width: 100%;
            height: 500px;
            object-fit: cover;
            transition: opacity 0.4s ease;
        }
        .gallery__thumbnails {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 1rem;
        }
        .gallery__thumb {
            width: 100%;
            height: 120px;
            object-fit: cover;
            border-radius: 10px;
            cursor: pointer;
            border: 3px solid transparent;
            transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
        }
        .gallery__thumb:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        .gallery__thumb--active {
            border-color: #4CAF50;
            box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
        }

        /* ===== АДАПТИВНОСТЬ ===== */
        @media (max-width: 768px) {
            .burger {
                display: flex;
            }
            .header__nav {
                position: fixed;
                top: 0;
                right: -100%;
                width: 280px;
                height: 100vh;
                background-color: #fff;
                margin: 0;
                padding: 5rem 2rem 2rem;
                box-shadow: -5px 0 20px rgba(0, 0, 0, 0.15);
                transition: right 0.4s ease;
                z-index: 100;
            }
            body[data-theme="dark"] .header__nav {
                background-color: #2d2d2d;
            }
            .header__nav.active {
                right: 0;
            }
            .header__menu {
                flex-direction: column;
                gap: 1.5rem;
                align-items: flex-start;
            }
            .faq__title,
            .gallery__title {
                font-size: 1.8rem;
            }
            .gallery__thumbnails {
                grid-template-columns: repeat(3, 1fr);
            }
            .gallery__main img {
                height: 300px;
            }
            .plant-detail__image {
                height: 200px;
            }
        }
        @media (max-width: 480px) {
            .gallery__thumbnails {
                grid-template-columns: repeat(2, 1fr);
            }
            .modal__content {
                padding: 1.5rem;
            }
            .scroll-top {
                width: 48px;
                height: 48px;
                bottom: 20px;
                right: 20px;
            }
        }
    `;
    document.head.appendChild(dynamicStyles);


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


    // ===== СОЗДАНИЕ ПЕРЕКЛЮЧАТЕЛЯ ТЕМЫ (Задание 7) =====
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.id = 'themeToggle';
    themeToggle.setAttribute('aria-label', 'Переключить тему');
    themeToggle.innerHTML = '<span id="themeIcon"></span>';

    const headerActions = document.querySelector('.header__actions');
    if (headerActions) {
        headerActions.insertBefore(themeToggle, headerActions.firstChild);
    }

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


    // ===== СОЗДАНИЕ БУРГЕР-МЕНЮ (Задание 4) =====
    const burger = document.createElement('button');
    burger.className = 'burger';
    burger.id = 'burgerBtn';
    burger.setAttribute('aria-label', 'Открыть меню');
    burger.innerHTML = `
        <span class="burger__line"></span>
        <span class="burger__line"></span>
        <span class="burger__line"></span>
    `;
    if (headerActions) {
        headerActions.appendChild(burger);
    }

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


    // ===== СОЗДАНИЕ МОДАЛЬНОГО ОКНА ЗАЯВКИ (Задания 2 и 3) =====
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'modal';
    modal.innerHTML = `
        <div class="modal__overlay" id="modalOverlay"></div>
        <div class="modal__content">
            <button class="modal__close" id="modalClose" aria-label="Закрыть">&times;</button>
            <h2 class="modal__title">Оставить заявку</h2>
            <p class="modal__subtitle">Заполните форму, и мы свяжемся с вами в ближайшее время</p>
            <form class="modal__form" id="requestForm">
                <div class="form-group">
                    <label for="userName" class="form-label">Ваше имя</label>
                    <input type="text" id="userName" class="form-input" placeholder="Иван Иванов" required>
                </div>
                <div class="form-group">
                    <label for="userPhone" class="form-label">Телефон</label>
                    <input type="tel" id="userPhone" class="form-input" placeholder="+7 (___) ___-__-__" required>
                </div>
                <div class="form-group">
                    <label for="userEmail" class="form-label">Email</label>
                    <input type="email" id="userEmail" class="form-input" placeholder="example@mail.ru">
                </div>
                <button type="submit" class="modal__submit">Отправить заявку</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    // ===== СОЗДАНИЕ МОДАЛЬНОГО ОКНА ДЕТАЛЕЙ РАСТЕНИЯ =====
    const plantModal = document.createElement('div');
    plantModal.className = 'modal';
    plantModal.id = 'plantModal';
    plantModal.innerHTML = `
        <div class="modal__overlay" id="plantModalOverlay"></div>
        <div class="modal__content modal__content--large" id="plantModalContent">
            <button class="modal__close" id="plantModalClose" aria-label="Закрыть">&times;</button>
            <div id="plantModalBody"></div>
        </div>
    `;
    document.body.appendChild(plantModal);

    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const requestForm = document.getElementById('requestForm');

    const plantModalOverlay = document.getElementById('plantModalOverlay');
    const plantModalClose = document.getElementById('plantModalClose');
    const plantModalBody = document.getElementById('plantModalBody');

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

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

    // Открытие модалки заявки по кнопке "Войти"
    const openModalBtn = document.querySelector('.header__button');
    if (openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
    }

    // Закрытие модалки заявки
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Закрытие модалки растения
    plantModalClose.addEventListener('click', closePlantModal);
    plantModalOverlay.addEventListener('click', closePlantModal);

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal.classList.contains('active')) closeModal();
            if (plantModal.classList.contains('active')) closePlantModal();
        }
    });

    // Обработка формы заявки
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


    // ===== ОБРАБОТЧИКИ КНОПОК "ПОДРОБНЕЕ" =====
    const detailButtons = document.querySelectorAll('.card__button');
    detailButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            openPlantModal(index);
        });
    });


    // ===== СОЗДАНИЕ КНОПКИ "НАВЕРХ" (Задание 5) =====
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.setAttribute('aria-label', 'Наверх');
    scrollTopBtn.innerHTML = '<span>↑</span>';
    document.body.appendChild(scrollTopBtn);

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


    // ===== СОЗДАНИЕ FAQ АККОРДЕОНА (Задание 6) =====
    const faqSection = document.createElement('section');
    faqSection.className = 'faq';
    faqSection.id = 'faq';
    faqSection.innerHTML = `
        <div class="faq__container">
            <h2 class="faq__title">Часто задаваемые вопросы</h2>
            <div class="faq__list">
                <div class="faq__item">
                    <button class="faq__question">
                        <span>Как часто нужно поливать растения?</span>
                        <span class="faq__icon">+</span>
                    </button>
                    <div class="faq__answer">
                        <p>Частота полива зависит от вида растения. Суккуленты поливают раз в 1-2 недели, тропические — 2-3 раза в неделю. Всегда проверяйте влажность почвы перед поливом.</p>
                    </div>
                </div>
                <div class="faq__item">
                    <button class="faq__question">
                        <span>Какие растения лучше подходят для новичков?</span>
                        <span class="faq__icon">+</span>
                    </button>
                    <div class="faq__answer">
                        <p>Для начинающих идеально подходят сансевиерия, потос, спатифиллум и замиокулькас. Они неприхотливы и прощают ошибки в уходе.</p>
                    </div>
                </div>
                <div class="faq__item">
                    <button class="faq__question">
                        <span>Как осуществляется доставка?</span>
                        <span class="faq__icon">+</span>
                    </button>
                    <div class="faq__answer">
                        <p>Мы доставляем растения по всей России в специальной упаковке, защищающей от повреждений. Срок доставки — 1-5 дней в зависимости от региона.</p>
                    </div>
                </div>
                <div class="faq__item">
                    <button class="faq__question">
                        <span>Что делать, если растение прибыло повреждённым?</span>
                        <span class="faq__icon">+</span>
                    </button>
                    <div class="faq__answer">
                        <p>Свяжитесь с нами в течение 24 часов после получения заказа, пришлите фото повреждения, и мы бесплатно заменим растение или вернём деньги.</p>
                    </div>
                </div>
                <div class="faq__item">
                    <button class="faq__question">
                        <span>Можно ли вернуть растение, если оно не подошло?</span>
                        <span class="faq__icon">+</span>
                    </button>
                    <div class="faq__answer">
                        <p>Да, вы можете вернуть растение в течение 14 дней с момента покупки, если оно сохранило товарный вид и не было повреждено.</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    const footer = document.querySelector('.footer');
    if (footer) {
        footer.parentNode.insertBefore(faqSection, footer);
    }

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


    // ===== СОЗДАНИЕ ГАЛЕРЕИ (Задание 8) =====
    const gallerySection = document.createElement('section');
    gallerySection.className = 'gallery';
    gallerySection.id = 'gallery';
    gallerySection.innerHTML = `
        <div class="gallery__container">
            <h2 class="gallery__title">Галерея растений</h2>
            <div class="gallery__main">
                <img src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800" 
                     alt="Главное изображение" id="mainGalleryImage">
            </div>
            <div class="gallery__thumbnails">
                <img src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300" 
                     alt="Композиция" class="gallery__thumb gallery__thumb--active" 
                     data-src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800">
                <img src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300" 
                     alt="Монстера" class="gallery__thumb" 
                     data-src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800">
                <img src="https://images.unsplash.com/photo-1599598425947-32c029ac2e64?w=300" 
                     alt="Фикус" class="gallery__thumb" 
                     data-src="https://images.unsplash.com/photo-1599598425947-32c029ac2e64?w=800">
                <img src="https://images.unsplash.com/photo-1598880940371-c756e026fea9?w=300" 
                     alt="Сансевиерия" class="gallery__thumb" 
                     data-src="https://images.unsplash.com/photo-1598880940371-c756e026fea9?w=800">
                <img src="https://images.unsplash.com/photo-1593691509543-c55ce32e042c?w=300" 
                     alt="Спатифиллум" class="gallery__thumb" 
                     data-src="https://images.unsplash.com/photo-1593691509543-c55ce32e042c?w=800">
            </div>
        </div>
    `;

    if (faqSection) {
        faqSection.parentNode.insertBefore(gallerySection, faqSection);
    }

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