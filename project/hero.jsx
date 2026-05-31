/* QUVit — Nav, Hero, Pillars */

function Nav({ onMenu }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [["About","#about"],["Services","#services"],["Why QUVit","#why"],["Clients","#clients"]];
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a href="#top" aria-label="QUVit home" style={{position:"relative",display:"block",height:30}}>
        <img className="nav__logo nav__logo--white" src="assets/logo-white.svg" alt="QUVit" />
        <img className="nav__logo nav__logo--color" src="assets/logo-color.svg" alt="QUVit" />
      </a>
      <div className="nav__links">
        {links.map(([l,h]) => <a key={h} href={h}>{l}</a>)}
      </div>
      <a className="btn btn-primary nav__cta" href="#contact">Book a Consultation</a>
      <button className="nav__burger" aria-label="Open menu" onClick={onMenu}>
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}

function MobileNav({ open, onClose }) {
  const links = [["About","#about"],["Services","#services"],["Why QUVit","#why"],["Clients","#clients"],["Contact","#contact"]];
  return (
    <div className={`mnav ${open ? "open" : ""}`}>
      <button onClick={onClose} aria-label="Close menu"
        style={{position:"absolute",top:24,right:"var(--gutter)",color:"#fff",fontFamily:"var(--font-mono)",fontSize:14,letterSpacing:".1em"}}>CLOSE ✕</button>
      {links.map(([l,h],i) => (
        <a key={h} href={h} onClick={onClose}>
          <span>{String(i+1).padStart(2,"0")}</span>{l}
        </a>
      ))}
    </div>
  );
}

/* Animated node network */
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    let raf, w, h, dpr;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = [];
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    resize();
    const N = Math.max(26, Math.min(54, Math.floor(w / 34)));
    for (let i=0;i<N;i++) nodes.push({
      x:Math.random()*w, y:Math.random()*h,
      vx:(Math.random()-.5)*.22, vy:(Math.random()-.5)*.22,
      r:Math.random()*1.6+.8
    });
    function draw() {
      ctx.clearRect(0,0,w,h);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x<0||n.x>w) n.vx*=-1;
        if (n.y<0||n.y>h) n.vy*=-1;
      }
      for (let i=0;i<nodes.length;i++){
        for (let j=i+1;j<nodes.length;j++){
          const a=nodes[i], b=nodes[j];
          const dx=a.x-b.x, dy=a.y-b.y; const d=Math.hypot(dx,dy);
          if (d<140){
            ctx.globalAlpha=(1-d/140)*0.35;
            ctx.strokeStyle="#3f6fd6";
            ctx.lineWidth=.6;
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          }
        }
      }
      for (const n of nodes){
        ctx.globalAlpha=.9;
        ctx.fillStyle = Math.random()>.5 ? "#00CFC1" : "#9a7bff";
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill();
      }
      ctx.globalAlpha=1;
      raf = requestAnimationFrame(draw);
    }
    if (reduce) { draw = ()=>{}; }
    raf = requestAnimationFrame(draw);
    const onR = () => { resize(); };
    window.addEventListener("resize", onR);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onR); };
  }, []);
  return <canvas ref={ref} className="hero__canvas"></canvas>;
}

function Hero({ network = true }) {
  return (
    <header className="hero" id="top">
      <div className="hero__glow g1"></div>
      <div className="hero__glow g2"></div>
      <div className="hero__grid-overlay"></div>
      {network && <HeroCanvas />}

      {/* floating brand shapes */}
      <div className="float shape-ring" style={{width:120,height:120,top:"18%",right:"10%",animation:"floaty 9s ease-in-out infinite"}}></div>
      <div className="float shape-ring" style={{width:54,height:54,bottom:"22%",right:"22%",borderColor:"rgba(154,123,255,.5)",animation:"floaty 7s ease-in-out infinite .6s"}}></div>
      <div className="float shape-tri" style={{bottom:"18%",left:"8%",borderLeft:"22px solid transparent",borderRight:"22px solid transparent",borderBottom:"38px solid rgba(0,207,193,.4)",animation:"floaty 8s ease-in-out infinite .3s"}}></div>

      <div className="wrap hero__inner">
        <Reveal as="div" className="eyebrow on-dark">IT Solutions · Egypt</Reveal>
        <Reveal as="h1" className="h-display" delay={80} style={{marginTop:22}}>
          Empowering business growth through <span className="text-grad">IT solutions</span>.
        </Reveal>
        <Reveal as="p" className="hero__sub" delay={160}>
          From infrastructure and hardware to maintenance, support, and licensing —
          QUVit delivers end-to-end IT built on Quality, Uniqueness, and Value.
        </Reveal>
        <Reveal as="div" className="hero__cta" delay={240}>
          <a className="btn btn-primary" href="#contact">Book a Consultation <Icon.arrow className="arr" style={{width:18,height:18}}/></a>
          <a className="btn btn-ghost" href="#services">Explore Services</a>
        </Reveal>

        <Reveal as="div" className="hero__stats" delay={320}>
          {[["5","Core IT services"],["10+","Organizations served"],["1","Trusted partner, end-to-end"]].map(([n,l]) => (
            <div className="hero__stat" key={l}>
              <div className="num text-grad" style={{WebkitTextFillColor:"transparent"}}>{n}</div>
              <div className="lbl">{l}</div>
            </div>
          ))}
        </Reveal>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll down">
        <div className="mouse"></div>
        SCROLL
      </a>
    </header>
  );
}

function Pillars() {
  const items = [
    ["Q","Quality","Exceptional standards in every deployment — reliable systems engineered to perform and built to last."],
    ["U","Uniqueness","No copy-paste IT. Every solution is tailored to your space, your team, and your growth plans."],
    ["V","Value","Innovation balanced with cost-efficiency, so your investment delivers real, measurable returns."],
  ];
  return (
    <section className="section pillars" id="pillars">
      <div className="wrap">
        <Reveal as="div" className="eyebrow">The QUV Promise</Reveal>
        <Reveal as="h2" className="h-1" delay={60} style={{marginTop:18,color:"var(--navy)",maxWidth:"16ch"}}>
          Three letters. One standard for everything we build.
        </Reveal>
        <div className="pillars__grid">
          {items.map(([L,t,d],i) => (
            <Reveal key={L} className="pillar" delay={i*100}>
              <div className="pillar__bar"></div>
              <div className="pillar__letter">{L}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, MobileNav, Hero, Pillars });
