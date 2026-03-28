const threadSteps = [
  {
    num: '1/5',
    text: '🧵 We spent 6 months building a DeFi protocol from scratch on BSC. Here\'s everything we learned about building in a bear market:',
    type: 'Hook',
  },
  {
    num: '2/5',
    text: 'The biggest mistake builders make? Chasing narratives instead of solving real problems.\n\nWe focused on one thing: sub-second finality with 80% lower fees. That\'s it.',
    type: 'Insight',
  },
  {
    num: '3/5',
    text: 'Technical breakthrough: we redesigned the AMM from first principles.\n\n→ No more sandwich attacks\n→ MEV-protected by default\n→ Full composability with @PancakeSwap V4',
    type: 'Details',
  },
  {
    num: '4/5',
    text: 'The results after 30 days live:\n\n📊 $2.1M TVL\n📈 847 unique users\n⚡ 12,000+ transactions\n💰 $0.002 avg. gas fee\n\nAll organic. Zero incentives.',
    type: 'Proof',
  },
  {
    num: '5/5',
    text: 'If you\'re building in Web3 right now, remember:\n\n1. Ship fast, iterate faster\n2. Users care about UX, not tech\n3. Community > Marketing\n\nWe\'re just getting started. Follow for updates 👇',
    type: 'CTA',
  },
];

const MarketplaceSection = () => {
  return (
    <section id="threads" className="py-24 px-[6vw] relative z-10">
      <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-cyan mb-3">// Thread Builder</p>
      <h2 className="font-display font-extrabold leading-tight mb-4" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
        Build Viral Threads.
      </h2>
      <p className="text-muted-foreground text-base max-w-[480px] leading-relaxed">
        Turn one idea into a perfectly structured Twitter thread. BAIT AI writes hooks, insights, and CTAs that drive engagement.
      </p>

      <div className="mt-16 max-w-[640px] mx-auto">
        <div className="bg-foreground/[0.03] border border-border rounded-xl p-4 mb-4">
          <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-2">Thread topic</div>
          <div className="text-[14px] text-foreground/70">"Our journey building a DeFi protocol on BSC in a bear market"</div>
        </div>

        <div className="flex gap-2 mb-6">
          <button className="text-[12px] px-3 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold">5 tweets</button>
          <button className="text-[12px] px-3 py-1.5 rounded-full border border-border text-muted-foreground">7 tweets</button>
          <button className="text-[12px] px-3 py-1.5 rounded-full border border-border text-muted-foreground">10 tweets</button>
        </div>

        <div className="space-y-0">
          {threadSteps.map((step, i) => (
            <div key={i} className="relative pl-8 pb-6">
              {i < threadSteps.length - 1 && (
                <div className="absolute left-[11px] top-8 bottom-0 w-px bg-gradient-to-b from-gold/40 to-gold/10" />
              )}
              <div className="absolute left-0 top-1 w-[23px] h-[23px] rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center">
                <span className="text-[9px] font-mono-ibm text-gold font-bold">{step.num}</span>
              </div>
              <div className="bg-foreground/[0.03] border border-border rounded-xl p-4 hover:border-gold/20 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono-ibm text-[10px] px-2 py-0.5 rounded bg-cyan/10 border border-cyan/20 text-cyan">{step.type}</span>
                </div>
                <div className="text-[13px] leading-relaxed whitespace-pre-line">{step.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-2">
          <button className="flex-1 py-3 bg-gradient-to-br from-gold to-[hsl(30,40%,48%)] rounded-lg text-primary-foreground font-bold text-sm shadow-[0_0_20px_hsl(var(--gold)/0.3)]">
            📋 Copy All Tweets
          </button>
          <button className="flex-1 py-3 border border-border rounded-lg text-muted-foreground font-semibold text-sm hover:border-cyan hover:text-cyan transition-all">
            🔄 Regenerate Thread
          </button>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
