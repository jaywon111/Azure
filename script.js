document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Custom Cursor (GhostCursor Adaptation) ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    const links = document.querySelectorAll('a, button, .accordion-item');

    if (window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Smooth trailing for outline
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        links.forEach(link => {
            link.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            link.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // --- 2. Sticky Navbar Logic ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 3. Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // --- 4. Spotlight Card Effect (ReactBits Adaptation) ---
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- 5. Accordion Gallery Logic (Spa Section) ---
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        item.addEventListener('click', () => {
            accordionItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // --- 6. Magnetic Button Effect (Hero CTA) ---
    const magneticBtn = document.getElementById('hero-cta');
    if (magneticBtn) {
        magneticBtn.addEventListener('mousemove', (e) => {
            const rect = magneticBtn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            magneticBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        magneticBtn.addEventListener('mouseleave', () => {
            magneticBtn.style.transform = `translate(0px, 0px)`;
        });
    }

    // --- 7. Scroll Reveal Animation (GradualBlur Adaptation) ---
    const revealElements = document.querySelectorAll('.section-title, .card, .accordion-gallery, .faq-item, .review-card, .map-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.filter = 'blur(0px)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.filter = 'blur(5px)';
        el.style.transition = 'all 1s cubic-bezier(0.25, 1, 0.5, 1)';
        observer.observe(el);
    });
});
