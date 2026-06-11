/* ============================================================
   NAVEEN RAGIPINDI — PORTFOLIO
   script.js
   ============================================================ */

/* ── NAV: active link highlight + hamburger ── */
(function () {
  const navbar   = document.getElementById('navbar');
  const backTop  = document.getElementById('backTop');
  const toggle   = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id], div[id]');

  /* scroll effects */
  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    /* back to top visibility */
    backTop.classList.toggle('show', y > 400);

    /* active nav link */
    let current = '';
    sections.forEach(sec => {
      if (y >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  /* hamburger */
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  /* close mobile menu on link click */
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
})();

/* ── REVEAL ON SCROLL ── */
(function () {
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        /* stagger siblings */
        const siblings = Array.from(e.target.parentElement.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(e.target);
        e.target.style.transitionDelay = (idx * 80) + 'ms';
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => io.observe(el));
})();

/* ── COUNTER ANIMATION ── */
(function () {
  const nums = document.querySelectorAll('.cs-num[data-target]');
  let ran = false;

  const strip = document.querySelector('.counter-strip');
  if (!strip) return;

  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !ran) {
      ran = true;
      nums.forEach(el => {
        const target = +el.dataset.target;
        const duration = 1200;
        const start = performance.now();
        function step(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3); /* ease-out-cubic */
          el.textContent = Math.round(ease * target);
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }
  }, { threshold: 0.4 });

  io.observe(strip);
})();

/* ── CONTACT FORM (mailto fallback) ── */
function handleFormSubmit(e) {
  e.preventDefault();

  const name    = document.getElementById('fname').value.trim();
  const company = document.getElementById('fcompany').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const service = document.getElementById('fservice').value;
  const msg     = document.getElementById('fmsg').value.trim();

  /* Build mailto */
  const subject = encodeURIComponent('NetSuite Project Brief — ' + service);
  const body = encodeURIComponent(
    'Name: ' + name + '\n' +
    (company ? 'Company: ' + company + '\n' : '') +
    'Email: ' + email + '\n' +
    'Service: ' + service + '\n\n' +
    'Project Description:\n' + msg
  );

  window.location.href =
    'mailto:naveen.netsuite01@gmail.com?subject=' + subject + '&body=' + body;

  /* Show success state */
  document.getElementById('contactForm').classList.add('hidden');
  document.getElementById('formSuccess').classList.add('show');
}

/* ── SMOOTH ANCHOR SCROLL (offset for fixed nav) ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const navH = document.getElementById('navbar').offsetHeight;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
