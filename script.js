// ─── Custom Cursor ───────────────────────────────────────────────
const cursor    = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left    = e.clientX + 'px';
    cursor.style.top     = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(1.5)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
});

// ─── Hamburger Menu ───────────────────────────────────────────────
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
    document.querySelector('.hamburger').classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
    });
});

// ─── Theme Toggle ─────────────────────────────────────────────────
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const icon = document.getElementById('theme-icon');
    const isLight = document.body.classList.contains('light-mode');
    icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    document.getElementById('theme-icon').className = 'fas fa-sun';
}

// ─── Language Toggle ──────────────────────────────────────────────
function toggleLanguage() {
    const currentLang = document.documentElement.lang;
    if (currentLang === 'en') {
        window.location.href = 'index-ar.html';
    } else {
        window.location.href = 'index.html';
    }
}

// ─── Typing Animation ─────────────────────────────────────────────
const words = [
    'Artificial Intelligence',
    'Prompt Engineering',
    'Website Development',
    'Robotics'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing');

function type() {
    const current = words[wordIndex];

    if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 35 : 80;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 500;
    }

    setTimeout(type, speed);
}

type();

// ─── Smooth Scrolling ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ─── Scroll Fade-In Animation ─────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ─── Skill Bar Animation ──────────────────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar   = entry.target;
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
            barObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-bar').forEach(bar => {
    bar.style.width = '0%';
    barObserver.observe(bar);
});

// ─── Scroll Progress Bar ─────────────────────────────────────────
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';

    // Back to top visibility
    backToTopBtn.classList.toggle('show', window.pageYOffset > 300);
});

// ─── Back to Top ──────────────────────────────────────────────────

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Floating Particles ───────────────────────────────────────────
function createParticles() {
    const bg = document.querySelector('.hero-background');
    for (let i = 0; i < 14; i++) {
        const p   = document.createElement('div');
        p.className = 'particle';
        const sz  = Math.random() * 4 + 2;
        p.style.cssText = `
            width:${sz}px; height:${sz}px;
            left:${Math.random() * 100}%;
            animation-duration:${Math.random() * 12 + 14}s;
            animation-delay:${Math.random() * 6}s;
        `;
        bg.appendChild(p);
    }
}
createParticles();

// ─── Contact Form ─────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const modal       = document.getElementById('successModal');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    modal.classList.add('active');
    contactForm.reset();
});

function closeModal() {
    modal.classList.remove('active');
}

modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
});