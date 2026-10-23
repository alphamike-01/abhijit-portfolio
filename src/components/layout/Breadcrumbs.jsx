import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "0.84rem",
        color: "var(--text-muted)",
        marginBottom: "28px",
        flexWrap: "wrap"
      }}
    >
      <Link
        to="/"
        style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "var(--text-secondary)" }}
      >
        <Home size={14} />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.label} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <ChevronRight size={14} style={{ color: "var(--text-muted)" }} />
            {isLast || !item.path ? (
              <span style={{ color: "var(--accent-cyan)", fontWeight: 500 }}>
                {item.label}
              </span>
            ) : (
              <Link to={item.path} style={{ color: "var(--text-secondary)" }}>
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
