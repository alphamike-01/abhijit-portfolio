import { useState, useEffect } from "react";
import { ListOrdered } from "lucide-react";

export default function TableOfContents({ items = [] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "var(--radius-lg)",
        padding: "20px 24px",
        position: "sticky",
        top: "100px"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", color: "var(--text-primary)", fontWeight: 700, fontSize: "0.95rem" }}>
        <ListOrdered size={18} style={{ color: "var(--accent-cyan)" }} />
        <span>TABLE OF CONTENTS</span>
      </div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem" }}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                style={{
                  display: "block",
                  color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)",
                  fontWeight: isActive ? 600 : 400,
                  borderLeft: `2px solid ${isActive ? "var(--accent-cyan)" : "transparent"}`,
                  paddingLeft: "10px",
                  transition: "all 0.15s ease"
                }}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
