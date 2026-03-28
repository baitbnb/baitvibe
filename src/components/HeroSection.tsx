const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center px-[6vw] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,hsl(var(--gold)/0.1),transparent_60%),radial-gradient(ellipse_60%_80%_at_80%_80%,hsl(var(--cyan)/0.08),transparent_50%),radial-gradient(ellipse_40%_40%_at_20%_60%,hsl(var(--gold)/0.06),transparent_50%)]" />
      </div>

      {/* Spinning orb */}
      <div className="absolute right-[-10vw] top-1/2 w-[65vw] h-[65vw] rounded-full animate-spin-slow hidden md:block"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0%, hsl(30 55% 65% / 0.06) 20%, transparent 40%, hsl(260 40% 75% / 0.05) 60%, transparent 80%)',
          transform: 'translateY(-50%)',
        }}
      />

      {/* Tweet emoji art */}
      <div className="absolute right-[5vw] top-1/2 text-[20vw] opacity-[0.08] pointer-events-none animate-float hidden md:block"
        style={{ transform: 'translateY(-50%)' }}>
        ✍️
      </div>

      <div className="relative z-10 max-w-[55%] max-md:max-w-full">
        {/* Tag */}
        <div className="animate-fade-up inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 font-mono-ibm text-[11px] text-gold tracking-[2px] uppercase mb-7">
          <span className="text-cyan text-[8px] animate-blink">●</span>
          Powered by BAIT · AI Tweet Writer
        </div>

        {/* Title */}
        <h1 className="animate-fade-up-1 font-display font-extrabold leading-[0.92] mb-6" style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}>
          <span className="block text-foreground">Write Tweets</span>
          <span className="block bg-gradient-to-r from-gold via-gold-light to-cyan bg-clip-text text-transparent">Like a Pro.</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up-2 text-[17px] text-muted-foreground leading-relaxed max-w-[440px] mb-10">
          AI-powered tweet writer built for Web3 builders. Rewrite, generate, and craft viral threads — in seconds, not hours.
        </p>

        {/* Actions */}
        <div className="animate-fade-up-3 flex gap-4 items-center">
          <button className="relative overflow-hidden bg-gradient-to-br from-gold to-[hsl(30,40%,48%)] text-primary-foreground font-bold text-[15px] px-8 py-3.5 rounded-lg shadow-[0_0_30px_hsl(var(--gold)/0.35),0_4px_20px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:shadow-[0_0_50px_hsl(var(--gold)/0.5),0_8px_30px_rgba(0,0,0,0.5)] transition-all">
            ✍️ Start Writing Free
          </button>
          <button className="text-foreground text-[15px] font-medium px-7 py-3.5 rounded-lg border border-foreground/15 hover:border-cyan hover:text-cyan hover:shadow-[0_0_20px_hsl(var(--cyan)/0.15)] transition-all">
            See Examples →
          </button>
        </div>

        {/* Stats */}
        <div className="animate-fade-up-4 flex gap-10 mt-14">
          {[
            { val: '2.4M+', lbl: 'Tweets Generated' },
            { val: '18,400', lbl: 'Active Builders' },
            { val: '4.2x', lbl: 'Avg. Engagement Boost' },
          ].map((s) => (
            <div key={s.lbl}>
              <span className="font-mono-ibm text-[26px] font-semibold text-gold block">{s.val}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
