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

// 6. Scroll Reveal & Skill Bar Animation
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            const progress = entry.target.querySelector('.skill-progress');
            if (progress) {
                progress.style.width = progress.getAttribute('data-width');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section, .card-glass').forEach(el => {
    el.classList.add('reveal-hidden');
    observer.observe(el);
});

// 7. Parallax Background Refined
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

// 8. Form submission handler
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
