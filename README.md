# Naveen Ragipindi — Portfolio Website

Personal portfolio for **Naveen Ragipindi**, NetSuite Functional Consultant & Administrator.

## 📁 File Structure

```
naveen-portfolio/
├── index.html      ← Main HTML (all sections)
├── style.css       ← All styles (dark theme, responsive)
├── script.js       ← Scroll animations, counter, form, nav
└── README.md       ← This file
```

## 🚀 Deploy to GitHub Pages (Step-by-Step)

### Step 1 — Create a GitHub repository
1. Go to [github.com](https://github.com) and sign in
2. Click **"New repository"**
3. Name it exactly: `naveen-portfolio` (or `your-username.github.io` for a root domain)
4. Set it to **Public**
5. Click **"Create repository"**

### Step 2 — Upload the files
**Option A — Drag & Drop (easiest):**
1. Open your new repo on GitHub
2. Click **"uploading an existing file"**
3. Drag all 4 files (`index.html`, `style.css`, `script.js`, `README.md`) into the upload area
4. Click **"Commit changes"**

**Option B — Git CLI:**
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/naveen-portfolio.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. In your repo, go to **Settings → Pages**
2. Under **Source**, select **"Deploy from a branch"**
3. Branch: **main** / Folder: **/ (root)**
4. Click **Save**

### Step 4 — Your site is live!
After ~1 minute your site will be at:
```
https://YOUR-USERNAME.github.io/naveen-portfolio/
```

---

## ✏️ Customise

| What to change | Where |
|---|---|
| Name, email, phone | `index.html` — hero & contact sections |
| Nav links | `index.html` — `<nav>` section |
| Work experience | `index.html` — `#experience` section |
| Certifications | `index.html` — `#certs` section |
| Colors / fonts | `style.css` — `:root` variables |
| Animations | `script.js` |

---

## 📬 Contact Form

The form uses a `mailto:` link — clicking "Send My Project Brief" opens the user's default email client pre-filled with the form data. No backend needed.

To switch to a proper form backend (e.g. Formspree), replace the `handleFormSubmit` function in `script.js`:

```js
// Formspree example
async function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST', body: data,
    headers: { 'Accept': 'application/json' }
  });
  form.classList.add('hidden');
  document.getElementById('formSuccess').classList.add('show');
}
```

---

© 2026 Naveen Ragipindi
