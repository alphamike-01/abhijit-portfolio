import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCMS } from "../../context/CMSContext";
import Toast from "../../components/ui/Toast";
import "../../styles/admin.css";
import {
  Shield,
  LayoutDashboard,
  FileText,
  Inbox,
  FolderTree,
  Image,
  DollarSign,
  LogOut,
  ExternalLink,
  Menu,
  X
} from "lucide-react";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { quotes, posts } = useCMS();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const newQuotesCount = quotes.filter((q) => q.status === "New").length;

  const navItems = [
    { name: "Overview", path: "/admin", icon: LayoutDashboard, end: true },
    { name: "Quote Enquiries", path: "/admin/quotes", icon: Inbox, badge: newQuotesCount > 0 ? newQuotesCount : null },
    { name: "Blog Manager", path: "/admin/blog", icon: FileText },
    { name: "Categories", path: "/admin/categories", icon: FolderTree },
    { name: "Media Assets", path: "/admin/media", icon: Image },
    { name: "AdSense & Ads", path: "/admin/adsense", icon: DollarSign }
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar (Desktop) */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                background: "rgba(0, 242, 254, 0.15)",
                border: "1px solid rgba(0, 242, 254, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#00f2fe",
                flexShrink: 0
              }}
            >
              <Shield size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#ffffff" }}>AM // ADMIN</div>
              <div style={{ fontSize: "0.7rem", color: "#64748b", fontFamily: "var(--font-mono)" }}>CMS & QUOTES</div>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="admin-nav" aria-label="Admin Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) => `admin-nav-item ${isActive ? "active" : ""}`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
                {item.badge && <span className="admin-nav-badge">{item.badge}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="admin-sidebar-footer">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#ffffff", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                {user?.name || "Abhijit Mondal"}
              </div>
              <div style={{ fontSize: "0.72rem", color: "#64748b" }}>{user?.role || "Administrator"}</div>
            </div>
            <button
              onClick={handleLogout}
              style={{ color: "#ef4444", padding: "6px", borderRadius: "6px", background: "rgba(239, 68, 68, 0.1)", flexShrink: 0 }}
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
          <Link
            to="/"
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              fontSize: "0.8rem",
              color: "#94a3b8",
              padding: "8px",
              borderRadius: "6px",
              background: "rgba(255, 255, 255, 0.04)"
            }}
          >
            <span>View Public Site</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </aside>

      {/* Main Administrative Workspace */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0, overflow: "hidden" }}>
            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="btn btn-secondary btn-sm"
              style={{ display: "none", padding: "6px 10px" }}
              id="admin-mobile-toggle"
              aria-label="Toggle admin navigation"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#f8fafc", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              Admin Portal // <span style={{ color: "#00f2fe" }}>{user?.email}</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <Link to="/admin/blog/new" className="btn btn-primary btn-sm" style={{ padding: "6px 12px", fontSize: "0.78rem" }}>
              + Article
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              background: "#0b1120",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "6px"
            }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `admin-nav-item ${isActive ? "active" : ""}`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                  {item.badge && <span className="admin-nav-badge">{item.badge}</span>}
                </NavLink>
              );
            })}
            <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", marginTop: "10px", paddingTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Link to="/" target="_blank" style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                Public Site ↗
              </Link>
              <button onClick={handleLogout} style={{ color: "#ef4444", fontSize: "0.8rem", background: "none", border: "none", cursor: "pointer" }}>
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Content Outlet */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #admin-mobile-toggle {
            display: inline-flex !important;
          }
        }
      `}</style>

      <Toast />
    </div>
  );
}
