import { useEffect } from "react";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { updateSEO } from "../../utils/seo";

export default function PrivacyPolicy() {
  useEffect(() => {
    updateSEO({
      title: "Privacy Policy — Abhijit Mondal",
      description: "Data privacy practices, information processing, and compliance for Abhijit Mondal portfolio and client services.",
      canonical: "https://abhijitmondal.dev/privacy"
    });
  }, []);

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "96px" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        <h1 style={{ marginBottom: "16px" }}>Privacy Policy</h1>
        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "32px", fontFamily: "var(--font-mono)" }}>
          LAST REVISED: OCTOBER 2026
        </div>

        <div className="card" style={{ padding: "40px", lineHeight: "1.8", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>1. Introduction</h2>
          <p style={{ marginBottom: "20px" }}>
            This Privacy Policy explains how Abhijit Mondal ("we", "us", or "our") collects, uses, and safeguards information when you visit abhijitmondal.dev or submit quote requests for software engineering or cybersecurity services. We are committed to transparency and compliance with applicable data protection laws, including the Digital Personal Data Protection Act, 2023 (India) and the General Data Protection Regulation (GDPR).
          </p>

          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>2. Information We Collect</h2>
          <p style={{ marginBottom: "12px" }}>We only collect information necessary to provide requested services:</p>
          <ul style={{ listStyle: "disc", paddingLeft: "24px", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <li><strong>Quote & Consultation Inquiries:</strong> Your full name, work email address, contact phone/WhatsApp number, organization name, project scope, budget range, and timeline parameters.</li>
            <li><strong>Penetration Testing Attestation:</strong> Legal ownership confirmation and system boundaries for authorized security assessments.</li>
            <li><strong>Local Browser Preferences:</strong> Interface display theme (dark/light mode) and cookie consent status stored locally on your device.</li>
          </ul>

          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>3. How Information Is Used</h2>
          <p style={{ marginBottom: "20px" }}>
            Information collected through the Get a Quote workflow is utilized exclusively to evaluate project feasibility, formulate technical proposals, establish formal client contracts, and respond to inquiries. We do NOT sell, rent, or trade your personal or project details to third-party data brokers.
          </p>

          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>4. Advertising & Third-Party Cookies</h2>
          <p style={{ marginBottom: "20px" }}>
            Our editorial technology blog may integrate Google AdSense or compliant digital advertising partners in the future. Third-party vendors, including Google, use cookies to serve ads based on prior visits. You may opt out of personalized advertising by visiting Google Ads Settings or through your browser's cookie management controls.
          </p>

          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>5. Data Security & Storage</h2>
          <p style={{ marginBottom: "20px" }}>
            We implement administrative, technical, and physical security safeguards to protect submitted client requirements against unauthorized access, disclosure, alteration, or destruction.
          </p>

          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>6. Contact & Data Subject Rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of your personal contact records. Direct all privacy inquiries to <strong>abhijitmondaljaihind@gmail.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
