/* QUVit — Atelier: About / Lexicon + Services */

function AAbout() {
  return (
    <section className="section s-paper" id="about">
      <div className="wrap">
        <div className="sec-head">
          <div className="l"><span className="dot"></span><span className="idx">(01)</span><span className="meta">About</span></div>
          <span className="meta">QUVit — IT, considered</span>
        </div>

        <div className="about__top">
          <p className="about__lead">
            We empower businesses with IT designed for <em>growth</em> and reliability.
          </p>
          <div>
            <p className="about__note">
              QUVit provides end-to-end IT — from infrastructure setup and hardware supply to
              maintenance, support, and licensing. We cover the full picture, so technology stops
              being a problem to manage and becomes an advantage to use.
            </p>
            <p className="about__note">
              The name is a promise, spelled out. Three letters that decide everything we build.
            </p>
          </div>
        </div>

        <div className="lex">
          {A_LEX.map((e) => (
            <div className="lex__row" key={e.L} data-cursor>
              <div className="lex__big">{e.L}</div>
              <div>
                <div className="lex__head">
                  <span className="lex__word">{e.word}</span>
                  <span className="lex__ipa">{e.ipa}</span>
                  <span className="lex__pos">{e.pos}</span>
                </div>
                <p className="lex__def" dangerouslySetInnerHTML={{__html:e.def}}></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AServices() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section s-ink" id="services">
      <div className="wrap">
        <div className="sec-head">
          <div className="l"><span className="dot"></span><span className="idx">(02)</span><span className="meta">Services</span></div>
          <span className="meta">Five disciplines — one partner</span>
        </div>

        <div className="svc">
          {A_SERVICES.map((s, i) => {
            const isOpen = open === i;
            return (
              <div className={`svc__row ${isOpen ? "open" : ""}`} key={s.no}>
                <button className="svc__bar" data-cursor
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}>
                  <span className="svc__no">{s.no}</span>
                  <span className="svc__name display">{s.name}</span>
                  <span className="svc__plus" aria-hidden="true"></span>
                </button>
                {isOpen && (
                  <div className="svc__panel">
                    <p className="blurb" dangerouslySetInnerHTML={{__html:s.blurb}}></p>
                    <div className="svc__tags">
                      {s.tags.map(t => <span className="svc__tag" key={t}>{t}</span>)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AAbout, AServices });
