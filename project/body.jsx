/* QUVit — About, Services, Why, Clients, Contact, Footer */

function About() {
  const points = [
    "End-to-end IT — from setup to ongoing support",
    "Tailored to your business goals, not a template",
    "Secure, reliable, and built to scale with you",
  ];
  return (
    <section className="section" id="about">
      <div className="wrap about__grid">
        <div className="about__copy">
          <Reveal as="div" className="eyebrow">01 · About QUVit</Reveal>
          <Reveal as="h2" className="h-1" delay={60} style={{marginTop:18,color:"var(--navy)"}}>
            We empower businesses with IT designed for growth.
          </Reveal>
          <Reveal as="p" className="lead" delay={120}>
            At QUVit, we provide tailored IT solutions built for growth and reliability —
            guided by our core pillars of Quality, Uniqueness, and Value. From infrastructure
            setup and hardware supply to maintenance, support, and licensing, we cover the
            full picture so you can focus on your business.
          </Reveal>
          <div className="about__points">
            {points.map((p,i) => (
              <Reveal key={p} className="about__point" delay={160 + i*80}>
                <span className="dot"><Icon.check style={{color:"#fff"}}/></span>{p}
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="about__visual" delay={120}>
          <div className="ph"><span className="ph__tag">Team / office photo</span></div>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState(0);
  const svc = SERVICES[active];
  const IconC = Icon[svc.icon];
  return (
    <section className="section services" id="services">
      <div className="wrap">
        <div className="services__head">
          <div>
            <Reveal as="div" className="eyebrow">02 · What we do</Reveal>
            <Reveal as="h2" className="h-1" delay={60} style={{marginTop:18,color:"var(--navy)",maxWidth:"14ch"}}>
              Five services. One complete IT partner.
            </Reveal>
          </div>
          <Reveal as="p" className="lead" delay={120} style={{maxWidth:"34ch"}}>
            Select a service to see how QUVit takes the load off your shoulders.
          </Reveal>
        </div>

        <div className="services__layout">
          <Reveal className="svc-list">
            {SERVICES.map((s,i) => (
              <div key={s.key}
                   className={`svc-item ${i===active ? "active" : ""}`}
                   onClick={() => setActive(i)}
                   onMouseEnter={() => setActive(i)}>
                <span className="svc-item__no">{s.no}</span>
                <span className="svc-item__name">{s.name}</span>
                <Icon.arrow className="svc-item__arrow" style={{width:22,height:22}}/>
              </div>
            ))}
          </Reveal>

          <Reveal className="svc-detail" delay={120}>
            <div className="svc-detail__bg" key={"bg"+active}>{svc.no}</div>
            <div className="svc-detail__icon svc-anim-enter" key={"ic"+active}><IconC /></div>
            <h3 className="svc-anim-enter" key={"h"+active}>{svc.name}</h3>
            <p className="svc-anim-enter" key={"p"+active}>{svc.blurb}</p>
            <div className="svc-detail__tags svc-anim-enter" key={"t"+active}>
              {svc.tags.map(t => <span className="svc-tag" key={t}>{t}</span>)}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Why() {
  const cards = [
    ["spark","Innovation, not complication","We believe IT should empower your team — every solution is designed to simplify, never to get in the way."],
    ["scale","Balanced & cost-efficient","We weigh innovation, cost, and reliability so your IT delivers maximum value without overspending."],
    ["shield","Reliable & secure","Proactive maintenance, compliant licensing, and protection from threats keep you running with confidence."],
  ];
  return (
    <section className="section why" id="why">
      <div className="why__glow"></div>
      <div className="wrap why__inner">
        <Reveal as="div" className="eyebrow on-dark">03 · Why QUVit</Reveal>
        <Reveal as="p" className="why__statement" delay={80} style={{marginTop:22}}>
          Because IT should <b>empower</b>, not complicate.
        </Reveal>
        <Reveal as="p" delay={140} style={{marginTop:24,color:"rgba(255,255,255,.66)",fontSize:19,lineHeight:1.6,maxWidth:"46ch"}}>
          We tailor every solution to your business goals — balancing innovation, cost-efficiency,
          and reliability to help your team perform at its best.
        </Reveal>
        <div className="why__grid">
          {cards.map(([ic,t,d],i) => {
            const IC = Icon[ic];
            return (
              <Reveal key={t} className="why__card" delay={i*100}>
                <div className="ic"><IC /></div>
                <h4>{t}</h4>
                <p>{d}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Clients() {
  const loop = [...CLIENTS, ...CLIENTS];
  return (
    <section className="section clients" id="clients">
      <div className="wrap">
        <div className="clients__head">
          <Reveal as="div" className="eyebrow" style={{justifyContent:"center"}}>04 · Trusted by</Reveal>
          <Reveal as="h2" className="h-1" delay={60} style={{marginTop:16,color:"var(--navy)"}}>
            Teams across industries rely on QUVit.
          </Reveal>
          <Reveal as="p" className="lead" delay={120} style={{textAlign:"center"}}>
            From fintech and education to embassies and healthcare — organizations trust us to keep their technology running.
          </Reveal>
        </div>
      </div>

      <Reveal className="marquee" delay={80}>
        <div className="marquee__track">
          {loop.map((c,i) => (
            <span className="marquee__item" key={i}><span className="dot"></span>{c}</span>
          ))}
        </div>
      </Reveal>

      <div className="wrap">
        <Reveal className="clients__logos" delay={120}>
          {CLIENTS.slice(0,5).map(c => (
            <div className="logo-box" key={c}>{c}</div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <Reveal className="contact__card">
          <div className="contact__grid-ov"></div>
          <div className="contact__inner">
            <div>
              <div className="eyebrow on-dark" style={{color:"rgba(255,255,255,.85)"}}>05 · Find us</div>
              <h2 style={{marginTop:18}}>Let's empower your business together.</h2>
              <p className="contact__sub">
                Tell us where you're headed and we'll build the IT foundation to get you there —
                fast, secure, and future-proof.
              </p>
            </div>
            <div className="contact__actions">
              <a className="contact__btn" href="mailto:hello@quvit-eg.com">
                <span className="contact__btn-ic"><Icon.mail style={{width:22,height:22}}/></span>
                <span><span className="l">Email us</span><span className="v">hello@quvit-eg.com</span></span>
              </a>
              <a className="contact__btn" href="https://linktr.ee/quvit" target="_blank" rel="noopener">
                <span className="contact__btn-ic"><Icon.link style={{width:22,height:22}}/></span>
                <span><span className="l">All links</span><span className="v">linktr.ee/quvit</span></span>
              </a>
              <a className="contact__btn" href="https://linktr.ee/quvit" target="_blank" rel="noopener">
                <span className="contact__btn-ic"><Icon.pin style={{width:22,height:22}}/></span>
                <span><span className="l">Based in</span><span className="v">Egypt · Remote-ready</span></span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    ["Company",[["About","#about"],["Why QUVit","#why"],["Clients","#clients"]]],
    ["Services",[["Infrastructure Setup","#services"],["Hardware Supply","#services"],["Maintenance","#services"],["Support & Help-desk","#services"],["Software Licensing","#services"]]],
  ];
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div>
            <img className="footer__logo" src="assets/logo-white.svg" alt="QUVit"/>
            <p>Empowering business growth through IT solutions — with Quality, Uniqueness, and Value.</p>
          </div>
          {cols.map(([h,links]) => (
            <div className="footer__col" key={h}>
              <h5>{h}</h5>
              {links.map(([l,href]) => <a key={l} href={href}>{l}</a>)}
            </div>
          ))}
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} QUVit. All rights reserved.</span>
          <span>hello@quvit-eg.com · linktr.ee/quvit</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { About, Services, Why, Clients, Contact, Footer });
