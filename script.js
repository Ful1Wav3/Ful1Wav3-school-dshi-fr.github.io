document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM загружен");

    // 1. Инициализация всех табов на странице
    function initTabs(tabSelector, contentSelector, dataAttr) {
        const tabs = document.querySelectorAll(tabSelector);
        const contents = document.querySelectorAll(contentSelector);
        
        console.log("Табы:", tabs);
        console.log("Контент:", contents);

        if (!tabs.length || !contents.length) {
            console.log("Табы или контент не найдены.");
            return;
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const value = tab.getAttribute(dataAttr);
                contents.forEach(content => {
                    content.classList.remove('active');
                    
                    if (content.getAttribute(dataAttr)) {
                        if (content.getAttribute(dataAttr) === value || value === 'all') {
                            content.classList.add('active');
                        }
                    } else if (content.id && content.id.includes(value)) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }

    // Инициализация всех табов
    initTabs('.tab-btn', '.gallery-item', 'data-tab');
    initTabs('.account-tab', '.tab-content', 'data-tab');
    initTabs('.program-tab', '.program-content', 'data-age');
    initTabs('.project-tab', '.project-card', 'data-category');
    initTabs('.alumni-tab', '.alumni-card', 'data-field');
    initTabs('.direction-tab', '.teacher-card', 'data-direction');

    // 2. Фильтрация проектов при клике на вкладки
    const tabs = document.querySelectorAll('.project-tab');
    const projectCards = document.querySelectorAll('.project-card');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            projectCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 3. Слайдер отзывов
    const testimonials = document.querySelectorAll('.testimonial');
    const prevTestimonialBtn = document.querySelector('.prev-testimonial');
    const nextTestimonialBtn = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;

    console.log("Отзывы:", testimonials);

    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            if (i === index) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });
    }

    if (testimonials.length > 0) {
        showTestimonial(currentTestimonial);

        if (prevTestimonialBtn) {
            prevTestimonialBtn.addEventListener('click', function() {
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }

        if (nextTestimonialBtn) {
            nextTestimonialBtn.addEventListener('click', function() {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }
    }

    // 4. Главный слайдер
    const initMainSlider = () => {
        const slides = document.querySelectorAll('.slide');
        const dotsContainer = document.querySelector('.slider-dots');
        let currentSlide = 0;

        if (slides.length === 0) {
            console.log("Слайды не найдены");
            return;
        }

        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-slide');
        const nextBtn = document.querySelector('.next-slide');

        function goToSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide((currentSlide + 1) % slides.length);
        }

        function prevSlide() {
            goToSlide((currentSlide - 1 + slides.length) % slides.length);
        }

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        let slideInterval = setInterval(nextSlide, 5000);

        const slider = document.querySelector('.hero-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slider.addEventListener('mouseleave', () => {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    };
    initMainSlider();

    // 5. Переключение недель в расписании
    const prevWeekBtn = document.getElementById('prev-week');
    const nextWeekBtn = document.getElementById('next-week');
    
    if (prevWeekBtn && nextWeekBtn) {
        prevWeekBtn.addEventListener('click', () => console.log('Previous week clicked'));
        nextWeekBtn.addEventListener('click', () => console.log('Next week clicked'));
    }

    // 6. Фильтрация учителей по направлениям
    const directionTabs = document.querySelectorAll('.direction-tab');
    const teacherCards = document.querySelectorAll('.teacher-card');
    
    directionTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Удаляем active у всех вкладок
            directionTabs.forEach(t => t.classList.remove('active'));
            // Добавляем active текущей
            this.classList.add('active');
            
            const direction = this.getAttribute('data-direction');
            
            teacherCards.forEach(card => {
                if (direction === 'all' || card.getAttribute('data-direction') === direction) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Закрываем все открытые элементы, кроме текущего
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключаем текущий элемент
            item.classList.toggle('active');
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const readMoreButtons = document.querySelectorAll('.read-more');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Находим соответствующий блок .more-text в текущей карточке
            const newsCard = this.closest('.news-card');
            const moreText = newsCard.querySelector('.more-text');
            
            // Закрываем все другие открытые блоки перед открытием текущего
            document.querySelectorAll('.more-text.visible').forEach(item => {
                if (item !== moreText) {
                    item.classList.remove('visible');
                    // Обновляем текст соответствующих кнопок
                    item.closest('.news-card').querySelector('.read-more').innerHTML = 
                        "Подробнее <i class='fas fa-arrow-down'></i>";
                }
            });
            
            // Переключаем видимость текущего блока
            moreText.classList.toggle('visible');
            
            // Меняем текст кнопки
            if (moreText.classList.contains('visible')) {
                this.innerHTML = "Свернуть <i class='fas fa-arrow-up'></i>";
            } else {
                this.innerHTML = "Подробнее <i class='fas fa-arrow-down'></i>";
            }
        });
    });
});




document.addEventListener("DOMContentLoaded", function () {
    // ----- Для direction-card -----
    const directionModal = document.getElementById('modal');
    const directionModalText = document.getElementById('modal-text');

    const directionDetails = [
        "<h3>Музыкальное отделение</h3><p>Здесь дети осваивают музыкальные инструменты и вокал с раннего возраста. Программа включает сольфеджио, ансамбли и концертную практику.</p>",
        "<h3>Художественное отделение</h3><p>Развитие навыков рисунка, живописи, скульптуры. Особое внимание уделяется композиции, цвету и работе с различными материалами.</p>",
        "<h3>Хореографическое отделение </h3><p>Классический, народный и современный танец. Регулярные выступления на сцене и участие в фестивалях.</p>",
        "<h3>Театральное отделение</h3><p>Обучение актерскому мастерству, сценической речи, работа с текстами и сценография.</p>",
        "<h3>Современные искусства</h3><p>Фотография, цифровая графика, анимация. Ученики создают мультфильмы и короткометражки.</p>",
        "<h3>Раннее развитие</h3><p>Игровые формы обучения: музыка, ритмика, сказкотерапия. Развитие воображения и речи у малышей.</p>",
    ];

    document.querySelectorAll('.direction-card .btn-small').forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            directionModalText.innerHTML = directionDetails[index];
            directionModal.style.display = "block";
        });
    });

    // Закрытие direction modal
    document.querySelector('#modal .close-btn').addEventListener('click', () => {
        directionModal.style.display = "none";
    });

    window.addEventListener('click', (e) => {
        if (e.target === directionModal) {
            directionModal.style.display = "none";
        }
    });


    // ----- Для project-card -----
    const projectModal = document.getElementById('project-modal');
    const projectModalText = document.querySelector('#project-modal #modal-text');

    document.querySelectorAll('.project-card .btn-small').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const card = btn.closest('.project-card');
            const title = card.querySelector('h3').innerText;
            const category = card.querySelector('.project-category').innerText;
            const date = card.querySelector('.project-date').innerText;
            const description = card.querySelector('p:last-of-type').innerText;
            const image = card.querySelector('img').getAttribute('src');

            projectModalText.innerHTML = `
                <h3>${title}</h3>
                <p><strong>Категория:</strong> ${category}</p>
                <p><strong>Дата:</strong> ${date}</p>
                <img src="${image}" alt="${title}" style="width: 100%; margin-top: 15px;" />
                <p style="margin-top: 15px;">${description}</p>
            `;

            projectModal.style.display = 'block';
        });
    });

    // Закрытие project modal
    document.querySelector('#project-modal .close-btn').addEventListener('click', () => {
        projectModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const btn = item.querySelector('.accordion-btn');
        const content = item.querySelector('.accordion-content');
        
        btn.addEventListener('click', function() {
            // Закрываем все открытые элементы, кроме текущего
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    const otherContent = otherItem.querySelector('.accordion-content');
                    otherItem.classList.remove('active');
                    otherContent.style.maxHeight = '0';
                }
            });
            
            // Открываем/закрываем текущий элемент
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                // Устанавливаем max-height на реальную высоту контента
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
});


// Получаем все вкладки
const tabs = document.querySelectorAll('.alumni-tab');
// Получаем все карточки
const cards = document.querySelectorAll('.alumni-card');

// Добавляем обработчики событий для вкладок
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Убираем активный класс у всех вкладок
        tabs.forEach(t => t.classList.remove('active'));
        
        // Добавляем активный класс текущей вкладке
        tab.classList.add('active');
        
        // Получаем значение выбранной вкладки
        const filter = tab.getAttribute('data-field');
        
        // Фильтруем карточки
        cards.forEach(card => {
            // Если вкладка "Все" или категория карточки совпадает с выбранной вкладкой
            if (filter === 'all' || card.getAttribute('data-field') === filter) {
                card.style.display = 'block'; // Показываем карточку
            } else {
                card.style.display = 'none'; // Скрываем карточку
            }
        });
    });
});
