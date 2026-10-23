import { Link } from "react-router-dom";
import { personalInfo } from "../../data/credentialsData";
import { initialServices } from "../../data/initialServices";
import { initialCategories } from "../../data/initialCategories";
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Lock
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/Icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--card-border)",
        paddingTop: "72px",
        paddingBottom: "36px",
        color: "var(--text-secondary)",
        marginTop: "auto"
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "48px 32px",
            marginBottom: "56px"
          }}
        >
          {/* Identity & About */}
          <div style={{ maxWidth: "340px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(0, 242, 254, 0.1)",
                  border: "1px solid rgba(0, 242, 254, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-cyan)"
                }}
              >
                <Shield size={18} />
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "var(--text-primary)" }}>
                Abhijit Mondal
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "20px" }}>
              Software engineer and cybersecurity specialist. Engineering high-performance web & mobile applications, machine learning detection pipelines, and authorized penetration tests.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin size={15} style={{ color: "var(--accent-cyan)" }} />
                <span>{personalInfo.location}</span>
              </span>
              <a
                href={`mailto:${personalInfo.email}`}
                style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", overflowWrap: "anywhere", wordBreak: "break-all" }}
              >
                <Mail size={15} style={{ color: "var(--accent-cyan)" }} />
                <span>{personalInfo.email}</span>
              </a>
              <a
                href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
                style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)" }}
              >
                <Phone size={15} style={{ color: "var(--accent-cyan)" }} />
                <span>{personalInfo.phone}</span>
              </a>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "18px", letterSpacing: "0.02em" }}>
              ENGINEERING SERVICES
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.875rem" }}>
              {initialServices.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    style={{ color: "var(--text-secondary)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--accent-cyan)")}
                    onMouseLeave={(e) => (e.target.style.color = "var(--text-secondary)")}
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
              <li style={{ marginTop: "4px" }}>
                <Link
                  to="/quote"
                  style={{ color: "var(--accent-cyan)", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <span>Request Custom Quote</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial & Topics */}
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "18px", letterSpacing: "0.02em" }}>
              PUBLISHING & TOPICS
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.875rem" }}>
              <li>
                <Link to="/blog" style={{ color: "var(--text-secondary)" }}>
                  All Articles & Guides
                </Link>
              </li>
              {initialCategories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/blog?category=${encodeURIComponent(cat.name)}`} style={{ color: "var(--text-secondary)" }}>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Legal */}
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "18px", letterSpacing: "0.02em" }}>
              COMPLIANCE & SYSTEM
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.875rem" }}>
              <li><Link to="/privacy" style={{ color: "var(--text-secondary)" }}>Privacy Policy</Link></li>
              <li><Link to="/terms" style={{ color: "var(--text-secondary)" }}>Terms of Service</Link></li>
              <li><Link to="/cookies" style={{ color: "var(--text-secondary)" }}>Cookie Policy</Link></li>
              <li><Link to="/disclaimer" style={{ color: "var(--text-secondary)" }}>Security Assessment Disclaimer</Link></li>
              <li style={{ paddingTop: "8px", borderTop: "1px solid var(--card-border)" }}>
                <Link
                  to="/admin"
                  style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem" }}
                >
                  <Lock size={13} />
                  <span>Admin Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Verified Socials */}
        <div
          style={{
            borderTop: "1px solid var(--card-border)",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "0.84rem"
          }}
        >
          <div>
            © {currentYear} Abhijit Mondal. All rights reserved. Field report and verified portfolio architecture.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-secondary)" }}
              aria-label="GitHub Profile"
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-secondary)" }}
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
