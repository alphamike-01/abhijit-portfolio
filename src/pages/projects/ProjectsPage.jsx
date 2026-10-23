import { useState, useEffect } from "react";
import { initialProjects } from "../../data/initialProjects";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { updateSEO } from "../../utils/seo";
import { ExternalLink, Layers, CheckCircle2, Terminal } from "lucide-react";
import { GithubIcon } from "../../components/ui/Icons";

export default function ProjectsPage() {
  const [selectedDomain, setSelectedDomain] = useState("All");

  useEffect(() => {
    updateSEO({
      title: "Projects & Research — Abhijit Mondal",
      description: "Explore Abhijit Mondal's verified projects: Static PE Malware Classifier, Tactical Cybersecurity Framework, Linux Forensics Engine, and Civic Applications.",
      canonical: "https://abhijitmondal.dev/projects"
    });
  }, []);

  const domains = ["All", "Cybersecurity & Forensics", "Machine Learning & Security", "Web & Software", "Hardware & IoT"];

  const filteredProjects = selectedDomain === "All"
    ? initialProjects
    : initialProjects.filter((p) => p.domain === selectedDomain);

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "96px" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Projects & Research" }]} />

        {/* Header */}
        <div style={{ maxWidth: "780px", marginBottom: "48px" }}>
          <span className="section-tag">VERIFIED ARCHITECTURE</span>
          <h1 style={{ marginBottom: "16px" }}>
            Projects, Systems & Security Research
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: "1.7" }}>
            A curated portfolio of software engineering systems, research prototypes, and digital forensic tools built by Abhijit Mondal.
          </p>
        </div>

        {/* Domain Filter Pills */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`btn btn-sm ${selectedDomain === dom ? "btn-primary" : "btn-secondary"}`}
              style={{ fontSize: "0.84rem" }}
            >
              {dom}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="card"
              style={{ padding: "36px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <span className="card-badge">{project.category}</span>
                    <span style={{ fontSize: "0.8rem", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)" }}>
                      // {project.domain}
                    </span>
                  </div>
                  <h2 style={{ fontSize: "1.6rem", fontWeight: 700 }}>
                    {project.title}
                  </h2>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span className="badge badge-emerald">
                    ● {project.status}
                  </span>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "20px" }}>
                {project.fullDesc}
              </p>

              {/* Research Highlight if available */}
              {project.researchHighlight && (
                <div
                  style={{
                    background: "rgba(0, 242, 254, 0.05)",
                    borderLeft: "3px solid var(--accent-cyan)",
                    padding: "10px 16px",
                    borderRadius: "0 6px 6px 0",
                    marginBottom: "24px",
                    fontSize: "0.875rem",
                    color: "var(--text-primary)"
                  }}
                >
                  <strong>Technical Highlight:</strong> {project.researchHighlight}
                </div>
              )}

              {/* Architectural Highlights */}
              <div style={{ marginBottom: "24px" }}>
                <h4 style={{ fontSize: "0.85rem", fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", marginBottom: "10px", letterSpacing: "0.04em" }}>
                  // SYSTEM ARCHITECTURE & IMPLEMENTATION
                </h4>
                <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "10px" }}>
                  {project.architecture.map((arch, idx) => (
                    <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      <CheckCircle2 size={15} style={{ color: "var(--accent-cyan)", flexShrink: 0, marginTop: "2px" }} />
                      <span>{arch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies & Actions */}
              <div
                style={{
                  borderTop: "1px solid var(--card-border)",
                  paddingTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px"
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: "0.78rem",
                        fontFamily: "var(--font-mono)",
                        background: "var(--bg-tertiary)",
                        padding: "3px 10px",
                        borderRadius: "4px",
                        border: "1px solid var(--card-border)",
                        color: "var(--text-primary)"
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    <GithubIcon size={15} />
                    <span>Source Repository</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
