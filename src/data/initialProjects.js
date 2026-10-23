export const initialProjects = [
  {
    id: "pe-malware-classifier",
    title: "ML-Based Malware Classifier Web Application",
    shortDesc: "XGBoost-based malware classification pipeline using the EMBER dataset for static PE file analysis, with a Next.js frontend and FastAPI backend.",
    fullDesc: "An end-to-end machine learning system designed to detect malicious portable executable (PE) files without execution. Built using feature extraction over raw header metadata, byte histograms, section entropy, and imported DLL fingerprints. The classifier leverages an optimized XGBoost model evaluated against EMBER benchmarks, serving real-time predictions via an asynchronous FastAPI REST microservice paired with an interactive Next.js dashboard.",
    category: "ML / SECURITY",
    domain: "Machine Learning & Security",
    status: "Completed / Active",
    featured: true,
    year: "2026",
    technologies: ["Python", "XGBoost", "FastAPI", "Next.js", "EMBER Dataset", "LIEF", "Docker"],
    architecture: [
      "Static feature extraction (entropy, PE headers, exports/imports) using LIEF",
      "Gradient-boosted decision trees trained for minimal false-positive rates",
      "FastAPI inference gateway with asynchronous streaming analysis",
      "Responsive React / Next.js client for drag-and-drop binary inspection"
    ],
    githubUrl: "https://github.com/alphamike-01",
    liveDemoUrl: null,
    researchHighlight: "Trained on static PE feature vectors with high accuracy on packed and obfuscated samples."
  },
  {
    id: "tactical-cybersecurity-framework",
    title: "Resilience-Oriented Multilayer Cybersecurity Framework",
    shortDesc: "Research work on an integrated cybersecurity framework for tactical operations and resilient tactical communication environments.",
    fullDesc: "A multi-tiered tactical cyber defense architecture addressing contested RF environments, node failure recovery, and unauthorized telemetry injection. The framework defines secure key distribution protocols, cryptographic heartbeat verifications, and anomaly scoring to maintain communications continuity during active electronic and network interference.",
    category: "RESEARCH",
    domain: "Cybersecurity & Forensics",
    status: "Research Published",
    featured: true,
    year: "2026",
    technologies: ["Network Security", "Cryptography", "Tactical Protocols", "Python", "Wireshark", "Scapy"],
    architecture: [
      "Multilayer defense spanning transport, application, and physical telemetry",
      "Low-overhead heartbeat authentication designed for constrained bandwidth",
      "Dynamic node reputation scoring and autonomous failover routing"
    ],
    githubUrl: "https://github.com/alphamike-01",
    liveDemoUrl: null,
    researchHighlight: "Presented defensive mechanisms for ad-hoc tactical meshes subjected to targeted packet degradation."
  },
  {
    id: "linux-forensics-engine",
    title: "Linux Forensics Engine",
    shortDesc: "A Linux-focused forensic utility project for collecting and presenting system evidence during investigations.",
    fullDesc: "An automated incident response and digital forensics artifact extractor tailored for Linux distributions. Gathers volatile memory snapshots, system logs, bash history, process trees, network sockets, active cron jobs, and file integrity hashes without modifying critical timeline metadata. Outputs structured JSON and timeline reports ready for forensic validation.",
    category: "FORENSICS",
    domain: "Cybersecurity & Forensics",
    status: "Production Ready",
    featured: true,
    year: "2025–2026",
    technologies: ["Linux", "Bash", "Python", "Volatility", "Auditd", "JSON Report Engine"],
    architecture: [
      "Read-only artifact extraction preserving inode and MAC timestamps",
      "Automated extraction of /proc, /var/log, auth logs, and open socket states",
      "Cryptographic SHA-256 chain-of-custody verification for captured artifacts"
    ],
    githubUrl: "https://github.com/alphamike-01",
    liveDemoUrl: null,
    researchHighlight: "Engineered specifically to minimize live system footprint during volatile evidence acquisition."
  },
  {
    id: "municipality-complaint-system",
    title: "Municipality Complaint Management System",
    shortDesc: "Complaint registration and management application developed for Vadodara Hackathon 6.0.",
    fullDesc: "Civic governance application engineered to streamline citizen grievance filing and administrative resolution tracking. Features geographic incident tagging, automated routing to municipal departments, photo uploads with validation, and real-time status progression for citizens and municipal officers.",
    category: "HACKATHON",
    domain: "Web & Software",
    status: "Awarded / Hackathon Finalist",
    featured: false,
    year: "2025",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Geolocation API", "Tailwind CSS"],
    architecture: [
      "Role-based access control (Citizen, Field Worker, Municipal Officer, Superadmin)",
      "Automated ticket assignment based on ward and grievance category",
      "Interactive status tracker with SMS and email triggers"
    ],
    githubUrl: "https://github.com/alphamike-01",
    liveDemoUrl: null,
    researchHighlight: "Awarded recognized status at Vadodara Hackathon 6.0 for rapid civic issue triage."
  },
  {
    id: "hospital-management-system",
    title: "Hospital Management System",
    shortDesc: "Python and MongoDB based management application for clinical records and scheduling.",
    fullDesc: "Robust clinic operations platform providing outpatient registration, doctor scheduling, electronic prescription storage, and pharmacy inventory synchronization. Implements strict data isolation and schema validation to maintain patient confidentiality and audit logs.",
    category: "SOFTWARE",
    domain: "Web & Software",
    status: "Completed",
    featured: false,
    year: "2024",
    technologies: ["Python", "Tkinter", "MongoDB", "PyMongo", "ReportLab"],
    architecture: [
      "Document-oriented database architecture storing clinical consultation notes",
      "Automated PDF bill and prescription generator using ReportLab",
      "Secure credential hashing and role-based interface restrictions"
    ],
    githubUrl: "https://github.com/alphamike-01",
    liveDemoUrl: null,
    researchHighlight: "Architected around patient data security and rapid emergency desk lookup."
  },
  {
    id: "obstacle-detection-robot",
    title: "Assistive Obstacle Detection Robot & Smart Blind Stick",
    shortDesc: "Arduino-based assistive and obstacle-detection projects using ultrasonic sensing.",
    fullDesc: "Physical computing and assistive technology prototype combining ultrasonic proximity sensors, haptic vibration motors, and acoustic buzzers to assist visually impaired individuals in navigating indoor and outdoor environments safely. Includes a companion robotic rover that maps room boundaries using distance-threshold algorithms.",
    category: "HARDWARE",
    domain: "Hardware & IoT",
    status: "Completed / Prototyped",
    featured: false,
    year: "2023",
    technologies: ["Arduino C++", "Ultrasonic Sensors (HC-SR04)", "Embedded Systems", "Haptic Motors"],
    architecture: [
      "Real-time echo ping distance calculations with millisecond debounce",
      "Dual-stage warning system: directional vibration followed by audible alert",
      "Low-power micro-controller optimization for extended battery life"
    ],
    githubUrl: "https://github.com/alphamike-01",
    liveDemoUrl: null,
    researchHighlight: "Featured in daily print newspaper for grassroots assistive robotics innovation."
  }
];
