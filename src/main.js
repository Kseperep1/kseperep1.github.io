import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register Plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Background Animation (Simple Particle/Gradient Orb System)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height, particles = [];

function initCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.alpha = Math.random() * 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) this.reset();
  }
  draw() {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createParticles() {
  particles = Array.from({ length: 50 }, () => new Particle());
}

function animateBackground() {
  ctx.clearRect(0, 0, width, height);
  
  // Subtle gradient overlay
  const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
  grad.addColorStop(0, 'rgba(10, 10, 12, 0.5)');
  grad.addColorStop(1, '#0a0a0c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateBackground);
}

window.addEventListener('resize', initCanvas);
initCanvas();
createParticles();
animateBackground();

// Hero Animations
const tl = gsap.timeline();

tl.from('.reveal-text', {
  y: 100,
  opacity: 0,
  duration: 1.5,
  stagger: 0.2,
  ease: 'power4.out',
  delay: 0.5,
});

tl.from('.hero-subtext', {
  opacity: 0,
  y: 20,
  duration: 1,
  ease: 'power3.out',
}, '-=1');

// Scroll Reveals
document.querySelectorAll('.scroll-reveal').forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
  });
});

// Staggered Reveals for Grid Items
gsap.from('.project-card', {
  scrollTrigger: {
    trigger: '.project-grid',
    start: 'top 80%',
  },
  y: 60,
  opacity: 0,
  duration: 1.5,
  stagger: 0.3,
  ease: 'expo.out',
});

// Custom Cursor Enhancements
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
    ease: 'power2.out'
  });
});

// Cursor magnetic effect on hover
document.querySelectorAll('.nav-item, .cta-btn, .social-icon, .project-card').forEach(item => {
  item.addEventListener('mouseenter', () => {
    gsap.to(cursor, { 
      scale: 4, 
      backgroundColor: 'var(--accent-color)',
      opacity: 0.3 
    });
  });
  item.addEventListener('mouseleave', () => {
    gsap.to(cursor, { 
      scale: 1, 
      backgroundColor: 'white',
      opacity: 1 
    });
  });
});

// Parallax for Background Particles (Unicorn Style)
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  gsap.to(particles, {
    y: (i) => scrollY * (i % 5 + 1) * 0.1,
    duration: 0.5,
    ease: 'none',
  });
});
