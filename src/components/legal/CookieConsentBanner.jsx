import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Cookie } from "lucide-react";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("am_cookie_consent_v2");
      if (!consent) {
        setVisible(true);
      }
    } catch {
      setVisible(false);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("am_cookie_consent_v2", JSON.stringify({ analytics: true, ads: true, date: new Date().toISOString() }));
    } catch (e) {
      console.error(e);
    }
    setVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("am_cookie_consent_v2", JSON.stringify({ analytics: false, ads: false, date: new Date().toISOString() }));
    } catch (e) {
      console.error(e);
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      style={{
        position: "fixed",
        bottom: "16px",
        left: "16px",
        right: "16px",
        maxWidth: "600px",
        margin: "0 auto",
        zIndex: 999,
        background: "rgba(13, 20, 36, 0.95)",
        border: "1px solid var(--card-border-hover)",
        borderRadius: "var(--radius-lg)",
        padding: "20px 24px",
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(16px)",
        color: "var(--text-primary)"
      }}
    >
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "var(--radius-md)",
            background: "rgba(0, 242, 254, 0.1)",
            border: "1px solid rgba(0, 242, 254, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--accent-cyan)",
            flexShrink: 0
          }}
        >
          <Cookie size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "6px" }}>
            Privacy & Cookie Preferences
          </h4>
          <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "16px" }}>
            We use essential local storage to remember your theme preferences and quote drafts. With your permission, we also use performance cookies and prepare for authorized ad placements. Read our{" "}
            <Link to="/privacy" style={{ color: "var(--accent-cyan)", textDecoration: "underline" }}>
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/cookies" style={{ color: "var(--accent-cyan)", textDecoration: "underline" }}>
              Cookie Policy
            </Link>
            .
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              onClick={handleAccept}
              className="btn btn-primary btn-sm"
              style={{ padding: "8px 18px", fontSize: "0.82rem" }}
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="btn btn-outline btn-sm"
              style={{ padding: "8px 18px", fontSize: "0.82rem" }}
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
