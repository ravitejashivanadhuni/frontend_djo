import { Link, useNavigate, useLocation } from "react-router-dom";

const LINKS = [
  { to:"/admin/dashboard",     label:"Dashboard" },
  { to:"/admin/manage-jobs",   label:"Manage Jobs" },
  { to:"/admin/manage-admins", label:"Manage Admins", superOnly:true },
  { to:"/admin/manage-resources", label:"Manage Resources" },
  { to:"/admin/manage-interview-questions", label:"Manage Interview Qs" }
];

export default function AdminNavbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const admin     = JSON.parse(localStorage.getItem("adminInfo") || "{}");

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
  };

  return (
    <>
      <style>{`
        @keyframes navIn { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
        .nav-link { position:relative; padding:7px 16px; border-radius:9999px; font-size:13px; font-weight:500; color:rgba(255,255,255,.6); text-decoration:none; transition:all .25s; white-space:nowrap; }
        .nav-link:hover { color:#fff; background:rgba(255,255,255,.1); }
        .nav-link.active { color:#fff; background:rgba(255,255,255,.15); box-shadow:inset 0 0 0 1px rgba(255,255,255,.2); }
        .logout-btn { padding:7px 18px; border-radius:9999px; border:1px solid rgba(255,255,255,.2); background:rgba(255,255,255,.08); color:rgba(255,255,255,.7); font-size:13px; font-weight:500; cursor:pointer; font-family:inherit; transition:all .25s; }
        .logout-btn:hover { background:rgba(239,68,68,.25); border-color:rgba(239,68,68,.4); color:#fca5a5; }
      `}</style>

      <div style={{ position:"fixed", top:16, left:0, right:0, zIndex:100, display:"flex", justifyContent:"center", pointerEvents:"none" }}>
        <nav style={{
          pointerEvents:"all",
          display:"flex", alignItems:"center", gap:4,
          background:"rgba(15,20,40,.55)",
          backdropFilter:"blur(20px) saturate(180%)",
          WebkitBackdropFilter:"blur(20px) saturate(180%)",
          border:"1px solid rgba(255,255,255,.1)",
          borderRadius:9999,
          padding:"6px 10px",
          boxShadow:"0 8px 32px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.08)",
          animation:"navIn .4s cubic-bezier(.16,1,.3,1)",
          gap:2,
        }}>
          {/* Brand */}
          <span style={{ color:"#fff", fontWeight:800, fontSize:14, padding:"4px 14px", marginRight:4, letterSpacing:".02em" }}>
            ⚡ Admin
          </span>

          <div style={{ width:1, height:20, background:"rgba(255,255,255,.12)", margin:"0 4px" }}/>

          {/* Nav links */}
          {LINKS.filter(l => !l.superOnly || admin?.role === "super_admin").map(l => (
            <Link key={l.to} to={l.to} className={`nav-link ${location.pathname === l.to ? "active" : ""}`}>
              {l.label}
            </Link>
          ))}

          <div style={{ width:1, height:20, background:"rgba(255,255,255,.12)", margin:"0 4px" }}/>

          {/* Role badge */}
          <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:9999, background: admin?.role==="super_admin" ? "rgba(245,166,35,.2)" : "rgba(59,130,246,.2)", color: admin?.role==="super_admin" ? "#fcd34d" : "#93c5fd", border:`1px solid ${admin?.role==="super_admin" ? "rgba(245,166,35,.3)" : "rgba(59,130,246,.3)"}`, letterSpacing:".06em", marginRight:2 }}>
            {admin?.role === "super_admin" ? "SUPER" : "ADMIN"}
          </span>

          {/* Logout */}
          <button className="logout-btn" onClick={logout}>Logout</button>
        </nav>
      </div>

      {/* Spacer so page content doesn't hide under fixed nav */}
      <div style={{ height:72 }}/>
    </>
  );
}