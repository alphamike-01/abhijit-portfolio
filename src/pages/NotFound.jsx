import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div style={{ paddingTop: "80px", paddingBottom: "120px", textAlign: "center" }}>
      <div className="container" style={{ maxWidth: "600px" }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            color: "var(--accent-rose)"
          }}
        >
          <ShieldAlert size={32} />
        </div>

        <span className="badge badge-amber" style={{ marginBottom: "16px" }}>
          STATUS CODE: 404
        </span>

        <h1 style={{ fontSize: "2.4rem", marginBottom: "16px" }}>
          Target Resource Not Found
        </h1>

        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: "1.6", marginBottom: "32px" }}>
          The requested route, publication, or service endpoint does not exist or has been relocated within the architecture.
        </p>

        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Return to Field Report Home</span>
        </Link>
      </div>
    </div>
  );
}
