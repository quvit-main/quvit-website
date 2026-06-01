/* QUVit — Dedicated About page */
const { useState, useEffect } = React;

const BACK = "QUVit Landing Page.html#about";

function APTopbar() {
  return (
    <div className="ap-topbar">
      <a className="ap-back" href={BACK} data-cursor>
        <span className="ar">←</span><span>Back to site</span>
      </a>
      <a href={BACK} aria-label="QUVit"><img className="nav__logo" src="assets/logo-nav-white.svg" alt="QUVit" /></a>
    </div>
  );
}

function AboutPage() {
  return (
    <React.Fragment>
      {window.Cursor ? <Cursor /> : null}
      <APTopbar />

      <main className="s-ink">
        <section className="ap-hero wrap">
          <div className="kick"><span className="dot"></span><span className="idx">(01)</span><span className="meta">About QUVit</span></div>
          <h1 className="display">IT, <em>considered.</em></h1>
        </section>

        <section className="wrap">
          <div className="ap-narr">
            <p className="ap-narr__lead">
              We empower businesses with IT designed for <em>growth</em> and reliability.
            </p>
            <div className="ap-narr__body">
              <p>
                QUVit provides <b>end-to-end IT</b> — from infrastructure setup and hardware supply
                to maintenance, support, and licensing. We cover the full picture, so technology
                stops being a problem to manage and becomes an advantage to use.
              </p>
              <p>
                Most businesses don't want to think about servers, cabling, licences, or help-desk
                tickets — they want to get on with their work. Our role is to make all of that quiet
                and dependable: <b>set up properly, maintained proactively, supported quickly.</b>
              </p>
              <p>
                We weigh innovation, cost, and reliability together on every engagement, so the
                technology you invest in returns something real — <b>measured in uptime, in focus,
                and in the freedom to grow.</b>
              </p>
              <p>
                The name is a promise, spelled out. Three letters that decide everything we build —
                and they're worth defining precisely.
              </p>
            </div>
          </div>
        </section>

        <section className="ap-lex wrap">
          <div className="sec-head">
            <div className="l"><span className="dot"></span><span className="meta">The QUV promise</span></div>
            <span className="meta">Quality · Uniqueness · Value</span>
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
        </section>

        <section className="ap-cta wrap">
          <h3 className="display">Ready when <em>you</em> are.</h3>
          <a className="ap-back" href={BACK} data-cursor>
            <span className="ar">←</span><span>Back to site</span>
          </a>
        </section>
      </main>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AboutPage />);
