// import React from "react";

// // ✅ Default colors (safe fallback)
// const defaultColors = {
//   accent: "#ff4d4f",
// };

// function AlertBar({ isMobile = false, C = defaultColors }) {
//   return (
//     <div
//       style={{
//         background: `linear-gradient(90deg, ${C.accent}, #c0392b)`,
//         color: "#fff",
//         textAlign: "center",
//         padding: isMobile ? "8px 12px" : "9px 16px",
//         fontSize: isMobile ? 11.5 : 13,
//       }}
//     >
//       🎉 New jobs added today from Amazon, TCS, Infosys & more!&nbsp;
      
//       <a
//         href="#"
//         style={{
//           color: "#fff",
//           textDecoration: "underline",
//           fontWeight: 600,
//         }}
//       >
//         View Latest →
//       </a>
//     </div>
//   );
// }

// export default AlertBar;


import React, { useState, useEffect } from "react";

const defaultColors = {
  accent: "#ff4d4f",
};

function AlertBar({ C = defaultColors }) {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const h = () => setWidth(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const isMobile  = width < 640;
  const isTablet  = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  if (!visible) return null;

  return (
    <div
      style={{
        width: "100%",
        background: `linear-gradient(90deg, ${C.accent}, #c0392b)`,
        color: "#fff",
        fontSize: isMobile ? 11.5 : isTablet ? 12.5 : 13,
        position: "relative",
        zIndex: 99,
      }}
    >
      {/* ── Inner layout ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "8px 36px 8px 12px" : "9px 48px 9px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? "flex-start" : "center",
          gap: isMobile ? 6 : 10,
          flexWrap: "wrap",
        }}
      >
        {/* Emoji — hidden on very small to save space */}
        {!isMobile && (
          <span style={{ fontSize: isTablet ? 14 : 15, flexShrink: 0 }}>🎉</span>
        )}

        {/* Message */}
        <span
          style={{
            lineHeight: 1.45,
            fontWeight: 400,
            letterSpacing: "0.01em",
          }}
        >
          {isMobile
            ? "New jobs from Amazon, TCS & more!"
            : isTablet
            ? "🎉 New jobs added today from Amazon, TCS, Infosys & more!"
            : "New jobs added today from Amazon, TCS, Infosys & more — updated every hour!"}
        </span>

        {/* CTA link */}
        <a
          href="#jobs"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.35)",
            padding: isMobile ? "2px 8px" : "3px 11px",
            borderRadius: 5,
            fontSize: isMobile ? 11 : 12.5,
            whiteSpace: "nowrap",
            flexShrink: 0,
            transition: "background 0.2s",
          }}
          onMouseOver={e => (e.currentTarget.style.background = "rgba(255,255,255,0.28)")}
          onMouseOut={e  => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
        >
          View Latest →
        </a>
      </div>

      {/* ── Close button ── */}
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss alert"
        style={{
          position: "absolute",
          top: "50%",
          right: isMobile ? 8 : 14,
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.18)",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "#fff",
          width: isMobile ? 20 : 24,
          height: isMobile ? 20 : 24,
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: isMobile ? 11 : 13,
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          padding: 0,
          transition: "background 0.2s",
        }}
        onMouseOver={e => (e.currentTarget.style.background = "rgba(255,255,255,0.32)")}
        onMouseOut={e  => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
      >
        ✕
      </button>
    </div>
  );
}

export default AlertBar;