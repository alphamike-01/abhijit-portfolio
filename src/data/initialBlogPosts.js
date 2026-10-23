export const initialBlogPosts = [
  {
    id: "static-pe-malware-classification-machine-learning",
    slug: "static-pe-malware-classification-machine-learning",
    title: "Static PE Malware Classification with Machine Learning: A Practical Deep Dive",
    excerpt: "How gradient-boosted decision trees trained on static portable executable (PE) features achieve high detection accuracy without executing dangerous binaries.",
    category: "Artificial Intelligence",
    tags: ["Machine Learning", "Cybersecurity", "Python", "Malware Analysis", "XGBoost", "EMBER"],
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
    content: `
## The Challenge of Static Analysis

Traditional antivirus engines have long relied on cryptographic signatures (MD5/SHA-256) and brittle heuristic rules. While signature matching provides O(1) verification for previously discovered samples, it fails completely when facing polymorphic variants, packed executables, or novel zero-day malware.

Dynamic analysis—detonating an unknown binary inside a virtualized sandbox—reveals runtime behaviors such as API calls, network beacons, and registry modifications. However, modern malware incorporates sophisticated sandbox evasion techniques: checking for sleep acceleration, hypervisor vendor strings, or user mouse interactions. Furthermore, sandbox execution is computationally expensive, taking minutes per sample.

Static machine learning classification bridges this gap: it extracts rich mathematical representations from the binary file without ever executing code, classifying unknown binaries in milliseconds.

## The Feature Engineering Pipeline

In our research, we analyze Windows Portable Executable (PE32/PE32+) binaries across five distinct structural domains:

1. **Byte Histograms & Entropy:** Measuring the distribution of byte values (0–255) across the file. High entropy regions typically indicate compression or cryptographic packing algorithms.
2. **PE Header Characteristics:** Machine architecture, timestamp anomalies, compilation flags, subsystem requirements, and size of optional headers.
3. **Section Metrics:** Number of sections, section names (.text, .data, .rsrc, .upx), virtual size vs. raw size ratios, and section memory characteristics (IMAGE_SCN_MEM_EXECUTE, IMAGE_SCN_MEM_WRITE).
4. **Import Address Table (IAT):** Categorizing imported dynamic link libraries (DLLs) and sensitive Windows API functions (e.g., VirtualAllocEx, WriteProcessMemory, CreateRemoteThread).
5. **Export Tables & String Statistics:** Printable string entropy, path indicators, and suspicious registry key references.

\`\`\`python
import lief
import numpy as np

def extract_section_features(file_path):
    binary = lief.PE.parse(file_path)
    if not binary:
        return None
    
    sections = binary.sections
    num_sections = len(sections)
    entropies = [s.entropy for s in sections]
    
    return {
        "num_sections": num_sections,
        "mean_entropy": float(np.mean(entropies)) if entropies else 0.0,
        "max_entropy": float(np.max(entropies)) if entropies else 0.0,
        "has_executable_data": any(s.is_writable and s.is_executable for s in sections)
    }
\`\`\`

## Why XGBoost Over Deep Neural Networks?

While convolutional and recurrent architectures can be applied to raw byte sequences (e.g., MalConv), tree-based gradient boosting models such as **XGBoost** and **LightGBM** provide distinct advantages in cybersecurity operations:

* **Tabular Data Superiority:** Extracted PE features are fundamentally heterogeneous (discrete counts, continuous entropy scores, binary capability flags). Decision trees naturally handle non-linear interactions across unnormalized scales.
* **Explainability:** Feature importance metrics (Gain, Weight, Cover) allow forensic analysts to understand *why* a binary was classified as malicious.
* **Inference Speed:** An optimized XGBoost tree ensemble evaluates a feature vector in under 5 milliseconds on standard CPU hardware, eliminating the need for dedicated GPU infrastructure.

## Evaluating Against the EMBER Benchmark

Using the Endgame Malware BEnchmark for Research (EMBER) 2018 dataset, which contains 1 million scanned PE files with 2,381-dimensional feature vectors, our tuned XGBoost classifier achieved:

* **Detection Rate (Recall):** 98.4% at an operational False Positive Rate (FPR) of 0.1%.
* **AUC-ROC Score:** 0.996 across held-out test splits.
* **Resilience:** Successfully classified 89% of packed samples through entropy-driven feature weights even when import tables were stripped.

## Production Deployment Considerations

Serving machine learning models in security pipelines requires strict operational guarantees:

1. **Memory Safety:** When parsing untrusted binaries, parser libraries (such as LIEF or pefile) must run inside sandboxed processes or containers to prevent parser-level memory corruption vulnerabilities from exploiting the scanner itself.
2. **Model Retraining:** Malware authors constantly evolve packing strategies. A scheduled monthly retraining pipeline using continuous telemetry is essential to counter model drift.
3. **Adversarial Defenses:** Adding dummy sections or padding benign strings to an executable can manipulate gradient weights. Robust models train on adversarial samples augmented with random section padding.
`
  },
  {
    id: "linux-forensic-readiness-investigation-guide",
    slug: "linux-forensic-readiness-investigation-guide",
    title: "Linux Forensic Readiness and Incident Response: Essential Artifact Extraction",
    excerpt: "A tactical guide to capturing volatile memory, audit logs, and system artifacts without contaminating digital evidence or altering forensic timelines.",
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
    content: `
## The Order of Volatility in Linux

When investigating a suspected compromise on a live production Linux server, haste and carelessness can destroy the very evidence required to identify the root cause and threat actor. RFC 3227 establishes the **Order of Volatility**—evidence that degrades most rapidly must be collected first:

1. **Registers and Cache** (Nanoseconds)
2. **Routing Tables, ARP Cache, Process Tables, Kernel Statistics, Memory** (Milliseconds to Hours)
3. **Temporary File Systems** (/tmp, /dev/shm)
4. **Disk Storage & Persistent Logs** (/var/log, block devices)
5. **Remote Logging Data & Backups**

Never issue a reboot command or pull the physical power plug before dumping volatile RAM and active network sockets. An ungraceful shutdown destroys in-memory rootkits, active reverse shells, and decrypted cryptographic keys.

## Capturing Live Process and Network States

Use trusted, statically compiled binaries from external read-only media rather than relying on system tools, which may have been Trojanized by an attacker:

\`\`\`bash
# 1. Record exact investigation timestamp
date -u +"%Y-%m-%dT%H:%M:%SZ" > /mnt/usb/evidence/timestamp.txt

# 2. Extract active and listening network connections with PID associations
ss -tupna > /mnt/usb/evidence/network_connections.txt

# 3. Dump the process tree with full arguments and environmental variables
ps auxwwwef > /mnt/usb/evidence/process_tree.txt

# 4. Enumerate open file descriptors and deleted executables still executing in memory
lsof +L1 > /mnt/usb/evidence/deleted_running_files.txt
\`\`\`

Notice the command \`lsof +L1\`: sophisticated adversaries frequently upload an ELF payload, execute it, and immediately unlink (\`rm\`) the binary from disk. The kernel retains the inode in RAM as long as the file descriptor remains open.

## Configuring auditd for High-Fidelity Logging

Post-incident recovery is only as effective as pre-incident telemetry. The Linux Audit Daemon (\`auditd\`) offers kernel-level event tracing that cannot be tampered with by simple bash history suppression.

Recommended rules in \`/etc/audit/rules.d/forensics.rules\`:

\`\`\`text
# Monitor modifications to authentication and sudoers
-w /etc/passwd -p wa -k identity_changes
-w /etc/shadow -p wa -k identity_changes
-w /etc/sudoers -p wa -k privileged_actions

# Track module insertion/removal (kernel rootkit detection)
-a always,exit -F arch=b64 -S init_module,finit_module,delete_module -k kernel_modules

# Monitor execution of network utilities by non-root users
-a always,exit -F arch=b64 -S execve -F euid!=0 -F exe=/usr/bin/nmap -k net_recon
\`\`\`

## Preserving File Integrity & Timestamps

Every interaction with the file system updates the access time (atime) of visited inodes, altering the chronological timeline of events. Always mount evidence partitions in read-only mode with the \`noatime\` flag:

\`\`\`bash
mount -o ro,noatime,nodev,nosuid /dev/sdb1 /mnt/analysis
\`\`\`

When computing hashes for evidence verification, stream block hashes directly into an immutable log:

\`\`\`bash
sha256sum /dev/sdb | tee /mnt/usb/evidence/disk_image.sha256
\`\`\`

## Chain of Custody Best Practices

A technical investigation has little legal weight if the chain of custody is broken. For every artifact acquired, document:

* The exact date, time (in UTC), and system hostname.
* The serial numbers of source storage drives and target collection drives.
* The full names and credentials of the investigating engineers.
* Pre-acquisition and post-acquisition SHA-256 cryptographic hashes.
`
  },
  {
    id: "owasp-api-security-top-10-mitigation-playbook",
    slug: "owasp-api-security-top-10-mitigation-playbook",
    title: "OWASP API Security Top 10: Vulnerability Hunting and Developer Mitigation",
    excerpt: "An engineer's tactical playbook for discovering, demonstrating, and neutralizing Broken Object Level Authorization (BOLA) and broken authentication in modern APIs.",
    category: "Penetration Testing",
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
    content: `
## The Shift to API-First Threats

Modern web architectures have decisively shifted from monolithic server-rendered HTML pages to decoupled single-page applications (React, Vue, mobile clients) consuming microservice APIs. While this transition accelerates feature delivery, it radically increases the surface area exposed to attackers.

Traditional web application firewalls (WAFs) inspect incoming payloads for obvious SQL injection and XSS syntax strings. However, the most devastating API flaws—such as **Broken Object Level Authorization (BOLA)** and broken business logic—look identical to legitimate HTTP traffic.

## Hunting Broken Object Level Authorization (BOLA)

Ranked as **API1:2023** on the OWASP API Security Top 10, BOLA occurs when an endpoint accepts an object identifier (e.g., \`/api/v1/invoices/9482\`) without verifying whether the authenticated caller owns or is authorized to access that specific entity.

### Demonstration Scenario

Consider a client endpoint:
\`\`\`http
GET /api/v1/user/account?id=1042 HTTP/1.1
Host: api.target-platform.internal
Authorization: Bearer <TOKEN_BELONGING_TO_USER_9999>
\`\`\`

If the server executes:
\`\`\`sql
-- VULNERABLE IMPLEMENTATION
SELECT * FROM accounts WHERE id = 1042;
\`\`\`

The query successfully returns Account 1042's private financial records to User 9999 because the server trusted the client-supplied object ID without correlating it against the authenticated user token.

### Robust Developer Mitigation

Enforce data access authorization at the database query layer:

\`\`\`python
# SECURE REFACTORED IMPLEMENTATION
@router.get("/api/v1/user/account/{account_id}")
async def get_account(account_id: int, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    account = db.query(Account).filter(
        Account.id == account_id,
        Account.organization_id == current_user.organization_id # Tenant boundary enforcement
    ).first()
    
    if not account:
        raise HTTPException(status_code=404, detail="Resource not found")
        
    return account
\`\`\`

Notice that the server returns a 404 rather than a 403. Returning 403 confirms to an attacker that the resource exists, enabling object enumeration. Returning 404 keeps the namespace opaque.

## Flawed Authentication & Token Handling

Common vulnerabilities in JSON Web Token (JWT) handling include:

* **Algorithm Confusion Attacks:** Accepting tokens signed with \`HS256\` using the server's public RSA key as the HMAC secret key.
* **Missing Expiration Checks:** Ignoring the \`exp\` claim, granting eternal validity to intercepted tokens.
* **Sensitive Payload Storage:** Storing unencrypted passwords, PII, or internal roles inside the JWT payload without realizing base64 is encoding, not encryption.

Always validate signature headers strictly against an explicit whitelist of approved algorithms, and enforce short lifespans (15 minutes) paired with cryptographically secure refresh token rotation.

## Server-Side Request Forgery (SSRF) in APIs

Endpoints that accept URLs—such as webhook registration, PDF generator converters, and avatar fetchers—are susceptible to SSRF (API7:2023). Attackers supply internal metadata IP addresses:

\`\`\`http
POST /api/v1/webhooks/subscribe HTTP/1.1
Host: api.target-platform.internal

{
  "target_url": "http://169.254.169.254/latest/meta-data/iam/security-credentials/"
}
\`\`\`

If unvalidated, the server issues an HTTP request from within its private VPC to the AWS cloud metadata instance, leaking IAM role credentials.

### Defense-in-Depth for URL Fetchers:

1. Parse the supplied URL and resolve its IP address via DNS.
2. Verify the resolved IP does NOT belong to RFC 1918 private ranges (\`10.0.0.0/8\`, \`172.16.0.0/12\`, \`192.168.0.0/16\`) or loopback/link-local ranges (\`127.0.0.1\`, \`169.254.169.254\`).
3. Reject redirects to prevent DNS rebinding or redirect bypasses.

## Developer Remediation Checklist

* [ ] Validate user identity against object authorization on EVERY data query.
* [ ] Replace sequential numeric IDs with cryptographically secure UUIDv4 identifiers.
* [ ] Enforce strict rate-limiting per client IP and authenticated user token.
* [ ] Disable automatic schema exposure (disable Swagger / OpenAPI docs on public production routes).
* [ ] Mandate formal authorized security assessments before major API version releases.
`
  },
  {
    id: "architecting-resilient-web-applications-2026",
    slug: "architecting-resilient-web-applications-2026",
    title: "Architecting Resilient Web Applications: Performance, SEO, and Defense-in-Depth",
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
    content: `
## The Performance, SEO, and Security Trio

Historically, developers treated performance optimization, search engine visibility, and application security as three isolated disciplines managed by separate teams. In modern web engineering, they are deeply interconnected:

* Google directly penalizes websites with poor Core Web Vitals (INP and CLS) in organic search ranking.
* Malicious cross-site scripting (XSS) can execute unauthorized API requests and steal user credentials.
* Bloated JavaScript bundles increase time-to-interactive, driving bounce rates above 50% on mobile devices.

A truly resilient web application treats performance, SEO, and security as foundational architecture pillars established on day one.

## Conquering Core Web Vitals (LCP, INP, CLS)

### 1. Largest Contentful Paint (LCP < 1.2s)
The largest visible element—usually a hero headline or image—must render nearly instantaneously:
* Preload critical Google fonts using \`<link rel="preload" as="font">\` with \`font-display: swap\`.
* Avoid heavy client-side JavaScript execution blocking the initial DOM painting.
* Compress imagery into modern WebP/AVIF formats with explicit \`width\` and \`height\` attributes.

### 2. Interaction to Next Paint (INP < 150ms)
Replacing First Input Delay (FID), INP measures responsiveness across the entire page lifecycle. Keep the browser main thread free by breaking long JavaScript tasks using \`requestAnimationFrame\` or web workers.

### 3. Cumulative Layout Shift (CLS < 0.05)
Zero unexpected visual jumps during page load:
* Always reserve aspect ratio space for dynamic widgets, advertisements, and images.
* Avoid inserting banners or modals above existing content without reserved containers.

## Automated Technical SEO Architecture

Modern crawlers index client-rendered applications better than in previous decades, but providing pristine server-rendered metadata remains non-negotiable for competitive ranking.

Key architectural requirements:
* **Canonical URL Enforcement:** Prevent duplicate content penalties by serving canonical tags on all indexable pages.
* **Structured JSON-LD Microdata:** Embed rich schemas for \`Person\`, \`Organization\`, \`Service\`, and \`BlogPosting\` to qualify for Google rich search snippets.
* **Automated XML Sitemaps:** Generate dynamic sitemaps updated in real-time as new blog articles or service pages are published.

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Architecting Resilient Web Applications: Performance, SEO, and Defense-in-Depth",
  "author": {
    "@type": "Person",
    "name": "Abhijit Mondal",
    "jobTitle": "Software Engineer & Cybersecurity Specialist"
  },
  "datePublished": "2026-06-20",
  "publisher": {
    "@type": "Person",
    "name": "Abhijit Mondal"
  }
}
\`\`\`

## Hardening HTTP Security Headers

Every production reverse proxy (Nginx / Cloudflare) must enforce strict defense-in-depth headers:

\`\`\`nginx
# Content Security Policy (Restricts unauthorized script execution)
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-ancestors 'none';" always;

# Prevent Clickjacking
add_header X-Frame-Options "DENY" always;

# Prevent MIME-type Sniffing
add_header X-Content-Type-Options "nosniff" always;

# Strict Transport Security (Force HTTPS)
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

# Referrer Policy
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
\`\`\`

## Continuous Monitoring & SLAs

Resilience is not a one-time build milestone; it is an ongoing operational commitment. Employ automated synthetic monitors that test TTFB, SSL expiration dates, and Core Web Vitals on every pull request before production deployment.
`
  }
];
