# Abhijit Mondal — Software Development, AI Systems & Cybersecurity Portfolio

> **Production Platform V2**: High-performance Personal Brand, Multi-Service Client Portal, Editorial Technology Magazine, and Secured Admin CMS.

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-5.0.5-729B1B?logo=vitest&logoColor=white)](https://vitest.dev/)
[![Security Standards](https://img.shields.io/badge/Security-OWASP%20Hardened-00F2FE)](#admin-security--hardening)

---

## 1. Architecture Overview

This platform is engineered using modern, modular React 19 and Vite 7, featuring a dark technology aesthetic with midnight navy surfaces (`#070B13`, `#0D1424`), soft white typography (`#F8FAFC`), and electric cyan/teal accents (`#00F2FE`).

### Core Platform Capabilities
1. **Public Brand & Services Portal:**
   - **Hero Section:** Personal identity (Abhijit Mondal), headline (*"Engineering Digital Products. Building Intelligent Systems. Securing Applications."*), interactive security HUD radar with interactive node capability inspectors, verified contact details, and dual CTAs.
   - **Verified Qualifications & Trust:** Google Certified Cyber Security, National Cadet Corps (NCC) 'C' Certificate (Alpha Grading), TryHackMe Top 4% Global Ranking, Jyestha & IIT Roorkee Trainee, Deloitte & Accenture Virtual Simulations, and M.Sc. IT (Cyber Security & Forensics, Parul University).
   - **Services Architecture (`/services` & `/services/:slug`):** Dedicated landing and detail pages for 4 core service lines:
     - *Mobile App Development & Maintenance* (Cross-platform, offline caching, secure storage, store release).
     - *Website Development, Deployment, Maintenance & SEO* (Core Web Vitals < 1.2s, technical SEO, automated CI/CD).
     - *AI and Machine Learning Development* (Predictive models, static PE malware classification pipelines, XGBoost, PyTorch, LLMs).
     - *Authorized Penetration Testing & Security Assessment* (OWASP Top 10, API audits, formal Rules of Engagement, developer remediation, retesting).
   - **Projects & Research Portfolio (`/projects`):** All 6 original projects preserved and enhanced with system architecture breakdowns, verified technologies, and GitHub repository links.
   - **Interactive 4-Stage "Get a Quote" Workflow (`/quote`):**
     - Step 1: Client Contact Information.
     - Step 2: Project Scope & Deliverables with service-specific options and mandatory legal testing authorization attestation for penetration testing.
     - Step 3: Investment Budget in INR (₹) or USD ($), timeline milestones, and preferred communication channels.
     - Step 4: Review, privacy consent, bot honeypot protection, and instant generation of a unique tracking reference (e.g., `REQ-2026-XXXX`).

2. **Editorial Technology Blog & Publishing Magazine (`/blog`, `/blog/:slug`):**
   - Magazine layout with featured story hero, real-time keyword search, and category taxonomy pills.
   - Reading-optimized article pages with dynamic sticky Table of Contents, top reading progress bar, syntax-highlighted code blocks, and social sharing.
   - Initial in-depth technical publications matching Abhijit's actual research:
     - *Static PE Malware Classification with Machine Learning: A Practical Deep Dive*
     - *Linux Forensic Readiness and Incident Response: Essential Artifact Extraction*
     - *OWASP API Security Top 10: Vulnerability Hunting and Developer Mitigation*
     - *Architecting Resilient Web Applications: Performance, SEO, and Defense-in-Depth*

3. **Google AdSense-Ready Monetization Engine:**
   - Centralized `AdContainer` component with support for 4 slot types: `in-article`, `sidebar`, `between-cards`, and `footer-banner`.
   - **Zero Layout Shift (CLS):** Pre-allocated minimum dimensions prevent unexpected page movement.
   - **XSS-Hardened Configuration:** No arbitrary `<script>` injection. Only validated Publisher IDs (`ca-pub-XXXXXXXXXXXXXXXX`) and slot IDs are accepted.
   - **Development Preview Mode:** Visual dashed containers render safely for testing before Google verification.
   - Automated `ads.txt` generation and management.

4. **SaaS-Grade Admin CMS Dashboard (`/admin`):**
   - **Authentication:** Protected session state with rate-limiting, lockout defense after 5 failed attempts, and secure session expiration.
   - **Overview Dashboard:** Live KPI metrics (new quote inquiries, published posts, drafts, media assets).
   - **Quote Manager (`/admin/quotes`):** Filter by status (`New`, `Under Review`, `Quoted`, `In Progress`, `Completed`, `Archived`), search, detail drawer, internal private notes, and CSV export.
   - **Article Manager (`/admin/blog` & `/admin/blog/new`):** Full CRUD, auto-slug generator, Markdown/rich editor with live side-by-side preview, featured image selector, and SEO meta tags panel.
   - **Category Manager (`/admin/categories`):** Taxonomy management with post-association protection.
   - **Media Library (`/admin/media`):** Local image upload with MIME-type and size validation (JPEG, PNG, WebP, SVG < 5MB), metadata inspection, and instant URL copying.
   - **AdSense Settings (`/admin/adsense`):** Global and per-slot ad toggles, publisher ID configuration, and preview mode switches.

5. **Compliance & Technical SEO:**
   - Structured JSON-LD microdata for `Person`, `WebSite`, `Service`, and `BlogPosting`.
   - Dynamic meta tags, OpenGraph previews, and Twitter Cards.
   - Clean `public/robots.txt` and `public/sitemap.xml`.
   - GDPR / DPDP Act compliant Privacy Policy, Terms of Service, Cookie Policy (with interactive consent banner), and Penetration Testing Ethical Disclaimer.

---

## 2. Directory Structure

```
├── public/
│   ├── ads.txt                 # Google AdSense authorized sellers configuration
│   ├── ncc-photo.jpg           # Verified officer photograph
│   ├── robots.txt              # Search crawler instructions
│   └── sitemap.xml             # Complete XML sitemap
├── src/
│   ├── components/
│   │   ├── ads/
│   │   │   └── AdContainer.jsx # Safe AdSense wrapper with layout stability
│   │   ├── blog/
│   │   │   ├── BlogCard.jsx
│   │   │   ├── ReadingProgressBar.jsx
│   │   │   └── TableOfContents.jsx
│   │   ├── layout/
│   │   │   ├── Breadcrumbs.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Navbar.jsx
│   │   ├── legal/
│   │   │   └── CookieConsentBanner.jsx
│   │   └── ui/
│   │       ├── Icons.jsx       # SVG brand icons
│   │       ├── Radar.jsx       # Interactive cybersecurity HUD radar
│   │       └── Toast.jsx       # Floating notifications
│   ├── context/
│   │   ├── AuthContext.jsx     # Admin authentication & lockout security
│   │   ├── CMSContext.jsx      # Reactive quote, blog, media, and ads store
│   │   └── ThemeContext.jsx    # Dark/Light theme provider
│   ├── data/
│   │   ├── credentialsData.js  # Education, experience, credentials, skills
│   │   ├── initialBlogPosts.js # Technical research publications
│   │   ├── initialCategories.js# Blog topic taxonomies
│   │   ├── initialMedia.js     # Media library seed metadata
│   │   ├── initialProjects.js  # 6 verified portfolio projects
│   │   └── initialServices.js  # 4 detailed service specifications
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminAdSense.jsx
│   │   │   ├── AdminBlog.jsx
│   │   │   ├── AdminBlogEditor.jsx
│   │   │   ├── AdminCategories.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminMedia.jsx
│   │   │   └── AdminQuotes.jsx
│   │   ├── blog/
│   │   │   ├── BlogPage.jsx
│   │   │   └── BlogPostPage.jsx
│   │   ├── legal/
│   │   │   ├── CookiePolicy.jsx
│   │   │   ├── Disclaimer.jsx
│   │   │   ├── PrivacyPolicy.jsx
│   │   │   └── TermsOfService.jsx
│   │   ├── projects/
│   │   │   └── ProjectsPage.jsx
│   │   ├── quote/
│   │   │   └── QuotePage.jsx
│   │   ├── services/
│   │   │   ├── ServiceDetailPage.jsx
│   │   │   └── ServicesPage.jsx
│   │   ├── about/
│   │   │   └── AboutPage.jsx
│   │   ├── Home.jsx
│   │   └── NotFound.jsx
│   ├── styles/
│   │   ├── admin.css           # SaaS dashboard styles
│   │   └── index.css           # Design tokens, typography & animations
│   ├── test/
│   │   ├── blog.test.js        # Blog & slug tests
│   │   ├── quote.test.js       # Quote validation & honeypot tests
│   │   └── seo.test.js         # JSON-LD structured data tests
│   ├── utils/
│   │   ├── formatters.js       # Currency (INR), date, read-time helpers
│   │   ├── seo.js              # Dynamic meta tag & schema manager
│   │   ├── storage.js          # Persistent local storage / state sync
│   │   └── validation.js       # Form validation, honeypot, XSS checks
│   ├── App.jsx                 # Master routing & protected guards
│   └── main.jsx                # Application entry point
├── .env.example                # Environment variables template
├── package.json
└── vite.config.js              # Bundle splitting & Vitest config
```

---

## 3. Getting Started

### Prerequisites
- Node.js 18+, 20+, or 24+
- npm 9+ or pnpm
- MongoDB (Local `mongodb://127.0.0.1:27017` or MongoDB Atlas cloud cluster)

### Installation & Launch

```bash
# 1. Clone repository
git clone https://github.com/alphamike-01/abhijit-portfolio.git
cd abhijit-portfolio

# 2. Install frontend dependencies
npm install

# 3. Install backend server dependencies
cd server && npm install && cd ..

# 4. Start the MongoDB Express Backend API (Port 5000)
npm run server

# 5. Start the Vite React Frontend (Port 5173) in a new terminal
npm run dev

# Optional: Seed initial database collections
npm run seed
```

### Database & Storage Architecture
- **Engine:** MongoDB via Mongoose ODM.
- **Connection Configuration:** Set `MONGODB_URI` in `server/.env` (supports `mongodb://127.0.0.1:27017/abhijit_portfolio` or `mongodb+srv://...` for MongoDB Atlas).
- **Graceful Fallback:** If MongoDB is offline, the platform automatically falls back to the client-side local cache without breaking or crashing.
- **Sync Feature:** The admin dashboard includes a one-click *"Sync Local Data to MongoDB"* button to push existing local records directly into MongoDB.

# 4. Start local development server
npm run dev
```

The application will start at `http://localhost:5173`.

---

## 4. Running Automated Tests

A comprehensive Vitest test suite is included covering quote validation, honeypot anti-spam, penetration testing legal attestations, blog slugification, reading time estimation, and JSON-LD structured data schemas:

```bash
npm run test
```

---

## 5. Building for Production

```bash
npm run build
```

This compiles optimized, code-split assets into the `dist/` directory with vendor and icon chunk separation.

To preview the production build locally:
```bash
npm run preview
```

---

## 6. Admin Authentication & Setup

The Admin Dashboard is accessible at `/admin`.

### Default Initial Provisioning Credentials:
- **Email:** `admin@abhijitmondal.dev`
- **Password:** `AdminMondal@2026!`

*Security Note: Update these credentials in your production authentication provider or environment configuration upon deployment.*

---

## 7. Google AdSense Setup Guide

1. Apply for Google AdSense with your verified custom domain (`https://abhijitmondal.dev`).
2. Once approved, navigate to `/admin/adsense`.
3. Input your official **Publisher ID** (e.g., `ca-pub-XXXXXXXXXXXXXXXX`).
4. Paste your individual **Ad Unit Slot IDs** into the designated placements (`in-article`, `sidebar`, `between-cards`, `footer-banner`).
5. Update `public/ads.txt` with your official Google publisher record:
   ```text
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
6. Toggle **Enable Live Google AdSense Advertisements** to `Active` and click **Save Monetization Configuration**.

---

## 8. License & Attribution

- **Engineering Code & UI Architecture:** Copyright © 2026 Abhijit Mondal. All rights reserved.
- **Defensive Research & Tutorials:** Published for educational, defensive, and threat-modeling purposes.
