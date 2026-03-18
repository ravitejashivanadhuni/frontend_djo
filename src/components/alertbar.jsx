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


import React, { useState, useRef, useEffect } from "react";

const C = {
  primary: "#0a2540",
  accent:  "#ff4d4f",
  border:  "#e5e7eb",
  text:    "#374151",
  light:   "#f3f4f6",
};

const NAV_ITEMS = [
  { label: "Home" },
  {
    label: "Jobs",
    dropdown: [
      { icon: "🎓", label: "Fresher Jobs",      desc: "0–1 year experience" },
      { icon: "💼", label: "Experienced Jobs",  desc: "2+ years experience" },
      { icon: "🏠", label: "Work From Home",    desc: "Remote opportunities" },
      { icon: "⏰", label: "Part-Time Jobs",    desc: "Flexible hours" },
      { icon: "🚀", label: "Urgent Hiring",     desc: "Immediate joiners" },
      { icon: "🌍", label: "Abroad Jobs",       desc: "International roles" },
    ],
  },
  {
    label: "Internships",
    dropdown: [
      { icon: "💰", label: "Paid Internships",       desc: "Earn while you learn" },
      { icon: "📚", label: "Unpaid Internships",     desc: "Build experience" },
      { icon: "🏠", label: "Remote Internships",     desc: "Work from anywhere" },
      { icon: "🏢", label: "On-Site Internships",    desc: "In-office roles" },
      { icon: "🎓", label: "Summer Internships",     desc: "Short-term projects" },
      { icon: "📝", label: "Part-Time Internships",  desc: "Alongside studies" },
    ],
  },
  { label: "About" },
  { label: "Contact" },
];

/* ── Hamburger ── */
function HamburgerBtn({ onClick, open }) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle menu"
      style={{
        background: "none", border: `1px solid ${C.border}`,
        borderRadius: 7, padding: "6px 10px",
        cursor: "pointer", fontSize: 18, lineHeight: 1,
        color: C.primary, transition: "background .18s",
      }}
    >
      {open ? "✕" : "☰"}
    </button>
  );
}

/* ── Dropdown panel ── */
function DropdownMenu({ items }) {
  return (
    <div style={{
      position: "absolute",
      top: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#fff",
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      boxShadow: "0 8px 24px rgba(0,0,0,.10)",
      padding: "6px",
      minWidth: 240,
      zIndex: 999,
      animation: "dropFade .15s ease",
    }}>
      {/* Arrow */}
      <div style={{
        position: "absolute", top: -6, left: "50%",
        transform: "translateX(-50%) rotate(45deg)",
        width: 12, height: 12, background: "#fff",
        borderTop: `1px solid ${C.border}`,
        borderLeft: `1px solid ${C.border}`,
        borderRadius: "2px 0 0 0",
      }}/>
      {items.map(item => (
        <a key={item.label} href="#" style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "8px 12px", borderRadius: 7,
          textDecoration: "none", color: C.text,
          fontSize: 13, transition: "background .12s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = C.light}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <span style={{ fontSize: 16 }}>{item.icon}</span>
          <div>
            <div style={{ fontWeight: 600, color: C.primary, lineHeight: 1.3 }}>{item.label}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{item.desc}</div>
          </div>
        </a>
      ))}
    </div>
  );
}

/* ── Nav link with optional dropdown ── */
function NavLink({ item, index }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const hasDD = !!item.dropdown;

  const show = () => { clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 150); };

  return (
    <div style={{ position: "relative" }} onMouseEnter={show} onMouseLeave={hide}>
      <a href="#" style={{
        fontSize: 13, padding: "7px 11px", borderRadius: 7,
        color:      index === 0 ? C.primary : C.text,
        background: index === 0 ? C.light   : "transparent",
        display: "flex", alignItems: "center", gap: 4,
        textDecoration: "none", whiteSpace: "nowrap",
      }}>
        {item.label}
        {hasDD && (
          <span style={{
            fontSize: 8, color: "#9ca3af",
            display: "inline-block",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform .18s", marginTop: 1,
          }}>▼</span>
        )}
      </a>
      {hasDD && open && <DropdownMenu items={item.dropdown} />}
    </div>
  );
}

/* ── Mobile accordion nav item ── */
function MobileNavItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const hasDD = !!item.dropdown;

  return (
    <div style={{ borderBottom: `1px solid ${C.border}` }}>
      <div
        onClick={() => hasDD && setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "13px 16px", cursor: hasDD ? "pointer" : "default",
          fontWeight: index === 0 ? 700 : 500,
          color: index === 0 ? C.primary : C.text,
          fontSize: 14,
        }}
      >
        {item.label}
        {hasDD && (
          <span style={{
            fontSize: 10, color: "#9ca3af",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform .2s",
          }}>▼</span>
        )}
      </div>
      {hasDD && open && (
        <div style={{ background: C.light, paddingBottom: 6 }}>
          {item.dropdown.map(d => (
            <a key={d.label} href="#" style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 20px", textDecoration: "none", color: C.text, fontSize: 13,
            }}>
              <span style={{ fontSize: 15 }}>{d.icon}</span>
              <div>
                <div style={{ fontWeight: 600, color: C.primary, lineHeight: 1.3 }}>{d.label}</div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>{d.desc}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════ */
function Navbar({ bp = {}, onMenuOpen = () => {} }) {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => { setWidth(window.innerWidth); };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  /* Prefer explicit bp props; fall back to internal width */
  const isMobile  = bp.isMobile  ?? width < 640;
  const isTablet  = bp.isTablet  ?? (width >= 640 && width < 1024);
  const isDesktop = bp.isDesktop ?? width >= 1024;

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleMenu = () => {
    setMobileOpen(o => !o);
    onMenuOpen();
  };

  return (
    <>
      <style>{`
        @keyframes dropFade {
          from { opacity:0; transform:translateX(-50%) translateY(-5px); }
          to   { opacity:1; transform:translateX(-50%) translateY(0); }
        }
        @keyframes slideDown {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .nb-link:hover { background: ${C.light} !important; color: ${C.primary} !important; }
      `}</style>

      {/* ── Nav bar ─────────────────────────────────────── */}
      <nav style={{
        width: "100%",                    /* ← KEY FIX: full width */
        background: "#fff",
        borderBottom: `2px solid ${C.border}`,
        position: "sticky",
        top: 0,
        zIndex: 200,
        boxShadow: "0 2px 12px rgba(0,0,0,.07)",
        boxSizing: "border-box",
      }}>

        {/* ── Inner row: padding only, NO maxWidth, NO margin auto ── */}
        <div style={{
          width: "100%",                  /* ← KEY FIX: stretch full width */
          padding: isMobile ? "0 14px" : "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: isMobile ? 56 : 64,
          boxSizing: "border-box",
        }}>

          {/* Brand */}
          <a href="#" style={{ display:"flex", alignItems:"center", gap:9, textDecoration:"none", flexShrink:0 }}>
            <img
              src="https://res.cloudinary.com/dd3niyhrb/image/upload/v1773481829/WhatsApp_Image_2026-03-14_at_3.18.14_PM_o5drwx.jpg"
              alt="CodeTechniques Logo"
              style={{ width: isMobile?32:40, height: isMobile?32:40, borderRadius:9, objectFit:"cover" }}
            />
            <span style={{
              fontWeight: 800,
              fontSize: isMobile ? 16 : isTablet ? 19 : 21,
              color: C.primary,
              whiteSpace: "nowrap",
            }}>
              Code<span style={{ color: C.accent }}>Techniques</span>
            </span>
          </a>

          {/* ── Desktop nav ── */}
          {isDesktop && (
            <div style={{ display:"flex", alignItems:"center", gap:4 }}>
              {NAV_ITEMS.map((item, i) => (
                <NavLink key={item.label} item={item} index={i} />
              ))}
              <a href="#" style={{
                background: C.accent, color:"#fff",
                padding:"8px 18px", borderRadius:8,
                fontWeight:700, marginLeft:8,
                textDecoration:"none", fontSize:13,
                whiteSpace:"nowrap",
              }}>Post a Job</a>
            </div>
          )}

          {/* ── Tablet nav ── */}
          {isTablet && (
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <a href="#" style={{
                background: C.accent, color:"#fff",
                padding:"8px 16px", borderRadius:8,
                fontWeight:700, textDecoration:"none",
                fontSize:13, whiteSpace:"nowrap",
              }}>Post a Job</a>
              <HamburgerBtn onClick={toggleMenu} open={mobileOpen} />
            </div>
          )}

          {/* ── Mobile nav ── */}
          {isMobile && (
            <HamburgerBtn onClick={toggleMenu} open={mobileOpen} />
          )}
        </div>

        {/* ── Mobile / Tablet drawer ── */}
        {(isMobile || isTablet) && mobileOpen && (
          <div style={{
            width: "100%",
            background: "#fff",
            borderTop: `1px solid ${C.border}`,
            animation: "slideDown .22s ease",
            boxShadow: "0 8px 24px rgba(0,0,0,.08)",
            maxHeight: "calc(100vh - 64px)",
            overflowY: "auto",
          }}>
            {NAV_ITEMS.map((item, i) => (
              <MobileNavItem key={item.label} item={item} index={i} />
            ))}
            {/* Mobile CTA */}
            <div style={{ padding:"16px" }}>
              <a href="#" style={{
                display:"block", textAlign:"center",
                background: C.accent, color:"#fff",
                padding:"12px", borderRadius:9,
                fontWeight:700, fontSize:14,
                textDecoration:"none",
              }}>Post a Job</a>
            </div>
          </div>
        )}
      </nav>

      {/* ── Backdrop (mobile) ── */}
      {(isMobile || isTablet) && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position:"fixed", inset:0, zIndex:199,
            background:"rgba(0,0,0,0.35)",
            backdropFilter:"blur(2px)",
          }}
        />
      )}
    </>
  );
}

export default Navbar;