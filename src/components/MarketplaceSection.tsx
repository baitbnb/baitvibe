const threadSteps = [
  { num: '01', text: '🧵 We spent 6 months building a DeFi protocol from scratch on BSC. Here\'s everything we learned:', type: 'HOOK' },
  { num: '02', text: 'The biggest mistake? Chasing narratives instead of solving real problems. We focused on one thing: sub-second finality with 80% lower fees.', type: 'INSIGHT' },
  { num: '03', text: 'Technical breakthrough: AMM redesigned from first principles.\n→ No sandwich attacks\n→ MEV-protected\n→ Full PancakeSwap V4 composability', type: 'DETAILS' },
  { num: '04', text: 'Results after 30 days:\n📊 $2.1M TVL · 847 users · 12K+ txns\n💰 $0.002 avg gas · All organic.', type: 'PROOF' },
  { num: '05', text: 'Building in Web3? Remember:\n1. Ship fast, iterate faster\n2. UX > Tech\n3. Community > Marketing\n\nFollow for updates 👇', type: 'CTA' },
];

const MarketplaceSection = () => {
  return (
    <section id="threads" className="py-20 px-6 lg:px-10 relative z-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-primary mb-2">// Thread Builder</p>
          <h2 className="font-display font-black text-3xl md:text-4xl leading-tight">
            One Idea → <span className="text-primary">Viral Thread</span>
          </h2>
        </div>

        {/* Thread preview */}
        <div className="space-y-0">
          {threadSteps.map((step, i) => (
            <div key={i} className="flex gap-4 group">
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-mono-ibm text-primary font-bold">{step.num}</span>
                </div>
                {i < threadSteps.length - 1 && <div className="w-px flex-1 bg-border" />}
              </div>

              {/* Content */}
              <div className="pb-4 flex-1">
                <div className="bg-card border border-border rounded p-4 hover:border-primary/20 transition-colors">
                  <span className="inline-block font-mono-ibm text-[9px] tracking-wider uppercase px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/15 mb-2">{step.type}</span>
                  <p className="text-[13px] leading-relaxed whitespace-pre-line text-foreground/85">{step.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button className="flex-1 py-3 bg-primary text-primary-foreground font-bold text-[13px] rounded hover:bg-primary/90 transition-all">
            📋 Copy All Tweets
          </button>
          <button className="flex-1 py-3 border border-border text-muted-foreground font-medium text-[13px] rounded hover:border-primary/40 hover:text-primary transition-all">
            🔄 Regenerate
          </button>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
