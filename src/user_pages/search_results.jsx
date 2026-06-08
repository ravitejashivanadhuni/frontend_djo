import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import JobCardList from "../components/home_page_components/Job_card_component";
import AlertBar from "../components/alertbar.jsx";
import TopTicker from "../components/topticker.jsx";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import MainLayout from "../components/common_components/MainLayout.jsx";
import ReusableJobGrid from "../components/common_components/ReusableJobGrid.jsx";

const JOBS_PER_PAGE = 12;

const S = {
  primary: "#0f4c81",
  accent: "#e8472a",
  gold: "#f5a623",
  light: "#f4f7fb",
  text: "#1a1a2e",
  muted: "#6b7280",
  border: "#e2e8f0",
  purple: "#7c3aed",
};
const C = {
  primary: "#0f4c81",
  accent: "#e8472a",
  gold: "#f5a623",
  light: "#f4f7fb",
  green: "#16a34a",
  text: "#1a1a2e",
  muted: "#6b7280",
  border: "#e2e8f0",
};
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return {
    w,
    isMobile: w < 640,
    isTablet: w >= 640 && w < 1024,
    isDesktop: w >= 1024,
    showSidebar: w >= 1024,
  };
}

function SkeletonCard() {
  return (
    <div style={{
      background: "#fff", borderRadius: 14, padding: 20,
      border: `1px solid ${S.border}`, animation: "srPulse 1.4s ease-in-out infinite",
    }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: "#e5e7eb", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ height: 14, background: "#e5e7eb", borderRadius: 4, marginBottom: 8, width: "70%" }} />
          <div style={{ height: 12, background: "#f3f4f6", borderRadius: 4, width: "45%" }} />
        </div>
      </div>
      <div style={{ height: 11, background: "#f3f4f6", borderRadius: 4, marginBottom: 6 }} />
      <div style={{ height: 11, background: "#f3f4f6", borderRadius: 4, width: "80%", marginBottom: 16 }} />
      <div style={{ display: "flex", gap: 8 }}>
        {[60, 80, 55].map((w, i) => (
          <div key={i} style={{ height: 22, width: w, background: "#f3f4f6", borderRadius: 20 }} />
        ))}
      </div>
    </div>
  );
}

function EmptyState({ query }) {
  return (
    <div style={{
      gridColumn: "1 / -1", textAlign: "center",
      padding: "80px 24px", background: "#fff",
      borderRadius: 20, border: `1px solid ${S.border}`,
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: 24, background: "#f0edfe",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 24px", fontSize: 36,
      }}>🔍</div>
      <h3 style={{
        fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800,
        color: S.text, margin: "0 0 10px",
      }}>No results found</h3>
      <p style={{ color: S.muted, fontSize: 14, lineHeight: 1.8, maxWidth: 380, margin: "0 auto 28px" }}>
        {query
          ? <>We couldn't find jobs matching <strong style={{ color: S.text }}>"{query}"</strong>. Try different keywords.</>
          : "No jobs match your current filters. Try removing some filters."}
      </p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        {["Software Developer", "Fresher Jobs", "Work From Home", "Data Analyst"].map(s => (
          <span key={s} style={{
            background: "#f0edfe", color: S.purple, padding: "6px 14px",
            borderRadius: 20, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
          }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [1];
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const btnBase = {
    width: 38, height: 38, borderRadius: 10,
    border: `1.5px solid ${S.border}`,
    background: "#fff", color: S.text,
    fontSize: 14, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Syne', sans-serif", fontWeight: 600,
    transition: "all 0.15s",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 44, flexWrap: "wrap" }}>
      <button
        onClick={() => onPageChange(page - 1)} disabled={page === 1}
        style={{ ...btnBase, opacity: page === 1 ? 0.35 : 1, cursor: page === 1 ? "not-allowed" : "pointer" }}
      >‹</button>

      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={`d${i}`} style={{ color: S.muted, padding: "0 4px", fontSize: 14 }}>···</span>
        ) : (
          <button key={p} onClick={() => onPageChange(p)} style={{
            ...btnBase,
            border: `1.5px solid ${p === page ? S.purple : S.border}`,
            background: p === page ? S.purple : "#fff",
            color: p === page ? "#fff" : S.text,
            fontWeight: p === page ? 700 : 500,
          }}>{p}</button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)} disabled={page === totalPages}
        style={{ ...btnBase, opacity: page === totalPages ? 0.35 : 1, cursor: page === totalPages ? "not-allowed" : "pointer" }}
      >›</button>
    </div>
  );
}

export default function SearchResults() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const topRef = useRef(null);
  const bp = useBreakpoint();
  const { isMobile, isTablet, isDesktop, showSidebar } = bp;

  const q        = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const role     = searchParams.get("role") || "";
  const location = searchParams.get("location") || "";

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setPage(1);
      try {
        const res  = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/job-search-using-fields?${searchParams.toString()}`);
        console.log("Search Params:", searchParams.toString());
        const data = await res.json();
        console.log("API Response:", data);
        setJobs(data.data || []);
      } catch (err) {
        console.error(err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [searchParams]);

  const totalPages    = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const paginatedJobs = jobs.slice((page - 1) * JOBS_PER_PAGE, page * JOBS_PER_PAGE);
  const start         = (page - 1) * JOBS_PER_PAGE + 1;
  const end           = Math.min(page * JOBS_PER_PAGE, jobs.length);

  const activeTags = [
    q        && { label: q,        key: "q" },
    category && { label: category, key: "category" },
    role     && { label: role,     key: "role" },
    location && location !== "All Locations" && { label: location, key: "location" },
  ].filter(Boolean);

  const removeTag = (key) => {
    const p = new URLSearchParams(searchParams);
    p.delete(key);
    navigate(`/search?${p.toString()}`);
  };

  const handlePageChange = (p) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
<MainLayout isMobile={isMobile} isDesktop={isDesktop} C={C} bp={bp}>
    <>
    
      <style>{`
        .sr-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 1023px) { .sr-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 599px)  { .sr-grid { grid-template-columns: 1fr; } }

        @keyframes srPulse {
          0%,100% { opacity: 1; } 50% { opacity: 0.45; }
        }
        @keyframes srFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sr-card-enter {
          animation: srFadeUp 0.35s ease both;
        }
        .sr-tag:hover { background: #fecaca !important; color: #b91c1c !important; }
        .sr-back:hover { border-color: ${S.purple} !important; color: ${S.purple} !important; }
                /* ── Full-width sections ── */
        .section-full { width: 100%; }
.section-inner { width: 100%; padding: 0 24px; box-sizing: border-box; }

        @media (max-width: 479px) {
          .hero-card { flex: 0 0 100%; }
          .stat-box  { flex: 1 1 calc(50% - 8px); }
        }
                    html, body { width: 100% !important; margin: 0 !important; padding: 0 !important; overflow-x: hidden !important; }
#root { width: 100% !important; overflow-x: hidden !important; }
      `}</style>

      <div ref={topRef} style={{
        width: "100%", minHeight: "100vh",
        background: S.light,
        fontFamily: "'DM Sans', sans-serif",
        color: S.text,
      }}>

        {/* ── Sticky header ── */}
        <div style={{
          position: "sticky", top: 0, zIndex: 20,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${S.border}`,
          padding: "14px 24px",
        }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>

            {/* Top row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>

              {/* Left: breadcrumb + title */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: S.muted, marginBottom: 4 }}>
                  <span onClick={() => navigate("/")} style={{ cursor: "pointer", color: S.purple, fontWeight: 600 }}>Home</span>
                  <span>›</span>
                  <span>Search</span>
                  {q && <><span>›</span><span style={{ color: S.text, fontWeight: 500 }}>{q}</span></>}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <h1 style={{
                    fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800,
                    color: S.text, margin: 0,
                  }}>
                    {loading
                      ? "Searching…"
                      : <><span style={{ color: S.purple }}>{jobs.length.toLocaleString()}</span> Jobs Found</>}
                  </h1>
                  {!loading && jobs.length > 0 && (
                    <span style={{ fontSize: 12.5, color: S.muted }}>
                      showing {start}–{end}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: back btn */}
              <button
                className="sr-back"
                onClick={() => navigate(-1)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "transparent", border: `1.5px solid ${S.border}`,
                  borderRadius: 10, padding: "7px 14px",
                  fontSize: 13, fontWeight: 600, color: S.muted,
                  cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
                }}
              >← Back</button>
            </div>

            {/* Filter tags */}
            {activeTags.length > 0 && (
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: 10 }}>
                {activeTags.map(tag => (
                  <span
                    key={tag.key}
                    className="sr-tag"
                    onClick={() => removeTag(tag.key)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      background: "#f0edfe", color: S.purple,
                      padding: "4px 10px 4px 12px", borderRadius: 20,
                      fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                    }}
                  >
                    {tag.label}
                    <span style={{
                      width: 15, height: 15, borderRadius: "50%",
                      background: "rgba(109,40,217,0.15)",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9, fontWeight: 800,
                    }}>✕</span>
                  </span>
                ))}
                {activeTags.length > 1 && (
                  <span
                    onClick={() => navigate("/search")}
                    style={{
                      display: "inline-flex", alignItems: "center",
                      background: "#fee2e2", color: "#b91c1c",
                      padding: "4px 12px", borderRadius: 20,
                      fontSize: 12, fontWeight: 600, cursor: "pointer",
                    }}
                  >Clear all ✕</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Page body ── */}
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 24px 64px" }}>

          {/* Stats strip */}
          {!loading && jobs.length > 0 && (
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
              {[
                { label: "Total results", value: jobs.length.toLocaleString(), color: S.purple },
                { label: "This page",     value: paginatedJobs.length,          color: S.primary },
                { label: "Total pages",   value: totalPages,                    color: "#059669" },
                { label: "Per page",      value: JOBS_PER_PAGE,                color: S.muted },
              ].map(st => (
                <div key={st.label} style={{
                  background: "#fff", borderRadius: 12, border: `1px solid ${S.border}`,
                  padding: "10px 18px", display: "flex", alignItems: "center", gap: 10,
                }}>
                  <strong style={{
                    fontFamily: "'Syne', sans-serif", fontSize: 19, fontWeight: 800, color: st.color,
                  }}>{st.value}</strong>
                  <span style={{ fontSize: 12.5, color: S.muted }}>{st.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div className="sr-grid">
              {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : jobs.length === 0 ? (
            <div className="sr-grid"><EmptyState query={q} /></div>
          ) : (
<ReusableJobGrid
  jobs={paginatedJobs}
/>
          )}

          {/* Pagination */}
          {!loading && <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />}

          {/* Showing X–Y of Z */}
          {!loading && jobs.length > 0 && (
            <p style={{ textAlign: "center", fontSize: 12.5, color: S.muted, marginTop: 14 }}>
              Showing {start}–{end} of {jobs.length.toLocaleString()} jobs
            </p>
          )}
        </div>
        <Footer />
      </div>
    </>
    </MainLayout>
  );
}