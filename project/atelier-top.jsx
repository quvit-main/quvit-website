/* QUVit — Atelier: Nav + Hero */

function ANav({ open, onToggle }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(scrollY > 30);
    f();addEventListener('scroll', f, { passive: true });
    return () => removeEventListener('scroll', f);
  }, []);
  const links = [["About", "#about"], ["Services", "#services"], ["Why QUVit", "#why"], ["Clients", "#clients"]];
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a href="#top" aria-label="QUVit"><img className="nav__logo" src="assets/logo-nav-white.svg" alt="QUVit" /></a>
      <div className="nav__right">
        <div className="nav__links">
          {links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
        </div>
        <a className="nav__cta" href="#contact" style={{ padding: "1px" }}><span className="dot"></span>Find us</a>
      </div>
      <button className={`nav__burger ${open ? "open" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={onToggle}><span></span><span></span></button>
    </nav>);

}

function AMobileNav({ open, onClose }) {
  const links = [["About", "#about"], ["Services", "#services"], ["Why QUVit", "#why"], ["Clients", "#clients"], ["Contact", "#contact"]];
  return (
    <div className={`mnav ${open ? "open" : ""}`} aria-hidden={!open}>
      {links.map(([l, h], i) =>
      <a key={h} href={h} onClick={onClose}><i>0{i + 1}</i>{l}</a>
      )}
    </div>);

}

function Badge() {
  return (
    <div className="badge" data-cursor>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path id="bcirc" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text>
          <textPath href="#bcirc" startOffset="0">BOOK A CONSULTATION · QUVIT · BOOK A CONSULTATION · </textPath>
        </text>
      </svg>
      <div className="badge__core"><i>↘</i></div>
    </div>);

}

function AHero() {
  return (
    <header className="hero wrap s-ink" id="top">
      <div className="hero__meta">
        <div className="col"><span className="meta">QUVit IT Solutions</span><a className="meta meta--link" href="https://share.google/LsRInTsoWsZGccwf2" target="_blank" rel="noopener noreferrer"><b>Nasr City, Cairo, Egypt</b></a></div>
        <div className="col"><span className="meta">(Q) Quality</span><span className="meta"><b>(U) Uniqueness — (V) Value</b></span></div>
        <div className="col"><span className="meta">Infrastructure / Hardware</span><span className="meta"><b>Maintenance / Support / Licensing</b></span></div>
      </div>

      <div className="hero__center">
        <h1 className="display">
          <span className="line">Empowering</span>
          <span className="line">business <em className="violet">growth</em></span>
          <span className="line">through <em>IT.</em></span>
        </h1>
      </div>

      <div className="hero__lower">
        <div></div>
        <div className="hero__actions">
          <a href="#services" className="maglink" data-cursor>
            <span className="ln">Explore the work</span>
            <span className="ar">↗</span>
          </a>
          <Magnetic strength={0.3}>
            <a href="#contact" aria-label="Book a consultation"><Badge /></a>
          </Magnetic>
        </div>
      </div>
    </header>);

}

Object.assign(window, { ANav, AMobileNav, AHero });