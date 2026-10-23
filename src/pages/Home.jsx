import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { personalInfo, experienceData, educationData, credentialsData, skillsData, developmentProcess } from "../data/credentialsData";
import { initialServices } from "../data/initialServices";
import { initialProjects } from "../data/initialProjects";
import { useCMS } from "../context/CMSContext";
import Radar from "../components/ui/Radar";
import BlogCard from "../components/blog/BlogCard";
import AdContainer from "../components/ads/AdContainer";
import { updateSEO, generatePersonSchema } from "../utils/seo";
import {
  Shield,
  ArrowRight,
  Terminal,
  Cpu,
  Globe,
  Smartphone,
  ShieldAlert,
  BrainCircuit,
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  Calendar,
  Layers,
  Compass,
  FileText,
  GraduationCap
} from "lucide-react";
import { GithubIcon } from "../components/ui/Icons";

export default function Home() {
  const { posts } = useCMS();
  const [activeProjectFilter, setActiveProjectFilter] = useState("All");

  useEffect(() => {
    updateSEO({
      title: "Abhijit Mondal — Software Engineering, AI & Cybersecurity Specialist",
      description: "Engineering digital products, building intelligent systems, and securing applications. Specialized in Full-Stack Web & Mobile Apps, Machine Learning, Authorized Penetration Testing, and Cybersecurity Architecture Consultancy.",
      canonical: "https://abhijitmondal.dev/",
      jsonLd: generatePersonSchema()
    });
  }, []);

  const serviceIconMap = {
    Smartphone: Smartphone,
    Globe: Globe,
    BrainCircuit: BrainCircuit,
    ShieldAlert: ShieldAlert,
    Compass: Compass,
    GraduationCap: GraduationCap
  };

  const projectFilters = ["All", "Cybersecurity & Forensics", "Machine Learning & Security", "Web & Software", "Hardware & IoT"];

  const filteredProjects = activeProjectFilter === "All"
    ? initialProjects
    : initialProjects.filter((p) => p.domain === activeProjectFilter);

  const publishedBlogPosts = posts.filter((p) => p.status === "published").slice(0, 3);

  return (
    <div className="home-page">
      {/* =========================================================================
          SECTION 1: HERO
          ========================================================================= */}
      <section
        style={{
          paddingTop: "72px",
          paddingBottom: "80px",
          background: "radial-gradient(circle at 75% 20%, rgba(0, 242, 254, 0.08) 0%, transparent 60%)",
          borderBottom: "1px solid var(--card-border)"
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              alignItems: "center",
              gap: "48px"
            }}
          >
            {/* Left Content */}
            <div style={{ maxWidth: "680px", minWidth: 0 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(0, 242, 254, 0.1)",
                  border: "1px solid rgba(0, 242, 254, 0.25)",
                  color: "var(--accent-cyan)",
                  fontSize: "0.78rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  marginBottom: "20px",
                  maxWidth: "100%",
                  flexWrap: "wrap",
                  lineHeight: "1.4"
                }}
              >
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-cyan)", flexShrink: 0 }} className="glow-pill" />
                <span>FIELD REPORT // SUBJECT 001 // Q4 2026 ACTIVE</span>
              </div>

              <h1 style={{ marginBottom: "18px", letterSpacing: "-0.02em", textWrap: "balance" }}>
                <span>Engineering Digital Products. </span>
                <span style={{ background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Building Intelligent Systems.
                </span>{" "}
                <span>Securing Applications.</span>
              </h1>

              <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "28px" }}>
                I am <strong>Abhijit Mondal</strong>, a software engineer and cybersecurity specialist based in {personalInfo.location}. I partner with ambitious founders, enterprises, and engineering teams to build performant web and mobile applications, machine learning classification pipelines, and authorized security assessments.
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "36px" }}>
                <Link to="/quote" className="btn btn-primary btn-lg">
                  <span>Get a Free Project Quote</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/projects" className="btn btn-secondary btn-lg">
                  <span>Explore Projects & Research</span>
                </Link>
              </div>

              {/* Verified Contact Details Bar */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "16px",
                  fontSize: "0.84rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-muted)",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--card-border)"
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <MapPin size={14} style={{ color: "var(--accent-cyan)", flexShrink: 0 }} />
                  <span>Durgapur, WB, India</span>
                </span>
                <a href={`mailto:${personalInfo.email}`} style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-secondary)", overflowWrap: "anywhere", wordBreak: "break-all" }}>
                  <Mail size={14} style={{ color: "var(--accent-cyan)", flexShrink: 0 }} />
                  <span>{personalInfo.email}</span>
                </a>
                <a href={personalInfo.github} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-secondary)", overflowWrap: "anywhere" }}>
                  <GithubIcon size={14} style={{ color: "var(--accent-cyan)", flexShrink: 0 }} />
                  <span>github.com/alphamike-01</span>
                </a>
              </div>
            </div>

            {/* Right: Technical Radar HUD Visual */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Radar />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: TRUST & VERIFIED EXPERTISE
          ========================================================================= */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">VERIFIED CREDENTIALS</span>
            <h2 className="section-title">Rooted in Academic Rigor & Practical Security</h2>
            <p className="section-desc">
              All qualifications, certifications, and rankings are verified through official academic institutions and technical platforms.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px"
            }}
          >
            {credentialsData.map((cred) => (
              <div key={cred.title} className="card" style={{ padding: "24px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
                  <span className="card-badge">{cred.category}</span>
                  <span className="badge badge-cyan">{cred.badge}</span>
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "10px" }}>
                  {cred.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6", flex: 1 }}>
                  {cred.desc}
                </p>

                {(cred.pdf || cred.verificationUrl) && (
                  <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--card-border)", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                    {cred.pdf && (
                      <a
                        href={cred.pdf}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: "0.8rem", color: "var(--accent-cyan)", display: "inline-flex", alignItems: "center", gap: "5px", textDecoration: "none", fontWeight: 600 }}
                      >
                        <FileText size={14} />
                        <span>Official PDF</span>
                      </a>
                    )}
                    {cred.verificationUrl && (
                      <a
                        href={cred.verificationUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: "0.8rem", color: "var(--accent-cyan)", display: "inline-flex", alignItems: "center", gap: "5px", textDecoration: "none", fontWeight: 600 }}
                      >
                        <ExternalLink size={13} />
                        <span>Verify Online</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CORE ENGINEERING & SECURITY SERVICES
          ========================================================================= */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">SERVICE OFFERINGS</span>
            <h2 className="section-title">Specialized Engineering & Cybersecurity Solutions</h2>
            <p className="section-desc">
              Transparent scope, rigorous testing standards, and direct collaboration with a senior practitioner.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "28px"
            }}
          >
            {initialServices.map((service) => {
              const IconComponent = serviceIconMap[service.icon] || Shield;
              return (
                <div key={service.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "var(--radius-md)",
                        background: "rgba(0, 242, 254, 0.1)",
                        border: "1px solid rgba(0, 242, 254, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent-cyan)"
                      }}
                    >
                      <IconComponent size={24} />
                    </div>
                    <span className="badge badge-cyan">{service.badge}</span>
                  </div>

                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "10px" }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "20px", flex: 1 }}>
                    {service.tagline}
                  </p>

                  {/* Deliverables snippet */}
                  <div style={{ marginBottom: "24px", borderTop: "1px solid var(--card-border)", paddingTop: "16px" }}>
                    <div style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", marginBottom: "8px", fontWeight: 600 }}>
                      KEY DELIVERABLES:
                    </div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.825rem", color: "var(--text-secondary)" }}>
                      {service.deliverables.slice(0, 3).map((d) => (
                        <li key={d} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <CheckCircle2 size={13} style={{ color: "var(--accent-emerald)", flexShrink: 0 }} />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                    <Link
                      to={`/services/${service.slug}`}
                      className="btn btn-outline btn-sm"
                      style={{ flex: 1 }}
                    >
                      <span>Explore Scope</span>
                    </Link>
                    <Link
                      to={`/quote?service=${service.id}`}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                    >
                      <span>Get Quote</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: FEATURED PROJECTS & RESEARCH
          ========================================================================= */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "40px" }}>
            <div>
              <span className="section-tag">PROOF OF WORK</span>
              <h2 className="section-title">Projects, Tools & Security Research</h2>
              <p className="section-desc" style={{ marginBottom: 0 }}>
                Every project represents concrete problem-solving, real architecture, and verifiable code.
              </p>
            </div>
            <Link to="/projects" className="btn btn-outline btn-sm">
              <span>View All {initialProjects.length} Projects</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Domain Filter Pills */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
            {projectFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveProjectFilter(filter)}
                className={`btn btn-sm ${activeProjectFilter === filter ? "btn-primary" : "btn-secondary"}`}
                style={{ fontSize: "0.82rem" }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "28px"
            }}
          >
            {filteredProjects.map((project) => (
              <div key={project.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                  <span className="card-badge">{project.category}</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--accent-emerald)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                    ● {project.status}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "10px" }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "18px", flex: 1 }}>
                  {project.shortDesc}
                </p>

                {/* Tech Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: "0.75rem",
                        fontFamily: "var(--font-mono)",
                        background: "var(--bg-tertiary)",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        border: "1px solid var(--card-border)",
                        color: "var(--text-secondary)"
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    Year: {project.year}
                  </span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "var(--accent-cyan)",
                      fontSize: "0.84rem",
                      fontWeight: 600
                    }}
                  >
                    <GithubIcon size={15} />
                    <span>View Repository</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: SKILLS MATRIX & TOOLING
          ========================================================================= */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">TECHNICAL ARSENAL</span>
            <h2 className="section-title">Tools, Frameworks & Core Domains</h2>
            <p className="section-desc">
              Hands-on operational fluency with modern programming languages, offensive security utilities, and Linux environments.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "28px"
            }}
          >
            {Object.entries(skillsData).map(([category, skills]) => (
              <div key={category} className="card">
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--accent-cyan)", marginBottom: "16px", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>
                  // {category.toUpperCase()}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: "0.84rem",
                        padding: "6px 12px",
                        borderRadius: "var(--radius-sm)",
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--card-border)",
                        color: "var(--text-primary)"
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: DEVELOPMENT PROCESS
          ========================================================================= */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">ENGINEERING LIFECYCLE</span>
            <h2 className="section-title">How We Build & Deliver Projects</h2>
            <p className="section-desc">
              A transparent, disciplined six-stage methodology designed for predictable delivery, clean code, and zero post-launch surprises.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px"
            }}
          >
            {developmentProcess.map((stage) => (
              <div key={stage.step} className="card" style={{ padding: "28px" }}>
                <div
                  style={{
                    fontSize: "1.75rem",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 800,
                    color: "var(--accent-cyan)",
                    marginBottom: "12px",
                    opacity: 0.9
                  }}
                >
                  {stage.step}
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "10px" }}>
                  {stage.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Optional Ad placement preview between sections */}
      <div className="container">
        <AdContainer slot="between-cards" />
      </div>

      {/* =========================================================================
          SECTION 7: FEATURED EDITORIAL ARTICLES
          ========================================================================= */}
      <section className="section">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "40px" }}>
            <div>
              <span className="section-tag">TECHNICAL PUBLISHING</span>
              <h2 className="section-title">Latest Articles & Engineering Guides</h2>
              <p className="section-desc" style={{ marginBottom: 0 }}>
                In-depth articles covering malware classification, Linux forensics, API threat models, and resilient web architectures.
              </p>
            </div>
            <Link to="/blog" className="btn btn-outline btn-sm">
              <span>Visit Tech Blog</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "28px"
            }}
          >
            {publishedBlogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: HIGH-CONVERSION CONTACT & QUOTE CTA
          ========================================================================= */}
      <section className="section" style={{ background: "radial-gradient(circle at 50% 50%, rgba(0, 242, 254, 0.08) 0%, var(--bg-secondary) 100%)" }}>
        <div className="container">
          <div
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border-hover)",
              borderRadius: "var(--radius-xl)",
              padding: "56px 40px",
              textAlign: "center",
              maxWidth: "860px",
              margin: "0 auto",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(16px)"
            }}
          >
            <span className="badge badge-cyan" style={{ marginBottom: "16px" }}>
              ENGAGEMENTS OPEN FOR Q4 2026
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, marginBottom: "18px" }}>
              Have an Engineering Project or Need Security Assessment?
            </h2>
            <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: "1.6", maxWidth: "600px", margin: "0 auto 32px" }}>
              Get a tailored, fixed-scope proposal with concrete deliverables, timelines, and budget estimation within 24 hours.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/quote" className="btn btn-primary btn-lg">
                <span>Start Quote Request</span>
                <ArrowRight size={18} />
              </Link>
              <a href={`mailto:${personalInfo.email}`} className="btn btn-outline btn-lg">
                <Mail size={18} />
                <span>Direct Email Inquiries</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
