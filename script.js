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
   AI CHAT ASSISTANT — Naveen Ragipindi Portfolio
   Full floating chat bubble, bottom-right
   Powered by Claude (claude-sonnet-4-6)
   ============================================================ */
(function () {

  /* ── NAVEEN'S SYSTEM PROMPT ── */
  const SYSTEM_PROMPT = `You are Naveen Ragipindi's personal AI assistant on his professional portfolio website. You represent Naveen and help visitors learn about him, his services, and how to work with him.

ABOUT NAVEEN:
- Name: Naveen Ragipindi
- Role: NetSuite Functional Consultant & Administrator
- Experience: 3+ years of hands-on NetSuite expertise
- Location: Hyderabad, India — available remotely worldwide (IST timezone)
- Email: naveen.netsuite01@gmail.com
- Phone/WhatsApp: +91 79816 41388
- LinkedIn: linkedin.com/in/ragipindi-naveen-767b17271
- Availability: Open to new opportunities and projects

CERTIFICATIONS (all active, 2025-2026):
1. Oracle NetSuite Certified Financial Associate (Oct 2025) — ID: 102877621N16290GC10
2. Oracle NetSuite Certified AI Foundations Associate (Oct 2025) — ID: 102877621N16765GC10
3. Oracle NetSuite Certified BI & Reporting Associate (Oct 2025) — ID: 102877621N16724GC10
4. Oracle Cloud Infrastructure AI Foundations Associate (Mar 2026)

WORK EXPERIENCE:
1. Executive ERP @ Bambino Agro Industries Limited (Jun 2025 – Present, Current Role)
   - Day-to-day configuration and maintenance of NetSuite ERP
   - User setup, roles, permissions management
   - Modules: Finance, Procurement, Inventory, Fixed Assets, Sales & Distribution
   - Chart of Accounts, Tax Rules, Approval Workflows, Custom Forms, Saved Searches
   - Data migration via CSV imports (Customers, Vendors, Items, Opening Balances)
   - GST, TDS, Tax Code compliance configuration
   - NetSuite–Concur integration for expense sync
   - NetSuite–Salesforce CRM integration
   - Month-End & Year-End Closing: GL, Trial Balance, Intercompany reconciliations

2. NetSuite Functional Consultant @ ITrend Solutions (Jun 2024 – Dec 2024)
   - NetSuite customisations for enhancement and maintenance
   - Custom fields, page layouts, record types, reports, dashboards
   - Users, roles, security profiles, workflow rules
   - Design review sessions with IT and business leads
   - NetSuite–Shopify integration (product catalog, inventory, orders)
   - NetSuite–HubSpot integration (lead-to-customer lifecycle)

3. NetSuite Functional Consultant @ Amagi Media Labs Pvt. Ltd (Feb 2023 – Jun 2024)
   - Functional solutions for system issues, ERP implementation reports
   - Business user training and post-go-live support
   - Gap analysis pre/post NetSuite implementation
   - Custom Records, Role & Permissions, Workflows, Forms, Segments, Fields, Saved Searches
   - NetSuite–Marketo integration (marketing campaigns and lead scoring)
   - Vendor, Customer, Bank, AP/AR, Balance Sheet, Inter-Company Reconciliation
   - Inter-Company Reconciliation in NetSuite OneWorld

NETSUITE EXPERTISE:
- SuiteBuilder: Custom Records, Fields, Forms, Lists, Segments, SuiteBundler, Role Management, Access Control, CSV Import/Export
- SuiteFlow & Automation: SuiteFlow, Workflow Manager, Approval Workflows, Email Automation, User Event Scripts, Client Scripts, Scheduled Scripts, RESTlets, SuiteScript 2.x (Basic)
- Finance & Compliance: P2P (Procure-to-Pay), O2C (Order-to-Cash), AP/AR Reconciliation, Bank Reconciliation, Inter-Company Recon, GL Reconciliation, GST/TDS (India), Avalara Tax, Month/Year-End Close
- Reporting & Analytics: Saved Searches, SuiteAnalytics, KPI Scorecards, Dashboard Design, Ageing Reports, Trial Balance, GL Reports, Advanced PDF/HTML Templates

SKILLS SUMMARY:
Expert: SuiteBuilder, SuiteFlow, Saved Searches & Reports, AP/AR Reconciliation, P2P & O2C, Role & Permissions, GST/TDS Config, Dashboard & KPI Design
Proficient: Data Migration (CSV), Advanced PDF/HTML Templates, Avalara Tax, Salesforce Integration, Shopify Integration, HubSpot Integration, Marketo Integration, Concur Integration, Excel
Basic: SuiteScript 2.x, JavaScript, SQL/SuiteQL, HTML/XML, REST/SOAP Web Services

INTEGRATIONS DELIVERED:
- Salesforce CRM: customer, quote, and sales order sync
- Shopify eCommerce: product catalog, inventory, order sync
- HubSpot CRM: lead-to-customer lifecycle management
- Marketo: marketing campaign data and lead scoring
- Concur Expense: automated expense report sync to NetSuite Finance
- Avalara Tax: automated tax calculation and compliance

SERVICES OFFERED:
- NetSuite Support & Administration
- NetSuite Implementation (end-to-end)
- SuiteFlow / Workflow Automation
- ERP Integration (Salesforce, Shopify, HubSpot, Marketo, Concur, Avalara)
- Finance & Reconciliation Support (AP/AR, Bank, GL, Intercompany)
- Analytics and BI Reporting (SuiteAnalytics, Saved Searches, Dashboards)
- Data Migration (CSV imports)
- Tax Configuration (GST/TDS India, Avalara)

PERSONALITY & APPROACH:
- Honest consulting: realistic timelines, clear scope
- Finance-first ERP mindset — precision-driven
- Post-go-live handover that actually empowers the team
- Responds to every inquiry within 24 hours

YOUR BEHAVIOUR AS ASSISTANT:
- Be warm, professional, and knowledgeable — you ARE speaking on behalf of Naveen
- Answer ANY question the visitor has — about Naveen, NetSuite, ERP, integrations, pricing expectations, timelines, etc.
- For project inquiries, gather their needs and encourage them to reach out via email (naveen.netsuite01@gmail.com) or WhatsApp (+91 79816 41388)
- For technical NetSuite questions, answer helpfully — this demonstrates Naveen's expertise
- Keep responses concise and readable — use short paragraphs or brief bullet points when listing things
- Never say you "cannot" help with something — find a way to assist
- If asked about rates/pricing, say Naveen provides custom quotes based on project scope and they should reach out directly
- Always be ready to suggest the visitor contact Naveen directly for detailed discussions`;

  /* ── CONVERSATION HISTORY ── */
  let messages = [];
  let isOpen   = false;
  let isTyping = false;

  /* ── BUILD DOM ── */
  const style = document.createElement('style');
  style.textContent = `
    #nr-chat-bubble {
      position:fixed; bottom:28px; right:28px; z-index:9999;
      width:54px; height:54px; border-radius:50%;
      background:linear-gradient(135deg,#7c3aed 0%,#2563eb 100%);
      border:none; cursor:pointer;
      box-shadow:0 0 0 0 rgba(124,58,237,0.5);
      display:flex; align-items:center; justify-content:center;
      font-size:22px; color:#fff;
      transition:transform 0.2s ease, box-shadow 0.2s ease;
      animation:nr-pulse 2.8s ease-in-out infinite;
    }
    #nr-chat-bubble:hover { transform:scale(1.1); box-shadow:0 0 28px rgba(124,58,237,0.6); animation:none; }
    @keyframes nr-pulse {
      0%,100% { box-shadow:0 0 0 0 rgba(124,58,237,0.5); }
      50%      { box-shadow:0 0 0 10px rgba(124,58,237,0); }
    }
    #nr-chat-badge {
      position:absolute; top:-3px; right:-3px;
      width:18px; height:18px; border-radius:50%;
      background:#06b6d4; border:2px solid #07050f;
      font-size:10px; font-weight:700; color:#fff;
      display:flex; align-items:center; justify-content:center;
    }
    #nr-chat-window {
      position:fixed; bottom:94px; right:28px; z-index:9998;
      width:380px; height:560px;
      background:#0d0a1e;
      border:1px solid rgba(124,58,237,0.35);
      border-radius:16px;
      display:flex; flex-direction:column;
      box-shadow:0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,58,237,0.2), 0 0 40px rgba(124,58,237,0.12);
      overflow:hidden;
      opacity:0; pointer-events:none;
      transform:translateY(16px) scale(0.97);
      transition:opacity 0.22s ease, transform 0.22s ease;
    }
    #nr-chat-window.nr-open { opacity:1; pointer-events:all; transform:translateY(0) scale(1); }
    #nr-chat-header {
      padding:16px 18px;
      background:linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(37,99,235,0.15) 100%);
      border-bottom:1px solid rgba(124,58,237,0.25);
      display:flex; align-items:center; gap:12px; flex-shrink:0;
    }
    #nr-chat-avatar {
      width:38px; height:38px; border-radius:50%;
      background:linear-gradient(135deg,#7c3aed,#2563eb);
      display:flex; align-items:center; justify-content:center;
      font-size:14px; font-weight:700; color:#fff; flex-shrink:0;
      box-shadow:0 0 12px rgba(124,58,237,0.4);
    }
    #nr-chat-header-info { flex:1; }
    #nr-chat-header-name { font-size:14px; font-weight:600; color:#f0eeff; }
    #nr-chat-header-status {
      font-size:11px; color:#67e8f9;
      display:flex; align-items:center; gap:5px; margin-top:2px;
    }
    #nr-chat-header-status::before {
      content:''; width:6px; height:6px; border-radius:50%;
      background:#06b6d4; display:inline-block;
      box-shadow:0 0 6px rgba(6,182,212,0.8);
      animation:nr-pulse-dot 2s ease-in-out infinite;
    }
    @keyframes nr-pulse-dot {
      0%,100% { opacity:1; } 50% { opacity:0.3; }
    }
    #nr-chat-close {
      width:28px; height:28px; border-radius:50%; border:none;
      background:rgba(124,58,237,0.15); color:#9b92c8;
      cursor:pointer; font-size:14px;
      display:flex; align-items:center; justify-content:center;
      transition:background 0.2s, color 0.2s;
    }
    #nr-chat-close:hover { background:rgba(124,58,237,0.3); color:#f0eeff; }
    #nr-chat-messages {
      flex:1; overflow-y:auto; padding:16px;
      display:flex; flex-direction:column; gap:12px;
      scroll-behavior:smooth;
    }
    #nr-chat-messages::-webkit-scrollbar { width:4px; }
    #nr-chat-messages::-webkit-scrollbar-track { background:transparent; }
    #nr-chat-messages::-webkit-scrollbar-thumb { background:rgba(124,58,237,0.4); border-radius:2px; }
    .nr-msg { display:flex; flex-direction:column; gap:4px; max-width:85%; animation:nr-fadein 0.25s ease; }
    @keyframes nr-fadein { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
    .nr-msg-user { align-self:flex-end; align-items:flex-end; }
    .nr-msg-ai   { align-self:flex-start; align-items:flex-start; }
    .nr-bubble {
      padding:10px 14px; border-radius:14px;
      font-size:13.5px; line-height:1.6; word-break:break-word;
    }
    .nr-msg-user .nr-bubble {
      background:linear-gradient(135deg,#7c3aed,#2563eb);
      color:#fff; border-bottom-right-radius:4px;
    }
    .nr-msg-ai .nr-bubble {
      background:#1a1535; color:#d4cefc;
      border:1px solid rgba(124,58,237,0.2);
      border-bottom-left-radius:4px;
    }
    .nr-bubble strong { color:#a78bfa; }
    .nr-bubble ul { padding-left:16px; margin:6px 0; }
    .nr-bubble li { margin-bottom:3px; }
    .nr-typing {
      display:flex; gap:5px; align-items:center; padding:12px 14px;
      background:#1a1535; border:1px solid rgba(124,58,237,0.2);
      border-radius:14px; border-bottom-left-radius:4px; width:56px;
    }
    .nr-typing span {
      width:6px; height:6px; border-radius:50%;
      background:linear-gradient(135deg,#a78bfa,#60a5fa);
      animation:nr-bounce 1.2s ease-in-out infinite;
    }
    .nr-typing span:nth-child(2) { animation-delay:0.15s; }
    .nr-typing span:nth-child(3) { animation-delay:0.3s; }
    @keyframes nr-bounce {
      0%,60%,100% { transform:translateY(0); } 30% { transform:translateY(-6px); }
    }
    #nr-chat-footer {
      padding:12px 14px;
      border-top:1px solid rgba(124,58,237,0.18);
      background:rgba(7,5,15,0.9); flex-shrink:0;
    }
    #nr-chat-form { display:flex; gap:8px; align-items:flex-end; }
    #nr-chat-input {
      flex:1; background:#120f27; color:#f0eeff;
      border:1px solid rgba(124,58,237,0.3); border-radius:10px;
      padding:10px 13px; font-size:13.5px;
      font-family:'Inter',-apple-system,sans-serif;
      outline:none; resize:none; max-height:100px;
      line-height:1.5; transition:border-color 0.2s, box-shadow 0.2s;
    }
    #nr-chat-input::placeholder { color:#5c5490; }
    #nr-chat-input:focus { border-color:#7c3aed; box-shadow:0 0 0 3px rgba(124,58,237,0.18); }
    #nr-chat-send {
      width:38px; height:38px; flex-shrink:0; border-radius:10px;
      background:linear-gradient(135deg,#7c3aed,#2563eb);
      border:none; cursor:pointer; color:#fff; font-size:15px;
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 0 12px rgba(124,58,237,0.35);
      transition:transform 0.15s, box-shadow 0.15s, opacity 0.15s;
    }
    #nr-chat-send:hover { transform:scale(1.08); box-shadow:0 0 20px rgba(124,58,237,0.55); }
    #nr-chat-send:disabled { opacity:0.4; cursor:not-allowed; transform:none; }
    #nr-quick-chips {
      display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px;
    }
    .nr-chip {
      font-size:11.5px; padding:5px 12px; border-radius:40px;
      background:rgba(124,58,237,0.1); border:1px solid rgba(124,58,237,0.28);
      color:#a78bfa; cursor:pointer;
      transition:background 0.2s, border-color 0.2s, color 0.2s;
      white-space:nowrap;
    }
    .nr-chip:hover { background:rgba(124,58,237,0.22); border-color:#7c3aed; color:#f0eeff; }
    #nr-chat-branding {
      text-align:center; font-size:10px; color:#3d3665;
      padding:6px 0 2px; letter-spacing:0.04em;
    }
    @media (max-width:440px) {
      #nr-chat-window { width:calc(100vw - 24px); right:12px; bottom:80px; height:70vh; }
      #nr-chat-bubble { right:16px; bottom:16px; }
    }
  `;
  document.head.appendChild(style);

  /* Bubble */
  const bubble = document.createElement('button');
  bubble.id = 'nr-chat-bubble';
  bubble.setAttribute('aria-label', 'Chat with Naveen\'s AI assistant');
  bubble.innerHTML = `<span id="nr-bubble-icon">💬</span><div id="nr-chat-badge">AI</div>`;
  document.body.appendChild(bubble);

  /* Window */
  const win = document.createElement('div');
  win.id = 'nr-chat-window';
  win.setAttribute('role', 'dialog');
  win.setAttribute('aria-label', 'Chat with Naveen\'s AI assistant');
  win.innerHTML = `
    <div id="nr-chat-header">
      <div id="nr-chat-avatar">NR</div>
      <div id="nr-chat-header-info">
        <div id="nr-chat-header-name">Naveen's AI Assistant</div>
        <div id="nr-chat-header-status">Online — Ask me anything</div>
      </div>
      <button id="nr-chat-close" aria-label="Close chat">✕</button>
    </div>
    <div id="nr-chat-messages"></div>
    <div id="nr-chat-footer">
      <div id="nr-quick-chips">
        <span class="nr-chip">What can Naveen do?</span>
        <span class="nr-chip">View certifications</span>
        <span class="nr-chip">Hire Naveen</span>
        <span class="nr-chip">Integration expertise</span>
      </div>
      <div id="nr-chat-form">
        <textarea id="nr-chat-input" rows="1" placeholder="Ask anything about Naveen…"></textarea>
        <button id="nr-chat-send" aria-label="Send">➤</button>
      </div>
      <div id="nr-chat-branding">Powered by Claude AI · Naveen Ragipindi Portfolio</div>
    </div>
  `;
  document.body.appendChild(win);

  /* ── HELPERS ── */
  const msgContainer = win.querySelector('#nr-chat-messages');
  const input        = win.querySelector('#nr-chat-input');
  const sendBtn      = win.querySelector('#nr-chat-send');
  const closeBtn     = win.querySelector('#nr-chat-close');
  const chips        = win.querySelectorAll('.nr-chip');

  function scrollBottom() {
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  function addMessage(role, text) {
    const wrap = document.createElement('div');
    wrap.className = 'nr-msg nr-msg-' + role;
    const bub = document.createElement('div');
    bub.className = 'nr-bubble';
    /* Simple markdown: bold **text**, bullet - item */
    bub.innerHTML = text
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
      .replace(/^- (.+)$/gm,'<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s,'<ul>$1</ul>')
      .replace(/\n/g,'<br>');
    wrap.appendChild(bub);
    msgContainer.appendChild(wrap);
    scrollBottom();
    return bub;
  }

  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'nr-msg nr-msg-ai';
    wrap.id = 'nr-typing-indicator';
    wrap.innerHTML = `<div class="nr-typing"><span></span><span></span><span></span></div>`;
    msgContainer.appendChild(wrap);
    scrollBottom();
  }

  function removeTyping() {
    const el = document.getElementById('nr-typing-indicator');
    if (el) el.remove();
  }

  /* ── WELCOME MESSAGE ── */
  function showWelcome() {
    const greet = addMessage('ai',
      `👋 Hi! I'm Naveen's AI assistant.\n\nAsk me anything — his **NetSuite expertise**, **work experience**, **certifications**, **integrations**, or how to **hire him** for your project. I'm here to help!`
    );
  }

  /* ── TOGGLE OPEN/CLOSE ── */
  function openChat() {
    isOpen = true;
    win.classList.add('nr-open');
    bubble.querySelector('#nr-bubble-icon').textContent = '✕';
    bubble.querySelector('#nr-chat-badge').style.display = 'none';
    if (msgContainer.children.length === 0) showWelcome();
    setTimeout(() => input.focus(), 250);
  }

  function closeChat() {
    isOpen = false;
    win.classList.remove('nr-open');
    bubble.querySelector('#nr-bubble-icon').textContent = '💬';
    bubble.querySelector('#nr-chat-badge').style.display = 'flex';
  }

  bubble.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);

  /* ── SEND MESSAGE ── */
  async function sendMessage(text) {
    text = text.trim();
    if (!text || isTyping) return;

    /* Hide chips after first use */
    const chipsEl = document.getElementById('nr-quick-chips');
    if (chipsEl) chipsEl.style.display = 'none';

    addMessage('user', text);
    messages.push({ role: 'user', content: text });

    input.value = '';
    input.style.height = 'auto';
    isTyping = true;
    sendBtn.disabled = true;
    showTyping();

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: messages
        })
      });

      removeTyping();

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || 'API error ' + res.status);
      }

      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Sorry, I didn\'t get a response. Please try again.';
      messages.push({ role: 'assistant', content: reply });
      addMessage('ai', reply);

    } catch (err) {
      removeTyping();
      addMessage('ai', `Hmm, something went wrong on my end. Please reach out to Naveen directly:\n\n**Email:** naveen.netsuite01@gmail.com\n**WhatsApp:** +91 79816 41388`);
      console.error('[NR Chat]', err);
    }

    isTyping = false;
    sendBtn.disabled = false;
    input.focus();
  }

  /* ── INPUT EVENTS ── */
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input.value);
    }
  });

  /* Auto-resize textarea */
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
  });

  sendBtn.addEventListener('click', () => sendMessage(input.value));

  /* ── QUICK CHIPS ── */
  chips.forEach(chip => {
    chip.addEventListener('click', () => sendMessage(chip.textContent));
  });

})();
