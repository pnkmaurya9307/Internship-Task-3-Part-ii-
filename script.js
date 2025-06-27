document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const navDotsContainer = document.querySelector('.carousel-nav-dots');

    let currentSlideIndex = 0;
    const slideWidth = slides[0].getBoundingClientRect().width; // Width of a single slide

    // Arrange slides side by side initially
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    // Create navigation dots
    const createDots = () => {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = index;
            navDotsContainer.appendChild(dot);
            dot.addEventListener('click', () => moveToSlide(index));
        });
        updateDots(); // Set initial active dot
    };

    // Update active dot
    const updateDots = () => {
        const dots = Array.from(navDotsContainer.children);
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentSlideIndex]) {
            dots[currentSlideIndex].classList.add('active');
        }
    };

    // Move carousel to specific slide index
    const moveToSlide = (targetIndex) => {
        carouselTrack.style.transform = 'translateX(-' + (slideWidth * targetIndex) + 'px)';
        currentSlideIndex = targetIndex;
        updateDots();
    };

    // Handle next button click
    nextBtn.addEventListener('click', () => {
        let newIndex = currentSlideIndex + 1;
        if (newIndex >= slides.length) {
            newIndex = 0; // Loop back to the first slide
        }
        moveToSlide(newIndex);
    });

    // Handle previous button click
    prevBtn.addEventListener('click', () => {
        let newIndex = currentSlideIndex - 1;
        if (newIndex < 0) {
            newIndex = slides.length - 1; // Loop back to the last slide
        }
        moveToSlide(newIndex);
    });

    // Initialize carousel
    createDots(); // Generate dots
    moveToSlide(0); // Show the first slide initially

    
    
});