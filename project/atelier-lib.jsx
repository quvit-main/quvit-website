/* QUVit — Atelier: data, hooks, cursor, ticker, grain */
const { useState, useEffect, useRef, useCallback } = React;

/* ---------- DATA ---------- */
const A_SERVICES = [
  { no:"01", name:"IT Infrastructure Setup", short:"Foundations",
    blurb:"Starting a new company is exciting — but standing up your systems can feel overwhelming. We design and build your entire IT foundation, customised to your space, your team, and your growth plans, so your business is <b>tech-ready from day one</b> — fast, secure, future-proof.",
    tags:["Connectivity","Servers","Network security","Structured cabling"] },
  { no:"02", name:"IT Hardware Supply", short:"Procurement",
    blurb:"What's compatible, reliable, and actually worth the investment? We take that weight off your shoulders. From desktops and laptops to servers and networking gear, we source the right tools for your team — <b>dependable and tailored to your budget</b>.",
    tags:["Desktops & laptops","Servers","Networking","Budget-fit sourcing"] },
  { no:"03", name:"IT Maintenance", short:"Continuity",
    blurb:"Tech issues never wait for a convenient time — and when systems go down, so does productivity. Our proactive plans handle the health checks, updates, and performance monitoring, so you <b>never worry about downtime</b> or surprise breakdowns.",
    tags:["Health checks","Updates","Monitoring","Zero downtime"] },
  { no:"04", name:"Support & Help-desk", short:"Response",
    blurb:"A printer fails, emails won't send, a server crashes — and momentum stalls. Our support team becomes your team's lifeline, with quick response times and clear communication that get you <b>back to work without losing momentum</b>.",
    tags:["Fast response","Clear comms","On-demand fixes","Lifeline"] },
  { no:"05", name:"Software Licensing", short:"Compliance",
    blurb:"Licensing is a confusing maze — are you compliant, efficient, overpaying? We source, manage, and renew the right licences with clarity — keeping you <b>compliant, cost-efficient, and protected</b> from threats tied to pirated or outdated software.",
    tags:["Sourcing","Renewals","Compliance","Cyber protection"] },
];

const A_LEX = [
  { L:"Q", word:"Quality", ipa:"/ˈkwɒl.ə.ti/", pos:"noun",
    def:"Exceptional standards held in <b>every deployment</b> — systems engineered to perform reliably and built to last." },
  { L:"U", word:"Uniqueness", ipa:"/juːˈniːk.nəs/", pos:"noun",
    def:"The refusal of copy-paste IT. Every solution is <b>tailored</b> to your space, your team, and your growth plans." },
  { L:"V", word:"Value", ipa:"/ˈvæl.juː/", pos:"noun",
    def:"Innovation balanced with cost-efficiency, so your investment returns something <b>real and measurable</b>." },
];

const A_CLIENTS = [
  ["Sylndr","Automotive / Fintech"],
  ["QNBeyond Plus","Banking — Technical Arm"],
  ["Embassy of Brazil","Government"],
  ["Al Bashaer Schools","Education"],
  ["United Co. of Pharmacists","Pharmaceutical"],
  ["Carousel Studios","Creative"],
  ["Omrania for Education","Education"],
  ["Etma'n Labs","Healthcare"],
  ["Dr. Magdy Soliman Hospital","Healthcare"],
  ["Shokry Medical Center","Healthcare"],
];

/* ---------- CUSTOM CURSOR ---------- */
function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(pointer:coarse)").matches) return;
    let mx=innerWidth/2, my=innerHeight/2, rx=mx, ry=my, raf;
    const onMove = (e) => {
      mx=e.clientX; my=e.clientY;
      if (dot.current) dot.current.style.transform=`translate(${mx}px,${my}px)`;
      const t = e.target.closest('a,button,[data-cursor]');
      if (ring.current) ring.current.classList.toggle('hover', !!t);
      if (dot.current) dot.current.classList.toggle('hide', !!t);
      const onV = !!e.target.closest('.s-violet');
      if (ring.current) ring.current.classList.toggle('on-violet', onV);
      if (dot.current) dot.current.classList.toggle('on-violet', onV);
    };
    const loop = () => {
      rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
      if (ring.current) ring.current.style.transform=`translate(${rx}px,${ry}px)`;
      raf=requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    raf=requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <React.Fragment>
      <div ref={ring} className="cursor-ring"></div>
      <div ref={dot} className="cursor-dot"></div>
    </React.Fragment>
  );
}

/* ---------- KINETIC TICKER (rAF translateX) ---------- */
function Ticker({ items, speed = 0.6, className = "" }) {
  const row = useRef(null);
  useEffect(() => {
    const el = row.current; if (!el) return;
    let x = 0, raf, last = performance.now();
    const half = () => el.scrollWidth / 2;
    const loop = (now) => {
      const dt = Math.min(now - last, 50); last = now;
      x -= speed * dt * 0.06 * 16 / 16; // px per frame ~ speed
      x = -((-x) % half());
      el.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [speed]);
  const seq = [...items, ...items];
  return (
    <div className={`ticker ${className}`}>
      <div className="ticker__row" ref={row}>
        {seq.map((it, i) => (
          <span className={`it ${i % 2 ? "ghost" : ""}`} key={i}>{it}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------- MAGNETIC wrapper ---------- */
function Magnetic({ children, strength = 0.4, className = "", ...rest }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width/2);
    const y = e.clientY - (r.top + r.height/2);
    el.style.transform = `translate(${x*strength}px,${y*strength}px)`;
  }, [strength]);
  const onLeave = useCallback(() => {
    const el = ref.current; if (el) el.style.transform = "translate(0,0)";
  }, []);
  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}
         style={{transition:"transform .4s cubic-bezier(.22,.61,.36,1)", display:"inline-flex"}} {...rest}>
      {children}
    </div>
  );
}

Object.assign(window, {
  useState, useEffect, useRef, useCallback,
  A_SERVICES, A_LEX, A_CLIENTS, Cursor, Ticker, Magnetic
});
