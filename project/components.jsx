/* QUVit — shared bits: icons, reveal hook, data */

const { useState, useEffect, useRef } = React;

/* --- Reveal: passthrough wrapper (kept for API stability). Content is
   always visible — entrance motion is handled by CSS where it renders
   reliably; we never start from opacity:0 so nothing can get stuck hidden. --- */
function Reveal({ children, delay = 0, as = "div", className = "", ...rest }) {
  const Tag = as;
  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  );
}

/* --- Inline icon set (stroke, currentColor) --- */
const Icon = {
  arrow: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  check: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  server: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="4" width="18" height="7" rx="2" stroke="currentColor" strokeWidth="1.8"/><rect x="3" y="13" width="18" height="7" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M7 7.5h.01M7 16.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>),
  chip: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M9 1.5V4M15 1.5V4M9 20v2.5M15 20v2.5M1.5 9H4M1.5 15H4M20 9h2.5M20 15h2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>),
  wrench: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M14.5 6.5a3.5 3.5 0 00-4.7 4.3l-6 6a1.6 1.6 0 102.3 2.3l6-6a3.5 3.5 0 004.6-4.6l-2.2 2.2-2-2 2-2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>),
  headset: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 13v-1a8 8 0 0116 0v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><rect x="2.5" y="13" width="4" height="6" rx="1.6" stroke="currentColor" strokeWidth="1.8"/><rect x="17.5" y="13" width="4" height="6" rx="1.6" stroke="currentColor" strokeWidth="1.8"/><path d="M20 19v.5a3 3 0 01-3 3h-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>),
  shield: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3l7 3v5c0 4.5-3 8.3-7 9.5C8 19.3 5 15.5 5 11V6l7-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  spark: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3v6M12 15v6M3 12h6M15 12h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M12 9a3 3 0 100 6 3 3 0 000-6z" stroke="currentColor" strokeWidth="1.8"/></svg>),
  scale: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 4v16M7 8h10M5 12l2-4 2 4a2 2 0 11-4 0zM15 12l2-4 2 4a2 2 0 11-4 0z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  mail: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="5" width="18" height="14" rx="2.4" stroke="currentColor" strokeWidth="1.8"/><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  link: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M9 12a3 3 0 003 3h2a4 4 0 100-8h-1M15 12a3 3 0 00-3-3h-2a4 4 0 100 8h1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  pin: (p) => (<svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8"/></svg>),
};

/* --- Services data (from company profile) --- */
const SERVICES = [
  { key:"infra", no:"01", name:"IT Infrastructure Setup", icon:"server",
    blurb:"Starting a new company is exciting — but setting up your tech systems can feel overwhelming. We design and build your entire IT foundation, customized to your space, your team, and your growth plans, so your business is tech-ready from day one — fast, secure, and future-proof.",
    tags:["Internet & connectivity","Servers","Network security","Structured cabling"] },
  { key:"hardware", no:"02", name:"IT Hardware Supply", icon:"chip",
    blurb:"Choosing the right hardware can be overwhelming — what's compatible, reliable, and actually worth the investment? From desktops and laptops to servers and networking gear, we help you find the right tech tools for your team: fast, dependable, and tailored to your needs and budget.",
    tags:["Desktops & laptops","Servers","Networking gear","Budget-fit sourcing"] },
  { key:"maint", no:"03", name:"IT Maintenance", icon:"wrench",
    blurb:"Tech issues don't wait for a convenient time — and when systems go down, so does productivity. Our proactive maintenance plans keep your systems running smoothly. We handle the health checks, updates, and performance monitoring, so you never worry about downtime or surprise breakdowns.",
    tags:["Health checks","Updates","Performance monitoring","Zero downtime"] },
  { key:"support", no:"04", name:"Support & Help-desk", icon:"headset",
    blurb:"When your team hits a technical roadblock — a printer fails, emails won't send, a server crashes — it causes delays and stress. Our support team becomes your team's lifeline, with quick response times and clear communication that get you back to work without losing momentum.",
    tags:["Fast response","Clear comms","On-demand fixes","Your team's lifeline"] },
  { key:"licensing", no:"05", name:"Software Licensing", icon:"shield",
    blurb:"Licensing can be a confusing maze — are you using the right tools legally and efficiently, or overpaying? We help you navigate the software landscape with clarity: sourcing, managing, and renewing the right licenses — keeping you compliant, cost-efficient, and protected from cyber threats tied to pirated or outdated software.",
    tags:["License sourcing","Renewals","Compliance","Cyber protection"] },
];

const CLIENTS = ["Sylndr","QNB (Technical Arm)","Embassy of Brazil","Al Bashaer Schools","United Co. of Pharmacists","Carousel Studios","Omrania for Education","Etma'n Labs","Dr. Magdy Soliman Hospital","Shokry Medical Center"];

Object.assign(window, { Reveal, Icon, SERVICES, CLIENTS, useState, useEffect, useRef });
