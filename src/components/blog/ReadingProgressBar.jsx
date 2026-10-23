import { useState, useEffect } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "76px",
        left: 0,
        width: "100%",
        height: "3px",
        background: "rgba(255, 255, 255, 0.05)",
        zIndex: 99
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: "var(--accent-gradient)",
          boxShadow: "0 0 10px var(--accent-cyan)",
          transition: "width 0.1s ease-out"
        }}
      />
    </div>
  );
}
