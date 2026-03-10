document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.background = 'rgba(248, 250, 252, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Dynamic Anti-Gravity Wrappers for Cards
    const cards = document.querySelectorAll('.doctor-card, .treatment-card, .feature-card, .testimonial-card');
    cards.forEach((card) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'card-float-wrapper';

        // Randomize float animation timing to look organic
        wrapper.style.animationDelay = `-${Math.random() * 5}s`;
        wrapper.style.animationDuration = `${5 + Math.random() * 3}s`;

        card.parentNode.insertBefore(wrapper, card);
        wrapper.appendChild(card);

        // Pause float on hover
        wrapper.addEventListener('mouseenter', () => {
            wrapper.style.animationPlayState = 'paused';
        });
        wrapper.addEventListener('mouseleave', () => {
            wrapper.style.animationPlayState = 'running';
        });
    });

    // Mouse Parallax for Hero Blobs
    const originalBlobs = document.querySelectorAll('.blob');
    const parallaxWrappers = [];

    originalBlobs.forEach((blob, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'parallax-wrapper';
        wrapper.dataset.speed = (index + 1) * 20; // Depth multiplier

        // Style wrapper to absolutely cover hero
        wrapper.style.position = 'absolute';
        wrapper.style.top = '0';
        wrapper.style.left = '0';
        wrapper.style.width = '100%';
        wrapper.style.height = '100%';
        wrapper.style.pointerEvents = 'none';
        wrapper.style.overflow = 'visible';

        blob.parentNode.insertBefore(wrapper, blob);
        wrapper.appendChild(blob);
        parallaxWrappers.push(wrapper);
    });

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        // Normalize mouse coordinates to -1 to 1
        targetX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function updateParallax() {
        // Smooth easing towards target
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;

        parallaxWrappers.forEach(wrapper => {
            const speed = parseFloat(wrapper.dataset.speed);
            const x = currentX * speed;
            const y = currentY * speed;
            wrapper.style.transform = `translate(${x}px, ${y}px)`;
        });

        requestAnimationFrame(updateParallax);
    }
    updateParallax();
});
