(function () {
  'use strict';

  /* ── NAV SCROLL ── */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', function () {
    navbar.style.borderBottomColor =
      window.scrollY > 40 ? 'rgba(0,212,255,0.25)' : 'rgba(0,212,255,0.18)';
  }, { passive: true });

  /* ── HAMBURGER ── */
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 16;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  /* ── FADE IN OBSERVER ── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade').forEach(el => observer.observe(el));

  /* ── CONTACT FORM ── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      const name  = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const company = document.getElementById('company').value.trim();

      if (!name || !email || !company) {
        btn.textContent = 'Fill required fields ✗';
        btn.style.background = '#ef4444';
        setTimeout(() => { btn.textContent = 'Send Message →'; btn.style.background = ''; }, 2000);
        return;
      }

      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#22c55e';
      btn.style.color = '#000';
      console.log('Contact form submitted', { name, email, company });
      setTimeout(() => { form.reset(); btn.textContent = 'Send Message →'; btn.style.background = ''; btn.style.color = ''; }, 3000);
    });
  }

  /* ── TYPING EFFECT on terminal (optional) ── */
  const termLines = document.querySelectorAll('.tl');
  termLines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transition = 'opacity 0.2s';
    setTimeout(() => { line.style.opacity = '1'; }, 300 + i * 120);
  });

  console.log('%cAditya Security Labs — System Online', 'color:#00d4ff;font-family:monospace;font-size:14px;');
  console.log('%c4 NIST CVEs · BSI/CERT-Bund · Google Fuchsia · EU Gov. Bounty', 'color:#f5a623;font-family:monospace;font-size:11px;');

})();
