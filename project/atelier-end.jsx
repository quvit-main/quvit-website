/* QUVit — Atelier: Why + Clients + Contact + Footer */

function AWhy({ tickerSpeed = 0.7 }) {
  const items = [
    ["01","Empower, never complicate","We believe IT should get out of the way. Every solution is designed to simplify the day-to-day for your team."],
    ["02","Balanced by design","We weigh innovation, cost, and reliability together — so your technology delivers value without the overspend."],
    ["03","Reliable & secure","Proactive maintenance, compliant licensing, and real protection keep you running with quiet confidence."],
  ];
  return (
    <section className="section s-paper" id="why">
      <div className="wrap">
        <div className="sec-head">
          <div className="l"><span className="dot"></span><span className="idx">(03)</span><span className="meta">Why QUVit</span></div>
          <span className="meta">The position</span>
        </div>
        <p className="why__statement">
          Because IT should <em>empower</em>,<br/>not complicate.
        </p>
        <div className="why__grid">
          {items.map(([n,t,p]) => (
            <div className="why__item" key={n}>
              <div className="n">{n}</div>
              <h4>{t}</h4>
              <p>{p}</p>
            </div>
          ))}
        </div>

        <Ticker items={["Quality","Uniqueness","Value","Quality","Uniqueness","Value"]} speed={tickerSpeed} className="ticker--about ticker--why" />
      </div>
    </section>
  );
}

function AClients() {
  const list = A_CLIENTS.slice(0, 5);
  const rest = A_CLIENTS.length - 5;
  return (
    <section className="section s-ink" id="clients">
      <div className="wrap">
        <div className="sec-head">
          <div className="l"><span className="dot"></span><span className="idx">(04)</span><span className="meta">Clients</span></div>
          <span className="meta">Trusted across industries</span>
        </div>
        <div className="cli">
          {list.map(([name, sector], i) => (
            <div className="cli__row" key={name} data-cursor>
              <span className="n">{String(i+1).padStart(2,"0")}</span>
              <span className="cli__name display">{name}</span>
              <span className="cli__sector">{sector}</span>
            </div>
          ))}
          <a className="cli__more" href="clients.html" data-cursor>
            <span className="n">{"+" + String(rest).padStart(2,"0")}</span>
            <span className="lbl">View all clients</span>
            <span className="ar">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function AContact() {
  return (
    <section className="contact s-violet" id="contact">
      <div className="wrap">
        <div className="contact__kicker">(05) — Find us</div>
        <h2 className="display">Let's empower your business <em>together.</em></h2>
        <a className="contact__mail" href="https://wa.me/201555182479" target="_blank" rel="noopener noreferrer" data-cursor>
          WhatsApp us <span className="ar">↗</span>
        </a>
        <div className="contact__foot">
          <div className="blk"><b>Email</b><a href="mailto:hello@quvit-eg.com">hello@quvit-eg.com</a></div>
          <div className="blk"><b>Social</b><a href="https://www.linkedin.com/company/quvit-it-solutions" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://www.facebook.com/people/QUVit-IT-Solutions/61576592515884/" target="_blank" rel="noopener noreferrer">Facebook</a></div>
          <div className="blk"><b>Based in</b><a href="https://share.google/LsRInTsoWsZGccwf2" target="_blank" rel="noopener noreferrer">Nasr City, Cairo, Egypt</a></div>
        </div>
      </div>
    </section>
  );
}

function AFooter() {
  const cols = [
    ["Index",[["About","#about"],["Services","#services"],["Why QUVit","#why"],["Clients","#clients"]]],
    ["Services",[["Infrastructure","#services"],["Hardware Supply","#services"],["Maintenance","#services"],["Support","#services"],["Licensing","#services"]]],
    ["Connect",[["LinkedIn","https://www.linkedin.com/company/quvit-it-solutions"],["Facebook","https://www.facebook.com/people/QUVit-IT-Solutions/61576592515884/"],["WhatsApp","https://wa.me/201555182479"],["hello@quvit-eg.com","mailto:hello@quvit-eg.com"]]],
  ];
  return (
    <footer className="footer s-ink">
      <div className="wrap">
        <div className="footer__word">QUVit</div>
        <div className="footer__cols">
          {cols.map(([h,links]) => (
            <div className="footer__col" key={h}>
              <h5>{h}</h5>
              {links.map(([l,href]) => {
                const ext = href.startsWith("http");
                return <a key={l} href={href} {...(ext ? {target:"_blank", rel:"noopener noreferrer"} : {})}>{l}</a>;
              })}
            </div>
          ))}
        </div>
        <div className="footer__legal">
          <span>© 2025 QUVit — Empowering business growth through IT.</span>
          <span>Quality · Uniqueness · Value</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { AWhy, AClients, AContact, AFooter });
