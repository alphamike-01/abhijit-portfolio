import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import {
  Shield,
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
  Code2,
  Terminal,
  FileText
} from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: "Overview", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Projects & Research", path: "/projects" },
    { name: "About & Credentials", path: "/about" },
    { name: "Blog", path: "/blog" }
  ];

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Wordmark */}
          <Link to="/" className="brand-link" onClick={closeMobile}>
            <div className="brand-glyph">
              <Shield size={20} />
            </div>
            <div className="brand-text">
              <span className="brand-name">Abhijit Mondal</span>
              <span className="brand-role">Software & Cyber Security</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links" aria-label="Main Navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                end={item.path === "/"}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Actions: Theme Toggle & Get a Quote CTA */}
          <div className="nav-actions">
            <button
              onClick={toggleTheme}
              className="btn btn-outline btn-sm"
              style={{ width: "38px", height: "38px", padding: 0, borderRadius: "50%" }}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <Link
              to="/quote"
              className="btn btn-primary btn-sm nav-cta-desktop"
            >
              <span>Get a Quote</span>
              <ArrowRight size={15} />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              style={{ display: "inline-flex" }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobile}
                style={({ isActive }) => ({
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  padding: "12px 16px",
                  borderRadius: "8px",
                  background: isActive ? "var(--bg-tertiary)" : "transparent",
                  color: isActive ? "var(--accent-cyan)" : "var(--text-primary)"
                })}
              >
                {item.name}
              </NavLink>
            ))}
            <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "16px", marginTop: "8px" }}>
              <Link
                to="/quote"
                className="btn btn-primary"
                onClick={closeMobile}
                style={{ width: "100%", justifyContent: "center" }}
              >
                <span>Request a Quote</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", padding: "0 8px" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Switch Display Theme</span>
              <button
                onClick={toggleTheme}
                className="btn btn-secondary btn-sm"
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
