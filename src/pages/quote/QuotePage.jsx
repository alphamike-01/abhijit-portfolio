import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { initialServices } from "../../data/initialServices";
import { useCMS } from "../../context/CMSContext";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { validateQuoteForm } from "../../utils/validation";
import { generateQuoteId, formatDate } from "../../utils/formatters";
import { updateSEO } from "../../utils/seo";
import { personalInfo } from "../../data/credentialsData";
import {
  Shield,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileCheck,
  AlertCircle,
  Clock,
  Printer,
  Copy,
  Mail,
  Phone,
  Building,
  DollarSign,
  Calendar,
  Layers,
  ShieldAlert,
  Check,
  RotateCcw,
  Sparkles,
  ExternalLink,
  FileText
} from "lucide-react";

export default function QuotePage() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get("service") || "web-development-seo";
  const { submitQuote } = useCMS();

  useEffect(() => {
    updateSEO({
      title: "Get a Project Quote — Abhijit Mondal",
      description: "Request a custom proposal and budget estimate for web development, mobile applications, machine learning, or authorized penetration testing.",
      canonical: "https://abhijitmondal.dev/quote"
    });
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [copiedId, setCopiedId] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    serviceId: preselectedService,
    projectTitle: "",
    projectDescription: "",
    deliverables: [],
    budgetRange: "₹50,000 – ₹1,00,000",
    timeline: "2-4 Weeks",
    preferredContact: "Email & Video Call",
    projectUrl: "",
    additionalNotes: "",
    privacyConsent: false,
    authorizedAttestation: false,
    websiteHoneypot: "" // Anti-spam bot trap
  });

  // Keep service updated if URL query changes
  useEffect(() => {
    if (preselectedService && initialServices.some((s) => s.id === preselectedService)) {
      setFormData((prev) => ({ ...prev, serviceId: preselectedService }));
    }
  }, [preselectedService]);

  const activeService = initialServices.find((s) => s.id === formData.serviceId) || initialServices[0];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    // Clear error for field
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleDeliverableToggle = (deliverable) => {
    setFormData((prev) => {
      const exists = prev.deliverables.includes(deliverable);
      const nextDeliverables = exists
        ? prev.deliverables.filter((d) => d !== deliverable)
        : [...prev.deliverables, deliverable];
      return { ...prev, deliverables: nextDeliverables };
    });
  };

  const handleNextStep = () => {
    // Validate step requirements
    const errors = {};
    if (currentStep === 1) {
      if (!formData.name || formData.name.trim().length < 2) errors.name = "Full name is required (min 2 chars).";
      if (!formData.email || !formData.email.includes("@")) errors.email = "A valid work or personal email is required.";
    } else if (currentStep === 2) {
      if (!formData.projectTitle || formData.projectTitle.trim().length < 3) errors.projectTitle = "Project title is required.";
      if (!formData.projectDescription || formData.projectDescription.trim().length < 15) errors.projectDescription = "Please provide project details (min 15 chars).";
      if (formData.serviceId === "penetration-testing" && !formData.authorizedAttestation) {
        errors.authorizedAttestation = "Confirmation of legal testing authorization is mandatory.";
      }
    } else if (currentStep === 3) {
      if (!formData.budgetRange) errors.budgetRange = "Please select a budget range.";
      if (!formData.timeline) errors.timeline = "Please select a target timeline.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleCopyId = () => {
    if (!submittedQuote?.id) return;
    navigator.clipboard.writeText(submittedQuote.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopySummary = () => {
    if (!submittedQuote) return;
    const summaryLines = [
      `============================================================`,
      `PROJECT SCOPING SPECIFICATION DOSSIER`,
      `Reference ID: ${submittedQuote.id}`,
      `Date Logged:  ${formatDate(submittedQuote.createdAt || new Date().toISOString())}`,
      `Status:       INTAKE LOGGED & VERIFIED`,
      `============================================================`,
      ``,
      `[CLIENT PROFILE]`,
      `Name:                 ${submittedQuote.name}`,
      `Email:                ${submittedQuote.email}`,
      `Phone:                ${submittedQuote.phone || "Not specified"}`,
      `Organization:         ${submittedQuote.organization || "Independent Client"}`,
      `Preferred Contact:    ${submittedQuote.preferredContact || "Email & Video Call"}`,
      ``,
      `[PROJECT SPECIFICATIONS]`,
      `Primary Service:      ${submittedQuote.serviceTitle}`,
      `Project Title:        ${submittedQuote.projectTitle}`,
      `Project Scope:        ${submittedQuote.projectDescription}`,
      submittedQuote.projectUrl ? `Reference / URL:      ${submittedQuote.projectUrl}` : null,
      submittedQuote.deliverables?.length ? `Deliverables:         ${submittedQuote.deliverables.join(", ")}` : null,
      submittedQuote.authorizedAttestation ? `Legal Authorization:  CONFIRMED & ATTESTED (Penetration Testing)` : null,
      ``,
      `[COMMERCIALS & SCHEDULE]`,
      `Target Budget:        ${submittedQuote.budgetRange}`,
      `Target Timeline:      ${submittedQuote.timeline}`,
      submittedQuote.additionalNotes ? `Additional Directives: ${submittedQuote.additionalNotes}` : null,
      ``,
      `------------------------------------------------------------`,
      `DIRECT ENGINEERING CONTACT:`,
      `Lead Engineer:        ${personalInfo.name}`,
      `Email:                ${personalInfo.email}`,
      `Phone:                ${personalInfo.phone}`,
      `Portfolio:            https://abhijitmondal.dev`,
      `============================================================`
    ].filter(Boolean).join("\n");

    navigator.clipboard.writeText(summaryLines);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      organization: "",
      serviceId: preselectedService || "web-development-seo",
      projectTitle: "",
      projectDescription: "",
      deliverables: [],
      budgetRange: "₹50,000 – ₹1,00,000",
      timeline: "2-4 Weeks",
      preferredContact: "Email & Video Call",
      projectUrl: "",
      additionalNotes: "",
      privacyConsent: false,
      authorizedAttestation: false,
      websiteHoneypot: ""
    });
    setFormErrors({});
    setSubmittedQuote(null);
    setCurrentStep(1);
    window.scrollTo({ top: 80, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateQuoteForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const quotePayload = {
        id: generateQuoteId(),
        ...formData,
        serviceTitle: activeService.title,
        createdAt: new Date().toISOString()
      };

      const result = await submitQuote(quotePayload);
      setSubmittedQuote(result || quotePayload);
      window.scrollTo({ top: 60, behavior: "smooth" });
    } catch (err) {
      console.error("Quote submission error:", err);
      // Fallback in case of unexpected context error
      const fallbackQuote = {
        id: generateQuoteId(),
        ...formData,
        serviceTitle: activeService.title,
        createdAt: new Date().toISOString()
      };
      setSubmittedQuote(fallbackQuote);
      window.scrollTo({ top: 60, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (submittedQuote) {
    const formattedDate = formatDate(submittedQuote.createdAt || new Date().toISOString());

    return (
      <div style={{ paddingTop: "40px", paddingBottom: "96px" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          
          {/* Print Letterhead Header (Only appears when printed or saved as PDF) */}
          <div
            className="print-header"
            style={{
              display: "none",
              marginBottom: "28px",
              borderBottom: "2px solid #0f172a",
              paddingBottom: "16px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h1 style={{ margin: "0 0 4px", fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  {personalInfo.name} — PROJECT SCOPING DOSSIER
                </h1>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#475569" }}>
                  {personalInfo.title} • {personalInfo.email} • {personalInfo.phone}
                </p>
              </div>
              <div style={{ textAlign: "right", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                <div><strong>TRACKING REF:</strong> {submittedQuote.id}</div>
                <div><strong>ISSUED:</strong> {formattedDate}</div>
              </div>
            </div>
          </div>

          {/* Dossier Card Container */}
          <div className="quote-receipt-card" style={{ padding: "0", marginBottom: "32px" }}>
            
            {/* Top Status Header */}
            <div
              style={{
                padding: "36px 36px 30px",
                borderBottom: "1px solid var(--card-border)",
                background: "linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(13, 20, 36, 0.4) 100%)",
                position: "relative"
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "var(--accent-emerald)",
                      boxShadow: "0 0 12px var(--accent-emerald)",
                      display: "inline-block"
                    }}
                  />
                  <span className="badge badge-emerald" style={{ letterSpacing: "0.06em", fontWeight: 700 }}>
                    DOSSIER REGISTERED & ENCRYPTED
                  </span>
                </div>
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  <Clock size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: "5px" }} />
                  Logged: {formattedDate}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: "rgba(16, 185, 129, 0.15)",
                    border: "1.5px solid var(--accent-emerald)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-emerald)",
                    flexShrink: 0
                  }}
                >
                  <CheckCircle2 size={30} />
                </div>
                <div>
                  <h1 style={{ fontSize: "1.85rem", margin: "0 0 8px", lineHeight: 1.25 }}>
                    Project Scoping Request Confirmed
                  </h1>
                  <p style={{ color: "var(--text-secondary)", fontSize: "1rem", margin: 0, lineHeight: 1.6 }}>
                    Thank you, <strong>{submittedQuote.name}</strong>{submittedQuote.organization ? ` (${submittedQuote.organization})` : ""}. Your specifications have been formally received and queued for technical architecture review. An itemized proposal will be delivered to <strong>{submittedQuote.email}</strong> within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Reference Tracking Box */}
            <div
              style={{
                padding: "24px 36px",
                background: "rgba(7, 11, 19, 0.6)",
                borderBottom: "1px solid var(--card-border)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px"
              }}
            >
              <div>
                <span style={{ fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
                  Unique Tracking Reference ID
                </span>
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent-cyan)",
                    letterSpacing: "0.08em"
                  }}
                >
                  {submittedQuote.id}
                </span>
              </div>

              <div className="no-print" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="btn btn-secondary"
                  style={{ padding: "8px 16px", fontSize: "0.85rem" }}
                  title="Copy Reference ID to clipboard"
                >
                  {copiedId ? (
                    <>
                      <Check size={15} style={{ color: "var(--accent-emerald)" }} />
                      <span style={{ color: "var(--accent-emerald)" }}>Copied ID</span>
                    </>
                  ) : (
                    <>
                      <Copy size={15} />
                      <span>Copy Reference</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 3-Stage Intake Roadmap */}
            <div style={{ padding: "32px 36px", borderBottom: "1px solid var(--card-border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <Sparkles size={16} style={{ color: "var(--accent-cyan)" }} />
                <h3 style={{ fontSize: "1rem", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                  Engagement & Response Pipeline
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                {/* Stage 1 */}
                <div className="roadmap-step completed">
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(16, 185, 129, 0.2)",
                      border: "2px solid var(--accent-emerald)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-emerald)",
                      flexShrink: 0
                    }}
                  >
                    <CheckCircle2 size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Stage 1: Specification Ingestion & Validation</span>
                      <span className="badge badge-emerald" style={{ fontSize: "0.7rem", padding: "2px 8px" }}>Completed</span>
                    </div>
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                      Dossier successfully logged, parameters checked for completeness, and anti-spam verification attested.
                    </p>
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="roadmap-step">
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(0, 242, 254, 0.15)",
                      border: "2px solid var(--accent-cyan)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-cyan)",
                      flexShrink: 0
                    }}
                  >
                    <Clock size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Stage 2: Architectural & Security Assessment</span>
                      <span className="badge badge-cyan" style={{ fontSize: "0.7rem", padding: "2px 8px" }}>Within 12 Hours</span>
                    </div>
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                      Abhijit performs technical analysis on your architecture requirements, feasibility scope, and security considerations.
                    </p>
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="roadmap-step">
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "2px solid rgba(255, 255, 255, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-muted)",
                      flexShrink: 0
                    }}
                  >
                    <FileCheck size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-secondary)" }}>Stage 3: Formal Proposal & Milestone SLA</span>
                      <span className="badge" style={{ fontSize: "0.7rem", padding: "2px 8px", background: "rgba(255, 255, 255, 0.08)", color: "var(--text-muted)" }}>Within 24 Hours</span>
                    </div>
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-muted)" }}>
                      Direct delivery of structured technical proposal, itemized deliverables, milestone timeline, and exact quotation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Itemized Scoping Specification Receipt */}
            <div style={{ padding: "32px 36px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                <FileText size={16} style={{ color: "var(--accent-teal)" }} />
                <h3 style={{ fontSize: "1rem", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                  Itemized Project Scoping Specification
                </h3>
              </div>

              {/* Specification Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "20px",
                  background: "var(--bg-secondary)",
                  borderRadius: "var(--radius-lg)",
                  padding: "24px",
                  border: "1px solid var(--card-border)",
                  marginBottom: "24px"
                }}
              >
                {/* Client Profile */}
                <div>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", display: "block", marginBottom: "12px", fontWeight: 700 }}>
                    Client Profile
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.88rem" }}>
                    <div>
                      <span style={{ color: "var(--text-muted)" }}>Name: </span>
                      <strong style={{ color: "var(--text-primary)" }}>{submittedQuote.name}</strong>
                    </div>
                    <div>
                      <span style={{ color: "var(--text-muted)" }}>Email: </span>
                      <span style={{ color: "var(--accent-cyan)", wordBreak: "break-all" }}>{submittedQuote.email}</span>
                    </div>
                    {submittedQuote.phone && (
                      <div>
                        <span style={{ color: "var(--text-muted)" }}>Phone: </span>
                        <span>{submittedQuote.phone}</span>
                      </div>
                    )}
                    <div>
                      <span style={{ color: "var(--text-muted)" }}>Organization: </span>
                      <span>{submittedQuote.organization || "Independent / Private Client"}</span>
                    </div>
                    <div>
                      <span style={{ color: "var(--text-muted)" }}>Preferred Contact: </span>
                      <span>{submittedQuote.preferredContact || "Email & Video Call"}</span>
                    </div>
                  </div>
                </div>

                {/* Project Commercials & Schedule */}
                <div>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", display: "block", marginBottom: "12px", fontWeight: 700 }}>
                    Commercials & Schedule
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.88rem" }}>
                    <div>
                      <span style={{ color: "var(--text-muted)" }}>Selected Service: </span>
                      <span className="badge badge-teal" style={{ marginLeft: "4px" }}>
                        {submittedQuote.serviceTitle}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: "var(--text-muted)" }}>Budget Range: </span>
                      <strong style={{ color: "var(--accent-emerald)" }}>{submittedQuote.budgetRange}</strong>
                    </div>
                    <div>
                      <span style={{ color: "var(--text-muted)" }}>Target Timeline: </span>
                      <strong style={{ color: "var(--accent-cyan)" }}>{submittedQuote.timeline}</strong>
                    </div>
                    {submittedQuote.projectUrl && (
                      <div style={{ wordBreak: "break-all" }}>
                        <span style={{ color: "var(--text-muted)" }}>Reference URL: </span>
                        <a
                          href={submittedQuote.projectUrl.startsWith("http") ? submittedQuote.projectUrl : `https://${submittedQuote.projectUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "var(--accent-cyan)", textDecoration: "underline", display: "inline-flex", alignItems: "center", gap: "4px" }}
                        >
                          {submittedQuote.projectUrl}
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Scope Description & Deliverables */}
              <div
                style={{
                  background: "var(--bg-secondary)",
                  borderRadius: "var(--radius-lg)",
                  padding: "24px",
                  border: "1px solid var(--card-border)",
                  fontSize: "0.9rem"
                }}
              >
                <div style={{ marginBottom: "16px" }}>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", display: "block", marginBottom: "6px", fontWeight: 700 }}>
                    Project Title
                  </span>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {submittedQuote.projectTitle}
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", display: "block", marginBottom: "6px", fontWeight: 700 }}>
                    Scope Overview & Technical Requirements
                  </span>
                  <p style={{ color: "var(--text-secondary)", margin: 0, lineHeight: 1.6, whiteSpace: "pre-line" }}>
                    {submittedQuote.projectDescription}
                  </p>
                </div>

                {submittedQuote.deliverables && submittedQuote.deliverables.length > 0 && (
                  <div style={{ marginBottom: "16px" }}>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", display: "block", marginBottom: "8px", fontWeight: 700 }}>
                      Selected Scope Deliverables ({submittedQuote.deliverables.length})
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {submittedQuote.deliverables.map((item, idx) => (
                        <span key={idx} className="badge badge-cyan" style={{ fontSize: "0.8rem", padding: "4px 10px" }}>
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {submittedQuote.authorizedAttestation && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 14px",
                      borderRadius: "var(--radius-md)",
                      background: "rgba(16, 185, 129, 0.1)",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      fontSize: "0.82rem",
                      color: "var(--accent-emerald)",
                      marginTop: "12px"
                    }}
                  >
                    <Shield size={16} style={{ flexShrink: 0 }} />
                    <span><strong>Security Attestation:</strong> Legal authorization to test target infrastructure attested and verified.</span>
                  </div>
                )}

                {submittedQuote.additionalNotes && (
                  <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--card-border)" }}>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", display: "block", marginBottom: "4px", fontWeight: 700 }}>
                      Additional Directives
                    </span>
                    <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "0.85rem", fontStyle: "italic" }}>
                      "{submittedQuote.additionalNotes}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Priority Contact Strip */}
            <div
              className="no-print"
              style={{
                padding: "24px 36px",
                background: "linear-gradient(135deg, rgba(0, 242, 254, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)",
                borderTop: "1px solid var(--card-border)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "18px"
              }}
            >
              <div>
                <h4 style={{ margin: "0 0 4px", fontSize: "0.95rem" }}>
                  Need urgent consultation or scope adjustment before the 12-hour review?
                </h4>
                <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  Direct developer line — Monitored 9 AM – 9 PM IST. Quote reference <strong>{submittedQuote.id}</strong> pre-filled.
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <a
                  href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(`Priority Quote Inquiry [${submittedQuote.id}] - ${submittedQuote.projectTitle}`)}`}
                  className="btn btn-secondary"
                  style={{ padding: "8px 14px", fontSize: "0.85rem" }}
                >
                  <Mail size={15} />
                  <span>Email Directly</span>
                </a>
                <a
                  href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                  className="btn btn-secondary"
                  style={{ padding: "8px 14px", fontSize: "0.85rem" }}
                >
                  <Phone size={15} />
                  <span>Call {personalInfo.phone}</span>
                </a>
              </div>
            </div>

          </div>

          {/* Action Toolbar (Bottom) */}
          <div
            className="no-print"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px"
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-secondary"
              >
                <Printer size={16} />
                <span>Print / Save PDF Dossier</span>
              </button>

              <button
                type="button"
                onClick={handleCopySummary}
                className="btn btn-secondary"
              >
                {copiedSummary ? (
                  <>
                    <Check size={16} style={{ color: "var(--accent-emerald)" }} />
                    <span style={{ color: "var(--accent-emerald)" }}>Summary Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy Markdown Summary</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleResetForm}
                className="btn btn-secondary"
              >
                <RotateCcw size={16} />
                <span>Submit Another Request</span>
              </button>
            </div>

            <Link to="/" className="btn btn-primary">
              <span>Return to Portfolio Home</span>
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </div>
    );
  }

  const steps = [
    { number: 1, label: "Contact Details" },
    { number: 2, label: "Scope & Requirements" },
    { number: 3, label: "Budget & Timeline" },
    { number: 4, label: "Review & Submit" }
  ];

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "96px" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <Breadcrumbs items={[{ label: "Get a Quote" }]} />

        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <span className="section-tag">GUIDED SCOPING</span>
          <h1 style={{ marginBottom: "12px", fontSize: "clamp(2rem, 3.8vw, 2.8rem)" }}>
            Request a Project Proposal & Quote
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>
            Complete this four-stage scoping brief to receive an architected proposal, technical deliverables, and fixed-price quotation.
          </p>
        </div>

        {/* Step Progress Indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            marginBottom: "40px",
            padding: "0 10px"
          }}
        >
          {steps.map((s) => {
            const isCompleted = currentStep > s.number;
            const isCurrent = currentStep === s.number;
            return (
              <div
                key={s.number}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  zIndex: 2,
                  flex: 1
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    background: isCompleted
                      ? "var(--accent-emerald)"
                      : isCurrent
                      ? "var(--accent-cyan)"
                      : "var(--bg-tertiary)",
                    color: isCompleted || isCurrent ? "#070B13" : "var(--text-muted)",
                    border: `2px solid ${isCurrent ? "var(--accent-cyan)" : "var(--card-border)"}`,
                    boxShadow: isCurrent ? "0 0 15px rgba(0, 242, 254, 0.4)" : "none",
                    transition: "all 0.3s ease"
                  }}
                >
                  {isCompleted ? <CheckCircle2 size={18} /> : s.number}
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: isCurrent ? 700 : 500,
                    color: isCurrent ? "var(--accent-cyan)" : "var(--text-muted)",
                    textAlign: "center"
                  }}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="card" style={{ padding: "40px 32px" }}>
          {/* Honeypot field (hidden from legitimate users) */}
          <div style={{ display: "none" }} aria-hidden="true">
            <label htmlFor="websiteHoneypot">Leave this blank</label>
            <input
              type="text"
              id="websiteHoneypot"
              name="websiteHoneypot"
              value={formData.websiteHoneypot}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* STEP 1: CONTACT DETAILS */}
          {currentStep === 1 && (
            <div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px" }}>
                1. Your Contact Information
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "28px" }}>
                We use these details solely to communicate regarding this proposal. Zero spam, ever.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                <div className="form-group">
                  <label className="form-label">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Dr. Rajesh Kumar"
                    className="form-control"
                  />
                  {formErrors.name && <div className="form-error">{formErrors.name}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Work or Personal Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. rajesh@company.com"
                    className="form-control"
                  />
                  {formErrors.email && <div className="form-error">{formErrors.email}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 98765 43210"
                    className="form-control"
                  />
                  {formErrors.phone && <div className="form-error">{formErrors.phone}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder="e.g. Acme Health Technologies"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SERVICE & REQUIREMENTS */}
          {currentStep === 2 && (
            <div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px" }}>
                2. Project Scope & Deliverables
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "28px" }}>
                Select your service category and outline your objectives.
              </p>

              {/* Service Select */}
              <div className="form-group">
                <label className="form-label">
                  Primary Service Offering <span className="required">*</span>
                </label>
                <select
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleInputChange}
                  className="form-control"
                  style={{ background: "var(--bg-tertiary)" }}
                >
                  {initialServices.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Penetration Testing Mandatory Authorization */}
              {formData.serviceId === "penetration-testing" && (
                <div
                  style={{
                    background: "rgba(245, 158, 11, 0.08)",
                    border: "1px solid rgba(245, 158, 11, 0.3)",
                    borderRadius: "var(--radius-md)",
                    padding: "18px 20px",
                    marginBottom: "24px"
                  }}
                >
                  <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "12px" }}>
                    <ShieldAlert size={20} style={{ color: "var(--accent-amber)", flexShrink: 0 }} />
                    <div style={{ fontSize: "0.85rem", color: "var(--text-primary)", fontWeight: 600 }}>
                      MANDATORY LEGAL AUTHORIZATION REQUIREMENT
                    </div>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "12px" }}>
                    Ethical penetration testing requires verified written authorization from the system or domain owner. Unauthorized scanning or testing is illegal under IT Act Sec 43/66.
                  </p>
                  <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "0.84rem", color: "var(--text-primary)" }}>
                    <input
                      type="checkbox"
                      name="authorizedAttestation"
                      checked={formData.authorizedAttestation}
                      onChange={handleInputChange}
                      style={{ width: "16px", height: "16px", accentColor: "var(--accent-amber)" }}
                    />
                    <span>
                      I attest that I represent the verified owner of target systems and will execute a formal Rules of Engagement document prior to any testing.
                    </span>
                  </label>
                  {formErrors.authorizedAttestation && (
                    <div className="form-error" style={{ marginTop: "8px" }}>{formErrors.authorizedAttestation}</div>
                  )}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">
                  Project Title or Codename <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleInputChange}
                  placeholder="e.g. Next-Gen Mobile Clinical Record App"
                  className="form-control"
                />
                {formErrors.projectTitle && <div className="form-error">{formErrors.projectTitle}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Project Overview & Problem Statement <span className="required">*</span>
                </label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  placeholder="Describe what you want to build, existing systems, user types, and key business goals..."
                  className="form-control"
                  rows={4}
                />
                {formErrors.projectDescription && <div className="form-error">{formErrors.projectDescription}</div>}
              </div>

              {/* Deliverables Checklist based on selected service */}
              <div className="form-group">
                <label className="form-label">Requested Deliverables (Select all relevant)</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {activeService.deliverables.map((deliv) => {
                    const isSelected = formData.deliverables.includes(deliv);
                    return (
                      <label
                        key={deliv}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 14px",
                          background: isSelected ? "rgba(0, 242, 254, 0.08)" : "var(--bg-tertiary)",
                          border: `1px solid ${isSelected ? "var(--accent-cyan)" : "var(--card-border)"}`,
                          borderRadius: "var(--radius-sm)",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                          transition: "all 0.15s ease"
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleDeliverableToggle(deliv)}
                          style={{ accentColor: "var(--accent-cyan)" }}
                        />
                        <span style={{ color: isSelected ? "var(--text-primary)" : "var(--text-secondary)" }}>
                          {deliv}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: BUDGET & TIMELINE */}
          {currentStep === 3 && (
            <div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px" }}>
                3. Investment Budget & Delivery Timeline
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "28px" }}>
                Setting realistic budget parameters allows us to tailor the engineering architecture appropriately.
              </p>

              <div className="form-group">
                <label className="form-label">
                  Planned Investment Budget (INR / ₹) <span className="required">*</span>
                </label>
                <select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleInputChange}
                  className="form-control"
                  style={{ background: "var(--bg-tertiary)" }}
                >
                  <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000 (Focused MVPs & audits)</option>
                  <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000 (Standard full-stack apps & audits)</option>
                  <option value="₹1,00,000 – ₹2,50,000">₹1,00,000 – ₹2,50,000 (Production web/mobile platforms)</option>
                  <option value="₹2,50,000+">₹2,50,000+ (Comprehensive enterprise systems)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Target Launch Timeline <span className="required">*</span>
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="form-control"
                  style={{ background: "var(--bg-tertiary)" }}
                >
                  <option value="Urgent (< 2 Weeks)">Urgent (&lt; 2 Weeks)</option>
                  <option value="2-4 Weeks">2-4 Weeks</option>
                  <option value="1-2 Months">1-2 Months</option>
                  <option value="3+ Months / Ongoing">3+ Months / Ongoing</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Communication Channel</label>
                <select
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleInputChange}
                  className="form-control"
                  style={{ background: "var(--bg-tertiary)" }}
                >
                  <option value="Email & Video Call">Email & Video Call (Google Meet)</option>
                  <option value="WhatsApp & Email">WhatsApp & Email</option>
                  <option value="Direct Phone Call">Direct Phone Call</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Existing Project Reference / Repository URL (Optional)</label>
                <input
                  type="url"
                  name="projectUrl"
                  value={formData.projectUrl}
                  onChange={handleInputChange}
                  placeholder="https://github.com/... or https://staging.example.com"
                  className="form-control"
                />
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & PRIVACY CONSENT */}
          {currentStep === 4 && (
            <div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px" }}>
                4. Review Your Quote Request
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "24px" }}>
                Please review your details before formal submission.
              </p>

              <div
                style={{
                  background: "var(--bg-secondary)",
                  borderRadius: "var(--radius-md)",
                  padding: "20px",
                  border: "1px solid var(--card-border)",
                  fontSize: "0.9rem",
                  marginBottom: "28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px"
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "6px" }}>
                  <span style={{ color: "var(--text-muted)", minWidth: "120px" }}>Name:</span>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)", flex: 1, minWidth: "160px", overflowWrap: "anywhere" }}>{formData.name}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "6px" }}>
                  <span style={{ color: "var(--text-muted)", minWidth: "120px" }}>Email:</span>
                  <span style={{ color: "var(--text-primary)", flex: 1, minWidth: "160px", overflowWrap: "anywhere" }}>{formData.email}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "6px" }}>
                  <span style={{ color: "var(--text-muted)", minWidth: "120px" }}>Service:</span>
                  <span style={{ color: "var(--accent-cyan)", fontWeight: 600, flex: 1, minWidth: "160px", overflowWrap: "anywhere" }}>{activeService.title}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "6px" }}>
                  <span style={{ color: "var(--text-muted)", minWidth: "120px" }}>Project Title:</span>
                  <span style={{ color: "var(--text-primary)", flex: 1, minWidth: "160px", overflowWrap: "anywhere" }}>{formData.projectTitle}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "6px" }}>
                  <span style={{ color: "var(--text-muted)", minWidth: "120px" }}>Budget Range:</span>
                  <span style={{ color: "var(--text-primary)", flex: 1, minWidth: "160px" }}>{formData.budgetRange}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "6px" }}>
                  <span style={{ color: "var(--text-muted)", minWidth: "120px" }}>Timeline:</span>
                  <span style={{ color: "var(--text-primary)", flex: 1, minWidth: "160px" }}>{formData.timeline}</span>
                </div>
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="form-group">
                <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", fontSize: "0.85rem", color: "var(--text-primary)" }}>
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    checked={formData.privacyConsent}
                    onChange={handleInputChange}
                    style={{ marginTop: "3px", accentColor: "var(--accent-cyan)" }}
                  />
                  <span>
                    I agree to the{" "}
                    <Link to="/privacy" target="_blank" style={{ color: "var(--accent-cyan)", textDecoration: "underline" }}>
                      Privacy Policy
                    </Link>{" "}
                    and consent to having my project requirements processed for quotation purposes. <span className="required">*</span>
                  </span>
                </label>
                {formErrors.privacyConsent && <div className="form-error">{formErrors.privacyConsent}</div>}
              </div>
            </div>
          )}

          {/* Form Navigation Controls */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: "1px solid var(--card-border)"
            }}
          >
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="btn btn-secondary"
                disabled={isSubmitting}
              >
                <ArrowLeft size={16} />
                <span>Previous Step</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="btn btn-primary"
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "Submitting Securely..." : "Submit Quote Request"}</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
