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

          {/* Right — Mini dashboard preview */}
          <div className="animate-slide-in hidden lg:block">
            <div className="bg-card border border-border rounded overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              {/* Tab bar */}
              <div className="flex items-center gap-0 border-b border-border text-[12px] font-medium">
                <div className="px-4 py-2.5 text-primary border-b-2 border-primary bg-primary/5">Write</div>
                <div className="px-4 py-2.5 text-muted-foreground hover:text-foreground transition-colors">Rewrite</div>
                <div className="px-4 py-2.5 text-muted-foreground hover:text-foreground transition-colors">Thread</div>
                <div className="ml-auto px-3 py-2.5 flex items-center gap-1.5 text-bnb-green text-[11px] font-mono-ibm">
                  <span className="w-1.5 h-1.5 bg-bnb-green rounded-full animate-blink" /> AI Ready
                </div>
              </div>

              <div className="p-5">
                {/* Input */}
                <div className="bg-muted/30 border border-border rounded p-3 mb-3">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Your idea</div>
                  <div className="text-[13px] text-foreground/70">We just launched our DeFi protocol on BSC...</div>
                </div>

                {/* Generate */}
                <button className="w-full py-2.5 bg-primary text-primary-foreground font-bold text-[13px] rounded mb-4 hover:bg-primary/90 transition-all">
                  ✨ Generate
                </button>

                {/* Output */}
                <div className="bg-bnb-green/5 border border-bnb-green/15 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono-ibm text-bnb-green uppercase">Generated</span>
                    <span className="text-[10px] font-mono-ibm text-primary">Score: 92</span>
                  </div>
                  <div className="text-[13px] leading-relaxed text-foreground/85">
                    🚀 We didn't fork a protocol.<br />
                    We built one from scratch on @BNBCHAIN.<br /><br />
                    → 10x faster · 80% cheaper<br />
                    → Live now 👇
                  </div>
                </div>

                {/* Bottom stats */}
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {[
                    { v: '267', l: 'Chars' },
                    { v: '92', l: 'Score' },
                    { v: '4.2x', l: 'Est.' },
                  ].map((s) => (
                    <div key={s.l} className="bg-muted/30 rounded py-1.5 text-center">
                      <div className="font-mono-ibm text-xs font-semibold text-foreground">{s.v}</div>
                      <div className="text-[9px] text-muted-foreground">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
