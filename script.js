document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

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

    // Mobile Menu Toggle
    const hamburgerContainer = document.querySelector('.hamburger-container');
    const navLinksContainer = document.querySelector('.nav-links-container');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburgerContainer.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinksContainer.classList.toggle('show');
    });

    // Close mobile menu when a link is clicked
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerContainer.classList.remove('active');
            navLinksContainer.classList.remove('show');
        });
    });

    // Services Carousel
    const carousel = document.querySelector('.services-carousel');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    function handleCarouselArrows() {
        if (window.innerWidth > 768) {
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

        lightbox.style.display = "block";
        lightboxImg.src = img.src;
        caption.innerHTML = img.alt;
    }

    function closeLightbox() {
        document.getElementById("lightbox").style.display = "none";
    }

    document.getElementById("lightbox").addEventListener("click", function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });

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
    closeButton.addEventListener('click', closeLightbox);

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

            // Reset heights
            serviceItems.forEach(item => {
                item.style.height = 'auto';
                const details = item.querySelector('.service-details');
                details.style.maxHeight = details.classList.contains('active') ? 'none' : '0';
            });

            // Find the tallest item
            serviceItems.forEach(item => {
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

    // Event listener for learn-more buttons
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceItem = this.closest('.service-item');
            const details = serviceItem.querySelector('.service-details');
            details.classList.toggle('active');
            this.textContent = details.classList.contains('active') ? 'Show Less' : 'Learn More';

            // Adjust carousel after a short delay to allow for content expansion
            setTimeout(() => {
                adjustCarousel();
            }, 300);
        });
    });

    // Call adjustCarousel initially and on window resize
    adjustCarousel();
    window.addEventListener('resize', adjustCarousel);

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

    const debouncedAdjustCarousel = debounce(adjustCarousel, 250);
    window.addEventListener('resize', debouncedAdjustCarousel);
});