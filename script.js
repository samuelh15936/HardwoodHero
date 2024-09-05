document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    if (slides.length > 0) {
        function showSlide(index) {
            slides[currentSlide].classList.remove('active');
            slides[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            let next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        showSlide(0);
        setInterval(nextSlide, 5000);
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials[currentTestimonial].style.display = 'none';
        testimonials[index].style.display = 'block';
        currentTestimonial = index;
    }

    function nextTestimonial() {
        let next = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(next);
    }

    showTestimonial(0);
    setInterval(nextTestimonial, 10000);


    // Services Carousel
    const carousel = document.querySelector('.services-carousel');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    function handleCarouselArrows() {
        if (carousel && leftArrow && rightArrow && window.innerWidth > 768) {
            leftArrow.addEventListener('click', () => {
                carousel.scrollBy({ left: -300, behavior: 'smooth' });
            });

            rightArrow.addEventListener('click', () => {
                carousel.scrollBy({ left: 300, behavior: 'smooth' });
            });
        }
    }

    handleCarouselArrows();
    window.addEventListener('resize', handleCarouselArrows);

    // Lightbox functionality
    function openLightbox(img) {
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");
        const caption = document.getElementById("lightbox-caption");

        if (lightbox && lightboxImg && caption) {
            lightbox.style.display = "block";
            lightboxImg.src = img.src;
            caption.innerHTML = img.alt;
        }
    }

    function closeLightbox() {
        const lightbox = document.getElementById("lightbox");
        if (lightbox) {
            lightbox.style.display = "none";
        }
    }

    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        lightbox.addEventListener("click", function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    const portfolioImages = document.querySelectorAll('.portfolio-item img');
    portfolioImages.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this);
        });
    });

    const closeButton = document.querySelector('.close-lightbox');
    if (closeButton) {
        closeButton.addEventListener('click', closeLightbox);
    }

    // Adjust Carousel
    function adjustCarousel() {
        const carousel = document.querySelector('.services-carousel');
        const serviceItems = carousel.querySelectorAll('.service-item');
        
        if (window.innerWidth <= 768) {
            // Reset heights for mobile
            serviceItems.forEach(item => {
                item.style.height = 'auto';
            });
            carousel.style.height = 'auto';
        } else {
            let maxHeight = 0;

            // Find the tallest item
            serviceItems.forEach(item => {
                item.style.height = 'auto';
                maxHeight = Math.max(maxHeight, item.offsetHeight);
            });

            // Set all items to the height of the tallest item
            serviceItems.forEach(item => {
                item.style.height = `${maxHeight}px`;
            });

            // Update carousel height
            carousel.style.height = `${maxHeight}px`;
        }
    }

    // Call adjustCarousel initially and on window resize
    adjustCarousel();
    const debouncedAdjustCarousel = debounce(adjustCarousel, 250);
    window.addEventListener('resize', debouncedAdjustCarousel);

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
});
