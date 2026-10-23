import { useState } from "react";
import { Shield, Terminal, Cpu, Search } from "lucide-react";

export default function Radar() {
  const [activeNode, setActiveNode] = useState(null);

  const nodes = [
    {
      id: "network",
      label: "NETWORK",
      x: 150,
      y: 60,
      icon: Terminal,
      skills: ["Wireshark", "Nmap", "Computer Networks", "Traffic Analysis", "TCP/IP"]
    },
    {
      id: "pentest",
      label: "PENTEST",
      x: 242,
      y: 150,
      icon: Shield,
      skills: ["Burp Suite", "OWASP Top 10", "Metasploit", "Gobuster", "Hydra"]
    },
    {
      id: "mlsec",
      label: "ML SEC",
      x: 150,
      y: 240,
      icon: Cpu,
      skills: ["XGBoost", "Static PE Analysis", "EMBER Dataset", "Adversarial Defense"]
    },
    {
      id: "forensics",
      label: "FORENSICS",
      x: 58,
      y: 150,
      icon: Search,
      skills: ["Linux Forensics Engine", "Volatility", "Auditd", "Artifact Recovery"]
    }
  ];

  return (
    <div className="radar-container" style={{ position: "relative", width: "100%", maxWidth: "340px", margin: "0 auto" }}>
      <svg
        className="radar-svg"
        viewBox="0 0 300 300"
        role="img"
        aria-label="Security skill radar HUD"
        style={{ width: "100%", height: "auto", overflow: "visible" }}
      >
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Glow */}
        <circle cx="150" cy="150" r="110" fill="url(#radarGlow)" />

        {/* Concentric Coordinate Rings */}
        <circle cx="150" cy="150" r="100" fill="none" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="150" cy="150" r="72" fill="none" stroke="rgba(0, 242, 254, 0.25)" strokeWidth="1" />
        <circle cx="150" cy="150" r="48" fill="none" stroke="rgba(0, 242, 254, 0.35)" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="150" cy="150" r="26" fill="none" stroke="rgba(0, 242, 254, 0.5)" strokeWidth="1" />

        {/* Axis Crosshairs */}
        <line x1="150" y1="20" x2="150" y2="280" stroke="rgba(0, 242, 254, 0.12)" strokeWidth="1" />
        <line x1="20" y1="150" x2="280" y2="150" stroke="rgba(0, 242, 254, 0.12)" strokeWidth="1" />

        {/* Sweeping Radar Scanner Line */}
        <g style={{ transformOrigin: "150px 150px", animation: "sweep 4s linear infinite" }}>
          <path d="M150,150 L150,50 A100,100 0 0,1 220,79 Z" fill="var(--accent-cyan)" opacity="0.18" />
          <line x1="150" y1="150" x2="150" y2="50" stroke="var(--accent-cyan)" strokeWidth="1.5" />
        </g>

        {/* Interactive Domain Nodes */}
        {nodes.map((node) => {
          const isSelected = activeNode?.id === node.id;
          return (
            <g
              key={node.id}
              onClick={() => setActiveNode(isSelected ? null : node)}
              onMouseEnter={() => setActiveNode(node)}
              style={{ cursor: "pointer" }}
            >
              {/* Connecting dashed vector line */}
              <line
                x1="150"
                y1="150"
                x2={node.x}
                y2={node.y}
                stroke={isSelected ? "var(--accent-cyan)" : "rgba(0, 242, 254, 0.4)"}
                strokeWidth={isSelected ? "1.8" : "1"}
                strokeDasharray="3 3"
              />

              {/* Outer Pulse */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isSelected ? "10" : "6"}
                fill={isSelected ? "rgba(0, 242, 254, 0.4)" : "rgba(245, 158, 11, 0.2)"}
                style={{ transition: "all 0.2s ease" }}
              />

              {/* Node Center */}
              <circle
                cx={node.x}
                cy={node.y}
                r="4"
                fill={isSelected ? "var(--accent-cyan)" : "var(--accent-amber)"}
              />

              {/* Text Tag */}
              <text
                x={node.x}
                y={node.y === 150 ? (node.x === 242 ? 154 : 154) : node.y === 60 ? 44 : 260}
                textAnchor="middle"
                fill={isSelected ? "var(--accent-cyan)" : "var(--text-secondary)"}
                fontSize="9"
                fontFamily="var(--font-mono)"
                fontWeight="600"
                letterSpacing="0.06em"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Centered Profile Avatar inside Radar HUD */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "76px",
          height: "76px",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          overflow: "hidden",
          border: "2.5px solid var(--accent-cyan)",
          boxShadow: "0 0 24px rgba(0, 242, 254, 0.45)",
          pointerEvents: "none",
          background: "#070B13"
        }}
      >
        <img
          src="/profile-square.png"
          alt="Abhijit Mondal"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Active Node Detail Popup */}
      {activeNode && (
        <div
          style={{
            position: "absolute",
            bottom: "-36px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(11, 17, 32, 0.95)",
            border: "1px solid var(--accent-cyan)",
            borderRadius: "var(--radius-md)",
            padding: "8px 14px",
            width: "max-content",
            maxWidth: "280px",
            textAlign: "center",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(8px)",
            zIndex: 10
          }}
        >
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent-cyan)", marginBottom: "4px" }}>
            {activeNode.label} CAPABILITIES
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", justifyContent: "center" }}>
            {activeNode.skills.map((s) => (
              <span
                key={s}
                style={{
                  fontSize: "0.68rem",
                  background: "rgba(255, 255, 255, 0.08)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  color: "var(--text-primary)"
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
