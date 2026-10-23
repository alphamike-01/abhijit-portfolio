import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Shield, Lock, Mail, AlertCircle, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const { login, lockoutUntil, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  if (isAuthenticated) {
    navigate("/admin");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate("/admin");
    } else {
      setError(res.error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#070b13",
        padding: "24px",
        position: "relative"
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "440px",
          padding: "40px",
          background: "#0d1424",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.7)"
        }}
      >
        {/* Back Link */}
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.82rem",
            color: "var(--text-muted)",
            marginBottom: "24px"
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to Public Portfolio</span>
        </Link>

        {/* Brand Icon */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "rgba(0, 242, 254, 0.12)",
              border: "1px solid rgba(0, 242, 254, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent-cyan)"
            }}
          >
            <Shield size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0 }}>
              Administrator Portal
            </h1>
            <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--accent-cyan)" }}>
              RESTRICTED SYSTEM ACCESS
            </span>
          </div>
        </div>

        {error && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "var(--radius-md)",
              padding: "12px 16px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#f87171",
              fontSize: "0.85rem"
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: "0.85rem" }}>
              Admin Email
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@abhijitmondal.dev"
                className="form-control"
                disabled={loading || !!lockoutUntil}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "28px" }}>
            <label className="form-label" style={{ fontSize: "0.85rem" }}>
              Master Security Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="form-control"
                disabled={loading || !!lockoutUntil}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
            disabled={loading || !!lockoutUntil}
          >
            {loading ? "Authenticating..." : "Authenticate Session"}
          </button>
        </form>

        {/* Credentials reminder for initial review */}
        <div
          style={{
            marginTop: "24px",
            paddingTop: "18px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            fontSize: "0.78rem",
            color: "var(--text-muted)",
            textAlign: "center"
          }}
        >
          <div>Default Initial Admin Setup:</div>
          <div style={{ fontFamily: "var(--font-mono)", color: "var(--accent-cyan)", marginTop: "4px" }}>
            admin@abhijitmondal.dev / AdminMondal@2026!
          </div>
        </div>
      </div>
    </div>
  );
}
