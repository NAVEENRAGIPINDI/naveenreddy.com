/* ============================================================
   NAVEEN RAGIPINDI — PORTFOLIO
   script.js  — Violet & Electric Blue Theme
   ============================================================ */

/* ── INJECT SCROLL PROGRESS BAR ── */
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress-bar';
document.body.prepend(progressBar);

/* ── NAV: scroll state + active link + hamburger ── */
(function () {
  const navbar     = document.getElementById('navbar');
  const backTop    = document.getElementById('backTop');
  const toggle     = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks   = document.querySelectorAll('.nav-links a');
  const sections   = document.querySelectorAll('section[id], div[id]');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;

    /* ── Scroll progress bar ── */
    const pct = docH > 0 ? (y / docH) * 100 : 0;
    progressBar.style.width = pct + '%';

    /* ── Back to top ── */
    backTop.classList.toggle('show', y > 400);

    /* ── Neon glass border on scroll ── */
    navbar.classList.toggle('nav-scrolled', y > 60);

    /* ── Active nav link (pill highlight) ── */
    let current = '';
    sections.forEach(sec => {
      if (y >= sec.offsetTop - 110) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });

  }, { passive: true });

  /* ── Hamburger ── */
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

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
    entries.forEach((e) => {
      if (e.isIntersecting) {
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
  const nums  = document.querySelectorAll('.cs-num[data-target]');
  let ran = false;
  const strip = document.querySelector('.counter-strip');
  if (!strip) return;

  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !ran) {
      ran = true;
      nums.forEach(el => {
        const target = +el.dataset.target;
        const duration = 1400;
        const start = performance.now();
        function step(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
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


/* ============================================================
   ADVANCED AI CHAT ASSISTANT — Naveen Ragipindi Portfolio
   ▸ Smart proactive popup on page load (3s delay)
   ▸ Section-aware contextual suggestions
   ▸ Exit-intent detection
   ▸ Scroll-depth triggers
   ▸ Visitor behaviour memory (sessionStorage)
   ▸ Typing indicator, markdown rendering, quick chips
   ▸ Powered by Claude claude-sonnet-4-6
   ============================================================ */
(function () {
  'use strict';

  /* ──────────────────────────────────────────────
     SYSTEM PROMPT — Full Naveen knowledge base
  ────────────────────────────────────────────── */
  const SYSTEM = `You are Naveen Ragipindi's personal AI assistant embedded on his professional portfolio website. You speak warmly and confidently on his behalf to help potential clients, recruiters, and collaborators.

ABOUT NAVEEN:
• Full name: Naveen Ragipindi
• Role: NetSuite Functional Consultant & Administrator
• Experience: 3+ years deep, hands-on NetSuite expertise
• Location: Hyderabad, India — available remotely worldwide (IST timezone)
• Email: naveen.netsuite01@gmail.com
• Phone / WhatsApp: +91 79816 41388
• LinkedIn: linkedin.com/in/ragipindi-naveen-767b17271
• Status: Open to new opportunities and projects — responds within 24 hours

CERTIFICATIONS (all Oracle-verified, active 2025-2026):
1. Oracle NetSuite Certified Financial Associate — Oct 2025 | ID: 102877621N16290GC10
2. Oracle NetSuite Certified AI Foundations Associate — Oct 2025 | ID: 102877621N16765GC10
3. Oracle NetSuite Certified BI & Reporting Associate — Oct 2025 | ID: 102877621N16724GC10
4. Oracle Cloud Infrastructure AI Foundations Associate — Mar 2026

WORK EXPERIENCE:
1. Executive ERP @ Bambino Agro Industries Limited (Jun 2025 – Present — CURRENT)
   • Day-to-day NetSuite ERP configuration & maintenance
   • User setup, roles, permissions across the organisation
   • Modules: Finance, Procurement, Inventory, Fixed Assets, Sales & Distribution
   • Configured Chart of Accounts, Tax Rules, Approval Workflows, Custom Forms, Saved Searches
   • Data migration via CSV (Customers, Vendors, Items, Opening Balances)
   • GST, TDS, Tax Code compliance configuration & validation
   • NetSuite–Concur integration for automated expense sync
   • NetSuite–Salesforce CRM integration
   • Month-End & Year-End Closing: GL, Trial Balance, Intercompany reconciliations

2. NetSuite Functional Consultant @ ITrend Solutions (Jun 2024 – Dec 2024)
   • NetSuite customisations for enhancements and maintenance
   • Custom fields, page layouts, record types, reports, dashboards
   • Users, roles, security profiles, workflow rules management
   • Led design review sessions with IT & business leads
   • NetSuite–Shopify integration (catalog, inventory, orders)
   • NetSuite–HubSpot integration (lead-to-customer lifecycle)

3. NetSuite Functional Consultant @ Amagi Media Labs Pvt. Ltd (Feb 2023 – Jun 2024)
   • Functional solutions for system issues; ERP implementation reports
   • Business user training and ongoing post-go-live support
   • Gap analysis pre/post NetSuite implementation
   • Custom Records, Role & Permissions, Workflows, Forms, Segments, Fields, Saved Searches
   • NetSuite–Marketo integration (marketing campaigns, lead scoring sync)
   • Vendor, Customer, Bank, AP/AR, Balance Sheet, Intercompany Reconciliation
   • Intercompany Reconciliation across subsidiaries in NetSuite OneWorld

NETSUITE PLATFORM EXPERTISE:
• SuiteBuilder: Custom Records, Fields, Forms, Lists, Segments, SuiteBundler, Role Management, Access Control, CSV Import/Export
• SuiteFlow & Automation: SuiteFlow, Workflow Manager, Approval Workflows, Email Automation, User Event Scripts, Client Scripts, Scheduled Scripts, RESTlets, SuiteScript 2.x (Basic)
• Finance & Compliance: P2P, O2C, AP/AR Reconciliation, Bank Reconciliation, Intercompany Recon, GL Reconciliation, GST/TDS (India), Avalara Tax, Month/Year-End Close
• Reporting & Analytics: Saved Searches, SuiteAnalytics, KPI Scorecards, Dashboard Design, Ageing Reports, Trial Balance, GL Reports, Advanced PDF/HTML Templates

SKILL LEVELS:
Expert: SuiteBuilder, SuiteFlow/Workflow Manager, Saved Searches & Reports, AP/AR Reconciliation, P2P & O2C, Role & Permissions Management, GST/TDS Config (India), Dashboard & KPI Design
Proficient: Data Migration (CSV), Advanced PDF/HTML Templates, Avalara Tax, Salesforce Integration, Shopify Integration, HubSpot Integration, Marketo Integration, Concur Integration, Microsoft Excel
Basic: SuiteScript 2.x, JavaScript, SQL/SuiteQL, HTML/XML, REST/SOAP Web Services

INTEGRATIONS DELIVERED:
• Salesforce CRM → NetSuite: customer, quote, sales order sync
• Shopify eCommerce → NetSuite: product catalog, inventory, order data
• HubSpot CRM → NetSuite: lead-to-customer lifecycle management
• Marketo → NetSuite: marketing campaign data and lead scoring
• Concur Expense → NetSuite Finance: automated expense report sync
• Avalara Tax → NetSuite: automated tax calculation and compliance config

SERVICES OFFERED:
• NetSuite Support & Administration (ongoing)
• End-to-end NetSuite Implementation
• SuiteFlow / Workflow Automation
• ERP Integrations (Salesforce, Shopify, HubSpot, Marketo, Concur, Avalara)
• Finance & Reconciliation Support (AP/AR, Bank, GL, Intercompany)
• Analytics & BI Reporting (SuiteAnalytics, Saved Searches, Dashboards)
• Data Migration (CSV imports, opening balances)
• Tax Configuration (GST/TDS India, Avalara)

CONSULTING APPROACH:
• Finance-first ERP mindset — precision and accuracy are non-negotiable
• Honest timelines, clear scope, no overpromising
• Post-go-live handover that genuinely empowers the client's team
• Every engagement built to be maintainable long after go-live
• Responds to every inquiry within 24 hours

YOUR BEHAVIOUR RULES:
1. Be warm, professional, and confident — you speak ON BEHALF of Naveen
2. Answer ANY question — NetSuite technical questions, career questions, integration architecture, pricing expectations, timelines, ERP best practices, anything
3. For technical NetSuite questions, answer knowledgeably — this showcases Naveen's expertise
4. For pricing/rates, say Naveen gives custom project-based quotes; direct them to reach out
5. For project inquiries, ask about their needs then encourage contact via email or WhatsApp
6. Keep responses concise — short paragraphs or bullet lists; no walls of text
7. Never refuse to help — find an angle to assist with every question
8. Use markdown: **bold** for key terms, bullet lists for multiple items
9. When suggesting contact, always show: naveen.netsuite01@gmail.com | +91 79816 41388`;

  /* ──────────────────────────────────────────────
     SMART SUGGESTION ENGINE
     Context-aware messages based on what section
     the visitor is currently viewing
  ────────────────────────────────────────────── */
  const SECTION_SUGGESTIONS = {
    hero:         { msg: '👋 Welcome! I\'m Naveen\'s AI assistant. Want a quick overview of his NetSuite expertise?', chips: ['What can Naveen do?', 'Is Naveen available?', 'View his certs', 'Start a project'] },
    about:        { msg: '🧠 Exploring Naveen\'s background? I can answer detailed questions about his consulting approach.', chips: ['How does Naveen work?', 'What makes him different?', 'Remote availability?', 'Contact Naveen'] },
    netsuite:     { msg: '⚙️ Deep NetSuite expertise here. Got a specific module or challenge you\'re dealing with?', chips: ['SuiteFlow questions', 'Finance module help', 'Custom records?', 'SuiteBuilder depth'] },
    skills:       { msg: '📊 Checking his skill levels? Ask me anything about a specific skill or technology.', chips: ['SuiteScript capability?', 'Integration skills', 'Avalara Tax setup', 'GST/TDS India'] },
    experience:   { msg: '💼 Reviewing his experience? I can explain any role or project in more detail.', chips: ['Current role details', 'Shopify integration?', 'Marketo sync setup', 'OneWorld experience'] },
    integrations: { msg: '🔗 Integration projects are a key strength. Working on a similar challenge?', chips: ['Salesforce → NetSuite', 'Shopify integration', 'HubSpot sync', 'Get a proposal'] },
    certs:        { msg: '🏅 4 active Oracle certifications! Want details on any specific cert?', chips: ['Financial cert details', 'BI & Reporting cert', 'AI Foundations cert', 'Cert verification'] },
    contact:      { msg: '📬 Ready to connect? I can help you draft your project brief right now!', chips: ['Draft my project brief', 'What info does Naveen need?', 'Response time?', 'WhatsApp Naveen'] },
  };

  const POPUP_MESSAGES = [
    { delay: 3000,  trigger: 'welcome',    msg: '👋 Hi there! I\'m Naveen\'s AI assistant. I know everything about his NetSuite expertise and availability. What brings you here today?', chips: ['Looking to hire', 'Just exploring', 'NetSuite question', 'Check availability'] },
    { delay: 25000, trigger: 'engaged',    msg: '💡 You\'ve been exploring for a while — any questions about Naveen\'s skills or how he can help your project?', chips: ['Tell me about integrations', 'Finance module depth', 'Get a project quote', 'His certifications'] },
  ];

  /* ──────────────────────────────────────────────
     STATE
  ────────────────────────────────────────────── */
  let messages        = [];
  let isOpen          = false;
  let isTyping        = false;
  let hasPopupShown   = false;
  let currentSection  = 'hero';
  let popupTimers     = [];
  let unreadCount     = 0;

  const SESSION_KEY   = 'nr_chat_session';
  const session       = (() => {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || '{}'); }
    catch { return {}; }
  })();

  function saveSession(data) {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...session, ...data })); }
    catch {}
  }

  /* ──────────────────────────────────────────────
     INJECT STYLES
  ────────────────────────────────────────────── */
  const S = document.createElement('style');
  S.textContent = `
  /* ── BUBBLE ── */
  #nr-bubble {
    position:fixed; bottom:28px; right:28px; z-index:10000;
    width:58px; height:58px; border-radius:50%;
    background:linear-gradient(135deg,#7c3aed,#2563eb);
    border:none; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    font-size:24px; color:#fff;
    box-shadow:0 0 0 0 rgba(124,58,237,0.6);
    animation:nr-ring 3s ease-in-out infinite;
    transition:transform 0.2s ease, box-shadow 0.2s ease;
  }
  #nr-bubble:hover { transform:scale(1.1); animation:none; box-shadow:0 0 32px rgba(124,58,237,0.7); }
  @keyframes nr-ring {
    0%,100% { box-shadow:0 0 0 0 rgba(124,58,237,0.5),0 4px 20px rgba(0,0,0,0.5); }
    50%      { box-shadow:0 0 0 12px rgba(124,58,237,0),0 4px 20px rgba(0,0,0,0.5); }
  }
  #nr-unread {
    position:absolute; top:-2px; right:-2px;
    width:20px; height:20px; border-radius:50%;
    background:linear-gradient(135deg,#06b6d4,#7c3aed);
    border:2px solid #07050f;
    font-size:10px; font-weight:700; color:#fff;
    display:none; align-items:center; justify-content:center;
    animation:nr-badge-pop 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  #nr-unread.show { display:flex; }
  @keyframes nr-badge-pop { from { transform:scale(0); } to { transform:scale(1); } }

  /* ── PROACTIVE POPUP TOOLTIP ── */
  #nr-popup {
    position:fixed; bottom:100px; right:28px; z-index:9999;
    width:300px;
    background:#0d0a1e;
    border:1px solid rgba(124,58,237,0.4);
    border-radius:16px 16px 4px 16px;
    padding:16px 18px 14px;
    box-shadow:0 20px 60px rgba(0,0,0,0.7),0 0 0 1px rgba(124,58,237,0.15),0 0 30px rgba(124,58,237,0.1);
    opacity:0; pointer-events:none;
    transform:translateY(10px) scale(0.96);
    transition:opacity 0.3s ease,transform 0.3s ease;
  }
  #nr-popup.nr-show { opacity:1; pointer-events:all; transform:translateY(0) scale(1); }
  #nr-popup-close {
    position:absolute; top:10px; right:12px;
    width:22px; height:22px; border-radius:50%; border:none;
    background:rgba(124,58,237,0.15); color:#9b92c8;
    font-size:11px; cursor:pointer; display:flex; align-items:center; justify-content:center;
    transition:background 0.2s;
  }
  #nr-popup-close:hover { background:rgba(124,58,237,0.35); color:#f0eeff; }
  #nr-popup-avatar {
    width:32px; height:32px; border-radius:50%;
    background:linear-gradient(135deg,#7c3aed,#2563eb);
    display:flex; align-items:center; justify-content:center;
    font-size:11px; font-weight:700; color:#fff; flex-shrink:0;
    box-shadow:0 0 10px rgba(124,58,237,0.4); margin-bottom:10px;
  }
  #nr-popup-msg {
    font-size:13.5px; color:#d4cefc; line-height:1.6; margin-bottom:12px;
  }
  #nr-popup-chips { display:flex; flex-wrap:wrap; gap:6px; }
  .nr-popup-chip {
    font-size:11px; padding:5px 11px; border-radius:40px;
    background:rgba(124,58,237,0.12); border:1px solid rgba(124,58,237,0.3);
    color:#a78bfa; cursor:pointer; transition:all 0.18s;
  }
  .nr-popup-chip:hover { background:rgba(124,58,237,0.25); color:#f0eeff; border-color:#7c3aed; }
  #nr-popup-tail {
    position:absolute; bottom:-8px; right:24px;
    width:0; height:0;
    border-left:8px solid transparent;
    border-right:8px solid transparent;
    border-top:8px solid rgba(124,58,237,0.4);
  }

  /* ── CHAT WINDOW ── */
  #nr-win {
    position:fixed; bottom:100px; right:28px; z-index:9998;
    width:390px; height:580px;
    background:#0d0a1e;
    border:1px solid rgba(124,58,237,0.35);
    border-radius:20px;
    display:flex; flex-direction:column;
    box-shadow:0 24px 64px rgba(0,0,0,0.75),0 0 0 1px rgba(124,58,237,0.2),0 0 50px rgba(124,58,237,0.08);
    overflow:hidden;
    opacity:0; pointer-events:none;
    transform:translateY(20px) scale(0.96);
    transition:opacity 0.25s ease,transform 0.25s ease;
  }
  #nr-win.nr-open { opacity:1; pointer-events:all; transform:translateY(0) scale(1); }

  /* Header */
  #nr-header {
    padding:14px 16px;
    background:linear-gradient(135deg,rgba(124,58,237,0.22) 0%,rgba(37,99,235,0.16) 100%);
    border-bottom:1px solid rgba(124,58,237,0.22);
    display:flex; align-items:center; gap:11px; flex-shrink:0;
    position:relative;
  }
  #nr-header-glow {
    position:absolute; top:0; left:0; right:0; height:2px;
    background:linear-gradient(90deg,#7c3aed,#2563eb,#06b6d4);
  }
  #nr-h-avatar {
    width:40px; height:40px; border-radius:50%;
    background:linear-gradient(135deg,#7c3aed,#2563eb);
    display:flex; align-items:center; justify-content:center;
    font-size:13px; font-weight:700; color:#fff; flex-shrink:0;
    box-shadow:0 0 14px rgba(124,58,237,0.45);
    position:relative;
  }
  #nr-h-avatar::after {
    content:''; position:absolute; bottom:1px; right:1px;
    width:9px; height:9px; border-radius:50%;
    background:#22c55e; border:2px solid #0d0a1e;
    box-shadow:0 0 6px rgba(34,197,94,0.7);
  }
  #nr-h-info { flex:1; min-width:0; }
  #nr-h-name { font-size:14px; font-weight:600; color:#f0eeff; }
  #nr-h-status {
    font-size:11px; color:#67e8f9; margin-top:2px;
    display:flex; align-items:center; gap:5px;
  }
  #nr-h-status::before {
    content:''; width:6px; height:6px; border-radius:50%;
    background:#06b6d4; flex-shrink:0;
    animation:nr-pulse-dot 2s ease-in-out infinite;
    box-shadow:0 0 5px rgba(6,182,212,0.8);
  }
  @keyframes nr-pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.3} }
  #nr-h-section-tag {
    font-size:10px; padding:3px 10px; border-radius:40px;
    background:rgba(124,58,237,0.14); border:1px solid rgba(124,58,237,0.28);
    color:#a78bfa; letter-spacing:0.04em; white-space:nowrap;
    transition:all 0.3s ease;
  }
  #nr-h-close {
    width:28px; height:28px; border-radius:50%; border:none;
    background:rgba(124,58,237,0.14); color:#9b92c8;
    cursor:pointer; font-size:13px;
    display:flex; align-items:center; justify-content:center;
    transition:background 0.2s, color 0.2s; flex-shrink:0;
  }
  #nr-h-close:hover { background:rgba(124,58,237,0.32); color:#f0eeff; }

  /* Messages */
  #nr-msgs {
    flex:1; overflow-y:auto; padding:14px 14px 6px;
    display:flex; flex-direction:column; gap:10px;
    scroll-behavior:smooth;
  }
  #nr-msgs::-webkit-scrollbar { width:3px; }
  #nr-msgs::-webkit-scrollbar-thumb { background:rgba(124,58,237,0.35); border-radius:2px; }

  .nr-m { display:flex; flex-direction:column; max-width:86%; animation:nr-in 0.22s ease; }
  @keyframes nr-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  .nr-m-user { align-self:flex-end; align-items:flex-end; }
  .nr-m-ai   { align-self:flex-start; align-items:flex-start; }

  .nr-bub {
    padding:10px 14px; font-size:13.5px; line-height:1.65;
    word-break:break-word; border-radius:16px;
  }
  .nr-m-user .nr-bub {
    background:linear-gradient(135deg,#7c3aed,#2563eb);
    color:#fff; border-bottom-right-radius:4px;
  }
  .nr-m-ai .nr-bub {
    background:#1a1535; color:#d4cefc;
    border:1px solid rgba(124,58,237,0.2);
    border-bottom-left-radius:4px;
  }
  .nr-bub strong { color:#a78bfa; font-weight:600; }
  .nr-bub a { color:#60a5fa; text-decoration:underline; }
  .nr-bub ul { padding-left:18px; margin:5px 0; }
  .nr-bub li { margin-bottom:3px; }
  .nr-bub code {
    font-size:12px; background:rgba(124,58,237,0.15);
    border:1px solid rgba(124,58,237,0.25);
    padding:1px 6px; border-radius:4px; color:#a78bfa;
  }
  .nr-time {
    font-size:10px; color:#3d3665; margin-top:3px; padding:0 4px;
  }

  /* Typing indicator */
  .nr-typing {
    display:inline-flex; gap:5px; align-items:center;
    padding:12px 16px;
    background:#1a1535; border:1px solid rgba(124,58,237,0.2);
    border-radius:16px; border-bottom-left-radius:4px;
  }
  .nr-typing span {
    width:6px; height:6px; border-radius:50%;
    background:linear-gradient(135deg,#a78bfa,#60a5fa);
    animation:nr-bounce 1.2s ease-in-out infinite;
  }
  .nr-typing span:nth-child(2){animation-delay:.16s}
  .nr-typing span:nth-child(3){animation-delay:.32s}
  @keyframes nr-bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-7px)} }

  /* Suggestion chips inside chat */
  .nr-chips-row { display:flex; flex-wrap:wrap; gap:6px; margin-top:4px; }
  .nr-chip {
    font-size:11.5px; padding:5px 12px; border-radius:40px;
    background:rgba(124,58,237,0.1); border:1px solid rgba(124,58,237,0.28);
    color:#a78bfa; cursor:pointer; transition:all 0.18s; white-space:nowrap;
  }
  .nr-chip:hover { background:rgba(124,58,237,0.24); border-color:#7c3aed; color:#f0eeff; }

  /* Context bar */
  #nr-ctx-bar {
    padding:7px 14px;
    background:rgba(124,58,237,0.06);
    border-top:1px solid rgba(124,58,237,0.1);
    border-bottom:1px solid rgba(124,58,237,0.1);
    display:flex; gap:6px; overflow-x:auto; flex-shrink:0;
  }
  #nr-ctx-bar::-webkit-scrollbar { display:none; }
  .nr-ctx-chip {
    font-size:11px; padding:4px 11px; border-radius:40px;
    background:rgba(37,99,235,0.1); border:1px solid rgba(96,165,250,0.22);
    color:#60a5fa; cursor:pointer; transition:all 0.18s; white-space:nowrap; flex-shrink:0;
  }
  .nr-ctx-chip:hover { background:rgba(37,99,235,0.22); border-color:#60a5fa; color:#bfdbfe; }

  /* Footer */
  #nr-footer {
    padding:10px 12px 12px;
    border-top:1px solid rgba(124,58,237,0.16);
    background:rgba(7,5,15,0.95); flex-shrink:0;
  }
  #nr-form { display:flex; gap:8px; align-items:flex-end; }
  #nr-input {
    flex:1; background:#120f27; color:#f0eeff;
    border:1px solid rgba(124,58,237,0.3); border-radius:12px;
    padding:10px 13px; font-size:13.5px;
    font-family:'Inter',-apple-system,sans-serif;
    outline:none; resize:none; max-height:100px; line-height:1.5;
    transition:border-color 0.2s, box-shadow 0.2s;
  }
  #nr-input::placeholder { color:#5c5490; }
  #nr-input:focus { border-color:#7c3aed; box-shadow:0 0 0 3px rgba(124,58,237,0.18); }
  #nr-send {
    width:40px; height:40px; flex-shrink:0; border-radius:12px;
    background:linear-gradient(135deg,#7c3aed,#2563eb);
    border:none; cursor:pointer; color:#fff; font-size:16px;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 0 14px rgba(124,58,237,0.4);
    transition:transform 0.15s, box-shadow 0.15s, opacity 0.15s;
  }
  #nr-send:hover { transform:scale(1.08); box-shadow:0 0 22px rgba(124,58,237,0.6); }
  #nr-send:disabled { opacity:0.35; cursor:not-allowed; transform:none; }
  #nr-branding { text-align:center; font-size:10px; color:#2d2755; padding:6px 0 0; letter-spacing:0.05em; }

  /* Exit-intent banner */
  #nr-exit-banner {
    position:fixed; top:80px; left:50%; transform:translateX(-50%) translateY(-20px);
    z-index:10001; width:420px; max-width:calc(100vw - 32px);
    background:linear-gradient(135deg,rgba(124,58,237,0.95),rgba(37,99,235,0.95));
    border:1px solid rgba(167,139,250,0.4);
    border-radius:14px; padding:18px 20px;
    box-shadow:0 20px 60px rgba(0,0,0,0.7);
    opacity:0; pointer-events:none;
    transition:opacity 0.3s ease, transform 0.3s ease;
  }
  #nr-exit-banner.nr-show { opacity:1; pointer-events:all; transform:translateX(-50%) translateY(0); }
  #nr-exit-banner h4 { font-size:15px; font-weight:600; color:#fff; margin-bottom:6px; }
  #nr-exit-banner p  { font-size:13px; color:rgba(255,255,255,0.82); margin-bottom:14px; line-height:1.5; }
  #nr-exit-banner-btns { display:flex; gap:10px; }
  .nr-eb-btn {
    flex:1; padding:9px 14px; border-radius:8px; cursor:pointer;
    font-size:13px; font-weight:500; border:none;
    transition:opacity 0.2s, transform 0.15s;
  }
  .nr-eb-btn:hover { opacity:0.9; transform:scale(1.02); }
  .nr-eb-primary { background:#fff; color:#7c3aed; }
  .nr-eb-secondary { background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.3); }
  #nr-exit-close {
    position:absolute; top:10px; right:12px;
    width:24px; height:24px; border-radius:50%; border:none;
    background:rgba(255,255,255,0.15); color:#fff; font-size:12px;
    cursor:pointer; display:flex; align-items:center; justify-content:center;
  }

  @media(max-width:440px){
    #nr-win { width:calc(100vw - 16px); right:8px; bottom:86px; height:72vh; border-radius:16px; }
    #nr-bubble { right:14px; bottom:14px; width:52px; height:52px; }
    #nr-popup { width:calc(100vw - 56px); right:14px; }
    #nr-exit-banner { width:calc(100vw - 32px); }
  }
  `;
  document.head.appendChild(S);

  /* ──────────────────────────────────────────────
     BUILD DOM
  ────────────────────────────────────────────── */

  /* Bubble */
  const bubble = document.createElement('button');
  bubble.id = 'nr-bubble';
  bubble.setAttribute('aria-label', "Chat with Naveen's AI assistant");
  bubble.innerHTML = `💬<div id="nr-unread" role="status" aria-live="polite"></div>`;
  document.body.appendChild(bubble);

  /* Proactive popup */
  const popup = document.createElement('div');
  popup.id = 'nr-popup';
  popup.setAttribute('role', 'dialog');
  popup.innerHTML = `
    <button id="nr-popup-close" aria-label="Dismiss">✕</button>
    <div id="nr-popup-avatar">NR</div>
    <div id="nr-popup-msg"></div>
    <div id="nr-popup-chips"></div>
    <div id="nr-popup-tail"></div>`;
  document.body.appendChild(popup);

  /* Exit-intent banner */
  const exitBanner = document.createElement('div');
  exitBanner.id = 'nr-exit-banner';
  exitBanner.setAttribute('role', 'dialog');
  exitBanner.innerHTML = `
    <button id="nr-exit-close" aria-label="Close">✕</button>
    <h4>👋 Before you go…</h4>
    <p>Naveen is open to new NetSuite projects right now. Got a challenge? Let's talk — he responds within 24 hours.</p>
    <div id="nr-exit-banner-btns">
      <button class="nr-eb-btn nr-eb-primary" id="nr-exit-chat">Chat with AI Assistant</button>
      <button class="nr-eb-btn nr-eb-secondary" id="nr-exit-email">Email Naveen</button>
    </div>`;
  document.body.appendChild(exitBanner);

  /* Chat window */
  const win = document.createElement('div');
  win.id = 'nr-win';
  win.setAttribute('role', 'dialog');
  win.setAttribute('aria-label', "Chat with Naveen's AI");
  win.innerHTML = `
    <div id="nr-header">
      <div id="nr-header-glow"></div>
      <div id="nr-h-avatar">NR</div>
      <div id="nr-h-info">
        <div id="nr-h-name">Naveen's AI Assistant</div>
        <div id="nr-h-status">Online — Ask me anything</div>
      </div>
      <div id="nr-h-section-tag">HERO</div>
      <button id="nr-h-close" aria-label="Close chat">✕</button>
    </div>
    <div id="nr-msgs" role="log" aria-live="polite"></div>
    <div id="nr-ctx-bar"></div>
    <div id="nr-footer">
      <div id="nr-form">
        <textarea id="nr-input" rows="1" placeholder="Ask anything about Naveen…" aria-label="Your message"></textarea>
        <button id="nr-send" aria-label="Send message">➤</button>
      </div>
      <div id="nr-branding">Powered by Claude AI · Naveen Ragipindi Portfolio</div>
    </div>`;
  document.body.appendChild(win);

  /* ──────────────────────────────────────────────
     ELEMENT REFS
  ────────────────────────────────────────────── */
  const msgsEl    = win.querySelector('#nr-msgs');
  const inputEl   = win.querySelector('#nr-input');
  const sendEl    = win.querySelector('#nr-send');
  const closeEl   = win.querySelector('#nr-h-close');
  const ctxBar    = win.querySelector('#nr-ctx-bar');
  const sectionTag= win.querySelector('#nr-h-section-tag');
  const unreadEl  = bubble.querySelector('#nr-unread');
  const popupMsg  = popup.querySelector('#nr-popup-msg');
  const popupChips= popup.querySelector('#nr-popup-chips');

  /* ──────────────────────────────────────────────
     UTILITIES
  ────────────────────────────────────────────── */
  function now() {
    return new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
  }

  function renderMarkdown(text) {
    return text
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
      .replace(/`([^`]+)`/g,'<code>$1</code>')
      .replace(/\[(.*?)\]\((https?:\/\/[^\)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/^[-•] (.+)$/gm,'<li>$1</li>')
      .replace(/((<li>.*?<\/li>\n?)+)/gs,'<ul>$1</ul>')
      .replace(/\n\n/g,'</p><p>')
      .replace(/\n/g,'<br>');
  }

  function scrollBot() { msgsEl.scrollTop = msgsEl.scrollHeight; }

  function setUnread(n) {
    unreadCount = n;
    if (n > 0 && !isOpen) {
      unreadEl.textContent = n > 9 ? '9+' : n;
      unreadEl.classList.add('show');
    } else {
      unreadEl.classList.remove('show');
    }
  }

  function addMsg(role, text, chips) {
    const wrap = document.createElement('div');
    wrap.className = 'nr-m nr-m-' + role;
    const bub = document.createElement('div');
    bub.className = 'nr-bub';
    bub.innerHTML = renderMarkdown(text);
    const time = document.createElement('div');
    time.className = 'nr-time';
    time.textContent = now();
    wrap.appendChild(bub);
    wrap.appendChild(time);
    if (chips && chips.length) {
      const row = document.createElement('div');
      row.className = 'nr-chips-row';
      chips.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'nr-chip';
        btn.textContent = c;
        btn.addEventListener('click', () => { row.remove(); send(c); });
        row.appendChild(btn);
      });
      wrap.appendChild(row);
    }
    msgsEl.appendChild(wrap);
    scrollBot();
    return bub;
  }

  function showTyping() {
    const d = document.createElement('div');
    d.className = 'nr-m nr-m-ai'; d.id = 'nr-typing';
    d.innerHTML = `<div class="nr-typing"><span></span><span></span><span></span></div>`;
    msgsEl.appendChild(d); scrollBot();
  }
  function hideTyping() { const el = document.getElementById('nr-typing'); if (el) el.remove(); }

  /* ──────────────────────────────────────────────
     CONTEXT BAR — section-aware quick chips
  ────────────────────────────────────────────── */
  function updateContextBar(sectionId) {
    const s = SECTION_SUGGESTIONS[sectionId];
    if (!s) return;
    ctxBar.innerHTML = '';
    s.chips.slice(0, 4).forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'nr-ctx-chip';
      btn.textContent = c;
      btn.addEventListener('click', () => send(c));
      ctxBar.appendChild(btn);
    });
    sectionTag.textContent = sectionId.toUpperCase();
  }

  /* ──────────────────────────────────────────────
     SECTION OBSERVER
  ────────────────────────────────────────────── */
  const sectionEls = document.querySelectorAll('section[id]');
  if (sectionEls.length) {
    const secObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          currentSection = e.target.id;
          updateContextBar(currentSection);
        }
      });
    }, { threshold: 0.4 });
    sectionEls.forEach(el => secObs.observe(el));
  }

  /* ──────────────────────────────────────────────
     POPUP LOGIC
  ────────────────────────────────────────────── */
  function showPopup(msg, chips, onChipClick) {
    if (isOpen) return;
    popupMsg.textContent = msg;
    popupChips.innerHTML = '';
    (chips || []).forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'nr-popup-chip';
      btn.textContent = c;
      btn.addEventListener('click', () => {
        hidePopup();
        openChat();
        setTimeout(() => send(c), 350);
      });
      popupChips.appendChild(btn);
    });
    popup.classList.add('nr-show');
    setUnread(unreadCount + 1);
    hasPopupShown = true;
    saveSession({ popupShown: true });
  }

  function hidePopup() { popup.classList.remove('nr-show'); }

  popup.querySelector('#nr-popup-close').addEventListener('click', hidePopup);
  popup.addEventListener('click', e => { if (e.target === popup) hidePopup(); });

  /* Fire proactive popups */
  function schedulePopups() {
    if (session.popupShown) return; /* don't re-show in same session */
    POPUP_MESSAGES.forEach(p => {
      const t = setTimeout(() => {
        if (!isOpen && !session.popupShown) {
          const entry = p;
          showPopup(entry.msg, entry.chips);
        }
      }, p.delay);
      popupTimers.push(t);
    });
  }
  schedulePopups();

  /* ──────────────────────────────────────────────
     EXIT INTENT
  ────────────────────────────────────────────── */
  let exitShown = false;
  document.addEventListener('mouseleave', e => {
    if (e.clientY <= 5 && !exitShown && !isOpen) {
      exitShown = true;
      exitBanner.classList.add('nr-show');
    }
  });
  exitBanner.querySelector('#nr-exit-close').addEventListener('click', () => exitBanner.classList.remove('nr-show'));
  exitBanner.querySelector('#nr-exit-chat').addEventListener('click', () => {
    exitBanner.classList.remove('nr-show');
    openChat();
    setTimeout(() => send("I was about to leave, but tell me why I should work with Naveen?"), 400);
  });
  exitBanner.querySelector('#nr-exit-email').addEventListener('click', () => {
    exitBanner.classList.remove('nr-show');
    window.location.href = 'mailto:naveen.netsuite01@gmail.com?subject=Enquiry from Portfolio';
  });

  /* ──────────────────────────────────────────────
     SCROLL DEPTH TRIGGER
  ────────────────────────────────────────────── */
  let scrollDepthFired = {};
  window.addEventListener('scroll', () => {
    const depth = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    if (depth >= 50 && !scrollDepthFired[50] && !isOpen && !session.popupShown) {
      scrollDepthFired[50] = true;
      const s = SECTION_SUGGESTIONS[currentSection] || SECTION_SUGGESTIONS.hero;
      showPopup(s.msg, s.chips);
    }
  }, { passive: true });

  /* ──────────────────────────────────────────────
     OPEN / CLOSE
  ────────────────────────────────────────────── */
  function openChat() {
    isOpen = true;
    win.classList.add('nr-open');
    hidePopup();
    setUnread(0);
    bubble.innerHTML = `✕<div id="nr-unread" role="status" aria-live="polite"></div>`;
    /* keep ref after re-render */
    const newUnread = bubble.querySelector('#nr-unread');
    if (messages.length === 0) {
      addMsg('ai',
        `👋 Hi! I'm Naveen's AI assistant.\n\nI know everything about his **NetSuite expertise**, **work history**, **certifications**, and how to get started on a project with him.\n\nWhat can I help you with?`,
        SECTION_SUGGESTIONS[currentSection]?.chips || ['What can Naveen do?', 'His certifications', 'Hire Naveen', 'Integration expertise']
      );
    }
    updateContextBar(currentSection);
    setTimeout(() => inputEl.focus(), 300);
  }

  function closeChat() {
    isOpen = false;
    win.classList.remove('nr-open');
    bubble.innerHTML = `💬<div id="nr-unread" role="status" aria-live="polite"></div>`;
  }

  bubble.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeEl.addEventListener('click', closeChat);

  /* ──────────────────────────────────────────────
     SEND MESSAGE & CALL CLAUDE
  ────────────────────────────────────────────── */
  async function send(text) {
    text = (text || '').trim();
    if (!text || isTyping) return;

    addMsg('user', text);
    messages.push({ role: 'user', content: text });

    inputEl.value = '';
    inputEl.style.height = 'auto';
    isTyping = true;
    sendEl.disabled = true;
    showTyping();

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: SYSTEM,
          messages: messages
        })
      });

      hideTyping();

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || 'HTTP ' + res.status);
      }

      const data  = await res.json();
      const reply = data.content?.[0]?.text || "I'm having trouble connecting right now. Please reach out to Naveen directly!";
      messages.push({ role: 'assistant', content: reply });

      /* Smart follow-up chips based on response content */
      let followChips = [];
      const lower = reply.toLowerCase();
      if (lower.includes('integration')) followChips = ['Which integrations?', 'Salesforce setup?', 'Timeline estimate?'];
      else if (lower.includes('certif'))  followChips = ['See all 4 certs', 'Verify credentials', 'Other qualifications?'];
      else if (lower.includes('contact') || lower.includes('email') || lower.includes('whatsapp')) followChips = ['Draft a project brief', 'What to include?'];
      else if (lower.includes('finance') || lower.includes('ap/ar') || lower.includes('reconcil')) followChips = ['Finance module depth', 'GST/TDS config?', 'Month-end close?'];
      else if (lower.includes('workflow') || lower.includes('suiteflow')) followChips = ['SuiteFlow examples?', 'Approval automation?', 'Script capability?'];

      addMsg('ai', reply, followChips.length ? followChips : undefined);

    } catch (err) {
      hideTyping();
      addMsg('ai', `Something went wrong on my end. Please reach Naveen directly:\n\n**📧 Email:** naveen.netsuite01@gmail.com\n**💬 WhatsApp:** +91 79816 41388\n\nHe responds within 24 hours!`);
      console.error('[NR-AI]', err);
    }

    isTyping  = false;
    sendEl.disabled = false;
    inputEl.focus();
  }

  /* ──────────────────────────────────────────────
     INPUT HANDLERS
  ────────────────────────────────────────────── */
  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(inputEl.value); }
  });
  inputEl.addEventListener('input', () => {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 100) + 'px';
  });
  sendEl.addEventListener('click', () => send(inputEl.value));

  /* ──────────────────────────────────────────────
     INIT
  ────────────────────────────────────────────── */
  updateContextBar('hero');

})();
