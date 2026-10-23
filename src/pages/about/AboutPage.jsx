import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { personalInfo, experienceData, educationData, credentialsData } from "../../data/credentialsData";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { updateSEO } from "../../utils/seo";
import {
  Shield,
  GraduationCap,
  Briefcase,
  Award,
  ArrowRight,
  Mail,
  MapPin,
  ExternalLink,
  FileText,
  CheckCircle2,
  X,
  Eye,
  Download,
  Check
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../../components/ui/Icons";

export default function AboutPage() {
  const [modalCert, setModalCert] = useState(null);
  const [showScorecard, setShowScorecard] = useState(false);

  useEffect(() => {
    updateSEO({
      title: "About & Credentials — Abhijit Mondal",
      description: "Background, formal education, practical cybersecurity experience, and verified credentials of Abhijit Mondal.",
      canonical: "https://abhijitmondal.dev/about"
    });
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setModalCert(null);
        setShowScorecard(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "96px" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "About & Credentials" }]} />

        {/* Bio & Verified Identity Console */}
        <div
          className="card"
          style={{
            padding: "48px 40px",
            marginBottom: "64px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "48px",
            alignItems: "center"
          }}
        >
          {/* Text Summary */}
          <div>
            <span className="section-tag">BIOGRAPHY & DOSSIER</span>
            <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", marginBottom: "16px" }}>
              Abhijit Mondal
            </h1>
            <h3 style={{ fontSize: "1.15rem", color: "var(--accent-cyan)", marginBottom: "20px", fontWeight: 600 }}>
              {personalInfo.title}
            </h3>
            <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "20px" }}>
              {personalInfo.bio}
            </p>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "28px" }}>
              My engineering philosophy revolves around building defensive resilience into systems from the earliest architectural draft. Whether architecting scalable web applications or conducting authorized penetration tests, I focus on verifiable security, sub-second latency, and uncompromising quality.
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link to="/quote" className="btn btn-primary">
                <span>Discuss a Project</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                <GithubIcon size={16} />
                <span>GitHub Profile</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Verified Engineering & Security Identity Console */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "linear-gradient(145deg, rgba(13, 27, 42, 0.6) 0%, rgba(7, 11, 19, 0.95) 100%)",
              border: "1px solid var(--card-border)",
              borderRadius: "var(--radius-xl)",
              padding: "36px 28px",
              position: "relative",
              boxShadow: "0 12px 36px rgba(0, 0, 0, 0.4)"
            }}
          >
            {/* Official Profile Picture Frame */}
            <div
              style={{
                position: "relative",
                width: "132px",
                height: "132px",
                marginBottom: "18px"
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2.5px solid var(--accent-cyan)",
                  boxShadow: "0 0 32px rgba(0, 242, 254, 0.4)",
                  background: "radial-gradient(circle, rgba(0, 242, 254, 0.1) 0%, #070B13 100%)"
                }}
              >
                <img
                  src="/profile-square.png"
                  alt="Abhijit Mondal — Software Engineer & Cybersecurity Specialist"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "4px",
                  right: "4px",
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "#10B981",
                  border: "2.5px solid #070B13",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 10px rgba(16, 185, 129, 0.6)"
                }}
                title="Active Security & Engineering Clearance"
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FFFFFF" }} />
              </div>
            </div>

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                Abhijit Mondal
              </div>
              <div style={{ fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginTop: "2px" }}>
                Cybersecurity & Software Engineer
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "8px", padding: "4px 10px", borderRadius: "var(--radius-full)", background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", fontSize: "0.75rem", color: "var(--accent-emerald)", fontWeight: 600 }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--accent-emerald)" }} className="glow-pill" />
                <span>Verified Credentials On-Record</span>
              </div>
            </div>

            {/* Quick Credentials Summary Chips */}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "rgba(0, 242, 254, 0.05)", border: "1px solid rgba(0, 242, 254, 0.15)", borderRadius: "var(--radius-sm)", fontSize: "0.8rem" }}>
                <span style={{ color: "var(--text-secondary)" }}>MeitY / NASSCOM AWS ML</span>
                <span style={{ color: "var(--accent-cyan)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>Gold · 97%</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "rgba(0, 242, 254, 0.05)", border: "1px solid rgba(0, 242, 254, 0.15)", borderRadius: "var(--radius-sm)", fontSize: "0.8rem" }}>
                <span style={{ color: "var(--text-secondary)" }}>Google Cybersecurity</span>
                <span style={{ color: "var(--accent-cyan)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>9 Courses</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "rgba(0, 242, 254, 0.05)", border: "1px solid rgba(0, 242, 254, 0.15)", borderRadius: "var(--radius-sm)", fontSize: "0.8rem" }}>
                <span style={{ color: "var(--text-secondary)" }}>Cisco Networking Academy</span>
                <span style={{ color: "var(--accent-cyan)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>Endpoint Sec</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "rgba(0, 242, 254, 0.05)", border: "1px solid rgba(0, 242, 254, 0.15)", borderRadius: "var(--radius-sm)", fontSize: "0.8rem" }}>
                <span style={{ color: "var(--text-secondary)" }}>TryHackMe Global Rank</span>
                <span style={{ color: "var(--accent-emerald)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>Top 4%</span>
              </div>
            </div>

            <a
              href="#accreditations"
              className="btn btn-outline btn-sm"
              style={{ width: "100%", justifyContent: "center", fontSize: "0.8rem" }}
            >
              <span>Inspect Official Certificates</span>
              <span>↓</span>
            </a>
          </div>
        </div>

        {/* Education & Experience 2-Column */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "36px",
            marginBottom: "64px"
          }}
        >
          {/* Education */}
          <div className="card">
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
              <GraduationCap size={22} style={{ color: "var(--accent-cyan)" }} />
              <span>Academic Education</span>
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {educationData.map((edu) => (
                <div key={edu.period} style={{ borderBottom: "1px solid var(--card-border)", paddingBottom: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 700 }}>{edu.degree}</h4>
                    <span style={{ fontSize: "0.8rem", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)" }}>
                      {edu.period}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "6px" }}>
                    {edu.institution} {edu.specialization && `• ${edu.specialization}`}
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Experience */}
          <div className="card">
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
              <Briefcase size={22} style={{ color: "var(--accent-emerald)" }} />
              <span>Professional & Simulation Experience</span>
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {experienceData.map((exp) => (
                <div key={exp.title} style={{ borderBottom: "1px solid var(--card-border)", paddingBottom: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                    <h4 style={{ fontSize: "1.05rem", fontWeight: 700 }}>{exp.title}</h4>
                    <span style={{ fontSize: "0.8rem", color: "var(--accent-emerald)", fontFamily: "var(--font-mono)" }}>
                      {exp.year}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "6px" }}>
                    {exp.organization}
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Credentials & Honors Grid */}
        <div id="accreditations" style={{ marginBottom: "64px" }}>
          <div className="section-header">
            <span className="section-tag">HONORS & RECOGNITION</span>
            <h2 className="section-title">Verified Accreditations & Official Certificates</h2>
            <p style={{ fontSize: "1rem", color: "var(--text-secondary)", maxWidth: "680px" }}>
              Official government and global vendor credentials in cybersecurity defense, machine learning systems, and enterprise network forensics.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {credentialsData.map((cred) => {
              const hasDocs = Boolean(cred.image || cred.pdf || cred.verificationUrl);

              return (
                <div
                  key={cred.title}
                  className="card"
                  style={{
                    padding: "26px",
                    display: "flex",
                    flexDirection: "column",
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
                    <span className="card-badge">{cred.category}</span>
                    <span className="badge badge-cyan">{cred.badge}</span>
                  </div>

                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "8px" }}>
                    {cred.title}
                  </h3>

                  {cred.issuer && (
                    <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginBottom: "6px" }}>
                      <strong>Issuer:</strong> {cred.issuer}
                    </div>
                  )}

                  {cred.issueDate && (
                    <div style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", marginBottom: "12px" }}>
                      Issued: {cred.issueDate} {cred.certificationId && `// ID: ${cred.certificationId}`}
                    </div>
                  )}

                  {/* Thumbnail Preview for Credentials with Documents */}
                  {cred.image && (
                    <div
                      onClick={() => {
                        setModalCert(cred);
                        setShowScorecard(false);
                      }}
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "170px",
                        borderRadius: "var(--radius-md)",
                        overflow: "hidden",
                        border: "1px solid rgba(0, 242, 254, 0.25)",
                        marginBottom: "16px",
                        cursor: "pointer",
                        background: "#080C14"
                      }}
                      title="Click to inspect high-resolution certificate"
                    >
                      <img
                        src={cred.image}
                        alt={`${cred.title} certificate preview`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease" }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: "6px 12px",
                          background: "rgba(7, 11, 19, 0.85)",
                          backdropFilter: "blur(4px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontSize: "0.75rem",
                          color: "var(--accent-cyan)",
                          fontWeight: 600
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <Eye size={13} />
                          <span>Inspect Full Certificate</span>
                        </span>
                        <span>🔍</span>
                      </div>
                    </div>
                  )}

                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: "1.6", flex: 1, marginBottom: "18px" }}>
                    {cred.desc}
                  </p>

                  {/* Actions Toolbar */}
                  {hasDocs && (
                    <div
                      style={{
                        marginTop: "auto",
                        paddingTop: "14px",
                        borderTop: "1px solid var(--card-border)",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        flexWrap: "wrap"
                      }}
                    >
                      {cred.image && (
                        <button
                          onClick={() => {
                            setModalCert(cred);
                            setShowScorecard(false);
                          }}
                          className="btn btn-outline btn-sm"
                          style={{ fontSize: "0.78rem", padding: "6px 12px" }}
                        >
                          <Eye size={13} />
                          <span>View Image</span>
                        </button>
                      )}

                      {cred.scorecardImage && (
                        <button
                          onClick={() => {
                            setModalCert(cred);
                            setShowScorecard(true);
                          }}
                          className="btn btn-outline btn-sm"
                          style={{ fontSize: "0.78rem", padding: "6px 12px", borderColor: "rgba(16, 185, 129, 0.4)", color: "var(--accent-emerald)" }}
                        >
                          <FileText size={13} />
                          <span>Scorecard (97%)</span>
                        </button>
                      )}

                      {cred.pdf && (
                        <a
                          href={cred.pdf}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: "0.78rem", padding: "6px 12px" }}
                        >
                          <Download size={13} />
                          <span>PDF</span>
                        </a>
                      )}

                      {cred.verificationUrl && (
                        <a
                          href={cred.verificationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: "0.78rem", padding: "6px 12px" }}
                        >
                          <ExternalLink size={13} />
                          <span>Verify</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Certificate Inspection Modal */}
        {modalCert && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(8px)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px"
            }}
            onClick={() => {
              setModalCert(null);
              setShowScorecard(false);
            }}
          >
            <div
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "var(--radius-xl)",
                maxWidth: "960px",
                width: "100%",
                maxHeight: "92vh",
                overflowY: "auto",
                boxShadow: "0 24px 60px rgba(0, 0, 0, 0.8)",
                padding: "28px",
                position: "relative"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px", borderBottom: "1px solid var(--card-border)", paddingBottom: "16px" }}>
                <div>
                  <span className="card-badge" style={{ marginBottom: "6px" }}>{modalCert.category}</span>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {modalCert.title}
                  </h3>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                    {modalCert.issuer} {modalCert.issueDate && `• Issued: ${modalCert.issueDate}`}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setModalCert(null);
                    setShowScorecard(false);
                  }}
                  className="btn btn-outline btn-sm"
                  style={{ width: "36px", height: "36px", padding: 0, borderRadius: "50%" }}
                  aria-label="Close certificate modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Toggle for Scorecard if available */}
              {modalCert.scorecardImage && (
                <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
                  <button
                    onClick={() => setShowScorecard(false)}
                    className={`btn btn-sm ${!showScorecard ? "btn-primary" : "btn-outline"}`}
                  >
                    <span>Main Certificate</span>
                  </button>
                  <button
                    onClick={() => setShowScorecard(true)}
                    className={`btn btn-sm ${showScorecard ? "btn-primary" : "btn-outline"}`}
                  >
                    <span>Detailed Scorecard (Marks: 97/100)</span>
                  </button>
                </div>
              )}

              {/* Certificate Image View */}
              <div
                style={{
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  border: "1px solid var(--card-border)",
                  background: "#080C14",
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <img
                  src={showScorecard && modalCert.scorecardImage ? modalCert.scorecardImage : modalCert.image}
                  alt={modalCert.title}
                  style={{ width: "100%", maxHeight: "60vh", objectFit: "contain", display: "block" }}
                />
              </div>

              {/* Modal Footer Actions */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", borderTop: "1px solid var(--card-border)", paddingTop: "16px" }}>
                <div style={{ fontSize: "0.85rem", color: "var(--accent-cyan)", fontFamily: "var(--font-mono)" }}>
                  {modalCert.badge}
                </div>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {modalCert.pdf && (
                    <a
                      href={modalCert.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      <Download size={14} />
                      <span>Download Official PDF</span>
                    </a>
                  )}

                  {modalCert.verificationUrl && (
                    <a
                      href={modalCert.verificationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary btn-sm"
                    >
                      <ExternalLink size={14} />
                      <span>Verify on Coursera</span>
                    </a>
                  )}

                  <button
                    onClick={() => {
                      setModalCert(null);
                      setShowScorecard(false);
                    }}
                    className="btn btn-outline btn-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
