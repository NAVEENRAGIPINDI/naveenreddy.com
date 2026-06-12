/* ============================================================
   NAVEEN RAGIPINDI — PORTFOLIO (DYNAMIC DATA)
   script.js — Data-driven & Advanced Features
   ============================================================ */

let portfolioData = {};

/* ── LOAD DATA FROM JSON ── */
async function loadPortfolioData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    portfolioData = await response.json();
    console.log('✅ Portfolio data loaded successfully');
    
    /* Initialize all components */
    populateNavigation();
    populateHero();
    populateAbout();
    populateExperience();
    populateIntegrations();
    populateCertifications();
    
  } catch (error) {
    console.error('❌ Failed to load portfolio data:', error);
  }
}

/* ── POPULATE NAVIGATION ── */
function populateNavigation() {
  if (!portfolioData.navigation) return;
  
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;
  
  navLinks.innerHTML = portfolioData.navigation
    .map(link => `<li><a href="${link.href}">${link.label}</a></li>`)
    .join('');
  
  /* Re-attach scroll event listeners */
  attachScrollEffects();
}

/* ── POPULATE HERO SECTION ── */
function populateHero() {
  if (!portfolioData.hero) return;
  
  const hero = portfolioData.hero;
  
  const statusEl = document.querySelector('.hero-available');
  if (statusEl) statusEl.textContent = hero.status;
  
  const nameEl = document.querySelector('.hero-name');
  if (nameEl) nameEl.textContent = hero.name;
  
  const roleEl = document.querySelector('.hero-role');
  if (roleEl) roleEl.textContent = hero.role;
  
  const descEl = document.querySelector('.hero-desc');
  if (descEl) descEl.innerHTML = hero.description;
  
  /* Populate stats */
  const statsContainer = document.querySelector('.hero-stats');
  if (statsContainer && hero.stats) {
    statsContainer.innerHTML = hero.stats
      .map(stat => `
        <div class="hero-stat">
          <span class="stat-n">${stat.number}</span>
          <span class="stat-l">${stat.label}</span>
        </div>
      `)
      .join('');
  }
}

/* ── POPULATE ABOUT SECTION ── */
function populateAbout() {
  if (!portfolioData.about) return;
  
  const about = portfolioData.about;
  const aboutText = document.querySelector('.about-text');
  
  if (aboutText) {
    aboutText.innerHTML = `
      <p>${about.bio}</p>
      <p>${about.bio2}</p>
      <p>${about.bio3}</p>
    `;
  }
  
  /* Populate about cards */
  const cardsContainer = document.querySelector('.about-cards');
  if (cardsContainer && about.cards) {
    cardsContainer.innerHTML = about.cards
      .map(card => `
        <div class="acard reveal">
          <div class="acard-icon">${card.icon}</div>
          <div>
            <h4>${card.title}</h4>
            <p>${card.description}</p>
          </div>
        </div>
      `)
      .join('');
  }
}

/* ── POPULATE EXPERIENCE TIMELINE ── */
function populateExperience() {
  if (!portfolioData.experience) return;
  
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;
  
  timeline.innerHTML = portfolioData.experience
    .map((exp, idx) => `
      <div class="tl-item reveal">
        <div class="tl-line"></div>
        <div class="tl-dot ${exp.current ? 'tl-dot-active' : ''}"></div>
        <div class="tl-card">
          <div class="tl-head">
            <div>
              <div class="tl-role">${exp.role}</div>
              <div class="tl-company">${exp.company}</div>
            </div>
            <div class="tl-badges">
              ${exp.current ? '<span class="badge-current">● Current</span>' : ''}
              <span class="badge-period">${exp.period}</span>
            </div>
          </div>
          <ul class="tl-list">
            ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
          </ul>
        </div>
      </div>
    `)
    .join('');
}

/* ── POPULATE INTEGRATIONS ── */
function populateIntegrations() {
  if (!portfolioData.integrations) return;
  
  const intGrid = document.querySelector('.int-grid');
  if (!intGrid) return;
  
  intGrid.innerHTML = portfolioData.integrations
    .map(integration => `
      <div class="int-card reveal">
        <div class="int-dot" style="background:${integration.color};"></div>
        <h4>${integration.name}</h4>
        <p>${integration.description}</p>
      </div>
    `)
    .join('');
}

/* ── POPULATE CERTIFICATIONS ── */
function populateCertifications() {
  if (!portfolioData.certifications) return;
  
  const certGrid = document.querySelector('.cert-grid');
  if (!certGrid) return;
  
  certGrid.innerHTML = portfolioData.certifications
    .map(cert => `
      <div class="cert-card reveal">
        <div class="cert-icon">${cert.icon}</div>
        <div class="cert-info">
          <div class="cert-name">${cert.name}</div>
          <div class="cert-meta">
            <span class="cert-issuer">${cert.issuer}</span> · Issued ${cert.issued}
          </div>
          ${cert.id ? `<div class="cert-id">ID: ${cert.id}</div>` : ''}
        </div>
      </div>
    `)
    .join('');
}

/* ── NAV: active link highlight + hamburger + scroll effect ── */
function attachScrollEffects() {
  const navbar   = document.getElementById('navbar');
  const backTop  = document.getElementById('backTop');
  const toggle   = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id], div[id]');

  /* scroll effects */
  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    /* navbar scroll effect */
    navbar.classList.toggle('scrolled', y > 50);

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

  /* back to top click */
  backTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

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

/* ── POPULATE SKILLS FROM DATABASE ── */
function populateSkillsContent() {
  const skillsContainer = document.querySelector('.skills-cols');
  if (!skillsContainer || !portfolioData.skills) return;

  let html = '';
  
  Object.values(portfolioData.skills).forEach(category => {
    html += `
      <div class="skill-col reveal" style="grid-column: 1 / -1;">
        <h3 class="skill-col-title" style="font-size: 16px; margin-bottom: 24px;">
          ${category.icon || '🎯'} ${category.title}
        </h3>
        <p style="font-size: 13px; color: var(--muted); margin-bottom: 16px;">${category.description}</p>
        <div class="skill-list">
    `;
    
    category.skills.forEach(skill => {
      const hasDetails = skill.details && skill.details.length > 0;
      const levelClass = skill.level === 'Expert' ? 'level-high' : 
                         skill.level === 'Proficient' ? 'level-mid' : 'level-low';
      
      html += `
        <div class="skill-row" ${hasDetails ? `onclick="showSkillDetails('${skill.name}', ${JSON.stringify(skill.details).replace(/"/g, '&quot;')})` : ''} 
             style="${hasDetails ? 'cursor: pointer; transition: all 0.2s ease;' : ''}">
          <span>${skill.icon} ${skill.name}</span>
          <span class="skill-level ${levelClass}">${skill.level}</span>
        </div>
        ${skill.description ? `<div style="font-size: 12px; color: var(--muted); padding: 6px 0 12px 0; border-bottom: 1px solid rgba(74,108,247,0.1);">${skill.description}</div>` : ''}
      `;
    });
    
    html += `
        </div>
      </div>
    `;
  });
  
  skillsContainer.innerHTML = html;
  initializeSkillsInteractivity();
}

/* ── SKILLS MODAL/EXPANSION FUNCTIONALITY ── */
function initializeSkillsInteractivity() {
  /* Create skill expandable cards */
  const skillCards = document.querySelectorAll('.skill-row');
  
  skillCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      this.classList.toggle('expanded');
      this.style.paddingBottom = this.classList.contains('expanded') ? '12px' : '9px';
    });
    
    card.addEventListener('mouseenter', function() {
      this.style.backgroundColor = 'rgba(74, 108, 247, 0.08)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.backgroundColor = 'transparent';
    });
  });
}

/* ── SKILL DETAILS TOOLTIP ── */
function showSkillDetails(skillName, details) {
  if (!details || details.length === 0) return;
  
  const tooltip = document.createElement('div');
  tooltip.className = 'skill-tooltip';
  tooltip.style.cssText = `
    position: fixed;
    background: linear-gradient(135deg, rgba(74,108,247,0.95), rgba(109,86,245,0.95));
    border: 1px solid rgba(74,108,247,0.4);
    border-radius: 12px;
    padding: 20px;
    max-width: 400px;
    color: #eef0f8;
    font-size: 13px;
    line-height: 1.7;
    z-index: 1000;
    backdrop-filter: blur(10px);
    box-shadow: 0 12px 40px rgba(74,108,247,0.25);
    animation: slideUp 0.3s ease;
  `;
  
  let content = `<strong style="font-size: 14px; color: #fff;">${skillName}</strong><br>`;
  details.forEach((detail, idx) => {
    content += `<div style="margin-top: 8px; padding-left: 8px; border-left: 2px solid rgba(255,255,255,0.3);">
      ${detail}
    </div>`;
  });
  
  tooltip.innerHTML = content;
  document.body.appendChild(tooltip);
  
  /* Close on click outside */
  setTimeout(() => {
    document.addEventListener('click', function closeTooltip() {
      tooltip.remove();
      document.removeEventListener('click', closeTooltip);
    });
  }, 100);
}

/* ── INITIALIZE ON DOM READY ── */
document.addEventListener('DOMContentLoaded', async () => {
  /* Load data first */
  await loadPortfolioData();
  
  /* Populate skills when section comes into view */
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          populateSkillsContent();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(skillsSection);
  }
});

/* ── CONTACT FORM (mailto fallback) ── */
function handleFormSubmit(e) {
  e.preventDefault();

  const name    = document.getElementById('fname').value.trim();
  const company = document.getElementById('fcompany').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const service = document.getElementById('fservice').value;
  const msg     = document.getElementById('fmsg').value.trim();

  /* Validation */
  if (!name || !email || !service || !msg) {
    alert('Please fill all required fields');
    return;
  }

  /* Get email from data */
  const contactEmail = portfolioData.contact?.email || 'naveen.netsuite01@gmail.com';

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
    'mailto:' + contactEmail + '?subject=' + subject + '&body=' + body;

  /* Show success state */
  setTimeout(() => {
    document.getElementById('contactForm').classList.add('hidden');
    document.getElementById('formSuccess').classList.add('show');
  }, 100);
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

/* ── COPY TO CLIPBOARD FUNCTIONALITY ── */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const message = document.createElement('div');
    message.textContent = '✓ Copied!';
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(34, 197, 94, 0.9);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      z-index: 2000;
      animation: fadeInOut 2s ease;
    `;
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 2000);
  });
}

/* ── KEYBOARD SHORTCUTS ── */
document.addEventListener('keydown', (e) => {
  /* Cmd/Ctrl + K to focus contact form */
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('fname').focus();
    }
  }
  
  /* Escape to close tooltips */
  if (e.key === 'Escape') {
    document.querySelectorAll('.skill-tooltip').forEach(t => t.remove());
  }
});

/* ── ADD ANIMATION STYLE ── */
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeInOut {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }

  .skill-tooltip {
    animation: slideUp 0.3s ease;
  }

  .skill-row.expanded {
    background: rgba(74, 108, 247, 0.12);
    padding: 12px 0;
  }
`;
document.head.appendChild(style);

console.log('%c✨ Naveen Ragipindi Portfolio', 'font-size: 16px; font-weight: bold; color: #4a6cf7;');
console.log('%cNetSuite Functional Consultant & Administrator', 'font-size: 12px; color: #17d9a6;');
console.log('%cPress Cmd/Ctrl + K to focus contact form', 'font-size: 11px; color: #7e849a;');
