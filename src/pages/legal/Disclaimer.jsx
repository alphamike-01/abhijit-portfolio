import { useEffect } from "react";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { updateSEO } from "../../utils/seo";
import { ShieldAlert } from "lucide-react";

export default function Disclaimer() {
  useEffect(() => {
    updateSEO({
      title: "Security & Legal Disclaimer — Abhijit Mondal",
      description: "Legal disclaimer regarding authorized security assessments, penetration testing ethical boundaries, and educational research.",
      canonical: "https://abhijitmondal.dev/disclaimer"
    });
  }, []);

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "96px" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <Breadcrumbs items={[{ label: "Security & Legal Disclaimer" }]} />

        <h1 style={{ marginBottom: "16px" }}>Security & Legal Disclaimer</h1>
        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "32px", fontFamily: "var(--font-mono)" }}>
          LAST REVISED: OCTOBER 2026
        </div>

        <div className="card" style={{ padding: "40px", lineHeight: "1.8", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          {/* Important Security Callout */}
          <div
            style={{
              background: "rgba(245, 158, 11, 0.08)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              borderRadius: "var(--radius-md)",
              padding: "20px",
              marginBottom: "28px",
              display: "flex",
              gap: "16px",
              alignItems: "flex-start"
            }}
          >
            <ShieldAlert size={24} style={{ color: "var(--accent-amber)", flexShrink: 0, marginTop: "2px" }} />
            <div>
              <h3 style={{ fontSize: "1.05rem", color: "var(--text-primary)", fontWeight: 700, marginBottom: "6px" }}>
                Mandatory Written Authorization Notice
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                All cybersecurity assessments, penetration tests, and vulnerability analyses offered by Abhijit Mondal are strictly conditioned upon verified legal authorization. Under no circumstances do we scan, probe, or assess third-party infrastructure without signed Rules of Engagement.
              </p>
            </div>
          </div>

          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>1. Educational and Defensive Purpose</h2>
          <p style={{ marginBottom: "20px" }}>
            The cybersecurity articles, research papers, malware classification pipelines, and code snippets published on this website are provided strictly for defensive research, educational purposes, and engineering threat modeling. They are designed to assist system administrators, software engineers, and security analysts in securing infrastructure against attack.
          </p>

          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>2. Prohibition of Malicious Use</h2>
          <p style={{ marginBottom: "20px" }}>
            Any attempt to repurpose the technical methodologies or research described on this website for unauthorized access, malicious exploitation, denial of service, or cyber espionage is strictly prohibited and constitutes a criminal offense under Section 43 and Section 66 of the Information Technology Act (India), the Computer Fraud and Abuse Act (USA), and comparable international statutes.
          </p>

          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>3. No Warranty on Third-Party Code Snippets</h2>
          <p style={{ marginBottom: "20px" }}>
            Technical tutorials and code examples are provided "as-is" without warranty of any kind. While every effort is made to verify accuracy and security, Abhijit Mondal assumes no liability for configuration failures or unintended side-effects resulting from third-party implementation.
          </p>

          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>4. Advertising & Earnings Disclosure</h2>
          <p>
            This website is architected to support compliant Google AdSense monetization. AdSense readiness does not guarantee approval, traffic volume, or advertising income. All revenue disclosures and third-party sponsored content are clearly demarcated according to applicable advertising standards.
          </p>
        </div>
      </div>
    </div>
  );
}
