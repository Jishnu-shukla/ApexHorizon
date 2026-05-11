import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   GLOBAL STYLES  –  single source of truth for all responsive rules
───────────────────────────────────────────────────────────────────────────── */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Geist:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: #050810;
    color: #e8edf8;
    font-family: 'Geist', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
  }
  :root {
    --bg:#050810; --bg1:#080c18; --bg2:#0b1020; --bg3:#0e1428; --bg4:#111830;
    --line:#161e38; --line2:#1d2848;
    --blue:#2563eb; --blue-l:#3b82f6; --blue-dim:rgba(37,99,235,0.1);
    --text:#e8edf8; --text2:#8b96b8; --text3:#4a5680;
  }
  body::before {
    content:''; position:fixed; inset:0; z-index:0; pointer-events:none;
    background-image: linear-gradient(var(--line) 1px, transparent 1px),
                      linear-gradient(90deg, var(--line) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 90% 80% at 50% 0%, #000 30%, transparent 100%);
  }

  .mono { font-family: 'IBM Plex Mono', monospace; }

  /* cursor blink */
  .t-cursor {
    display:inline-block; width:6px; height:12px;
    background:var(--blue-l); vertical-align:middle;
    animation: blink 1.1s step-end infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

  /* scroll reveal */
  .reveal { opacity:0; transform:translateY(14px); transition:opacity .5s ease, transform .5s ease; }
  .reveal.on { opacity:1; transform:translateY(0); }

  /* hero animations */
  @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  .hero-left    { animation: fadeUp .45s ease both; }
  .hero-terminal{ animation: fadeUp .55s .15s ease both; }

  /* stat hover bar */
  .stat-cell { position:relative; overflow:hidden; }
  .stat-cell::after {
    content:''; position:absolute; top:0; left:0; right:0; height:2px;
    background:var(--blue); transform:scaleX(0); transform-origin:left; transition:transform .3s;
  }
  .stat-cell:hover::after { transform:scaleX(1); }

  /* product card top-line */
  .pcard { position:relative; overflow:hidden; transition:background .2s; }
  .pcard::before {
    content:''; position:absolute; top:0; left:0; right:0; height:1px;
    background:linear-gradient(90deg,transparent,var(--blue),transparent);
    opacity:0; transition:opacity .3s;
  }
  .pcard:hover::before { opacity:1; }
  .pcard:hover { background:var(--bg2) !important; }

  /* feature / service row hovers */
  .feat-cell:hover  { background:var(--bg2) !important; }
  .svc-row:hover    { background:var(--bg3) !important; }
  .svc-row:hover .svc-arrow { color:var(--blue-l) !important; }

  /* plan buttons */
  .plan-btn-solid { background:var(--blue); color:#fff; }
  .plan-btn-solid:hover { background:var(--blue-l); }
  .plan-btn-ghost { background:transparent; color:var(--text2); border:1px solid var(--line2); }
  .plan-btn-ghost:hover { color:var(--text); border-color:var(--text3); }

  /* nav link hover */
  .nav-link { display:block; padding:0 1.1rem; height:56px; line-height:56px;
    font-size:0.81rem; color:var(--text2); text-decoration:none;
    border-right:1px solid var(--line); transition:color .15s, background .15s;
    letter-spacing:0.02em; }
  .nav-link:hover { color:var(--text); background:var(--bg2); }
  .nav-link.first { border-left:1px solid var(--line); }

  /* form input placeholder */
  input::placeholder, textarea::placeholder { color:var(--text3); }
  select option { background:var(--bg2); }

  /* scrollbar */
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:var(--bg); }
  ::-webkit-scrollbar-thumb { background:var(--line2); }

  /* ── RESPONSIVE GRID HELPERS ── */

  /* Hero: stacks on mobile, side-by-side ≥900px */
  .hero-grid {
    display:grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  @media(min-width:900px){
    .hero-grid { grid-template-columns: 1fr 400px; gap: 4rem; align-items:center; }
  }

  /* Stats: 2 cols on mobile, 4 cols ≥640px */
  .stats-grid {
    display:grid;
    grid-template-columns: 1fr 1fr;
  }
  @media(min-width:640px){
    .stats-grid { grid-template-columns: repeat(4,1fr); }
  }
  /* remove right border on 2-col layout for 2nd cell */
  @media(max-width:639px){
    .stat-cell:nth-child(2) { border-right:none !important; }
    .stat-cell:nth-child(3) { border-right:1px solid var(--line) !important; border-top:1px solid var(--line); }
    .stat-cell:nth-child(4) { border-right:none !important; border-top:1px solid var(--line); }
  }

  /* Products header */
  .products-hdr {
    display:grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  @media(min-width:768px){
    .products-hdr { grid-template-columns: 1fr 1fr; gap:4rem; align-items:end; }
  }

  /* Products cards grid */
  .products-grid {
    display:grid;
    grid-template-columns: 1fr;
    gap: 1px;
    background: var(--line);
  }
  @media(min-width:860px){
    .products-grid { grid-template-columns: 1fr 1fr; }
  }

  /* Features grid: 1 → 2 → 3 cols */
  .feats-grid {
    display:grid;
    grid-template-columns: 1fr;
    gap:1px;
    background:var(--line);
    border:1px solid var(--line);
  }
  @media(min-width:540px){
    .feats-grid { grid-template-columns: 1fr 1fr; }
  }
  @media(min-width:900px){
    .feats-grid { grid-template-columns: repeat(3,1fr); }
  }

  /* Services layout */
  .svc-layout {
    display:grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  @media(min-width:768px){
    .svc-layout { grid-template-columns: 280px 1fr; gap:5rem; align-items:start; }
  }

  /* Pricing plans */
  .pricing-grid {
    display:grid;
    grid-template-columns: 1fr;
    gap:1px;
    background:var(--line);
    border:1px solid var(--line);
    margin-top:2.8rem;
  }
  @media(min-width:640px){
    .pricing-grid { grid-template-columns: 1fr 1fr; }
  }
  @media(min-width:900px){
    .pricing-grid { grid-template-columns: repeat(3,1fr); }
  }

  /* Contact layout */
  .contact-grid {
    display:grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  @media(min-width:768px){
    .contact-grid { grid-template-columns: 1fr 1fr; gap:5rem; align-items:start; }
  }

  /* Contact form name/email row */
  .form-name-email {
    display:grid;
    grid-template-columns: 1fr;
    gap:1px;
    background:var(--line);
  }
  @media(min-width:480px){
    .form-name-email { grid-template-columns: 1fr 1fr; }
  }

  /* Nav: show/hide desktop vs mobile */
  .nav-desktop { display:none; }
  .nav-hamburger { display:flex; }
  @media(min-width:768px){
    .nav-desktop   { display:flex; }
    .nav-hamburger { display:none; }
    .nav-cta       { display:flex !important; }
  }
  .nav-cta { display:none; }

  /* Mobile hero terminal full width */
  @media(max-width:480px){
    .terminal-body { padding:0.85rem 0.75rem; }
    .t-line { font-size:0.63rem !important; }
  }

  /* Footer responsive */
  .footer-inner {
    display:flex;
    flex-direction:column;
    gap:1rem;
    align-items:flex-start;
  }
  @media(min-width:640px){
    .footer-inner { flex-direction:row; align-items:center; justify-content:space-between; }
  }

  /* Tags wrap nicely */
  .tags { display:flex; flex-wrap:wrap; gap:5px; margin-bottom:1.8rem; }
`;

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("on"); obs.unobserve(el); } },
      { threshold: 0.07 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const Reveal = ({ children, className = "", style }) => {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`} style={style}>{children}</div>;
};

function SectionLabel({ children }) {
  return (
    <div className="mono" style={{ fontSize:"0.67rem", color:"var(--blue-l)", letterSpacing:"0.1em",
      marginBottom:"1rem", display:"flex", alignItems:"center", gap:8 }}>
      <span style={{ width:18, height:1, background:"var(--blue)", display:"inline-block" }} />
      {children}
    </div>
  );
}

const S = {
  wrap: { maxWidth:1120, margin:"0 auto", padding:"0 1.25rem", position:"relative", zIndex:1 },
  section: { position:"relative", zIndex:1 },
};

/* ─────────────────────────────────────────────────────────────────────────────
   NAV
───────────────────────────────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, height:56,
      background:"rgba(5,8,16,0.92)", backdropFilter:"blur(14px)",
      borderBottom:"1px solid var(--line)" }}>
      <div style={{ maxWidth:1120, margin:"0 auto", padding:"0 1.25rem",
        height:"100%", display:"flex", alignItems:"center", justifyContent:"space-between" }}>

        {/* Logo */}
        <a href="#" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", flexShrink:0 }}>
          <div style={{ width:28, height:28, border:"1px solid var(--blue)", display:"flex",
            alignItems:"center", justifyContent:"center", background:"var(--blue-dim)", flexShrink:0 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <polygon points="7,1 13,11 1,11" stroke="#3b82f6" strokeWidth="1.3" fill="none"/>
              <line x1="1" y1="11" x2="13" y2="11" stroke="#3b82f6" strokeWidth="1.3"/>
            </svg>
          </div>
          <span style={{ fontWeight:600, fontSize:"0.9rem", color:"var(--text)", letterSpacing:"0.04em" }}>
            APEX<span style={{ color:"var(--blue-l)" }}> HORIZON</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="nav-desktop" style={{ gap:0, listStyle:"none" }}>
          {["Products","Services","Pricing","Contact"].map((l,i) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className={`nav-link mono${i===0?" first":""}`}>{l}</a>
            </li>
          ))}
        </ul>

        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <a href="#contact" className="nav-cta"
            style={{ fontSize:"0.79rem", fontWeight:500, padding:"0 1.1rem", height:32,
              background:"var(--blue)", color:"#fff", textDecoration:"none", alignItems:"center",
              transition:"background .15s" }}
            onMouseEnter={e=>e.currentTarget.style.background="var(--blue-l)"}
            onMouseLeave={e=>e.currentTarget.style.background="var(--blue)"}>
            Get Started →
          </a>
          {/* Hamburger */}
          <button className="nav-hamburger" onClick={()=>setOpen(o=>!o)}
            style={{ background:"none", border:"1px solid var(--line2)", color:"var(--text2)",
              padding:"6px 12px", cursor:"pointer", fontSize:"1rem" }}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ background:"var(--bg1)", borderTop:"1px solid var(--line)",
          padding:"0.5rem 1.25rem 1rem", display:"flex", flexDirection:"column" }}>
          {["Products","Services","Pricing","Contact"].map(l=>(
            <a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setOpen(false)}
              style={{ padding:"0.85rem 0", borderBottom:"1px solid var(--line)",
                fontSize:"0.9rem", color:"var(--text2)", textDecoration:"none" }}>{l}</a>
          ))}
          <a href="#contact" onClick={()=>setOpen(false)}
            style={{ marginTop:"0.85rem", padding:"0.75rem 1rem", background:"var(--blue)",
              color:"#fff", fontSize:"0.85rem", fontWeight:500, textDecoration:"none", textAlign:"center" }}>
            Get Started →
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ ...S.section, padding:"120px 0 80px", borderBottom:"1px solid var(--line)" }}>
      <div style={S.wrap}>
        <div className="hero-grid">

          {/* Left copy */}
          <div className="hero-left">
            <div className="mono" style={{ display:"inline-flex", alignItems:"center", gap:8,
              fontSize:"0.68rem", color:"var(--blue-l)", letterSpacing:"0.08em",
              marginBottom:"1.5rem", border:"1px solid var(--line2)",
              padding:"0.28rem 0.75rem", background:"var(--blue-dim)" }}>
              <span style={{ opacity:.5 }}>//</span> SaaS Studio &amp; Engineering
            </div>
            <h1 style={{ fontSize:"clamp(2rem,5vw,3.4rem)", fontWeight:700,
              lineHeight:1.12, letterSpacing:"-0.02em", marginBottom:"1.3rem" }}>
              We build software<br/>that <em style={{ fontStyle:"normal", color:"var(--blue-l)" }}>actually</em> ships.
            </h1>
            <p style={{ fontSize:"0.97rem", color:"var(--text2)", fontWeight:300,
              lineHeight:1.8, maxWidth:460, marginBottom:"2.5rem" }}>
              Apex Horizon is a SaaS studio. We build subscription-ready products and
              precision-engineered websites for businesses that need real tools — not promises.
            </p>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <Btn href="#products" solid>View Products</Btn>
              <Btn href="#contact">Start a Project</Btn>
            </div>
          </div>

          {/* Terminal */}
          <div className="hero-terminal" style={{ border:"1px solid var(--line2)", background:"var(--bg1)" }}>
            <div style={{ padding:"0.55rem 1rem", borderBottom:"1px solid var(--line)",
              display:"flex", alignItems:"center", gap:7, background:"var(--bg2)" }}>
              {["#ef4444","#f59e0b","#22c55e"].map(c=>(
                <span key={c} style={{ width:8, height:8, borderRadius:"50%", background:c, opacity:.6, display:"inline-block" }}/>
              ))}
              <span className="mono" style={{ fontSize:"0.65rem", color:"var(--text3)", marginLeft:"auto", letterSpacing:"0.06em" }}>
                apex-horizon / system
              </span>
            </div>
            <div className="terminal-body mono" style={{ padding:"1.1rem" }}>
              {[
                { p:true,  cmd:" apex status --all" },
                { out:true, parts:[{c:"#4ade80",t:"✓"},{c:"#38bdf8",t:" inventory-manager"},{c:"var(--text2)",t:"  "},{c:"#4ade80",t:"running"}] },
                { out:true, parts:[{c:"#4ade80",t:"✓"},{c:"#38bdf8",t:" email-nexus"},{c:"var(--text2)",t:"        "},{c:"#fbbf24",t:"in dev"}] },
                { out:true, parts:[{c:"var(--text3)",t:"—"},{c:"var(--text3)",t:" client-sites"},{c:"var(--text2)",t:"      "},{c:"#4ade80",t:"3 live"}] },
                { blank:true },
                { p:true,  cmd:" apex products --list" },
                { out:true, parts:[{c:"#38bdf8",t:"[01]"},{c:"var(--text)",t:" WhatsApp Inventory Manager"}] },
                { out:true, parts:[{c:"#38bdf8",t:"[02]"},{c:"var(--text)",t:" Email Nexus "},{c:"#fbbf24",t:"// coming soon"}] },
                { blank:true },
                { cursor:true },
              ].map((line,i)=>(
                <div key={i} className="t-line" style={{ display:"flex", gap:"0.5rem",
                  marginBottom:"0.45rem", lineHeight:1.55, fontSize:"0.7rem" }}>
                  {line.blank && <span>&nbsp;</span>}
                  {line.p && <><span style={{ color:"var(--blue-l)" }}>$</span><span style={{ color:"var(--text)" }}>{line.cmd}</span></>}
                  {line.out && <span style={{ paddingLeft:"1rem" }}>{line.parts.map((p,j)=><span key={j} style={{ color:p.c }}>{p.t}</span>)}</span>}
                  {line.cursor && <><span style={{ color:"var(--blue-l)" }}>$</span><span className="t-cursor"/></>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* shared button */
function Btn({ href, solid, children, style: extra={} }) {
  const [hover, setHover] = useState(false);
  const base = { padding:"0.62rem 1.3rem", fontSize:"0.81rem", fontWeight:500,
    textDecoration:"none", display:"inline-flex", alignItems:"center",
    gap:7, transition:"all .15s", letterSpacing:"0.03em" };
  const solidStyle = { background: hover?"var(--blue-l)":"var(--blue)", color:"#fff" };
  const ghostStyle = { background:"transparent", color: hover?"var(--text)":"var(--text2)",
    border:"1px solid", borderColor: hover?"var(--text3)":"var(--line2)" };
  return (
    <a href={href} style={{ ...base, ...(solid?solidStyle:ghostStyle), ...extra }}
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
      {children}
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   STATS
───────────────────────────────────────────────────────────────────────────── */
const STATS = [
  { idx:"// 001", val:"2",   sup:"+",  lbl:"SaaS products built" },
  { idx:"// 002", val:"100", sup:"%",  lbl:"Custom engineered" },
  { idx:"// 003", val:"Sub", sup:"–",  lbl:"Subscription-ready SaaS" },
  { idx:"// 004", val:"24",  sup:"/7", lbl:"System uptime target" },
];

function Stats() {
  return (
    <div style={{ borderBottom:"1px solid var(--line)", position:"relative", zIndex:1 }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }} className="stats-grid">
        {STATS.map((s,i)=>(
          <div key={i} className="stat-cell"
            style={{ padding:"1.4rem 1.5rem",
              borderRight: i===1||i===3?"none":"1px solid var(--line)" }}>
            <div className="mono" style={{ fontSize:"0.62rem", color:"var(--text3)", marginBottom:"0.55rem" }}>{s.idx}</div>
            <div style={{ fontSize:"1.75rem", fontWeight:700, letterSpacing:"-0.02em", marginBottom:"0.15rem" }}>
              {s.val}<small style={{ fontSize:"1rem", color:"var(--blue-l)", fontWeight:500 }}>{s.sup}</small>
            </div>
            <div style={{ fontSize:"0.76rem", color:"var(--text2)" }}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PRODUCTS
───────────────────────────────────────────────────────────────────────────── */
function Tag({ label, active }) {
  return (
    <span className="mono" style={{ fontSize:"0.62rem", letterSpacing:"0.04em",
      padding:"0.18rem 0.55rem", border:"1px solid",
      color: active?"var(--blue-l)":"var(--text3)",
      borderColor: active?"rgba(59,130,246,0.28)":"var(--line2)",
      background: active?"var(--blue-dim)":"transparent" }}>
      {label}
    </span>
  );
}

function WAMock() {
  return (
    <div style={{ border:"1px solid var(--line2)", background:"var(--bg)", marginBottom:"1.8rem", overflow:"hidden" }}>
      <div style={{ background:"var(--bg3)", padding:"0.55rem 0.9rem",
        borderBottom:"1px solid var(--line)", display:"flex", alignItems:"center", gap:9 }}>
        <div className="mono" style={{ width:26, height:26, background:"var(--blue)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:"0.6rem", fontWeight:700, color:"#fff", flexShrink:0 }}>AH</div>
        <div>
          <div style={{ fontSize:"0.73rem", fontWeight:500 }}>Apex Inventory Bot</div>
          <div className="mono" style={{ fontSize:"0.58rem", color:"#4ade80" }}>● online</div>
        </div>
      </div>
      <div className="mono" style={{ padding:"0.9rem", display:"flex", flexDirection:"column", gap:5 }}>
        {[
          { dir:"in", text:"stock check: Rice 5kg" },
          { dir:"out", text:"[inventory report]", detail:true },
          { dir:"in", text:"add 50 units → Rice 5kg" },
          { dir:"out", text:"✓ updated → now 198 units" },
        ].map((m,i)=>(
          <div key={i} style={{ fontSize:"0.66rem", lineHeight:1.5, padding:"0.45rem 0.7rem",
            maxWidth:"88%", alignSelf:m.dir==="in"?"flex-start":"flex-end",
            textAlign:m.dir==="out"?"right":"left",
            background:m.dir==="in"?"var(--bg3)":"var(--blue-dim)",
            border:m.dir==="in"?"1px solid var(--line)":"1px solid rgba(59,130,246,0.22)",
            color:m.dir==="in"?"var(--text2)":"var(--blue-l)" }}>
            {m.text}
            {m.detail && (
              <div style={{ marginTop:4, padding:"0.38rem 0.55rem", background:"var(--bg)",
                border:"1px solid var(--line)", fontSize:"0.6rem", color:"var(--text2)", textAlign:"left" }}>
                Item&nbsp;&nbsp;: <b style={{ color:"var(--text)", fontWeight:500 }}>Rice 5kg</b><br/>
                Stock&nbsp;: <b style={{ color:"var(--text)", fontWeight:500 }}>148 units</b><br/>
                Alert&nbsp;: <b style={{ color:"var(--text)", fontWeight:500 }}>&lt; 20 units</b><br/>
                Sync&nbsp;&nbsp;: <b style={{ color:"var(--text)", fontWeight:500 }}>09:42 today</b>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function NexusDiagram() {
  return (
    <div style={{ border:"1px solid var(--line2)", background:"var(--bg)", marginBottom:"1.8rem", overflow:"hidden" }}>
      <div className="mono" style={{ background:"var(--bg3)", padding:"0.48rem 0.9rem",
        borderBottom:"1px solid var(--line)", fontSize:"0.63rem", color:"var(--text3)",
        display:"flex", justifyContent:"space-between" }}>
        <span>email-nexus / network</span><span style={{ color:"#4ade80" }}>● active</span>
      </div>
      <svg width="100%" viewBox="0 0 380 180" xmlns="http://www.w3.org/2000/svg" style={{ display:"block" }}>
        <defs>
          <radialGradient id="rg2">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.13"/>
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="380" height="180" fill="#050810"/>
        <line x1="0" y1="60" x2="380" y2="60" stroke="#161e38" strokeWidth="0.5"/>
        <line x1="0" y1="120" x2="380" y2="120" stroke="#161e38" strokeWidth="0.5"/>
        <line x1="95" y1="0" x2="95" y2="180" stroke="#161e38" strokeWidth="0.5"/>
        <line x1="190" y1="0" x2="190" y2="180" stroke="#161e38" strokeWidth="0.5"/>
        <line x1="285" y1="0" x2="285" y2="180" stroke="#161e38" strokeWidth="0.5"/>
        <circle cx="190" cy="90" r="72" fill="url(#rg2)"/>
        <line x1="190" y1="90" x2="55" y2="38" stroke="#2563eb" strokeWidth="0.8" opacity="0.4"/>
        <line x1="190" y1="90" x2="325" y2="38" stroke="#2563eb" strokeWidth="0.8" opacity="0.4"/>
        <line x1="190" y1="90" x2="40" y2="148" stroke="#2563eb" strokeWidth="0.8" opacity="0.3"/>
        <line x1="190" y1="90" x2="340" y2="148" stroke="#2563eb" strokeWidth="0.8" opacity="0.3"/>
        <line x1="190" y1="90" x2="190" y2="18" stroke="#2563eb" strokeWidth="0.8" opacity="0.22"/>
        {[{x:38,y:22,lbl:"SMTP"},{x:308,y:22,lbl:"API"},{x:22,y:132,lbl:"CRM"},{x:323,y:132,lbl:"WH"}].map(b=>(
          <g key={b.lbl}>
            <rect x={b.x} y={b.y} width="34" height="32" fill="#0b1020" stroke="#1d2848" strokeWidth="1"/>
            <text x={b.x+17} y={b.y+19} textAnchor="middle" fill="#3b82f6" fontSize="7.5" fontFamily="IBM Plex Mono,monospace">{b.lbl}</text>
          </g>
        ))}
        <rect x="174" y="4" width="32" height="26" fill="#0b1020" stroke="#161e38" strokeWidth="0.5"/>
        <text x="190" y="21" textAnchor="middle" fill="#4a5680" fontSize="7" fontFamily="IBM Plex Mono,monospace">ML</text>
        <rect x="158" y="66" width="64" height="48" fill="#080c18" stroke="#2563eb" strokeWidth="1.2"/>
        <text x="190" y="87" textAnchor="middle" fill="#3b82f6" fontSize="8" fontWeight="500" fontFamily="IBM Plex Mono,monospace">EMAIL</text>
        <text x="190" y="101" textAnchor="middle" fill="#3b82f6" fontSize="8" fontWeight="500" fontFamily="IBM Plex Mono,monospace">NEXUS</text>
        <circle r="2.2" fill="#3b82f6" opacity="0.9"><animateMotion path="M190,90 L55,38" dur="2s" repeatCount="indefinite"/></circle>
        <circle r="2.2" fill="#3b82f6" opacity="0.9"><animateMotion path="M190,90 L340,148" dur="2.8s" begin="0.7s" repeatCount="indefinite"/></circle>
        <circle r="2.2" fill="#3b82f6" opacity="0.9"><animateMotion path="M55,38 L190,90" dur="2.4s" begin="1.2s" repeatCount="indefinite"/></circle>
      </svg>
    </div>
  );
}

function Products() {
  return (
    <section id="products" style={{ ...S.section, padding:"80px 0" }}>
      <div style={S.wrap}>
        <Reveal className="products-hdr" style={{ marginBottom:"2.5rem", paddingBottom:"2rem", borderBottom:"1px solid var(--line)" }}>
          <div>
            <SectionLabel>Products</SectionLabel>
            <h2 style={{ fontSize:"clamp(1.8rem,3.8vw,2.5rem)", fontWeight:700, letterSpacing:"-0.02em", lineHeight:1.15, marginBottom:"0.7rem" }}>
              Two products.<br/>Real problems solved.
            </h2>
          </div>
          <p style={{ fontSize:"0.92rem", color:"var(--text2)", fontWeight:300, lineHeight:1.75 }}>
            Both built on subscription models, designed to automate the work that wastes your team's time every day.
          </p>
        </Reveal>

        <Reveal className="products-grid">
          {/* Card 1 */}
          <div className="pcard" style={{ background:"var(--bg1)", padding:"2rem 1.5rem" }}>
            <div className="mono" style={{ fontSize:"0.63rem", color:"var(--text3)", letterSpacing:"0.08em", marginBottom:"1.3rem" }}>PRODUCT // 01</div>
            <h3 style={{ fontSize:"1.25rem", fontWeight:600, letterSpacing:"-0.01em", marginBottom:"0.65rem" }}>WhatsApp Inventory Manager</h3>
            <p style={{ fontSize:"0.86rem", color:"var(--text2)", lineHeight:1.75, fontWeight:300, marginBottom:"1.7rem" }}>
              Your inventory database, connected directly to WhatsApp. Check stock, update quantities, get low-stock alerts — all through a simple chat. No dashboards, no training needed.
            </p>
            <div className="tags">
              {["WhatsApp API","Real-time DB","Multi-user","Alerts","REST API"].map((t,i)=><Tag key={t} label={t} active={i<2}/>)}
            </div>
            <WAMock/>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <Btn href="#pricing" solid style={{ fontSize:"0.77rem" }}>View Pricing</Btn>
              <Btn href="#contact" style={{ fontSize:"0.77rem" }}>Early Access</Btn>
            </div>
          </div>

          {/* Card 2 */}
          <div className="pcard" style={{ background:"var(--bg1)", padding:"2rem 1.5rem" }}>
            <div className="mono" style={{ fontSize:"0.63rem", color:"var(--text3)", letterSpacing:"0.08em", marginBottom:"1.3rem" }}>PRODUCT // 02</div>
            <h3 style={{ fontSize:"1.25rem", fontWeight:600, letterSpacing:"-0.01em", marginBottom:"0.65rem" }}>Email Nexus</h3>
            <p style={{ fontSize:"0.86rem", color:"var(--text2)", lineHeight:1.75, fontWeight:300, marginBottom:"1.7rem" }}>
              A smart email automation and intelligence platform. Email Nexus connects your communication channels into a unified routing layer — full details coming soon. Join the waitlist to be first.
            </p>
            <div className="tags">
              {["Email Automation","Smart Routing","CRM Sync","Analytics","Webhooks"].map((t,i)=><Tag key={t} label={t} active={i<2}/>)}
            </div>
            <NexusDiagram/>
            <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
              <Btn href="#contact" solid style={{ fontSize:"0.77rem" }}>Join Waitlist</Btn>
              <span className="mono" style={{ fontSize:"0.63rem", color:"var(--text3)" }}>// launching soon</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FEATURES
───────────────────────────────────────────────────────────────────────────── */
const FEATS = [
  { i:"F01", title:"Real-time data",      desc:"Live pipelines, not polling. Every product reflects the current state of your business, always.",           icon:<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/> },
  { i:"F02", title:"Security-first",      desc:"Encrypted in transit and at rest. Auth and role management built correctly from the start.",                icon:<><rect x="3" y="11" width="18" height="11" rx="1"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></> },
  { i:"F03", title:"API-first design",    desc:"Every product ships with a clean REST API. Plug it into your stack without friction.",                      icon:<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"/></> },
  { i:"F04", title:"Subscription billing",desc:"Plans, billing cycles, and user management handled out of the box. Ship and earn from day one.",             icon:<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/> },
  { i:"F05", title:"Clean codebase",      desc:"No shortcuts. Every product is built to be maintainable and extendable as your needs grow.",                 icon:<><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></> },
  { i:"F06", title:"Scales with you",     desc:"Architecture decisions at day one support 10 users or 10,000 — no rewrites required.",                      icon:<><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></> },
];

function Features() {
  return (
    <section style={{ ...S.section, padding:"0 0 80px" }}>
      <div style={S.wrap}>
        <Reveal className="feats-grid">
          {FEATS.map((f,i)=>(
            <div key={i} className="feat-cell" style={{ background:"var(--bg1)", padding:"2rem 1.5rem", transition:"background .2s" }}>
              <div className="mono" style={{ fontSize:"0.6rem", color:"var(--text3)", marginBottom:"1.1rem", letterSpacing:"0.07em" }}>// {f.i}</div>
              <div style={{ width:34, height:34, border:"1px solid var(--line2)", display:"flex",
                alignItems:"center", justifyContent:"center", marginBottom:"1.1rem", background:"var(--bg2)" }}>
                <svg viewBox="0 0 24 24" width="15" height="15" stroke="var(--blue-l)"
                  fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {f.icon}
                </svg>
              </div>
              <h4 style={{ fontSize:"0.92rem", fontWeight:600, marginBottom:"0.45rem" }}>{f.title}</h4>
              <p style={{ fontSize:"0.8rem", color:"var(--text2)", lineHeight:1.68, fontWeight:300 }}>{f.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────────────────────────────────────── */
const SVCS = [
  { n:"01", nm:"Custom Websites",    ds:"Professional sites for businesses, brands & portfolios" },
  { n:"02", nm:"SaaS Development",   ds:"End-to-end product engineering — schema to billing" },
  { n:"03", nm:"Automation & Bots",  ds:"WhatsApp bots, email workflows, tool integrations" },
  { n:"04", nm:"API Integrations",   ds:"Connect your existing tools, eliminate duplicate work" },
];

function Services() {
  return (
    <section id="services" style={{ ...S.section, padding:"80px 0", borderTop:"1px solid var(--line)" }}>
      <div style={S.wrap}>
        <div className="svc-layout">
          <Reveal>
            <SectionLabel>Services</SectionLabel>
            <h2 style={{ fontSize:"clamp(1.8rem,3.8vw,2.5rem)", fontWeight:700, letterSpacing:"-0.02em", lineHeight:1.15 }}>We also build for clients.</h2>
            <p style={{ fontSize:"0.92rem", color:"var(--text2)", fontWeight:300, lineHeight:1.75, marginTop:"0.7rem" }}>
              Select client projects, done with the same engineering standard as our own products.
            </p>
          </Reveal>
          <Reveal style={{ display:"flex", flexDirection:"column", gap:1, background:"var(--line)", border:"1px solid var(--line)" }}>
            {SVCS.map(s=>(
              <div key={s.n} className="svc-row"
                style={{ background:"var(--bg1)", padding:"1.3rem 1.5rem",
                  display:"grid", gridTemplateColumns:"56px 1fr auto",
                  alignItems:"center", gap:"1rem", transition:"background .15s", cursor:"pointer" }}>
                <div className="mono" style={{ fontSize:"0.62rem", color:"var(--text3)" }}>// {s.n}</div>
                <div>
                  <div style={{ fontSize:"0.9rem", fontWeight:500, color:"var(--text)" }}>{s.nm}</div>
                  <div style={{ fontSize:"0.76rem", color:"var(--text2)", marginTop:2, fontWeight:300 }}>{s.ds}</div>
                </div>
                {/* <div className="svc-arrow" style={{ fontSize:"1rem", color:"var(--text3)", transition:"color .15s" }}>→</div> */}
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    id: "01",
    quote: "An incredible partner from start to finish. They designed my company website and the process was seamless. The team was communicative, efficient, and the final product exceeded my expectations.",
    author: "Abhay Vaghela",
    role: "AB's Film Studio"
  }
];

function Testimonials() {
  // Assuming TESTIMONIALS is an array of objects: { id, quote, author, role }
  return (
    <section id="testimonials" style={{ ...S.section, padding: "80px 0", borderTop: "1px solid var(--line)" }}>
      <div style={S.wrap}>
        <div className="testimonial-layout">
          <Reveal>
            <SectionLabel>Testimonials</SectionLabel>
            <h2 style={{ fontSize: "clamp(1.8rem,3.8vw,2.5rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              What our clients say.
            </h2>
            <p style={{ fontSize: "0.92rem", color: "var(--text2)", fontWeight: 300, lineHeight: 1.75, marginTop: "0.7rem" }}>
              Feedback from partners who demand the same engineering standards we apply to our own builds.
            </p>
          </Reveal>

          <Reveal style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: 1, 
            background: "var(--line)", 
            border: "1px solid var(--line)",
            marginTop: "3rem" 
          }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="testimonial-row"
                style={{ 
                  background: "var(--bg1)", 
                  padding: "2rem 1.5rem",
                  display: "grid", 
                  gridTemplateColumns: "40px 1fr",
                  alignItems: "start", 
                  gap: "1.5rem" 
                }}>
                
                {/* Visual Quote Marker */}
                <div className="mono" style={{ fontSize: "1.5rem", color: "var(--accent)", lineHeight: 1 }}>
                  “
                </div>

                <div>
                  <blockquote style={{ 
                    fontSize: "1rem", 
                    fontWeight: 400, 
                    color: "var(--text)", 
                    lineHeight: 1.6,
                    margin: 0,
                    fontStyle: "italic"
                  }}>
                    {t.quote}
                  </blockquote>
                  
                  <div style={{ marginTop: "1.2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text)" }}>
                      {t.author}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text3)" }}>—</div>
                    <div style={{ fontSize: "0.76rem", color: "var(--text2)", fontWeight: 300 }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
/* ─────────────────────────────────────────────────────────────────────────────
   PRICING
───────────────────────────────────────────────────────────────────────────── */
const PLANS = [
  { nm:"STARTER",    price:"999",   desc:"For small businesses starting with inventory automation.",
    feats:["1 WhatsApp number","Up to 500 items","Basic stock queries","Low-stock alerts","Email support"],
    btn:"ghost", btnLabel:"Get Started" },
  { nm:"GROWTH",     price:"2,499", featured:true, badge:"// MOST POPULAR",
    desc:"For growing businesses needing multi-user access and analytics.",
    feats:["3 WhatsApp numbers","Unlimited items","Advanced queries","Analytics dashboard","Priority support"],
    btn:"solid", btnLabel:"Start Free Trial" },
  { nm:"ENTERPRISE", custom:true,
    desc:"For large operations needing custom workflows and integrations.",
    feats:["Unlimited numbers","Custom integrations","Dedicated support","SLA agreement","Onboarding included"],
    btn:"ghost", btnLabel:"Talk to Us" },
];

function Pricing() {
  return (
    <section id="pricing" style={{ ...S.section, padding:"80px 0", borderTop:"1px solid var(--line)" }}>
      <div style={S.wrap}>
        <Reveal>
          <SectionLabel>Pricing</SectionLabel>
          <h2 style={{ fontSize:"clamp(1.8rem,3.8vw,2.5rem)", fontWeight:700, letterSpacing:"-0.02em", lineHeight:1.15 }}>WhatsApp Inventory Manager</h2>
          <p style={{ fontSize:"0.92rem", color:"var(--text2)", fontWeight:300, lineHeight:1.75 }}>Simple subscription plans. No setup fees. Cancel anytime.</p>
        </Reveal>
        <Reveal className="pricing-grid">
          {PLANS.map(p=>(
            <div key={p.nm} style={{ background:p.featured?"var(--bg2)":"var(--bg1)", padding:"2rem 1.5rem", position:"relative" }}>
              {p.badge && (
                <div className="mono" style={{ display:"inline-block", fontSize:"0.58rem", color:"var(--blue-l)",
                  border:"1px solid rgba(59,130,246,0.3)", background:"var(--blue-dim)",
                  padding:"0.13rem 0.48rem", letterSpacing:"0.07em", marginBottom:"1.1rem" }}>{p.badge}</div>
              )}
              <div style={{ fontSize:"0.78rem", color:"var(--text2)", letterSpacing:"0.06em", marginBottom:"0.9rem" }}>{p.nm}</div>
              {p.custom
                ? <div style={{ fontSize:"1.75rem", fontWeight:700, letterSpacing:"-0.03em", lineHeight:1, marginBottom:"0.25rem" }}>Custom</div>
                : <div style={{ fontSize:"2.1rem", fontWeight:700, letterSpacing:"-0.03em", lineHeight:1, marginBottom:"0.25rem" }}>
                    <sup style={{ fontSize:"1rem", color:"var(--text2)", fontWeight:400, verticalAlign:"super" }}>₹</sup>
                    {p.price}
                    <sub style={{ fontSize:"0.8rem", color:"var(--text3)", fontWeight:300 }}>/mo</sub>
                  </div>
              }
              <p style={{ fontSize:"0.8rem", color:"var(--text2)", margin:"0.9rem 0 1.6rem", fontWeight:300, lineHeight:1.6 }}>{p.desc}</p>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"0.55rem", marginBottom:"1.8rem" }}>
                {p.feats.map(f=>(
                  <li key={f} className="mono" style={{ fontSize:"0.67rem", color:"var(--text2)", display:"flex", alignItems:"center", gap:7 }}>
                    <span style={{ color:"var(--blue-l)", flexShrink:0 }}>→</span>{f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`plan-btn-${p.btn}`}
                style={{ display:"block", width:"100%", padding:"0.65rem", textAlign:"center",
                  fontSize:"0.78rem", fontWeight:500, letterSpacing:"0.04em", textDecoration:"none", transition:"all .15s" }}>
                {p.btnLabel}
              </a>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────────────────────────────────────── */
const CD_ITEMS = [
  { icon:<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>, lbl:"EMAIL",         val:"hello@apexhorizon.in" },
  { icon:<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,                                                     lbl:"LOCATION",      val:"Rajkot, Gujarat, India" },
  { icon:<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,                               lbl:"RESPONSE TIME", val:"Within 24 hours" },
];

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" style={{ ...S.section, padding:"80px 0", borderTop:"1px solid var(--line)" }}>
      <div style={S.wrap}>
        <div className="contact-grid">
          {/* Info */}
          <div>
            <Reveal><SectionLabel>Contact</SectionLabel></Reveal>
            <Reveal>
              <h2 style={{ fontSize:"clamp(1.8rem,3.8vw,2.5rem)", fontWeight:700, letterSpacing:"-0.02em", lineHeight:1.15 }}>
                Let's build<br/>something real.
              </h2>
            </Reveal>
            <Reveal>
              <p style={{ fontSize:"0.92rem", color:"var(--text2)", fontWeight:300, lineHeight:1.75, marginTop:"0.7rem" }}>
                Tell us what you need — a product subscription, a client website, or something custom. We'll get back to you fast.
              </p>
            </Reveal>
            <Reveal style={{ paddingTop:"2rem" }}>
              {CD_ITEMS.map((cd,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"1rem",
                  padding:"1.1rem 0", borderBottom: i<2?"1px solid var(--line)":"none" }}>
                  <div style={{ width:30, height:30, border:"1px solid var(--line2)", background:"var(--bg2)",
                    display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <svg viewBox="0 0 24 24" width="13" height="13" stroke="var(--blue-l)"
                      fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{cd.icon}</svg>
                  </div>
                  <div>
                    <div className="mono" style={{ fontSize:"0.62rem", color:"var(--text3)", letterSpacing:"0.07em", marginBottom:2 }}>{cd.lbl}</div>
                    <div style={{ fontSize:"0.86rem", color:"var(--text)" }}>{cd.val}</div>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Form */}
          <Reveal>
            <form style={{ display:"flex", flexDirection:"column", gap:1,
              background:"var(--line)", border:"1px solid var(--line)", marginTop:"2rem" }}
              onSubmit={e=>{e.preventDefault(); setSent(true);}}>

              <div className="form-name-email">
                {[{lbl:"NAME",type:"text",ph:"Your name"},{lbl:"EMAIL",type:"email",ph:"you@company.com"}].map(f=>(
                  <div key={f.lbl} style={{ background:"var(--bg1)", padding:"0.9rem 1.1rem", display:"flex", flexDirection:"column", gap:5 }}>
                    <label className="mono" style={{ fontSize:"0.6rem", color:"var(--text3)", letterSpacing:"0.07em" }}>{f.lbl}</label>
                    <input type={f.type} placeholder={f.ph} required
                      style={{ background:"transparent", border:"none", outline:"none", color:"var(--text)",
                        fontFamily:"'Geist',sans-serif", fontSize:"0.86rem", width:"100%" }}/>
                  </div>
                ))}
              </div>

              <div style={{ background:"var(--bg1)", padding:"0.9rem 1.1rem", display:"flex", flexDirection:"column", gap:5 }}>
                <label className="mono" style={{ fontSize:"0.6rem", color:"var(--text3)", letterSpacing:"0.07em" }}>INTERESTED IN</label>
                <select style={{ background:"var(--bg1)", border:"none", outline:"none", color:"var(--text2)",
                  fontFamily:"'Geist',sans-serif", fontSize:"0.86rem", width:"100%" }}>
                  <option value="">Select...</option>
                  <option>WhatsApp Inventory Manager — Early Access</option>
                  <option>Email Nexus — Waitlist</option>
                  <option>Custom Website Development</option>
                  <option>Custom SaaS Development</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div style={{ background:"var(--bg1)", padding:"0.9rem 1.1rem", display:"flex", flexDirection:"column", gap:5 }}>
                <label className="mono" style={{ fontSize:"0.6rem", color:"var(--text3)", letterSpacing:"0.07em" }}>MESSAGE</label>
                <textarea rows="5" placeholder="Tell us about your business and what you're trying to build..."
                  style={{ background:"transparent", border:"none", outline:"none", color:"var(--text)",
                    fontFamily:"'Geist',sans-serif", fontSize:"0.86rem", resize:"vertical", width:"100%" }}/>
              </div>

              <button type="submit" disabled={sent}
                style={{ background:sent?"var(--bg4)":"var(--blue)", color:sent?"var(--text3)":"#fff",
                  border:"none", fontFamily:"'Geist',sans-serif", fontSize:"0.83rem", fontWeight:500,
                  padding:"0.95rem", letterSpacing:"0.04em", cursor:sent?"default":"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:7, transition:"background .15s" }}
                onMouseEnter={e=>{if(!sent)e.currentTarget.style.background="var(--blue-l)"}}
                onMouseLeave={e=>{if(!sent)e.currentTarget.style.background=sent?"var(--bg4)":"var(--blue)"}}>
                {sent ? "✓ Sent — we'll be in touch within 24h" : "Send Message →"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ borderTop:"1px solid var(--line)", background:"var(--bg1)",
      padding:"1.8rem 1.25rem", position:"relative", zIndex:1 }}>
      <div style={{ maxWidth:1120, margin:"0 auto" }} className="footer-inner">
        <div style={{ display:"flex", alignItems:"center", gap:"1.25rem", flexWrap:"wrap" }}>
          <a href="#" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
            <div style={{ width:24, height:24, border:"1px solid var(--blue)", display:"flex",
              alignItems:"center", justifyContent:"center", background:"var(--blue-dim)" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <polygon points="7,1 13,11 1,11" stroke="#3b82f6" strokeWidth="1.3" fill="none"/>
                <line x1="1" y1="11" x2="13" y2="11" stroke="#3b82f6" strokeWidth="1.3"/>
              </svg>
            </div>
            <span style={{ fontWeight:600, fontSize:"0.82rem", color:"var(--text)", letterSpacing:"0.04em" }}>
              APEX<span style={{ color:"var(--blue-l)" }}> HORIZON</span>
            </span>
          </a>
          <span className="mono" style={{ fontSize:"0.63rem", color:"var(--text3)" }}>© 2025 Apex Horizon. All rights reserved.</span>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap" }}>
          {["Products","Services","Pricing","Contact"].map((l,i)=>(
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontSize:"0.76rem", color:"var(--text3)", textDecoration:"none",
                padding:"0.35rem 0.75rem", borderLeft: i>0?"1px solid var(--line)":"none",
                transition:"color .15s" }}
              onMouseEnter={e=>e.currentTarget.style.color="var(--text)"}
              onMouseLeave={e=>e.currentTarget.style.color="var(--text3)"}>
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   APP
───────────────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <style>{G}</style>
      <Nav />
      <Hero />
      <Stats />
      <Products />
      <Features />
      <Services />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
}