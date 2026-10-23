export const initialServices = [
  {
    id: "mobile-app-development",
    slug: "mobile-app-development",
    title: "Mobile App Development & Maintenance",
    shortTitle: "Mobile Applications",
    tagline: "High-performance, secure cross-platform and native mobile apps tailored for iOS and Android.",
    icon: "Smartphone",
    badge: "Cross-Platform & Native",
    summary: "From intuitive user interfaces to secure offline-first data caching and encrypted API synchronization, we build resilient mobile applications engineered for fluid performance and frictionless store approval.",
    clientOutcomes: [
      "Rapid time-to-market with clean, scalable codebase",
      "Seamless offline accessibility and background data sync",
      "Secure local storage for tokens and confidential client information",
      "Guaranteed compliance with Google Play Store & Apple App Store guidelines",
      "Continuous maintenance, OS upgrade patching, and analytics monitoring"
    ],
    deliverables: [
      "Production-ready iOS and Android application binaries (.aab / .apk / .ipa)",
      "REST & GraphQL client integration with automatic retry and caching layers",
      "Biometric authentication (FaceID, Fingerprint) and JWT session handling",
      "Push notification architecture (FCM / APNs) with topic-based targeting",
      "Complete deployment documentation, App Store asset preparation, and source code transfer"
    ],
    techStack: ["React Native", "Flutter", "Android Studio", "Kotlin", "TypeScript", "SQLite", "Firebase", "Fastlane"],
    workflow: [
      { step: "01", title: "Architecture & User Journey", desc: "Wireframing, state design, API contract mapping, and platform-specific UX guidelines." },
      { step: "02", title: "Core Engineering", desc: "Component architecture, screen implementation, local encrypted databases, and backend integration." },
      { step: "03", title: "Quality & Security Assurance", desc: "Automated test suites, device farm testing, memory leak profiling, and static security checks." },
      { step: "04", title: "Store Submission & Launch", desc: "Privacy policy compliance, store asset generation, metadata optimization, and release review management." },
      { step: "05", title: "Ongoing SLAs", desc: "Scheduled dependency updates, OS patch testing, crash diagnostics, and performance optimization." }
    ],
    scopeLimitations: [
      "Third-party store developer accounts (Apple Developer Program $99/yr, Google Play Console $25) must be owned and funded directly by the client.",
      "Custom native hardware drivers or low-level Bluetooth peripheral development requires physical hardware test units shipped prior to project kickoff."
    ],
    faqs: [
      { q: "Do you develop for both iOS and Android simultaneously?", a: "Yes. Using battle-tested cross-platform frameworks like React Native or Flutter, we deliver unified codebases that feel truly native on both platforms, saving up to 40% in initial development and ongoing maintenance overhead." },
      { q: "How do you handle ongoing operating system updates?", a: "We provide dedicated maintenance agreements where we audit, test, and patch apps before major iOS and Android version releases to guarantee zero downtime or broken layouts." },
      { q: "Can you take over an existing half-finished app?", a: "Yes. We start with a comprehensive code and dependency audit to identify security gaps, technical debt, and architectural bottlenecks before continuing feature implementation." }
    ],
    pricingGuide: "Starting from ₹35,000 for focused MVPs to ₹1,50,000+ for complex enterprise apps with real-time sync and custom backends."
  },
  {
    id: "web-development-seo",
    slug: "web-development-seo",
    title: "Website Development, Deployment, Maintenance & SEO",
    shortTitle: "Web Development & SEO",
    tagline: "Lightning-fast, search-optimized web applications with modern architectures and hardened server deployments.",
    icon: "Globe",
    badge: "Core Web Vitals < 1.2s",
    summary: "We design and develop scalable full-stack web platforms that combine commanding visual presence with rigorous technical SEO, sub-second load times, and hardened cloud infrastructure.",
    clientOutcomes: [
      "Superior search engine indexing with automated JSON-LD schemas and canonical routing",
      "Sub-second Largest Contentful Paint (LCP) and zero Cumulative Layout Shift (CLS)",
      "Responsive experiences engineered specifically for mobile, tablet, and desktop viewports",
      "Automated CI/CD deployment pipelines with zero-downtime rollouts",
      "Enterprise security headers (CSP, HSTS, X-Frame-Options) pre-configured"
    ],
    deliverables: [
      "Custom responsive frontend built in React / Vite / Next.js with modular design systems",
      "Robust RESTful or GraphQL backend APIs with database schema migrations",
      "Complete technical SEO setup: sitemap.xml, robots.txt, OpenGraph, JSON-LD structured data",
      "Automated SSL/TLS certificate configuration and HTTP/3 edge caching",
      "Full source code repository, deployment playbook, and admin management training"
    ],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "FastAPI", "PostgreSQL", "MongoDB", "Nginx", "Docker", "Tailwind CSS"],
    workflow: [
      { step: "01", title: "Technical Discovery & SEO Plan", desc: "Information architecture, keyword strategy, schema definition, and competitor benchmarking." },
      { step: "02", title: "Design System & Frontend Dev", desc: "Accessible UI components, fluid responsive layouts, and interactive state management." },
      { step: "03", title: "Backend, API & CMS Integration", desc: "Database models, authentication, role access, and dynamic content management workflows." },
      { step: "04", title: "SEO, Performance & Security Audit", desc: "Lighthouse 95+ score optimization, bundle splitting, asset compression, and security header verification." },
      { step: "05", title: "Deployment & Monitoring", desc: "Cloud provisioning (VPS, Vercel, AWS), DNS configuration, Search Console verification, and uptime monitors." }
    ],
    scopeLimitations: [
      "Ongoing organic SEO rankings depend on consistent high-quality editorial content creation and domain authority development beyond initial technical SEO setup.",
      "Domain registration and recurring third-party cloud hosting fees are paid directly to the respective providers."
    ],
    faqs: [
      { q: "What makes your websites different from off-the-shelf page builders?", a: "We engineer custom, lightweight codebases with zero bloat. This produces sub-second page loads, higher search rankings, complete ownership of your code, and freedom from monthly subscription builder lock-ins." },
      { q: "How do you ensure our site ranks on Google?", a: "We engineer technical SEO from day one: clean semantic HTML5, server-side / static rendering, accurate schema.org microdata, mobile-first design, fast Core Web Vitals, canonical links, and automated sitemaps." },
      { q: "Can we edit our own content without writing code?", a: "Absolutely. We provide intuitive, secure administrative dashboards where you can manage articles, services, media, and client enquiries effortlessly." }
    ],
    pricingGuide: "Starting from ₹25,000 for professional portfolio/service sites to ₹90,000+ for dynamic SaaS platforms and full-stack web applications."
  },
  {
    id: "ai-ml-development",
    slug: "ai-ml-development",
    title: "AI and Machine Learning Development",
    shortTitle: "AI & Machine Learning",
    tagline: "Custom machine learning models, predictive intelligence, and secure generative AI integrations.",
    icon: "BrainCircuit",
    badge: "Custom Models & LLMs",
    summary: "Transform complex raw data into actionable decision-making pipelines. From training custom gradient-boosted trees and neural classifiers to fine-tuning LLMs and deploying low-latency inference APIs, we build production AI that works.",
    clientOutcomes: [
      "Automate manual classification and predictive tasks with measurable statistical accuracy",
      "Deploy custom machine learning models into lightweight, asynchronous REST APIs",
      "Integrate state-of-the-art LLMs (OpenAI, Anthropic, Gemini, local Ollama) with proprietary enterprise data",
      "Defend AI endpoints against prompt injection, model extraction, and data poisoning attacks",
      "Full transparency with reproducible evaluation benchmarks and confusion matrices"
    ],
    deliverables: [
      "Data preprocessing, exploratory data analysis (EDA), and automated feature engineering pipelines",
      "Trained model artifacts (.onnx, .pkl, .pt) with cross-validated performance metrics",
      "Asynchronous inference backend (FastAPI / PyTorch / ONNX Runtime) packaged in Docker",
      "Interactive evaluation dashboard for monitoring model drift and confidence thresholds",
      "Detailed research documentation, feature importance charts, and architecture diagrams"
    ],
    techStack: ["Python", "PyTorch", "XGBoost", "Scikit-Learn", "FastAPI", "Pandas", "NumPy", "LIEF", "HuggingFace", "Docker"],
    workflow: [
      { step: "01", title: "Problem Definition & Feasibility", desc: "Dataset assessment, evaluation metrics definition (F1, AUC-ROC, Precision/Recall), and pipeline blueprint." },
      { step: "02", title: "Data Preparation & Feature Engineering", desc: "Cleaning, anomaly filtering, vectorization, and static feature extraction." },
      { step: "03", title: "Model Training & Hyperparameter Tuning", desc: "Iterative experimentation across candidate architectures with cross-validation." },
      { step: "04", title: "Security Hardening & Adversarial Testing", desc: "Testing model robustness against perturbed inputs, evasion techniques, and payload boundary tests." },
      { step: "05", title: "Production Deployment", desc: "FastAPI inference containerization, latency benchmarking, and client application integration." }
    ],
    scopeLimitations: [
      "Supervised ML accuracy is directly bounded by the quantity and quality of representative training data supplied or collected.",
      "Massive foundation model pre-training from scratch requires dedicated GPU clusters and is scoped as specialized research engagements."
    ],
    faqs: [
      { q: "How do you evaluate whether machine learning is appropriate for my problem?", a: "We begin with a data and objective evaluation. If a problem is better solved with deterministic business logic or rule engines, we tell you directly to save you unnecessary computing and engineering costs." },
      { q: "How do you protect AI pipelines from security vulnerabilities?", a: "As security specialists, we audit serialization formats (avoiding unsafe pickle deserialization), validate input tensors against adversarial perturbations, and implement strict API rate limiting and token validation." },
      { q: "Can you deploy models locally without sending data to third-party clouds?", a: "Yes. We specialize in deploying quantized on-premise models using ONNX Runtime, Ollama, and local FastAPI containers for complete data privacy." }
    ],
    pricingGuide: "Starting from ₹40,000 for predictive analysis/prototypes to ₹1,20,000+ for custom production classification pipelines and LLM systems."
  },
  {
    id: "penetration-testing",
    slug: "penetration-testing",
    title: "Authorized Penetration Testing & Security Assessment",
    shortTitle: "Penetration Testing",
    tagline: "Rigorous, authorized security audits and vulnerability assessments to protect your digital assets before attackers find them.",
    icon: "ShieldAlert",
    badge: "Authorized Assessments Only",
    summary: "Identify critical vulnerabilities in your web applications, APIs, and network perimeters through realistic, authorized ethical penetration testing. Receive actionable remediation roadmaps with direct engineering guidance.",
    clientOutcomes: [
      "Discover exploitable vulnerabilities in web apps and APIs prior to malicious exploitation",
      "Verify OWASP Top 10 defenses including SQLi, SSRF, IDOR, broken authentication, and business logic flaws",
      "Obtain an executive summary for stakeholders alongside detailed technical remediation steps for developers",
      "Demonstrate proactive security compliance to clients, investors, and regulatory bodies",
      "Complimentary re-testing of remediated findings to verify complete vulnerability closure"
    ],
    deliverables: [
      "Signed Mutual NDA and Formal Rules of Engagement (RoE) document",
      "Comprehensive Penetration Testing Report with CVSS 3.1 severity ratings",
      "Step-by-step Proof of Concept (PoC) reproductions for every verified vulnerability",
      "Developer remediation playbook with concrete code snippets and configuration fixes",
      "Post-fix verification retest and Formal Security Assessment Attestation Letter"
    ],
    techStack: ["Burp Suite Professional", "Nmap", "Wireshark", "Metasploit", "Gobuster", "Hydra", "Linux / Kali", "Python Scripting"],
    workflow: [
      { step: "01", title: "Scope Agreement & Authorization", desc: "Formal written authorization, IP/domain boundary confirmation, testing windows, and legal sign-off." },
      { step: "02", title: "Reconnaissance & Threat Modeling", desc: "Target footprinting, exposed service mapping, tech stack fingerprinting, and attack surface enumeration." },
      { step: "03", title: "Active Vulnerability Exploitation", desc: "Rigorous manual and automated testing across authentication, access controls, business logic, and API endpoints." },
      { step: "04", title: "Risk Analysis & Report Preparation", desc: "CVSS severity scoring, business impact analysis, and practical remediation blueprint authoring." },
      { step: "05", title: "Remediation Review & Retesting", desc: "Collaboration with your dev team, validation of deployed patches, and issuance of closure attestation." }
    ],
    scopeLimitations: [
      "ALL TESTING REQUIRES VERIFIED LEGAL AUTHORIZATION. We never assess systems, domains, or infrastructure without explicit written consent from the verified system owner.",
      "Social engineering against personnel or physical facility penetration must be agreed upon under distinct specialized contracts."
    ],
    faqs: [
      { q: "What is required before testing can begin?", a: "We require a signed Scope of Work and Rules of Engagement document, confirmation of system ownership or hosting provider consent, and agreement on designated IP ranges and testing schedules." },
      { q: "Will penetration testing disrupt our production services?", a: "We take extreme care to minimize operational impact. Tests are performed during agreed maintenance windows or on staging environments, and high-impact payload testing is closely coordinated." },
      { q: "What happens if a critical vulnerability is found mid-test?", a: "We initiate immediate emergency notification via secure communication channels within 2 hours of discovery, allowing your engineering team to implement immediate hotfixes." }
    ],
    pricingGuide: "Starting from ₹30,000 for focused web application/API audits to ₹95,000+ for comprehensive full-perimeter network and infrastructure assessments."
  },
  {
    id: "cybersecurity-consultancy",
    slug: "cybersecurity-consultancy",
    title: "Cybersecurity & Technology Architecture Consultancy",
    shortTitle: "Strategic Advisory & Consulting",
    tagline: "Fractional cybersecurity leadership, threat modeling, and resilient cloud architecture advisory for growing teams.",
    icon: "Compass",
    badge: "Fractional CISO & Architecture",
    summary: "Strategic technical leadership bridging enterprise software engineering and defensive cybersecurity. We advise founders, CTOs, and engineering teams on secure systems architecture, zero-trust cloud migrations, SOC 2 / ISO 27001 readiness, and proactive threat modeling.",
    clientOutcomes: [
      "Accelerate compliance readiness for SOC 2 Type II, ISO 27001, and Indian DPDP Act standards",
      "Eliminate architectural security vulnerabilities early during system design before code is written",
      "Establish resilient DevSecOps pipelines with automated SAST/DAST and secret scanning",
      "Executive cybersecurity guidance and board-level risk reporting without the overhead of a full-time CISO",
      "Vendor security assessment and third-party SaaS risk evaluation"
    ],
    deliverables: [
      "Comprehensive Cloud Infrastructure & Architecture Security Blueprint",
      "STRIDE & PASTA Threat Modeling Assessment Report for core applications",
      "DevSecOps CI/CD Pipeline Hardening Specification & Policy-as-Code rules",
      "Incident Response (IR) Playbooks & Disaster Recovery runbooks",
      "Bi-weekly Architecture Review Sessions, ad-hoc advisory calls, and PR review approvals"
    ],
    techStack: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "STRIDE", "OWASP SAMM", "CIS Benchmarks", "PostgreSQL"],
    workflow: [
      { step: "01", title: "Architecture & Posture Discovery", desc: "Evaluate existing infrastructure topologies, cloud IAM permissions, tech stack debt, and data governance flows." },
      { step: "02", title: "Threat Modeling & Gap Analysis", desc: "Systematic STRIDE threat modeling against critical data paths, authentication boundaries, and third-party integrations." },
      { step: "03", title: "Strategic Roadmap & Policies", desc: "Formulate prioritized remediation roadmap, secure architecture blueprints, and engineering baseline standards." },
      { step: "04", title: "DevSecOps & Pipeline Integration", desc: "Implement automated security gates, dependency vulnerability scanners, and secret detection in CI/CD." },
      { step: "05", title: "Fractional Leadership & Governance", desc: "Ongoing sprint architecture reviews, compliance audit preparation, and engineering team mentoring." }
    ],
    scopeLimitations: [
      "Advisory engagements provide strategic guidance, architecture specifications, and security policies; hands-on deployment can be combined with our Web/Mobile engineering services.",
      "Third-party compliance certification audits (e.g. AICPA accredited SOC 2 attestation) are issued by external accredited CPA audit firms."
    ],
    faqs: [
      { q: "What is Fractional Cybersecurity & Architecture Leadership?", a: "It provides your organization with on-demand principal-level expertise without the cost of a full-time executive. You get experienced strategic direction for security architecture, vendor reviews, cloud hardening, and compliance roadmap execution." },
      { q: "At what stage should a startup or company engage an architecture consultant?", a: "The best time is before significant architectural decisions are cemented or prior to raising capital, onboarding enterprise clients, or facing formal security audits. Designing security in early costs a fraction of refactoring later." },
      { q: "How does this engagement differ from Penetration Testing?", a: "Penetration testing is an offensive assessment attempting to break into existing, running systems. Consultancy is strategic and architectural—building resilient, defensible systems, establishing security policies, and engineering secure software lifecycles." }
    ],
    pricingGuide: "Starting from ₹35,000 for focused architectural/threat modeling audits to ₹85,000/month for fractional advisory retainers."
  },
  {
    id: "technical-training",
    slug: "technical-training",
    title: "Cybersecurity & Software Engineering Training",
    shortTitle: "Technical Training & Workshops",
    tagline: "Hands-on corporate workshops, developer secure coding bootcamps, and specialized cybersecurity masterclasses.",
    icon: "GraduationCap",
    badge: "Workshops & Bootcamps",
    summary: "Empower engineering teams, students, and organizations with deep, practical technical skills. We deliver instructor-led, hands-on masterclasses covering OWASP Top 10 secure coding, offensive and defensive penetration testing, applied machine learning pipelines, and Linux forensic incident response.",
    clientOutcomes: [
      "Upskill developer cohorts to identify and eliminate vulnerabilities before code reaches production",
      "Conduct interactive hands-on CTF (Capture The Flag) labs and real-world attack simulations",
      "Master applied machine learning from exploratory feature engineering to containerized API deployment",
      "Implement practical Linux telemetry, bash automation, and volatile memory forensic investigation drills",
      "Tailor training curricula for corporate engineering teams, universities, and technical bootcamps"
    ],
    deliverables: [
      "Customized syllabus, slide decks, and comprehensive lab runbooks",
      "Self-contained Dockerized vulnerable lab environments and interactive CTF challenge platforms",
      "Live instructor-led walkthroughs, code review sessions, and interactive Q&A workshops",
      "Individual skill evaluations, capstone project reviews, and post-session remediation guides",
      "Verifiable Certificate of Course Completion for all qualified participants"
    ],
    techStack: ["Python", "Linux / Bash", "Burp Suite", "OWASP Top 10", "Docker", "Git", "FastAPI", "React", "Wireshark", "TryHackMe Labs"],
    workflow: [
      { step: "01", title: "Needs Assessment & Objective Mapping", desc: "Identify team skill levels, tech stack requirements, and key educational learning goals." },
      { step: "02", title: "Curriculum Design & Lab Provisioning", desc: "Author custom slide materials, exercise workbooks, and Dockerized vulnerable target sandboxes." },
      { step: "03", title: "Interactive Workshop Delivery", desc: "Conduct live instructor-led technical demonstrations, hands-on guided exercises, and real-time troubleshooting." },
      { step: "04", title: "Capstone CTF / Project Assessment", desc: "Hands-on evaluation where attendees apply new competencies against practical scenarios." },
      { step: "05", title: "Feedback, Attestation & Ongoing Mentorship", desc: "Detailed cohort performance reports, individual course completion certificates, and reference materials." }
    ],
    scopeLimitations: [
      "Attendees require access to standard modern computing hardware with virtualization / containerization support or modern web browsers for cloud labs.",
      "Custom curriculum authoring requires minimum 2 weeks advance notice prior to scheduled delivery dates."
    ],
    faqs: [
      { q: "Can training sessions be conducted remotely or in-person?", a: "Both. We deliver engaging remote masterclasses via Google Meet / Zoom with cloud-hosted interactive lab environments, as well as on-premise corporate workshops and university bootcamps." },
      { q: "What technical backgrounds are catered to?", a: "We customize tracks for distinct audiences: foundational cyber awareness for all employees, defensive secure coding for software engineers, and advanced red/blue team tactics for security practitioners." },
      { q: "Do participants receive verifiable certificates?", a: "Yes. Every participant who successfully completes the workshop and capstone assessment receives a signed, verifiable Certificate of Completion." }
    ],
    pricingGuide: "Starting from ₹15,000 for focused half-day technical masterclasses to ₹65,000+ for multi-week corporate bootcamps."
  }
];
