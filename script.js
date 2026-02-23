// 1. Loading Screen & Animation Start
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';

    // Start typing after loader is gone
    setTimeout(type, 500);
});

// 2. Custom Cursor Glow Effect
const cursor = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 3. Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
} else {
    body.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// 4. Scroll Progress & Back to Top Indicator
const scrollProgress = document.getElementById('scroll-progress');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPosition = window.pageYOffset;
    const progress = (scrollPosition / totalHeight) * 100;

    // Update progress bar
    scrollProgress.style.width = progress + '%';

    // Toggle Back to Top button
    if (scrollPosition > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 5. Typing Animation
const typingText = document.getElementById('typing-text');
const words = ['Yuvraj Dev', 'a Web Developer', 'a UI Designer', 'a Tech Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = 100;
    if (isDeleting) typeSpeed /= 2;

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// 6. Scroll Reveal Refined
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, observerOptions);

document.querySelectorAll('section, .card-glass').forEach(el => {
    el.classList.add('reveal-hidden');
    observer.observe(el);
});

// 7. Premium 3D Tilt & Spotlight Effect
const cards = document.querySelectorAll('.card-glass, .skill-card-tiny');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Spotlight effect
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);

        // 3D Tilt effect
        if (card.hasAttribute('data-tilt')) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        }
    });

    card.addEventListener('mouseleave', () => {
        if (card.hasAttribute('data-tilt')) {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        }
    });
});

// 8. Parallax Background Refined
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('home');
    if (hero && window.innerWidth > 768) {
        const h1 = hero.querySelector('h1');
        const p = hero.querySelector('p');
        if (h1) h1.style.transform = `translateY(${scrolled * 0.2}px)`;
        if (p) p.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
});

// 9. Form submission handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        setTimeout(() => {
            alert('Thank you! Your message has been received.');
            btn.innerText = originalText;
            contactForm.reset();
        }, 1500);
    });
}
