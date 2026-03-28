import heroBanner from "@/assets/hero-banner.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      {/* BG gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,hsl(43_96%_56%/0.08),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
          {/* Left */}
          <div>
            {/* Badge */}
            <div className="animate-fade-up inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-sm px-3 py-1 font-mono-ibm text-[11px] text-primary tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 bg-bnb-green rounded-full animate-blink" />
              Live on BNB Chain
            </div>

            <h1 className="animate-fade-up-1 font-display font-black leading-[1.05] tracking-tight mb-5" style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}>
              AI Tweet Writer
              <br />
              <span className="text-primary">for Web3.</span>
            </h1>

            <p className="animate-fade-up-2 text-muted-foreground text-base leading-relaxed max-w-[420px] mb-8">
              Generate viral tweets, rewrite drafts, build threads — in seconds. Built for crypto builders who ship.
            </p>

            <div className="animate-fade-up-3 flex gap-3 items-center mb-12">
              <button className="bg-primary text-primary-foreground font-bold text-sm px-7 py-3 rounded hover:bg-primary/90 shadow-[0_0_30px_hsl(43_96%_56%/0.2)] hover:shadow-[0_0_50px_hsl(43_96%_56%/0.35)] transition-all">
                Start Writing — Free
              </button>
              <button className="text-foreground text-sm font-medium px-6 py-3 rounded border border-border hover:border-primary/40 hover:text-primary transition-all">
                View Demo →
              </button>
            </div>

            {/* Stats bar */}
            <div className="animate-fade-up-4 flex gap-8">
              {[
                { val: '2.4M+', lbl: 'Tweets Generated' },
                { val: '18.4K', lbl: 'Active Users' },
                { val: '4.2x', lbl: 'Avg Engagement' },
              ].map((s) => (
                <div key={s.lbl}>
                  <span className="font-mono-ibm text-xl font-bold text-primary block">{s.val}</span>
                  <span className="text-[11px] text-muted-foreground uppercase tracking-wider">{s.lbl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Banner preview */}
          <div className="animate-slide-in hidden lg:block">
            <div className="rounded overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-border">
              <img src={heroBanner} alt="BAIT AI Tweet Writer Preview" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
