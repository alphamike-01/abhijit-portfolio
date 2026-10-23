import { initialBlogPosts } from "../data/initialBlogPosts";
import { initialCategories } from "../data/initialCategories";
import { initialProjects } from "../data/initialProjects";
import { initialServices } from "../data/initialServices";
import { initialMedia } from "../data/initialMedia";

const STORAGE_KEYS = {
  QUOTES: "am_portfolio_quotes_v2",
  POSTS: "am_portfolio_posts_v2",
  CATEGORIES: "am_portfolio_categories_v2",
  MEDIA: "am_portfolio_media_v2",
  ADS_SETTINGS: "am_portfolio_ads_settings_v2",
  THEME: "am_portfolio_theme_v2",
  COOKIE_CONSENT: "am_cookie_consent_v2"
};

// Initial default quote submissions for testing and admin preview
const defaultQuotes = [
  {
    id: "REQ-2026-1042",
    createdAt: "2026-10-18T10:30:00.000Z",
    status: "New",
    name: "Dr. Vikram Sethi",
    email: "vikram.sethi@healthcloud.org",
    phone: "+91 98301 22445",
    organization: "HealthCloud Diagnostics",
    serviceId: "penetration-testing",
    serviceTitle: "Authorized Penetration Testing & Security Assessment",
    projectTitle: "Healthcare API & Patient Records Security Assessment",
    projectDescription: "We require a comprehensive authorized penetration test on our FHIR clinical data API endpoints and healthcare portal ahead of our quarterly audit.",
    deliverables: ["OWASP API Top 10 Audit", "Formal Attestation Letter", "Developer Remediation Workshop"],
    budgetRange: "₹50,000 – ₹1,00,000",
    timeline: "2-4 Weeks",
    preferredContact: "Email & Google Meet",
    authorizedAttestation: true,
    privacyConsent: true,
    notes: "High priority client. Verified domain ownership and AWS testing approval document."
  },
  {
    id: "REQ-2026-1088",
    createdAt: "2026-10-12T14:15:00.000Z",
    status: "Quoted",
    name: "Ananya Ray",
    email: "ananya@fintechpulse.io",
    phone: "+91 97482 11993",
    organization: "FintechPulse Pvt Ltd",
    serviceId: "ai-ml-development",
    serviceTitle: "AI and Machine Learning Development",
    projectTitle: "Automated Fraud Transaction Classifier",
    projectDescription: "Looking to deploy a low-latency fraud scoring microservice in Python/FastAPI using gradient boosted trees trained on our tabular transaction data.",
    deliverables: ["Custom Model Training", "FastAPI Docker Container", "Latency Benchmarking"],
    budgetRange: "₹1,00,000 – ₹2,50,000",
    timeline: "1-2 Months",
    preferredContact: "WhatsApp & Email",
    authorizedAttestation: false,
    privacyConsent: true,
    notes: "Sent proposal draft on Oct 14. Waiting on NDA countersignature."
  }
];

const defaultAdSettings = {
  enabled: false, // Default disabled until user adds their approved Google Publisher ID
  publisherId: "ca-pub-0000000000000000",
  previewMode: true, // Enables visual outline placeholders for testing
  slots: {
    "in-article": { enabled: true, slotId: "1234567890", name: "In-Article Placement" },
    "sidebar": { enabled: true, slotId: "2345678901", name: "Desktop Sidebar" },
    "between-cards": { enabled: true, slotId: "3456789012", name: "Between Blog Cards" },
    "footer-banner": { enabled: true, slotId: "4567890123", name: "Footer Banner" }
  }
};

function safeGet(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Local storage error:", e);
  }
}

// Service Requests / Quotes API
export const quotesStore = {
  getAll: () => safeGet(STORAGE_KEYS.QUOTES, defaultQuotes),
  getById: (id) => {
    const quotes = quotesStore.getAll();
    return quotes.find((q) => q.id === id) || null;
  },
  create: (quoteData) => {
    const quotes = quotesStore.getAll();
    const newQuote = {
      ...quoteData,
      createdAt: new Date().toISOString(),
      status: "New",
      notes: ""
    };
    quotes.unshift(newQuote);
    safeSet(STORAGE_KEYS.QUOTES, quotes);
    return newQuote;
  },
  update: (id, updates) => {
    const quotes = quotesStore.getAll();
    const index = quotes.findIndex((q) => q.id === id);
    if (index !== -1) {
      quotes[index] = { ...quotes[index], ...updates, updatedAt: new Date().toISOString() };
      safeSet(STORAGE_KEYS.QUOTES, quotes);
      return quotes[index];
    }
    return null;
  },
  delete: (id) => {
    const quotes = quotesStore.getAll().filter((q) => q.id !== id);
    safeSet(STORAGE_KEYS.QUOTES, quotes);
    return true;
  }
};

// Blog Posts API
export const blogStore = {
  getAll: () => safeGet(STORAGE_KEYS.POSTS, initialBlogPosts),
  getBySlug: (slug) => {
    const posts = blogStore.getAll();
    return posts.find((p) => p.slug === slug) || null;
  },
  getPublished: () => {
    const posts = blogStore.getAll();
    return posts.filter((p) => p.status === "published");
  },
  create: (postData) => {
    const posts = blogStore.getAll();
    const newPost = {
      ...postData,
      id: postData.slug || `post-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    posts.unshift(newPost);
    safeSet(STORAGE_KEYS.POSTS, posts);
    return newPost;
  },
  update: (id, updates) => {
    const posts = blogStore.getAll();
    const index = posts.findIndex((p) => p.id === id);
    if (index !== -1) {
      posts[index] = { ...posts[index], ...updates, updatedAt: new Date().toISOString() };
      safeSet(STORAGE_KEYS.POSTS, posts);
      return posts[index];
    }
    return null;
  },
  delete: (id) => {
    const posts = blogStore.getAll().filter((p) => p.id !== id);
    safeSet(STORAGE_KEYS.POSTS, posts);
    return true;
  }
};

// Categories API
export const categoriesStore = {
  getAll: () => safeGet(STORAGE_KEYS.CATEGORIES, initialCategories),
  create: (cat) => {
    const cats = categoriesStore.getAll();
    cats.push(cat);
    safeSet(STORAGE_KEYS.CATEGORIES, cats);
    return cat;
  },
  update: (id, updates) => {
    const cats = categoriesStore.getAll();
    const index = cats.findIndex((c) => c.id === id);
    if (index !== -1) {
      cats[index] = { ...cats[index], ...updates };
      safeSet(STORAGE_KEYS.CATEGORIES, cats);
      return cats[index];
    }
    return null;
  },
  delete: (id) => {
    const cats = categoriesStore.getAll().filter((c) => c.id !== id);
    safeSet(STORAGE_KEYS.CATEGORIES, cats);
    return true;
  }
};

// Media Library Store
export const mediaStore = {
  getAll: () => safeGet(STORAGE_KEYS.MEDIA, initialMedia),
  add: (mediaItem) => {
    const media = mediaStore.getAll();
    media.unshift(mediaItem);
    safeSet(STORAGE_KEYS.MEDIA, media);
    return mediaItem;
  },
  update: (id, updates) => {
    const media = mediaStore.getAll();
    const idx = media.findIndex((m) => m.id === id);
    if (idx !== -1) {
      media[idx] = { ...media[idx], ...updates };
      safeSet(STORAGE_KEYS.MEDIA, media);
      return media[idx];
    }
    return null;
  },
  delete: (id) => {
    const media = mediaStore.getAll().filter((m) => m.id !== id);
    safeSet(STORAGE_KEYS.MEDIA, media);
    return true;
  }
};

// AdSense Settings Store
export const adSettingsStore = {
  get: () => safeGet(STORAGE_KEYS.ADS_SETTINGS, defaultAdSettings),
  save: (settings) => {
    safeSet(STORAGE_KEYS.ADS_SETTINGS, settings);
    return settings;
  }
};
