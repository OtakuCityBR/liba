document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    // Toggle mobile menu
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close mobile menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
            });
        });
    }

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const galleryItems = document.querySelectorAll('.gallery-item');

    window.openLightbox = function(imageSrc) {
        if (lightbox && lightboxImage) {
            lightboxImage.src = imageSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        }
    };

    window.closeLightbox = function() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    };

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            // Close if clicking outside the image (but not on the image itself)
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Scroll reveal effect
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150; // Pixels from the top of the viewport

            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('active');
            } else {
                // Optional: remove 'active' class when out of view
                // revealElements[i].classList.remove('active');
            }
        }
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run on page load to reveal elements already in view

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Handle artisan button clicks if on an artisan profile page (for "Back to Artisans" button)
    // This part is for the main page to ensure correct links, and for profile pages to link back
    // (This particular JS doesn't need to change much for the "Ver Mais" on main page as they are direct links now)
});