import { useEffect } from "react";
import { Link } from "react-router-dom";
import { initialServices } from "../../data/initialServices";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { updateSEO } from "../../utils/seo";
import {
  Smartphone,
  Globe,
  BrainCircuit,
  ShieldAlert,
  Compass,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  HelpCircle
} from "lucide-react";

export default function ServicesPage() {
  useEffect(() => {
    updateSEO({
      title: "Software Development & Cybersecurity Services — Abhijit Mondal",
      description: "Explore engineering services: Mobile App Development, High-Performance Web & SEO, Machine Learning Systems, Authorized Penetration Testing, Cybersecurity Architecture Consultancy, and Technical Training.",
      canonical: "https://abhijitmondal.dev/services"
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

  const engagementModels = [
    {
      title: "Fixed-Scope Sprint",
      ideal: "MVPs, specific features, website launches, and targeted audits",
      desc: "Defined deliverables, milestones, and predetermined investment. Zero runaway costs.",
      badge: "Most Popular"
    },
    {
      title: "Dedicated Technical Advisory",
      ideal: "Growing startups needing fractional CTO & security leadership",
      desc: "Weekly architecture reviews, security posture hardening, code reviews, and priority developer guidance.",
      badge: "Ongoing Retainer"
    },
    {
      title: "Authorized Security Audit",
      ideal: "Pre-launch compliance, quarterly security assessments, API penetration tests",
      desc: "Formal Rules of Engagement, manual exploitation, developer remediation workshops, and re-testing.",
      badge: "Strict Authorization"
    }
  ];

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "96px" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Services" }]} />

        {/* Header */}
        <div style={{ maxWidth: "780px", marginBottom: "64px" }}>
          <span className="section-tag">ENGINEERING & DEFENSE</span>
          <h1 style={{ marginBottom: "18px" }}>
            High-Impact Software Engineering & Cybersecurity Services
          </h1>
          <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: "1.7" }}>
            We bridge the gap between creative product development and rigorous security engineering. Every engagement is executed with clean modular code, measurable SLAs, and battle-tested security standards.
          </p>
        </div>

        {/* Services Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px", marginBottom: "80px" }}>
          {initialServices.map((service, index) => {
            const IconComponent = serviceIconMap[service.icon] || Globe;
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                className="card"
                style={{
                  padding: "40px",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                  gap: "40px",
                  alignItems: "center"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "var(--radius-md)",
                        background: "rgba(0, 242, 254, 0.1)",
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

                  <h2 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "14px" }}>
                    {service.title}
                  </h2>
                  <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "20px" }}>
                    {service.summary}
                  </p>

                  <div style={{ fontSize: "0.85rem", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)", marginBottom: "24px", fontWeight: 600 }}>
                    {service.pricingGuide}
                  </div>

                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <Link to={`/services/${service.slug}`} className="btn btn-outline btn-sm">
                      <span>View Complete Scope & FAQs</span>
                      <ArrowRight size={14} />
                    </Link>
                    <Link to={`/quote?service=${service.id}`} className="btn btn-primary btn-sm">
                      <span>Get a Quote</span>
                    </Link>
                  </div>
                </div>

                {/* Right: Deliverables List */}
                <div
                  style={{
                    background: "var(--bg-tertiary)",
                    borderRadius: "var(--radius-md)",
                    padding: "24px",
                    border: "1px solid var(--card-border)"
                  }}
                >
                  <h4 style={{ fontSize: "0.9rem", fontFamily: "var(--font-mono)", color: "var(--text-primary)", marginBottom: "14px", letterSpacing: "0.04em" }}>
                    // VERIFIED DELIVERABLES
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    {service.deliverables.map((d) => (
                      <li key={d} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <CheckCircle2 size={16} style={{ color: "var(--accent-emerald)", flexShrink: 0, marginTop: "2px" }} />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid var(--card-border)" }}>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: "6px" }}>
                      TECHNOLOGIES USED:
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {service.techStack.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontSize: "0.75rem",
                            background: "rgba(255, 255, 255, 0.05)",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            color: "var(--text-primary)"
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engagement Models */}
        <div style={{ marginBottom: "80px" }}>
          <div className="section-header text-center">
            <span className="section-tag">FLEXIBLE PARTNERSHIPS</span>
            <h2 className="section-title">How We Can Work Together</h2>
            <p className="section-desc">
              Choose an engagement model tailored to your team's technical roadmap and budgetary requirements.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {engagementModels.map((model) => (
              <div key={model.title} className="card" style={{ display: "flex", flexDirection: "column" }}>
                <span className="card-badge" style={{ alignSelf: "flex-start", marginBottom: "16px" }}>
                  {model.badge}
                </span>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>
                  {model.title}
                </h3>
                <div style={{ fontSize: "0.825rem", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)", marginBottom: "14px" }}>
                  Ideal for: {model.ideal}
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6", flex: 1, marginBottom: "20px" }}>
                  {model.desc}
                </p>
                <Link to="/quote" className="btn btn-outline btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                  <span>Inquire for {model.title}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--card-border-hover)",
            borderRadius: "var(--radius-xl)",
            padding: "48px 36px",
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto"
          }}
        >
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "14px" }}>
            Ready to Scope Your Solution?
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginBottom: "24px" }}>
            Submit an initial project brief to receive technical advice, architecture recommendations, and guaranteed pricing.
          </p>
          <Link to="/quote" className="btn btn-primary btn-lg">
            <span>Start a Quote Request</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
