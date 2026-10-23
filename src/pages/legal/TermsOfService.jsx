import { useEffect } from "react";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { updateSEO } from "../../utils/seo";

export default function TermsOfService() {
  useEffect(() => {
    updateSEO({
      title: "Terms of Service — Abhijit Mondal",
      description: "Terms and conditions governing the software engineering, consulting, and publishing services of Abhijit Mondal.",
      canonical: "https://abhijitmondal.dev/terms"
    });
  }, []);

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "96px" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <Breadcrumbs items={[{ label: "Terms of Service" }]} />

        <h1 style={{ marginBottom: "16px" }}>Terms of Service</h1>
        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "32px", fontFamily: "var(--font-mono)" }}>
          LAST REVISED: OCTOBER 2026
        </div>

        <div className="card" style={{ padding: "40px", lineHeight: "1.8", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>1. Acceptance of Terms</h2>
          <p style={{ marginBottom: "20px" }}>
            By accessing abhijitmondal.dev, commissioning engineering services, or reviewing technical publications, you agree to comply with and be bound by these Terms of Service. If you do not agree, please discontinue using this website.
          </p>

          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>2. Scope of Services & Engagements</h2>
          <p style={{ marginBottom: "20px" }}>
            All software development, machine learning pipeline engineering, and penetration testing projects are governed by individual Statements of Work (SoW), signed Non-Disclosure Agreements (NDAs), and formal Rules of Engagement (RoE). Estimates provided via the online quote tool are preliminary and subject to formal scoping.
          </p>

          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>3. Intellectual Property Rights</h2>
          <p style={{ marginBottom: "20px" }}>
            Unless otherwise agreed in a written agreement, custom software developed under fixed-price contracts becomes the exclusive property of the client upon receipt of full payment. Open-source research projects and editorial blog articles remain the copyrighted intellectual property of Abhijit Mondal.
          </p>

          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>4. Authorized Penetration Testing Mandate</h2>
          <p style={{ marginBottom: "20px" }}>
            Under no circumstances does Abhijit Mondal perform security testing, port scanning, exploitation, or vulnerability assessments on systems, servers, or domains without explicit, written authorization from the verified infrastructure owner.
          </p>

          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>5. Limitation of Liability</h2>
          <p style={{ marginBottom: "20px" }}>
            In no event shall Abhijit Mondal be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the site content or services, to the fullest extent permitted by law.
          </p>

          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>6. Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of West Bengal, India.
          </p>
        </div>
      </div>
    </div>
  );
}
