/* QUVit — Atelier: App root + Tweaks */

const A_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#7F00FF",
  "grain": true,
  "cursor": true,
  "tickerSpeed": 0.7
}/*EDITMODE-END*/;

const A_ACCENTS = ["#7F00FF","#9A3BFF","#6A00D6","#121212"];

const GRAIN_URI = "data:image/svg+xml;utf8," + encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
     <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter>
     <rect width='100%' height='100%' filter='url(#n)'/>
   </svg>`);

function AApp() {
  const [t, setTweak] = useTweaks(A_DEFAULTS);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenu(false); };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("native", !t.cursor);
  }, [t.cursor]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  return (
    <React.Fragment>
      {t.cursor && <Cursor />}
      <div className={`grain ${t.grain ? "" : "off"}`}
           style={{backgroundImage:`url("${GRAIN_URI}")`}}></div>

      <ANav open={menu} onToggle={() => setMenu((v) => !v)} />
      <AMobileNav open={menu} onClose={() => setMenu(false)} />

      <main>
        <AHero />
        <AAbout />
        <AServices />
        <AWhy tickerSpeed={t.tickerSpeed} />
        <AClients />
        <AContact />
      </main>
      <AFooter />

      <TweaksPanel>
        <TweakSection label="Signal colour" />
        <TweakColor label="Accent" value={t.accent} options={A_ACCENTS}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSection label="Atmosphere" />
        <TweakToggle label="Film grain" value={t.grain}
          onChange={(v) => setTweak("grain", v)} />
        <TweakToggle label="Custom cursor" value={t.cursor}
          onChange={(v) => setTweak("cursor", v)} />
        <TweakSection label="Motion" />
        <TweakSlider label="Ticker speed" value={t.tickerSpeed} min={0} max={2} step={0.1}
          onChange={(v) => setTweak("tickerSpeed", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AApp />);
