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

// --- 80s Interactive Grid (Vortex) ---
const gridContainer = document.getElementById('grid-container');
const gridCanvas = document.createElement('canvas');
const gctx = gridCanvas.getContext('2d');
gridContainer.appendChild(gridCanvas);

let gWidth, gHeight;
function initGrid() {
  gWidth = window.innerWidth;
  gHeight = window.innerHeight;
  gridCanvas.width = gWidth;
  gridCanvas.height = gHeight;
}

const mouse = { x: 0, y: 0, active: false };
let clickRipple = { x: 0, y: 0, time: 0, active: false };

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.active = true;
});

window.addEventListener('mousedown', (e) => {
  clickRipple.x = e.clientX;
  clickRipple.y = e.clientY;
  clickRipple.time = Date.now() * 0.001;
  clickRipple.active = true;
  setTimeout(() => { clickRipple.active = false; }, 2000);
});

function drawGrid() {
  gctx.clearRect(0, 0, gWidth, gHeight);
  gctx.strokeStyle = 'rgba(59, 130, 246, 0.15)'; // Cyber blue
  gctx.lineWidth = 1;

  const spacing = 50;
  const time = Date.now() * 0.001;

  // Horizontal Lines
  for (let y = 0; y < gHeight; y += spacing) {
    gctx.beginPath();
    for (let x = 0; x < gWidth; x += 10) {
      let dx = x - mouse.x;
      let dy = y - mouse.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      let ripple = Math.sin(dist * 0.05 - time * 5) * 5;

      if (clickRipple.active) {
        let cdx = x - clickRipple.x;
        let cdy = y - clickRipple.y;
        let cdist = Math.sqrt(cdx * cdx + cdy * cdy);
        let clickEffect = Math.sin(cdist * 0.1 - (time - clickRipple.time) * 10) * 25 / (cdist * 0.01 + 1);
        ripple += clickEffect * Math.max(0, 1 - (time - clickRipple.time));
      }

      let vortex = mouse.active ? ripple / (dist * 0.01 + 1) : 0;
      const pointX = x;
      const pointY = y + vortex;
      if (x === 0) gctx.moveTo(pointX, pointY);
      else gctx.lineTo(pointX, pointY);
    }
    gctx.stroke();
  }

  // Vertical Lines
  for (let x = 0; x < gWidth; x += spacing) {
    gctx.beginPath();
    for (let y = 0; y < gHeight; y += 10) {
      let dx = x - mouse.x;
      let dy = y - mouse.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      let ripple = Math.sin(dist * 0.05 - time * 5) * 5;

      if (clickRipple.active) {
        let cdx = x - clickRipple.x;
        let cdy = y - clickRipple.y;
        let cdist = Math.sqrt(cdx * cdx + cdy * cdy);
        let clickEffect = Math.sin(cdist * 0.1 - (time - clickRipple.time) * 10) * 25 / (cdist * 0.01 + 1);
        ripple += clickEffect * Math.max(0, 1 - (time - clickRipple.time));
      }

      let vortex = mouse.active ? ripple / (dist * 0.01 + 1) : 0;
      const pointX = x + vortex;
      const pointY = y;
      if (y === 0) gctx.moveTo(pointX, pointY);
      else gctx.lineTo(pointX, pointY);
    }
    gctx.stroke();
  }
  requestAnimationFrame(drawGrid);
}

// --- Particle System (Unicorn Style) ---
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
  constructor() { this.reset(); }
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
  particles = Array.from({ length: 80 }, () => new Particle());
}

function animateBackground() {
  ctx.clearRect(0, 0, width, height);
  const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
  grad.addColorStop(0, 'rgba(10, 10, 12, 0.4)');
  grad.addColorStop(1, '#0a0a0c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateBackground);
}

window.addEventListener('resize', () => { initCanvas(); initGrid(); });

initCanvas();
createParticles();
animateBackground();
initGrid();
drawGrid();

// --- GSAP Animations (Hero, Scroll, Interactive) ---
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

// Image Scroll Reveals & Parallax
gsap.from('.floating-image', {
  scale: 0.8,
  opacity: 0,
  duration: 2,
  ease: 'expo.out',
});

gsap.to('.floating-image', {
  y: 30,
  duration: 4,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

gsap.to('.parallax-image', {
  y: -100,
  scrollTrigger: {
    trigger: '.about-flex',
    start: 'top bottom',
    scrub: 1,
  }
});

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

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
    ease: 'power2.out'
  });
});

document.querySelectorAll('.nav-item, .cta-btn, .social-icon, .project-card').forEach(item => {
  item.addEventListener('mouseenter', () => {
    gsap.to(cursor, { scale: 4, backgroundColor: 'var(--accent-color)', opacity: 0.3 });
  });
  item.addEventListener('mouseleave', () => {
    gsap.to(cursor, { scale: 1, backgroundColor: 'white', opacity: 1 });
  });
});

// Scroll Parallax for Particles
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  particles.forEach((p, i) => {
    p.y += scrollY * (i % 5 + 1) * 0.001; // Subtle drift
  });
});
