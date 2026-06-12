/* ============================================================
   NAVEEN RAGIPINDI — PORTFOLIO (ENHANCED)
   script.js — Advanced Features
   ============================================================ */

/* ── NAV: active link highlight + hamburger + scroll effect ── */
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

/* ── ADVANCED NETSUITE SKILLS DATABASE ── */
const netsuiteSkillsDatabase = {
  coreModules: {
    title: "Core NetSuite Modules",
    description: "Complete expertise across all primary NetSuite modules",
    skills: [
      {
        name: "Financial Management",
        level: "Expert",
        description: "GL, AP/AR, Bank Reconciliation, Multi-currency, Consolidation",
        icon: "📊"
      },
      {
        name: "Fixed Assets (FA)",
        level: "Expert",
        description: "Asset tracking, depreciation, impairment, disposal, revaluation, multi-location management",
        icon: "🏢",
        details: [
          "Fixed Asset creation and management",
          "Depreciation methods (straight-line, declining balance, units of production)",
          "Asset disposal and retirement workflows",
          "Impairment testing and revaluation",
          "Multi-entity asset consolidation",
          "Lease accounting (ASC 842 / IFRS 16)",
          "Asset tagging and barcode integration",
          "Depreciation schedule customization"
        ]
      },
      {
        name: "Procure-to-Pay (P2P)",
        level: "Expert",
        description: "Purchase requisitions, POs, vendor management, invoice matching, 3-way match",
        icon: "🛒"
      },
      {
        name: "Order-to-Cash (O2C)",
        level: "Expert",
        description: "Sales orders, fulfillment, billing, revenue recognition, customer management",
        icon: "💰"
      },
      {
        name: "Inventory Management",
        level: "Expert",
        description: "Stock movements, warehouse management, cycle counting, lot/serial tracking, ABC analysis",
        icon: "📦"
      }
    ]
  },
  
  advancedModules: {
    title: "Advanced Modules",
    description: "Specialized expertise in complex NetSuite modules",
    skills: [
      {
        name: "ARM - Accounts Receivable Management",
        level: "Expert",
        description: "Advanced collections, cash application, customer credit management, dunning",
        icon: "💳",
        details: [
          "Aging analysis and reporting",
          "Cash application rules and automation",
          "Customer credit limits and hold management",
          "Collections management workflows",
          "Dunning management and escalation",
          "Deduction management",
          "Revenue recognition policies (ASC 606)",
          "Customer segmentation for AR strategies",
          "Disputed invoice tracking and resolution",
          "Payment terms optimization"
        ]
      },
      {
        name: "R2R - Record-to-Report",
        level: "Expert",
        description: "Financial close procedures, consolidation, reporting, compliance, audit trails",
        icon: "📈",
        details: [
          "Month-end & year-end close procedures",
          "Multi-entity consolidation workflows",
          "Intercompany reconciliation",
          "Elimination entries automation",
          "Trial balance and GL reconciliation",
          "Financial statement generation",
          "Statutory reporting requirements",
          "Audit trail and compliance documentation",
          "Variance analysis reporting",
          "Management accounting dashboards"
        ]
      },
      {
        name: "Advanced Manufacturing",
        level: "Proficient",
        description: "Bill of Materials (BOM), work orders, production planning, manufacturing execution",
        icon: "🏭",
        details: [
          "Bill of Materials (BOM) structure",
          "Work order management and scheduling",
          "Production planning and forecasting",
          "Manufacturing execution tracking",
          "Quality control processes",
          "Resource planning (MRP)",
          "Routing and work center setup",
          "Backflushing and cost allocation",
          "WIP management",
          "Manufacturing KPIs and dashboards"
        ]
      },
      {
        name: "Revenue Management",
        level: "Expert",
        description: "Revenue recognition, revenue schedules, milestone tracking, SaaS metrics",
        icon: "💵",
        details: [
          "ASC 606 revenue recognition",
          "Performance obligation setup",
          "Contract-based revenue",
          "Milestone-based revenue",
          "Subscription revenue models",
          "Revenue schedules and reversals",
          "Deferred revenue tracking",
          "Revenue recognition reports",
          "Contract modifications handling",
          "Revenue integrity and reconciliation"
        ]
      }
    ]
  },

  specializations: {
    title: "Specialized Skills",
    description: "Domain expertise in specific areas and integrations",
    skills: [
      {
        name: "Tax Management",
        level: "Expert",
        description: "GST, TDS, VAT, Avalara integration, multi-tax jurisdictions, compliance",
        icon: "📋",
        details: [
          "Goods and Services Tax (GST) - India",
          "Tax Deducted at Source (TDS) - India",
          "Value Added Tax (VAT) - Europe",
          "Sales Tax - North America",
          "Avalara integration & configuration",
          "Tax code setup and maintenance",
          "Tax-exempt transactions",
          "Tax audit reports",
          "Multi-jurisdiction tax rules"
        ]
      },
      {
        name: "Reporting & Analytics",
        level: "Expert",
        description: "Saved searches, SuiteAnalytics, dashboards, KPIs, custom reports",
        icon: "📊",
        details: [
          "Saved searches with complex criteria",
          "SuiteAnalytics workbooks",
          "Custom dashboard design",
          "KPI cards and gauges",
          "Financial dashboards",
          "Operational KPIs",
          "Report templates (PDF/HTML)",
          "Automated report scheduling",
          "Executive dashboards",
          "Real-time data visualization"
        ]
      },
      {
        name: "Workflow Automation",
        level: "Expert",
        description: "SuiteFlow, approval workflows, user event scripts, automation best practices",
        icon: "⚙️",
        details: [
          "SuiteFlow workflow builder",
          "Approval workflows",
          "Conditional logic and branching",
          "User Event Scripts",
          "Client Scripts",
          "Scheduled Scripts",
          "Script scheduling",
          "Email automation",
          "Workflow monitoring & debugging",
          "Performance optimization"
        ]
      },
      {
        name: "Integration Architecture",
        level: "Expert",
        description: "Salesforce, Shopify, HubSpot, Marketo, Concur, Zapier, middleware",
        icon: "🔗",
        details: [
          "Salesforce CRM sync",
          "Shopify eCommerce integration",
          "HubSpot CRM integration",
          "Marketo marketing automation",
          "Concur expense management",
          "Zapier workflow automation",
          "REST API implementation",
          "SOAP Web Services",
          "Middleware solutions",
          "Data mapping and transformation"
        ]
      }
    ]
  },

  technicalSkills: {
    title: "Technical & Development",
    description: "Scripting and development capabilities",
    skills: [
      {
        name: "SuiteScript 2.x",
        level: "Proficient",
        description: "User Event, Client Scripts, Scheduled Scripts, RESTlets, module development",
        icon: "💻",
        details: [
          "User Event Scripts (beforeSubmit, afterSubmit, beforeLoad)",
          "Client Scripts (pageInit, fieldChanged, saveRecord)",
          "Scheduled Scripts for batch operations",
          "RESTlets for API endpoints",
          "Module definitions and dependencies",
          "Error handling and logging",
          "Performance optimization",
          "Debugging techniques"
        ]
      },
      {
        name: "Data Management",
        level: "Expert",
        description: "CSV import/export, data migration, data validation, cleansing strategies",
        icon: "🗄️",
        details: [
          "CSV data import procedures",
          "Bulk data export workflows",
          "Data validation rules",
          "Duplicate detection & merging",
          "Data cleansing strategies",
          "Historical data migration",
          "Data mapping documentation",
          "Reconciliation procedures"
        ]
      },
      {
        name: "System Configuration",
        level: "Expert",
        description: "Custom records, custom fields, custom forms, role management, security",
        icon: "⚙️",
        details: [
          "Custom record types creation",
          "Custom field definitions",
          "Custom form design",
          "Role-based security",
          "Permission set management",
          "Record access restrictions",
          "Department hierarchy setup",
          "Field-level security",
          "Audit trail configuration"
        ]
      }
    ]
  }
};

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

/* ── POPULATE SKILLS FROM DATABASE ── */
function populateSkillsContent() {
  const skillsContainer = document.querySelector('.skills-cols');
  if (!skillsContainer) return;

  let html = '';
  
  Object.values(netsuiteSkillsDatabase).forEach(category => {
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

/* ── INITIALIZE ON DOM READY ── */
document.addEventListener('DOMContentLoaded', () => {
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
