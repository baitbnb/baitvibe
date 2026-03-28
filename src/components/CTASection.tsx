const CTASection = () => {
  return (
    <section className="text-center py-28 px-[6vw] relative z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,hsl(var(--gold)/0.07),transparent_60%)]">
      <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-gold mb-5">// Start Writing</p>
      <h2 className="font-display font-extrabold leading-none mb-5" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
        Your Next Tweet is{' '}
        <span className="bg-gradient-to-r from-gold to-cyan bg-clip-text text-transparent">One Click Away.</span>
      </h2>
      <p className="text-base text-muted-foreground mb-10">Stop staring at the blank tweet box. Let AI write your next banger.</p>
      <div className="flex gap-4 justify-center">
        <button className="relative overflow-hidden bg-gradient-to-br from-gold to-[hsl(32,85%,48%)] text-primary-foreground font-bold text-[15px] px-8 py-3.5 rounded-lg shadow-[0_0_30px_hsl(var(--gold)/0.35),0_4px_20px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:shadow-[0_0_50px_hsl(var(--gold)/0.5)] transition-all">
          ✍️ Try YiClaw Free
        </button>
        <button className="text-foreground text-[15px] font-medium px-7 py-3.5 rounded-lg border border-foreground/15 hover:border-cyan hover:text-cyan hover:shadow-[0_0_20px_hsl(var(--cyan)/0.15)] transition-all">
          Read Docs →
        </button>
      </div>
    </section>
  );
};

export default CTASection;
