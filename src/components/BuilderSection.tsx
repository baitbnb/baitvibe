const BuilderSection = () => {
  return (
    <section id="rewrite" className="py-20 px-6 lg:px-10 relative z-10 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-primary mb-2">// Live Demo</p>
        <h2 className="font-display font-black text-3xl md:text-4xl leading-tight mb-3">
          Before & After <span className="text-primary">Rewrite</span>
        </h2>
        <p className="text-muted-foreground text-sm max-w-[440px] mb-12">
          See how BAIT transforms a basic tweet into engagement gold.
        </p>

        <div className="grid md:grid-cols-2 gap-px bg-border rounded overflow-hidden">
          {/* Before */}
          <div className="bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono-ibm text-[10px] tracking-wider uppercase text-destructive">Before</span>
              <span className="font-mono-ibm text-[11px] px-2 py-0.5 rounded bg-destructive/10 text-destructive border border-destructive/20">Score: 23</span>
            </div>

            <div className="bg-muted/30 border border-border rounded p-4 text-[14px] leading-relaxed text-muted-foreground mb-4">
              We launched a new protocol on BNB chain. It's very fast and cheap. Try it out and let us know what you think. Link below.
            </div>

            <div className="flex gap-1.5 flex-wrap">
              {['No hook', 'No structure', 'Weak CTA'].map((tag) => (
                <span key={tag} className="font-mono-ibm text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">{tag}</span>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono-ibm text-[10px] tracking-wider uppercase text-bnb-green">After — BAIT</span>
              <span className="font-mono-ibm text-[11px] px-2 py-0.5 rounded bg-bnb-green/10 text-bnb-green border border-bnb-green/20">Score: 92</span>
            </div>

            <div className="bg-bnb-green/5 border border-bnb-green/10 rounded p-4 text-[14px] leading-relaxed text-foreground/90 mb-4">
              We didn't fork a protocol.<br />
              We built one from scratch on @BNBCHAIN.<br /><br />
              🔹 Sub-second finality<br />
              🔹 80% cheaper than competitors<br />
              🔹 Fully composable with PancakeSwap V4<br /><br />
              Live now. Try it → link in bio<br />
              RT if you're bullish on BSC DeFi 🔥
            </div>

            <div className="flex gap-1.5 flex-wrap">
              {['Strong Hook', 'Formatted', 'Clear CTA', 'Engagement Bait'].map((tag) => (
                <span key={tag} className="font-mono-ibm text-[10px] px-2 py-0.5 rounded bg-bnb-green/10 text-bnb-green border border-bnb-green/20">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-px bg-border mt-px rounded-b overflow-hidden">
          {[
            { val: '23 → 92', lbl: 'Viral Score', color: 'text-bnb-green' },
            { val: '4.2x', lbl: 'Engagement Boost', color: 'text-primary' },
            { val: '3 sec', lbl: 'Rewrite Time', color: 'text-foreground' },
            { val: '280', lbl: 'Characters', color: 'text-muted-foreground' },
          ].map((s) => (
            <div key={s.lbl} className="bg-card p-4 text-center">
              <div className={`font-mono-ibm text-lg font-bold ${s.color}`}>{s.val}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuilderSection;
