/* ═══════════════════════════════════════
   ADITYA SECURITY LABS — APP.JS
   ═══════════════════════════════════════ */

(function () {
    'use strict';

    /* ─── NAV: scroll glass effect ─── */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    /* ─── HAMBURGER ─── */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const spans = hamburger.querySelectorAll('span');
        if (navLinks.classList.contains('open')) {
            spans[0].style.transform = 'translateY(7px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }));

    /* ─── HERO PULSE CANVAS ─── */
    const pulseCanvas = document.getElementById('pulse-canvas');
    const pCtx = pulseCanvas.getContext('2d');

    function resizePulse() {
        pulseCanvas.width = window.innerWidth;
        pulseCanvas.height = window.innerHeight;
    }
    resizePulse();
    window.addEventListener('resize', resizePulse, { passive: true });

    // Particle grid
    const particles = [];
    const PARTICLE_COUNT = 80;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.5 + 0.4,
            a: Math.random(),
        });
    }

    function drawPulse() {
        pCtx.clearRect(0, 0, pulseCanvas.width, pulseCanvas.height);

        // Update & draw particles
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = pulseCanvas.width;
            if (p.x > pulseCanvas.width) p.x = 0;
            if (p.y < 0) p.y = pulseCanvas.height;
            if (p.y > pulseCanvas.height) p.y = 0;

            pCtx.beginPath();
            pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            pCtx.fillStyle = `rgba(0,170,255,${p.a * 0.6})`;
            pCtx.fill();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    pCtx.beginPath();
                    pCtx.moveTo(particles[i].x, particles[i].y);
                    pCtx.lineTo(particles[j].x, particles[j].y);
                    pCtx.strokeStyle = `rgba(0,170,255,${(1 - dist / 130) * 0.12})`;
                    pCtx.lineWidth = 0.5;
                    pCtx.stroke();
                }
            }
        }

        requestAnimationFrame(drawPulse);
    }
    drawPulse();

    /* ─── COUNTER ANIMATION ─── */
    function animateCounter(el, target, duration) {
        const start = performance.now();
        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(ease * target);
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    let countersStarted = false;
    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;
        document.querySelectorAll('.stat-num[data-target]').forEach(el => {
            animateCounter(el, parseInt(el.dataset.target), 1800);
        });
    }

    /* ─── TERMINAL TYPEWRITER ─── */
    const termCode = document.getElementById('terminal-code');
    const poc = [
        '// CVE-2025-68621 — PoC Skeleton',
        "const nuclei = require('@projectdiscovery/nuclei');",
        '',
        '// Craft symlink traversal payload',
        "const payload = { path: '../../../etc/passwd' };",
        "const symlink  = fs.symlinkSync('/etc/shadow', payload.path);",
        '',
        '// Execute against sandboxed FS module',
        'nuclei.executeTemplate(payload).then(res => {',
        "  if (res.data.includes('root:')) {",
        "    console.log('[!] CVE CONFIRMED — Arbitrary read achieved');",
        '  }',
        '});',
    ];

    let termLine = 0;
    let termChar = 0;
    let termStarted = false;

    function typeTerminal() {
        if (termLine >= poc.length) return;
        if (termChar <= poc[termLine].length) {
            const lines = poc.slice(0, termLine).join('\n') + '\n' + poc[termLine].slice(0, termChar);
            termCode.textContent = lines;
            termChar++;
            const delay = poc[termLine][termChar - 1] === ' ' ? 40 : Math.random() * 50 + 20;
            setTimeout(typeTerminal, delay);
        } else {
            termLine++;
            termChar = 0;
            setTimeout(typeTerminal, 180);
        }
    }

    /* ─── FOUNDER RADIAL CANVAS ─── */
    const founderCanvas = document.getElementById('founder-canvas');
    if (founderCanvas) {
        const fCtx = founderCanvas.getContext('2d');
        founderCanvas.width = 240;
        founderCanvas.height = 240;
        let fAngle = 0;

        function drawFounder() {
            fCtx.clearRect(0, 0, 240, 240);
            const cx = 120, cy = 120;

            // Rotating arc rings
            for (let r = 0; r < 3; r++) {
                const radius = 80 + r * 20;
                const offset = fAngle * (r % 2 === 0 ? 1 : -1);
                fCtx.beginPath();
                fCtx.arc(cx, cy, radius, offset, offset + Math.PI * 1.2);
                fCtx.strokeStyle = `rgba(0,170,255,${0.15 - r * 0.04})`;
                fCtx.lineWidth = 1;
                fCtx.stroke();
            }

            // Dot on outer orbit
            const dx = cx + 108 * Math.cos(fAngle);
            const dy = cy + 108 * Math.sin(fAngle);
            fCtx.beginPath();
            fCtx.arc(dx, dy, 3, 0, Math.PI * 2);
            fCtx.fillStyle = 'rgba(0,170,255,0.7)';
            fCtx.fill();

            fAngle += 0.008;
            requestAnimationFrame(drawFounder);
        }
        drawFounder();
    }

    /* ─── INTERSECTION OBSERVER: reveal + lazy-start ─── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    // Counter trigger
    const heroStats = document.querySelector('.hero-stats');
    const statObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { startCounters(); statObserver.disconnect(); }
    }, { threshold: 0.5 });
    if (heroStats) statObserver.observe(heroStats);

    // Terminal trigger
    const termCard = document.getElementById('cve-featured-card');
    const termObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !termStarted) {
            termStarted = true;
            setTimeout(typeTerminal, 600);
            termObserver.disconnect();
        }
    }, { threshold: 0.25 });
    if (termCard) termObserver.observe(termCard);

    // Add reveal class to elements
    const revealTargets = document.querySelectorAll(
        '.gap-card, .insight-item, .research-card, .offering-card, .bio-point, .founder-visual, .founder-bio'
    );
    revealTargets.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${(i % 4) * 0.08}s`;
        revealObserver.observe(el);
    });

    /* ─── CONTACT FORM → TELEGRAM BOT ─── */
    // Step 1: Message @BotFather on Telegram → /newbot → copy the token below
    // Step 2: Message @userinfobot on Telegram → copy your Chat ID below
    const TG_TOKEN = '8290253432:AAF3SeqU6Wy8m2Ph7E75xb03KbMCBsJXEIQ';
    const TG_CHAT_ID = '1440570080';

    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('cf-name').value.trim();
        const company = document.getElementById('cf-company').value.trim();
        const email = document.getElementById('cf-email').value.trim();
        const scope = document.getElementById('cf-scope').value.trim();

        if (!name || !company || !email) {
            submitBtn.textContent = 'Please fill Name, Company & Email';
            submitBtn.style.background = '#ff4444';
            setTimeout(() => {
                submitBtn.textContent = 'Request Scoping Call →';
                submitBtn.style.background = '';
            }, 2800);
            return;
        }

        // Dev mode guard
        if (TG_TOKEN === 'PASTE_BOT_TOKEN_HERE') {
            submitBtn.textContent = '✓ [Dev] Form OK — add bot token to go live';
            submitBtn.style.background = '#ffaa00';
            setTimeout(() => {
                submitBtn.textContent = 'Request Scoping Call →';
                submitBtn.style.background = '';
            }, 4000);
            return;
        }

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Format a clean Telegram message
        const text = [
            '🛡 *New ASL Scoping Request*',
            '',
            `👤 *Name:* ${name}`,
            `🏢 *Company:* ${company}`,
            `📧 *Email:* ${email}`,
            `📝 *Scope:*`,
            scope || '_Not provided_',
        ].join('\n');

        try {
            const res = await fetch(
                `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: TG_CHAT_ID,
                        text: text,
                        parse_mode: 'Markdown',
                    }),
                }
            );

            const data = await res.json();

            if (data.ok) {
                submitBtn.textContent = '✓ Request Received — We\'ll respond within 24h';
                submitBtn.style.background = '#00dd88';
                contactForm.reset();
            } else {
                throw new Error(data.description);
            }

        } catch (err) {
            console.error('Telegram send error:', err);
            submitBtn.textContent = '✗ Send failed — email us directly';
            submitBtn.style.background = '#ff4444';
        }

        setTimeout(() => {
            submitBtn.textContent = 'Request Scoping Call →';
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 5000);
    });

    /* ─── ACTIVE NAV HIGHLIGHT ─── */
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navAnchors.forEach(a => {
                    a.style.color = '';
                    if (a.getAttribute('href') === `#${entry.target.id}`) {
                        a.style.color = '#00aaff';
                    }
                });
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => sectionObserver.observe(s));

})();
