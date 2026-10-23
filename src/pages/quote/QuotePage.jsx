import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { initialServices } from "../../data/initialServices";
import { useCMS } from "../../context/CMSContext";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { validateQuoteForm } from "../../utils/validation";
import { generateQuoteId } from "../../utils/formatters";
import { updateSEO } from "../../utils/seo";
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
  ShieldAlert
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateQuoteForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable persistence
    setTimeout(() => {
      const newQuote = submitQuote({
        id: generateQuoteId(),
        ...formData,
        serviceTitle: activeService.title
      });

      setSubmittedQuote(newQuote);
      setIsSubmitting(false);
      window.scrollTo({ top: 80, behavior: "smooth" });
    }, 600);
  };

  // SUCCESS CONFIRMATION SCREEN
  if (submittedQuote) {
    return (
      <div style={{ paddingTop: "40px", paddingBottom: "96px" }}>
        <div className="container" style={{ maxWidth: "780px" }}>
          <div
            className="card"
            style={{
              padding: "48px 40px",
              textAlign: "center",
              border: "1px solid var(--accent-emerald)",
              boxShadow: "0 20px 40px rgba(16, 185, 129, 0.15)"
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "rgba(16, 185, 129, 0.15)",
                border: "2px solid var(--accent-emerald)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                color: "var(--accent-emerald)"
              }}
            >
              <CheckCircle2 size={32} />
            </div>

            <span className="badge badge-emerald" style={{ marginBottom: "12px" }}>
              REQUEST PERSISTED & LOGGED
            </span>

            <h1 style={{ fontSize: "2rem", marginBottom: "12px" }}>
              Quote Request Confirmed
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", marginBottom: "28px" }}>
              Thank you, <strong>{submittedQuote.name}</strong>. Your request has been securely registered in our system. You will receive an initial technical assessment and proposal within 24 hours.
            </p>

            {/* Reference Badge */}
            <div
              style={{
                background: "var(--bg-tertiary)",
                border: "1px dashed var(--accent-cyan)",
                borderRadius: "var(--radius-md)",
                padding: "16px",
                marginBottom: "32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                UNIQUE TRACKING REFERENCE ID:
              </span>
              <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--accent-cyan)", fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}>
                {submittedQuote.id}
              </span>
            </div>

            {/* Summary Details */}
            <div
              style={{
                textAlign: "left",
                background: "var(--bg-secondary)",
                borderRadius: "var(--radius-md)",
                padding: "20px",
                marginBottom: "36px",
                border: "1px solid var(--card-border)",
                fontSize: "0.9rem",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "6px" }}>
                <span style={{ color: "var(--text-muted)", minWidth: "120px" }}>Service:</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)", flex: 1, minWidth: "160px", overflowWrap: "anywhere" }}>{submittedQuote.serviceTitle}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "6px" }}>
                <span style={{ color: "var(--text-muted)", minWidth: "120px" }}>Project Title:</span>
                <span style={{ color: "var(--text-primary)", flex: 1, minWidth: "160px", overflowWrap: "anywhere" }}>{submittedQuote.projectTitle}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "6px" }}>
                <span style={{ color: "var(--text-muted)", minWidth: "120px" }}>Budget Range:</span>
                <span style={{ color: "var(--accent-cyan)", fontWeight: 600, flex: 1, minWidth: "160px" }}>{submittedQuote.budgetRange}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "6px" }}>
                <span style={{ color: "var(--text-muted)", minWidth: "120px" }}>Timeline:</span>
                <span style={{ color: "var(--text-primary)", flex: 1, minWidth: "160px" }}>{submittedQuote.timeline}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => window.print()} className="btn btn-secondary">
                <Printer size={16} />
                <span>Print or Save Summary</span>
              </button>
              <Link to="/" className="btn btn-primary">
                <span>Return to Portfolio Home</span>
                <ArrowRight size={16} />
              </Link>
            </div>
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
