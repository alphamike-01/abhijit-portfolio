import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { initialServices } from "../../data/initialServices";
import { initialProjects } from "../../data/initialProjects";
import { useCMS } from "../../context/CMSContext";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import BlogCard from "../../components/blog/BlogCard";
import AdContainer from "../../components/ads/AdContainer";
import { updateSEO, generateServiceSchema } from "../../utils/seo";
import {
  Smartphone,
  Globe,
  BrainCircuit,
  ShieldAlert,
  Compass,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
  Layers,
  Code2,
  Clock,
  Shield
} from "lucide-react";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { posts } = useCMS();
  const [openFaq, setOpenFaq] = useState(null);

  const service = initialServices.find((s) => s.slug === slug);

  useEffect(() => {
    if (service) {
      updateSEO({
        title: `${service.title} — Abhijit Mondal`,
        description: service.summary,
        canonical: `https://abhijitmondal.dev/services/${service.slug}`,
        jsonLd: generateServiceSchema(service)
      });
    }
  }, [service]);

  if (!service) {
    return (
      <div className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2>Service Not Found</h2>
        <p>The requested service detail page does not exist.</p>
        <Link to="/services" className="btn btn-primary" style={{ marginTop: "16px" }}>
          Back to Services
        </Link>
      </div>
    );
  }

  const serviceIconMap = {
    Smartphone: Smartphone,
    Globe: Globe,
    BrainCircuit: BrainCircuit,
    ShieldAlert: ShieldAlert,
    Compass: Compass,
    GraduationCap: GraduationCap
  };
  const IconComponent = serviceIconMap[service.icon] || Globe;

  // Filter related projects
  const relatedProjects = initialProjects.filter((p) => {
    if (service.id === "technical-training") return true;
    if (service.id === "ai-ml-development") return p.category.includes("ML");
    if (service.id === "penetration-testing") return p.category.includes("FORENSICS") || p.category.includes("SECURITY") || p.category.includes("RESEARCH");
    if (service.id === "cybersecurity-consultancy") return p.category.includes("FORENSICS") || p.category.includes("SECURITY") || p.domain.includes("Cybersecurity");
    if (service.id === "web-development-seo") return p.domain === "Web & Software";
    if (service.id === "mobile-app-development") return p.domain === "Web & Software" || p.domain === "Hardware & IoT";
    return false;
  }).slice(0, 2);

  // Filter related blog posts
  const relatedArticles = posts.filter((p) => p.status === "published").slice(0, 2);

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "96px" }}>
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Services", path: "/services" },
            { label: service.shortTitle }
          ]}
        />

        {/* Hero Section */}
        <div
          style={{
            background: "radial-gradient(circle at 80% 20%, rgba(0, 242, 254, 0.08) 0%, var(--card-bg) 100%)",
            border: "1px solid var(--card-border)",
            borderRadius: "var(--radius-xl)",
            padding: "48px 40px",
            marginBottom: "56px"
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "var(--radius-md)",
                background: "rgba(0, 242, 254, 0.12)",
                border: "1px solid rgba(0, 242, 254, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--accent-cyan)"
              }}
            >
              <IconComponent size={22} />
            </div>
            <span className="badge badge-cyan">{service.badge}</span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "18px" }}>
            {service.title}
          </h1>
          <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: "1.7", maxWidth: "780px", marginBottom: "28px" }}>
            {service.summary}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link to={`/quote?service=${service.id}`} className="btn btn-primary btn-lg">
              <span>Request Quote for {service.shortTitle}</span>
              <ArrowRight size={18} />
            </Link>
            <div style={{ fontSize: "0.85rem", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
              {service.pricingGuide}
            </div>
          </div>
        </div>

        {/* 2-Column: Outcomes & Deliverables */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "36px",
            marginBottom: "64px"
          }}
        >
          {/* Client Outcomes */}
          <div className="card">
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <Shield size={20} style={{ color: "var(--accent-cyan)" }} />
              <span>Measurable Client Outcomes</span>
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
              {service.clientOutcomes.map((outcome) => (
                <li key={outcome} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "0.925rem", color: "var(--text-secondary)" }}>
                  <CheckCircle2 size={18} style={{ color: "var(--accent-cyan)", flexShrink: 0, marginTop: "2px" }} />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          <div className="card">
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <Layers size={20} style={{ color: "var(--accent-emerald)" }} />
              <span>Concrete Deliverables</span>
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
              {service.deliverables.map((deliv) => (
                <li key={deliv} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "0.925rem", color: "var(--text-secondary)" }}>
                  <CheckCircle2 size={18} style={{ color: "var(--accent-emerald)", flexShrink: 0, marginTop: "2px" }} />
                  <span>{deliv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 5-Step Process Timeline */}
        <div style={{ marginBottom: "64px" }}>
          <div className="section-header">
            <span className="section-tag">STEP-BY-STEP WORKFLOW</span>
            <h2 className="section-title">How We Execute Your Project</h2>
            <p className="section-desc">
              Every stage has explicit checkpoints and approval gates so you maintain full control of direction and scope.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {service.workflow.map((item) => (
              <div key={item.step} className="card" style={{ padding: "24px" }}>
                <div style={{ fontSize: "1.5rem", fontFamily: "var(--font-mono)", fontWeight: 800, color: "var(--accent-cyan)", marginBottom: "8px" }}>
                  {item.step}
                </div>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "8px" }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack & Scope Limitations */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "36px", marginBottom: "64px" }}>
          {/* Tech Stack */}
          <div className="card">
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
              <Code2 size={20} style={{ color: "var(--accent-cyan)" }} />
              <span>Recommended Tooling & Stack</span>
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {service.techStack.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "0.85rem",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--card-border)",
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-mono)"
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Scope Limitations & Prerequisites */}
          <div className="card" style={{ borderLeft: "3px solid var(--accent-amber)" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
              <AlertTriangle size={20} style={{ color: "var(--accent-amber)" }} />
              <span>Scope Prerequisites & Boundaries</span>
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
              {service.scopeLimitations.map((limit, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "var(--accent-amber)", fontWeight: 700 }}>•</span>
                  <span>{limit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div style={{ marginBottom: "64px" }}>
          <div className="section-header">
            <span className="section-tag">COMMON QUESTIONS</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "800px" }}>
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="card"
                  style={{ padding: "20px 24px", cursor: "pointer" }}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
                    <h4 style={{ fontSize: "1rem", fontWeight: 600, color: isOpen ? "var(--accent-cyan)" : "var(--text-primary)" }}>
                      {faq.q}
                    </h4>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.2s ease",
                        color: "var(--text-muted)"
                      }}
                    />
                  </div>
                  {isOpen && (
                    <p style={{ marginTop: "14px", fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6", borderTop: "1px solid var(--card-border)", paddingTop: "12px" }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Ad placement between sections */}
        <AdContainer slot="between-cards" />

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div style={{ marginBottom: "64px" }}>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "24px" }}>
              Related Projects & Proof of Work
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              {relatedProjects.map((p) => (
                <div key={p.id} className="card">
                  <span className="card-badge" style={{ marginBottom: "12px" }}>{p.category}</span>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "8px" }}>{p.title}</h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "16px" }}>{p.shortDesc}</p>
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" style={{ fontSize: "0.825rem", color: "var(--accent-cyan)", fontWeight: 600 }}>
                    Inspect Code on GitHub →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <div
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--card-border-hover)",
            borderRadius: "var(--radius-xl)",
            padding: "48px 36px",
            textAlign: "center"
          }}
        >
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "14px" }}>
            Ready to Commission {service.shortTitle}?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 24px" }}>
            Fill out our guided quote request form. We will review your requirements and respond within 24 hours with a concrete roadmap and pricing.
          </p>
          <Link to={`/quote?service=${service.id}`} className="btn btn-primary btn-lg">
            <span>Request {service.shortTitle} Quote</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
