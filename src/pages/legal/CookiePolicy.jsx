import { useEffect } from "react";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import { updateSEO } from "../../utils/seo";

export default function CookiePolicy() {
  useEffect(() => {
    updateSEO({
      title: "Cookie Policy — Abhijit Mondal",
      description: "Information about local storage, session cookies, and advertising identifiers used on abhijitmondal.dev.",
      canonical: "https://abhijitmondal.dev/cookies"
    });
  }, []);

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "96px" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <Breadcrumbs items={[{ label: "Cookie Policy" }]} />

        <h1 style={{ marginBottom: "16px" }}>Cookie Policy</h1>
        <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "32px", fontFamily: "var(--font-mono)" }}>
          LAST REVISED: OCTOBER 2026
        </div>

        <div className="card" style={{ padding: "40px", lineHeight: "1.8", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>1. What Are Cookies & Local Storage?</h2>
          <p style={{ marginBottom: "20px" }}>
            Cookies and HTML5 Local Storage are compact text entries stored in your browser by websites you visit. They enable the website to remember your actions and preferences over a period of time.
          </p>

          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>2. Categories of Storage We Use</h2>
          <ul style={{ listStyle: "disc", paddingLeft: "24px", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <li><strong>Strictly Necessary Storage:</strong> Used to maintain your theme preference (Dark Mode vs Light Mode) and record your cookie banner consent status. These do not track personal identity.</li>
            <li><strong>Functionality Storage:</strong> Preserves in-progress quote form drafts locally so your progress is not lost if your browser refreshes.</li>
            <li><strong>Third-Party & Advertising Cookies:</strong> When authorized Google AdSense scripts are active, Google uses cookies (such as the \`_ga\` or DoubleClick cookie) to serve relevant, non-intrusive advertisements based on topic interests.</li>
          </ul>

          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>3. Managing Your Preferences</h2>
          <p style={{ marginBottom: "20px" }}>
            You can configure your browser to reject all cookies or notify you when a cookie is placed. Note that clearing local storage will reset your saved theme and require accepting the cookie policy prompt again.
          </p>

          <h2 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "12px" }}>4. Inquiries</h2>
          <p>
            For questions regarding our cookie practices, contact <strong>abhijitmondaljaihind@gmail.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
