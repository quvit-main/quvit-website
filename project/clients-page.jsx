/* QUVit — Dedicated Clients page */
const { useEffect } = React;

const BACK = "QUVit Landing Page.html#clients";

/* Building/company icon (data-URI SVG) used as a placeholder for clients
   whose real logo hasn't been supplied yet. Ink line-art on the light plate. */
function buildingIcon() {
  const svg =
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120' fill='none' " +
  "stroke='#2b2b2b' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'>" +
  "<path d='M22 96V40l24-12 24 12v56'/>" +
  "<path d='M70 96V56l28 0v40'/>" +
  "<path d='M14 96h92'/>" +
  "<path d='M34 48h6M52 48h6M34 64h6M52 64h6M34 80h6M52 80h6'/>" +
  "<path d='M80 68h8M80 82h8'/>" +
  "<path d='M46 16v12'/>" +
  "<circle cx='46' cy='13' r='3' fill='#7F00FF' stroke='none'/>" +
  "</svg>";
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

function CPTopbar() {
  return (
    <div className="ap-topbar">
      <a className="ap-back" href={BACK} data-cursor>
        <span className="ar">←</span><span>Back to site</span>
      </a>
      <a href={BACK} aria-label="QUVit"><img className="nav__logo" src="assets/logo-nav-white.svg" alt="QUVit" /></a>
    </div>);

}

function ClientsCarousel() {
  const track = React.useRef(null);
  const [idx, setIdx] = React.useState(0);
  const [prog, setProg] = React.useState(0);
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(false);

  const step = () => {
    const t = track.current;if (!t) return 380;
    const slide = t.querySelector(".cp-slide");
    const gap = parseFloat(getComputedStyle(t).columnGap || getComputedStyle(t).gap || "24");
    return slide ? slide.getBoundingClientRect().width + gap : 380;
  };

  const onScroll = () => {
    const t = track.current;if (!t) return;
    const max = t.scrollWidth - t.clientWidth;
    setProg(max > 0 ? t.scrollLeft / max : 0);
    setIdx(Math.round(t.scrollLeft / step()));
    setAtStart(t.scrollLeft <= 2);
    setAtEnd(t.scrollLeft >= max - 2);
  };

  React.useEffect(() => {onScroll();}, []);

  // self-driven smooth scroll (native smooth-scroll is unreliable in some embeds)
  const anim = React.useRef(0);
  const animateTo = (targetRaw) => {
    const t = track.current;if (!t) return;
    const max = t.scrollWidth - t.clientWidth;
    const target = Math.max(0, Math.min(targetRaw, max));
    cancelAnimationFrame(anim.current);
    const start = t.scrollLeft,dist = target - start,dur = 460;
    const t0 = performance.now();
    const ease = (p) => 1 - Math.pow(1 - p, 3);
    let done = false;
    const frame = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      t.scrollLeft = start + dist * ease(p);
      if (p < 1) anim.current = requestAnimationFrame(frame);else done = true;
    };
    anim.current = requestAnimationFrame(frame);
    // safety: if frames are throttled (hidden/embedded), force-land the target
    setTimeout(() => {if (!done && Math.abs(t.scrollLeft - target) > 1) t.scrollLeft = target;}, dur + 140);
  };

  const go = (dir) => {
    const t = track.current;if (!t) return;
    const s = step();
    const count = t.querySelectorAll(".cp-slide").length;
    const max = t.scrollWidth - t.clientWidth;
    const cur = Math.round(t.scrollLeft / s);
    let next = cur + dir;
    // loop: past the last → first; before the first → last
    if (next > count - 1 || dir > 0 && t.scrollLeft >= max - 2) next = 0;else
    if (next < 0) next = count - 1;
    animateTo(next === 0 ? 0 : next * s);
  };

  // drag-to-scroll
  React.useEffect(() => {
    const t = track.current;if (!t) return;
    let down = false,startX = 0,startLeft = 0,moved = false;
    const dn = (e) => {down = true;moved = false;startX = e.clientX;startLeft = t.scrollLeft;t.classList.add("dragging");t.setPointerCapture && t.setPointerCapture(e.pointerId);};
    const mv = (e) => {if (!down) return;const dx = e.clientX - startX;if (Math.abs(dx) > 4) moved = true;t.scrollLeft = startLeft - dx;};
    const up = (e) => {if (!down) return;down = false;t.classList.remove("dragging");if (moved) {animateTo(Math.round(t.scrollLeft / step()) * step());}};
    t.addEventListener("pointerdown", dn);
    t.addEventListener("pointermove", mv);
    window.addEventListener("pointerup", up);
    return () => {t.removeEventListener("pointerdown", dn);t.removeEventListener("pointermove", mv);window.removeEventListener("pointerup", up);};
  }, []);

  // keyboard
  React.useEffect(() => {
    const k = (e) => {if (e.key === "ArrowLeft") go(-1);if (e.key === "ArrowRight") go(1);};
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  return (
    <div className="cp-carousel">
      <div className="cp-track" ref={track} onScroll={onScroll}>
        {A_CLIENTS.map(([name, sector, logo], i) =>
        <div className="cp-slide" key={name}>
            <div className={"cp-slide__slot" + (logo ? "" : " is-icon") + (/^(Sylndr|QNBeyond)/.test(name) ? " is-wide" : "")}>
              <img className="cp-slide__logo" src={logo || buildingIcon()} alt={name + " logo"} />
            </div>
            <div className="cp-slide__foot">
              <div className="cp-slide__no">{String(i + 1).padStart(2, "0")}</div>
              <div className="cp-slide__name">{name}</div>
              <div className="cp-slide__sector">{sector}</div>
            </div>
          </div>
        )}
      </div>

      <div className="cp-controls">
        <div className="cp-arrows">
          <button className="cp-arrow" data-cursor onClick={() => go(-1)} aria-label="Previous">←</button>
          <button className="cp-arrow" data-cursor onClick={() => go(1)} aria-label="Next">→</button>
        </div>
      </div>
    </div>);

}

function ClientsPage() {
  return (
    <React.Fragment>
      {window.Cursor ? <Cursor /> : null}
      <CPTopbar />

      <main className="s-ink">
        <section className="cp-hero wrap">
          <div className="kick"><span className="dot"></span><span className="idx">(04)</span><span className="meta">Clients</span></div>
          <h1 className="display">Trusted across <em>industries.</em></h1>
          <p className="sub">From e-commerce and banking to embassies, education, and healthcare — organizations rely on QUVit to keep their technology running.



          </p>
        </section>

        <section className="wrap">
          <ClientsCarousel />
        </section>

        <section className="ap-cta wrap">
          <h3 className="display">Become our next <em>partner.</em></h3>
          <a className="ap-back" href={BACK} data-cursor>
            <span className="ar">←</span><span>Back to site</span>
          </a>
        </section>
      </main>
    </React.Fragment>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<ClientsPage />);