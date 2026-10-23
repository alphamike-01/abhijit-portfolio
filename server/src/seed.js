import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Quote } from "./models/Quote.js";
import { Post } from "./models/Post.js";
import { Category } from "./models/Category.js";
import { Media } from "./models/Media.js";
import { AdSettings } from "./models/AdSettings.js";
import { AdminUser } from "./models/AdminUser.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/abhijit_portfolio";

const initialCategories = [
  { id: "cat-cybersecurity", name: "Cybersecurity & Forensics", slug: "cybersecurity", description: "Offensive assessment, incident response, reverse engineering, and threat mitigation.", icon: "Shield", count: 2 },
  { id: "cat-ai-ml", name: "AI & Machine Learning", slug: "ai-ml", description: "Static PE detection, model hardening, neural classifiers, and low-latency inference.", icon: "BrainCircuit", count: 1 },
  { id: "cat-web-dev", name: "Web Engineering", slug: "web-development", description: "High-performance full-stack architectures, technical SEO, and resilient cloud infrastructure.", icon: "Globe", count: 1 },
  { id: "cat-tutorials", name: "Developer Guides", slug: "developer-guides", description: "Pragmatic code walkthroughs, CLI workflows, and configuration blueprints.", icon: "Terminal", count: 0 }
];

const initialBlogPosts = [
  {
    id: "post-static-pe-malware-classification",
    slug: "static-pe-malware-classification-machine-learning",
    title: "Static PE Malware Classification with Machine Learning & Section Entropy",
    excerpt: "Detecting malicious Windows binaries prior to execution using byte histograms, section entropy metrics, and gradient boosted decision trees without dynamic sandbox detonation.",
    category: "AI & Machine Learning",
    tags: ["Machine Learning", "Malware Analysis", "Python", "XGBoost", "LIEF", "Cybersecurity"],
    author: "Abhijit Mondal",
    authorRole: "Cybersecurity Specialist & M.Sc. IT (Forensics)",
    publishedDate: "2026-09-15",
    readTime: "8 min read",
    status: "published",
    featured: true,
    coverImage: "/blog/blog-malware-ml.svg",
    seoTitle: "Static PE Malware Classification with Machine Learning — Abhijit Mondal",
    seoDescription: "Explore static analysis of Windows PE binaries using XGBoost, the EMBER benchmark, section entropy, and byte histogram features without runtime detonation.",
    tableOfContents: [
      { id: "the-challenge-of-static-analysis", title: "The Challenge of Static Analysis" },
      { id: "feature-engineering-pipeline", title: "The Feature Engineering Pipeline" },
      { id: "model-architecture-xgboost", title: "Why XGBoost Over Deep Neural Networks?" },
      { id: "evaluating-against-ember", title: "Evaluating Against the EMBER Benchmark" },
      { id: "production-considerations", title: "Production Deployment Considerations" }
    ],
    content: "Static malware detection provides rapid classification without executing untrusted binaries."
  },
  {
    id: "post-linux-forensic-readiness",
    slug: "linux-forensic-readiness-investigation-guide",
    title: "Linux Forensic Readiness and Incident Response: A Practical Playbook",
    excerpt: "A tactical guide for system administrators and incident responders covering volatile memory preservation, auditd rules, and maintaining forensic integrity during active intrusion investigations.",
    category: "Cybersecurity",
    tags: ["Linux", "Forensics", "Incident Response", "Bash", "Auditd", "Security"],
    author: "Abhijit Mondal",
    authorRole: "Cybersecurity Specialist & M.Sc. IT (Forensics)",
    publishedDate: "2026-08-28",
    readTime: "7 min read",
    status: "published",
    featured: true,
    coverImage: "/blog/blog-linux-forensics.svg",
    seoTitle: "Linux Forensic Readiness and Incident Response Guide — Abhijit Mondal",
    seoDescription: "Step-by-step methodologies for volatile artifact acquisition, auditd logging, and maintaining legal chain-of-custody during Linux security incidents.",
    tableOfContents: [
      { id: "order-of-volatility", title: "The Order of Volatility in Linux" },
      { id: "capturing-network-process-state", title: "Capturing Live Process and Network States" },
      { id: "auditd-configuration", title: "Configuring auditd for High-Fidelity Logging" },
      { id: "file-integrity-timestamp-preservation", title: "Preserving File Integrity & Timestamps" },
      { id: "chain-of-custody-best-practices", title: "Chain of Custody Best Practices" }
    ],
    content: "When responding to a Linux security breach, order of volatility is critical."
  },
  {
    id: "post-owasp-api-security",
    slug: "owasp-api-security-top-10-mitigation-playbook",
    title: "OWASP API Security Top 10: Detection and Mitigation Guide",
    excerpt: "A deep dive into modern API attack surfaces: hunting BOLA, flawed authentication, rate limit evasion, and Server-Side Request Forgery with practical developer remediation patterns.",
    category: "Cybersecurity",
    tags: ["API Security", "OWASP", "BOLA", "Penetration Testing", "Security Assessment"],
    author: "Abhijit Mondal",
    authorRole: "Cybersecurity Specialist & M.Sc. IT (Forensics)",
    publishedDate: "2026-07-14",
    readTime: "9 min read",
    status: "published",
    featured: false,
    coverImage: "/blog/blog-api-security.svg",
    seoTitle: "OWASP API Security Top 10 Mitigation Playbook — Abhijit Mondal",
    seoDescription: "Identify and remediate critical API vulnerabilities including BOLA (API1:2023), Broken Authentication (API2:2023), and Server-Side Request Forgery.",
    tableOfContents: [
      { id: "the-shift-to-api-first-threats", title: "The Shift to API-First Threats" },
      { id: "hunting-broken-object-level-authorization", title: "Hunting Broken Object Level Authorization (BOLA)" },
      { id: "broken-authentication-patterns", title: "Flawed Authentication & Token Handling" },
      { id: "ssrf-in-webhooks-and-parsers", title: "Server-Side Request Forgery (SSRF) in APIs" },
      { id: "developer-remediation-checklist", title: "Developer Remediation Checklist" }
    ],
    content: "Modern web architectures have shifted from monolithic HTML pages to decoupled API-first services."
  },
  {
    id: "post-architecting-resilient-web-apps",
    slug: "architecting-resilient-web-applications-2026",
    title: "Architecting Resilient Web Applications in 2026",
    excerpt: "How modern web engineering balances sub-second Core Web Vitals, bulletproof technical SEO, and enterprise security headers in production.",
    category: "Web Development",
    tags: ["Web Engineering", "React", "Next.js", "Performance", "SEO", "Security Headers"],
    author: "Abhijit Mondal",
    authorRole: "Software Engineer & Cybersecurity Specialist",
    publishedDate: "2026-06-20",
    readTime: "6 min read",
    status: "published",
    featured: false,
    coverImage: "/blog/blog-resilient-web.svg",
    seoTitle: "Architecting Resilient Web Applications in 2026 — Abhijit Mondal",
    seoDescription: "A modern blueprint for building high-performance, search-optimized web applications with hardened Content Security Policies and zero layout shifts.",
    tableOfContents: [
      { id: "the-trio-performance-seo-security", title: "The Performance, SEO, and Security Trio" },
      { id: "conquering-core-web-vitals", title: "Conquering Core Web Vitals (LCP, INP, CLS)" },
      { id: "technical-seo-foundations", title: "Automated Technical SEO Architecture" },
      { id: "hardening-http-security-headers", title: "Hardening HTTP Security Headers" },
      { id: "continuous-monitoring", title: "Continuous Monitoring & SLAs" }
    ],
    content: "High-performance web architecture requires harmonizing sub-second speed with defensive security."
  }
];

const initialMedia = [
  {
    id: "media-profile-photo",
    title: "Abhijit Mondal Official Profile Portrait",
    filename: "profile-square.png",
    url: "/profile-square.png",
    fileSize: "757 KB",
    mimeType: "image/png",
    dimensions: "782 x 782",
    altText: "Abhijit Mondal — Software Engineer & Cybersecurity Specialist official portrait",
    caption: "Official portrait photograph of Abhijit Mondal",
    uploadedAt: "2026-10-23",
    usedIn: ["Homepage Hero Radar", "About Page Dossier", "Blog Author Avatar"]
  },
  {
    id: "media-nasscom-aws-ml",
    title: "MeitY / NASSCOM AWS Machine Learning Gold Certificate",
    filename: "nasscom-aws-machine-learning.png",
    url: "/credentials/nasscom-aws-machine-learning.png",
    fileSize: "148 KB",
    mimeType: "image/png",
    dimensions: "1654 x 1169",
    altText: "Abhijit Mondal - AWS Machine Learning Gold Certificate issued by FutureSkills Prime & NASSCOM",
    caption: "Gold Category certification cleared with 97/100 aggregate score",
    uploadedAt: "2026-07-17",
    usedIn: ["About Page", "Credentials & Accreditations"]
  },
  {
    id: "media-google-cybersecurity",
    title: "Google Cybersecurity Professional Certificate",
    filename: "google-cybersecurity.png",
    url: "/credentials/google-cybersecurity.png",
    fileSize: "172 KB",
    mimeType: "image/png",
    dimensions: "1654 x 1169",
    altText: "Abhijit Mondal - Google Cybersecurity Professional Certificate via Coursera",
    caption: "Completed 9-course professional program in cybersecurity defense and SIEM tools",
    uploadedAt: "2025-10-11",
    usedIn: ["About Page", "Credentials & Accreditations"]
  },
  {
    id: "media-cisco-endpoint-security",
    title: "Cisco Networking Academy Endpoint Security Certificate",
    filename: "cisco-endpoint-security.png",
    url: "/credentials/cisco-endpoint-security.png",
    fileSize: "164 KB",
    mimeType: "image/png",
    dimensions: "1654 x 1169",
    altText: "Abhijit Mondal - Cisco Networking Academy Endpoint Security Course Completion Certificate",
    caption: "Verified credential covering malware analysis, packet captures, and endpoint defense",
    uploadedAt: "2026-03-11",
    usedIn: ["About Page", "Credentials & Accreditations"]
  }
];

const defaultQuotes = [
  {
    id: "REQ-2026-1042",
    createdAt: new Date("2026-10-18T10:30:00.000Z"),
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
    createdAt: new Date("2026-10-12T14:15:00.000Z"),
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

export async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB for seeding...");
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected to MongoDB:", MONGODB_URI);

    // 1. Categories
    const catCount = await Category.countDocuments();
    if (catCount === 0) {
      await Category.insertMany(initialCategories);
      console.log(`Seeded ${initialCategories.length} categories.`);
    } else {
      console.log(`Categories collection already contains ${catCount} documents.`);
    }

    // 2. Blog Posts
    const postCount = await Post.countDocuments();
    if (postCount === 0) {
      await Post.insertMany(initialBlogPosts);
      console.log(`Seeded ${initialBlogPosts.length} blog posts.`);
    } else {
      console.log(`Posts collection already contains ${postCount} documents.`);
    }

    // 3. Media Items
    const mediaCount = await Media.countDocuments();
    if (mediaCount === 0) {
      await Media.insertMany(initialMedia);
      console.log(`Seeded ${initialMedia.length} media records.`);
    } else {
      console.log(`Media collection already contains ${mediaCount} documents.`);
    }

    // 4. Quotes
    const quoteCount = await Quote.countDocuments();
    if (quoteCount === 0) {
      await Quote.insertMany(defaultQuotes);
      console.log(`Seeded ${defaultQuotes.length} sample quotes.`);
    } else {
      console.log(`Quotes collection already contains ${quoteCount} documents.`);
    }

    // 5. Ad Settings
    const adSettings = await AdSettings.findOne({ key: "global_ad_settings" });
    if (!adSettings) {
      await AdSettings.create({
        key: "global_ad_settings",
        enabled: false,
        publisherId: "ca-pub-0000000000000000",
        previewMode: true
      });
      console.log("Seeded default AdSettings.");
    }

    // 6. Admin User
    const adminEmail = process.env.ADMIN_EMAIL || "admin@abhijitmondal.dev";
    const adminPassword = process.env.ADMIN_PASSWORD || "AdminMondal@2026!";
    const existingAdmin = await AdminUser.findOne({ email: adminEmail.toLowerCase() });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(adminPassword, salt);
      await AdminUser.create({
        email: adminEmail.toLowerCase(),
        passwordHash: hash,
        role: "SuperAdmin"
      });
      console.log(`Seeded admin user: ${adminEmail}`);
    }

    console.log("Database seeding completed successfully!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Database seeding error:", err.message);
    process.exit(1);
  }
}

if (process.argv[1] && process.argv[1].endsWith("seed.js")) {
  seedDatabase();
}
