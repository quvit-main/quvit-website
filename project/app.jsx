/* QUVit — App root + Tweaks */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#7F00FF",
  "displayFont": "Josefin Sans",
  "corners": "rounded",
  "heroNetwork": true
}/*EDITMODE-END*/;

const ACCENT_OPTS = ["#7F00FF","#00CFC1","#0A1F44","#5B3DF0"];
const SECONDARY_FOR = { "#7F00FF":"#00CFC1", "#00CFC1":"#7F00FF", "#0A1F44":"#00CFC1", "#5B3DF0":"#00CFC1" };
const RADII = { rounded:["10px","18px","28px"], soft:["6px","12px","18px"], sharp:["0px","2px","4px"] };

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--accent", t.accent);
    r.setProperty("--accent-2", SECONDARY_FOR[t.accent] || "#00CFC1");
    r.setProperty("--font-display", `"${t.displayFont}", system-ui, sans-serif`);
    const rr = RADII[t.corners] || RADII.rounded;
    r.setProperty("--r-sm", rr[0]); r.setProperty("--r-md", rr[1]); r.setProperty("--r-lg", rr[2]);
  }, [t]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  return (
    <React.Fragment>
      <Nav onMenu={() => setMenu(true)} />
      <MobileNav open={menu} onClose={() => setMenu(false)} />
      <main>
        <Hero network={t.heroNetwork} />
        <Pillars />
        <About />
        <Services />
        <Why />
        <Clients />
        <Contact />
      </main>
      <Footer />

      <TweaksPanel>
        <TweakSection label="Brand accent" />
        <TweakColor label="Accent" value={t.accent} options={ACCENT_OPTS}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSection label="Typography" />
        <TweakRadio label="Display font" value={t.displayFont}
          options={["Josefin Sans","Cairo"]}
          onChange={(v) => setTweak("displayFont", v)} />
        <TweakSection label="Shape" />
        <TweakRadio label="Corners" value={t.corners}
          options={["rounded","soft","sharp"]}
          onChange={(v) => setTweak("corners", v)} />
        <TweakSection label="Hero" />
        <TweakToggle label="Animated network" value={t.heroNetwork}
          onChange={(v) => setTweak("heroNetwork", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
