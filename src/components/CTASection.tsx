const CTASection = () => {
  return (
    <section className="relative z-10 py-24 px-6 lg:px-10">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,hsl(43_96%_56%/0.06),transparent_70%)]">
          <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-primary mb-4">// Get Started</p>

          <h2 className="font-display font-black leading-[1.1] mb-5" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            Your Next Viral Tweet
            <br />
            <span className="text-primary">is One Click Away.</span>
          </h2>

          <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
            Stop staring at the blank tweet box. 18,400+ builders already use BAIT to ship content that hits.
          </p>

          <div className="flex gap-3 justify-center">
            <button className="bg-primary text-primary-foreground font-bold text-sm px-8 py-3 rounded hover:bg-primary/90 shadow-[0_0_30px_hsl(43_96%_56%/0.2)] hover:shadow-[0_0_50px_hsl(43_96%_56%/0.35)] transition-all">
              Start Writing — Free
            </button>
            <button className="text-foreground text-sm font-medium px-6 py-3 rounded border border-border hover:border-primary/40 hover:text-primary transition-all">
              Read Docs →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
