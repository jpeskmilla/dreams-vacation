document.addEventListener('DOMContentLoaded', function () {
    const slideContainer = document.querySelector('#banner-slide');
    const slides = document.querySelectorAll('#banner-slide .banner-image');
    const indicators = document.querySelectorAll('.banner-indicator');
    const prevButton = document.querySelector('.banner-prev');
    const nextButton = document.querySelector('.banner-next');
    let currentIndex = 0;

    // Actualiza el carrusel con animación
    function updateCarousel() {
        // Quita la clase activa de todas las imágenes
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });
        
        // Añade la clase activa solo a la imagen actual
        slides[currentIndex].classList.add('active');

        // Actualiza los indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // Función para avanzar al siguiente slide
    function moveToNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    // Función para retroceder al slide anterior
    function moveToPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    // Configurar botones de navegación
    if (nextButton) {
        nextButton.addEventListener('click', moveToNextSlide);
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', moveToPrevSlide);
    }

    // Configurar indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Inicializar carrusel - añadir clase active a la primera imagen
    slides[0].classList.add('active');
    updateCarousel();
    
    // Rotación automática - AUMENTADO A 10 SEGUNDOS
    let autoRotate = setInterval(moveToNextSlide, 10000);

    // Detener rotación automática al interactuar con el carrusel
    slideContainer.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });

    slideContainer.addEventListener('mouseleave', () => {
        clearInterval(autoRotate);
        autoRotate = setInterval(moveToNextSlide, 10000);
    });
});