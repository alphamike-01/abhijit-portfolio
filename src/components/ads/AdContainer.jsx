import { useCMS } from "../../context/CMSContext";

export default function AdContainer({ slot = "in-article", className = "" }) {
  const { adSettings } = useCMS();

  // If globally disabled or slot not configured
  if (!adSettings?.enabled && !adSettings?.previewMode) {
    return null;
  }

  const slotConfig = adSettings?.slots?.[slot];
  if (!slotConfig?.enabled && !adSettings?.previewMode) {
    return null;
  }

  // Developer Preview Mode: Displays clear, accessible placeholder without loading third-party scripts
  if (adSettings?.previewMode) {
    return (
      <aside
        className={`ad-container-preview ${className}`}
        aria-label="Advertisement Container (Preview Mode)"
        style={{
          minHeight: slot === "sidebar" ? "250px" : "110px",
          margin: "32px 0",
          border: "1px dashed rgba(0, 242, 254, 0.3)",
          borderRadius: "var(--radius-md)",
          background: "rgba(13, 20, 36, 0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          color: "var(--text-muted)",
          fontSize: "0.78rem",
          fontFamily: "var(--font-mono)",
          textAlign: "center"
        }}
      >
        <div style={{ color: "var(--accent-cyan)", fontWeight: 600, marginBottom: "4px" }}>
          ADVERTISEMENT PLACEMENT [{slotConfig?.name || slot.toUpperCase()}]
        </div>
        <div>Slot ID: {slotConfig?.slotId || "NOT_SET"} | Publisher: {adSettings?.publisherId || "ca-pub-0000000000000000"}</div>
        <div style={{ fontSize: "0.7rem", marginTop: "4px", color: "var(--text-muted)" }}>
          (Preview active — Ads remain deactivated until Google AdSense verification)
        </div>
      </aside>
    );
  }

  // Production Ad Container when Google AdSense Publisher ID is verified
  // Uses reserved min-height to guarantee zero Cumulative Layout Shift (CLS)
  return (
    <aside
      className={`ad-container ${className}`}
      aria-label="Sponsored Advertisement"
      style={{
        minHeight: slot === "sidebar" ? "250px" : "120px",
        margin: "28px 0",
        padding: "12px",
        background: "var(--bg-secondary)",
        border: "1px solid var(--card-border)",
        borderRadius: "var(--radius-md)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginBottom: "8px",
          fontFamily: "var(--font-mono)"
        }}
      >
        ADVERTISEMENT
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", textAlign: "center" }}
        data-ad-client={adSettings.publisherId}
        data-ad-slot={slotConfig?.slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </aside>
  );
}
