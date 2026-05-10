// Portfolio OJEWUMI ASAPH FELIX — script principal
document.addEventListener('DOMContentLoaded', function () {
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';

    // ── Skill Radar ──────────────────────────────────────────────────────────
    const radarCanvas = document.getElementById('skill-radar');
    if (radarCanvas) {
        const rctx = radarCanvas.getContext('2d');
        let size = 400;

        function resizeRadar() {
            const container = radarCanvas.parentElement;
            const availableWidth = container ? container.clientWidth : radarCanvas.clientWidth;
            size = Math.max(260, Math.min(420, availableWidth || 400));
            const pixelRatio = window.devicePixelRatio || 1;
            radarCanvas.width = Math.floor(size * pixelRatio);
            radarCanvas.height = Math.floor(size * pixelRatio);
            radarCanvas.style.width = size + 'px';
            radarCanvas.style.height = size + 'px';
            rctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            drawRadar();
        }

        const skills = [
            { name: 'Cyber', value: 0.88 },
            { name: 'IA/ML', value: 0.82 },
            { name: 'Dev Web', value: 0.80 },
            { name: 'Réseaux', value: 0.75 },
            { name: 'Data', value: 0.72 }
        ];

        function drawRadar() {
            const cx = size / 2, cy = size / 2;
            const radius = size * 0.38;
            const step = (Math.PI * 2) / skills.length;
            rctx.clearRect(0, 0, size, size);

            for (let i = 1; i <= 5; i++) {
                rctx.beginPath();
                rctx.arc(cx, cy, radius * (i / 5), 0, Math.PI * 2);
                rctx.strokeStyle = 'rgba(34,211,238,0.15)';
                rctx.lineWidth = 1;
                rctx.stroke();
            }

            skills.forEach((s, i) => {
                const angle = i * step - Math.PI / 2;
                rctx.strokeStyle = 'rgba(34,211,238,0.22)';
                rctx.beginPath();
                rctx.moveTo(cx, cy);
                rctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
                rctx.stroke();

                rctx.fillStyle = '#94a3b8';
                rctx.font = '600 11px "Poppins", sans-serif';
                rctx.textAlign = 'center';
                rctx.fillText(s.name,
                    cx + Math.cos(angle) * (radius + 26),
                    cy + Math.sin(angle) * (radius + 26) + 4
                );
            });

            rctx.beginPath();
            skills.forEach((s, i) => {
                const angle = i * step - Math.PI / 2;
                const dist = radius * s.value;
                const x = cx + Math.cos(angle) * dist;
                const y = cy + Math.sin(angle) * dist;
                if (i === 0) rctx.moveTo(x, y); else rctx.lineTo(x, y);
            });
            rctx.closePath();
            rctx.fillStyle = 'rgba(34,211,238,0.20)';
            rctx.fill();
            rctx.strokeStyle = '#22d3ee';
            rctx.lineWidth = 2;
            rctx.stroke();

            // Dots on vertices
            skills.forEach((s, i) => {
                const angle = i * step - Math.PI / 2;
                const dist = radius * s.value;
                rctx.beginPath();
                rctx.arc(cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist, 4, 0, Math.PI * 2);
                rctx.fillStyle = '#22d3ee';
                rctx.fill();
            });
        }

        window.addEventListener('resize', resizeRadar);
        resizeRadar();
    }

    // ── Scroll Progress ───────────────────────────────────────────────────────
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        document.querySelector('.scroll-progress').style.width = ((winScroll / height) * 100) + '%';
    });

    // ── Hero Particles ────────────────────────────────────────────────────────
    const canvas = document.getElementById('hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.6;
                this.speedY = (Math.random() - 0.5) * 0.6;
                this.alpha = Math.random() * 0.4 + 0.15;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.fillStyle = `rgba(34,211,238,${this.alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            particles = [];
            for (let i = 0; i < 90; i++) particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 110) {
                        ctx.strokeStyle = `rgba(34,211,238,${(1 - dist / 110) * 0.12})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        init();
        animate();
    }

    // ── Animated Counters ─────────────────────────────────────────────────────
    const metricNumbers = document.querySelectorAll('[data-count]');
    if (metricNumbers.length) {
        const runCounter = (number) => {
            const target = Number(number.dataset.count || 0);
            let current = 0;
            const steps = Math.max(target, 1) * 16;
            const increment = target / steps;
            const tick = () => {
                current += increment;
                if (current >= target) { number.textContent = target; return; }
                number.textContent = Math.ceil(current);
                requestAnimationFrame(tick);
            };
            tick();
        };
        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(e => { if (e.isIntersecting) { runCounter(e.target); obs.unobserve(e.target); } });
        }, { threshold: 0.8 });
        metricNumbers.forEach(n => counterObserver.observe(n));
    }

    // ── Matrix Rain ───────────────────────────────────────────────────────────
    const matrixCanvas = document.getElementById('matrix-canvas');
    if (matrixCanvas) {
        const mctx = matrixCanvas.getContext('2d');
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
        const fontSize = 14;
        let drops = [];

        function resizeMatrix() {
            matrixCanvas.width = matrixCanvas.parentElement.offsetWidth;
            matrixCanvas.height = matrixCanvas.parentElement.offsetHeight;
            drops = Array.from({ length: Math.ceil(matrixCanvas.width / fontSize) }, () => 1);
        }
        window.addEventListener('resize', resizeMatrix);
        resizeMatrix();

        function drawMatrix() {
            mctx.fillStyle = 'rgba(6,21,32,0.05)';
            mctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            mctx.fillStyle = 'rgba(34,211,238,0.55)';
            mctx.font = fontSize + 'px "Courier New"';
            drops.forEach((d, i) => {
                mctx.fillText(letters[Math.floor(Math.random() * letters.length)], i * fontSize, d * fontSize);
                if (d * fontSize > matrixCanvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            });
        }
        setInterval(drawMatrix, 40);
    }

    // ── Typing Effect ─────────────────────────────────────────────────────────
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const phrases = [
            'En recherche de stage en Cybersécurité',
            'Apprenant passionné en Intelligence Artificielle',
            'Développeur web en quête d\'expérience',
            'Futur Ingénieur Sécurité & IA'
        ];
        let pIdx = 0, cIdx = 0, isDeleting = false, speed = 100;

        function type() {
            const phrase = phrases[pIdx];
            typingText.textContent = phrase.substring(0, isDeleting ? cIdx - 1 : cIdx + 1);
            isDeleting ? cIdx-- : cIdx++;
            speed = isDeleting ? 45 : 100;
            if (!isDeleting && cIdx === phrase.length) { isDeleting = true; speed = 2200; }
            else if (isDeleting && cIdx === 0) { isDeleting = false; pIdx = (pIdx + 1) % phrases.length; speed = 500; }
            setTimeout(type, speed);
        }
        type();
    }

    // ── Smooth Nav ────────────────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navH = document.querySelector('.navbar')?.offsetHeight || 0;
                window.scrollTo({ top: Math.max(target.offsetTop - navH, 0), behavior: 'smooth' });
            }
        });
    });

    // ── GSAP Scroll Animations ────────────────────────────────────────────────
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.project-card').forEach((card, i) => {
            gsap.from(card, {
                y: 50, opacity: 0, duration: 0.8, delay: i * 0.1,
                scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' }
            });
        });
        gsap.utils.toArray('.skill-category').forEach((card, i) => {
            gsap.from(card, {
                y: 30, opacity: 0, duration: 0.7, delay: i * 0.1,
                scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' }
            });
        });
        gsap.utils.toArray('.about-image, .skills-visuals').forEach((item) => {
            gsap.from(item, {
                y: 36, opacity: 0, duration: 0.9, ease: 'power3.out',
                scrollTrigger: { trigger: item, start: 'top 84%', toggleActions: 'play none none reverse' }
            });
        });
    }

    // ── Magnetic CTA ──────────────────────────────────────────────────────────
    document.querySelectorAll('.cta-button').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r = btn.getBoundingClientRect();
            btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
    });

    // ── Hover Cards ───────────────────────────────────────────────────────────
    document.querySelectorAll('.project-card, .metric-card').forEach(el => {
        el.addEventListener('mouseenter', () => { el.style.transform = 'translateY(-8px)'; });
        el.addEventListener('mouseleave', () => { el.style.transform = 'translateY(0)'; });
    });

    // ── Make sections visible ─────────────────────────────────────────────────
    document.querySelectorAll('section').forEach(s => {
        s.style.display = 'block';
        s.style.visibility = 'visible';
        s.style.opacity = '1';
    });

    setTimeout(() => {
        document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2').forEach(el => el.classList.add('visible'));
    }, 100);
});

window.addEventListener('load', () => document.body.classList.add('loaded'));
