import { useCMS } from "../../context/CMSContext";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

export default function Toast() {
  const { toasts, removeToast } = useCMS();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "420px",
        width: "calc(100% - 48px)"
      }}
      aria-live="polite"
    >
      {toasts.map((toast) => {
        let Icon = Info;
        let borderColor = "var(--accent-cyan)";
        let bgColor = "var(--bg-secondary)";

        if (toast.type === "success") {
          Icon = CheckCircle2;
          borderColor = "var(--accent-emerald)";
        } else if (toast.type === "error") {
          Icon = AlertCircle;
          borderColor = "var(--accent-rose)";
        } else if (toast.type === "warning") {
          Icon = AlertTriangle;
          borderColor = "var(--accent-amber)";
        }

        return (
          <div
            key={toast.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              padding: "14px 18px",
              background: bgColor,
              border: `1px solid ${borderColor}`,
              borderRadius: "var(--radius-md)",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
              color: "var(--text-primary)",
              fontSize: "0.875rem",
              backdropFilter: "blur(12px)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Icon size={18} style={{ color: borderColor, flexShrink: 0 }} />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                padding: "4px"
              }}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
