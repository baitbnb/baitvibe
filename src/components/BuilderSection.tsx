const BuilderSection = () => {
  return (
    <section id="rewrite" className="py-24 px-[6vw] relative z-10 bg-bg-3">
      <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-cyan mb-3">// AI Rewriter</p>
      <h2 className="font-display font-extrabold leading-tight mb-4" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
        Rewrite Anything.<br />Sound Like a Pro.
      </h2>
      <p className="text-muted-foreground text-base max-w-[480px] leading-relaxed">
        Paste your boring tweet. YiClaw rewrites it with the style of top Web3 builders — viral, witty, or thought-leader mode.
      </p>

      {/* Rewriter mockup */}
      <div className="mt-16 grid grid-cols-2 max-md:grid-cols-1 border border-border rounded-2xl overflow-hidden shadow-[0_0_80px_hsl(var(--cyan)/0.06),0_40px_100px_rgba(0,0,0,0.5)]">
        {/* Before panel */}
        <div className="bg-bg-2 p-6 border-r border-border max-md:border-r-0 max-md:border-b">
          <div className="text-[13px] font-semibold text-muted-foreground mb-5 flex items-center gap-2">
            <span className="text-yi-red text-[10px]">◆</span> Original Tweet
          </div>

          <div className="bg-foreground/[0.04] border border-border rounded-[10px] px-4 py-4 text-[14px] leading-relaxed text-muted-foreground mb-4">
            We launched a new protocol on BNB chain. It's very fast and cheap. Try it out and let us know what you think. Link below.
          </div>

          <div className="flex gap-2 flex-wrap mb-4">
            <span className="font-mono-ibm text-[10px] px-2.5 py-1 rounded-full bg-yi-red/10 border border-yi-red/30 text-yi-red">Score: 23/100</span>
            <span className="font-mono-ibm text-[10px] px-2.5 py-1 rounded-full bg-foreground/5 border border-border text-muted-foreground">No hook</span>
            <span className="font-mono-ibm text-[10px] px-2.5 py-1 rounded-full bg-foreground/5 border border-border text-muted-foreground">No structure</span>
            <span className="font-mono-ibm text-[10px] px-2.5 py-1 rounded-full bg-foreground/5 border border-border text-muted-foreground">Weak CTA</span>
          </div>

          <div className="text-[11px] text-muted-foreground mb-3 font-mono-ibm">Select style:</div>
          <div className="flex gap-2 flex-wrap">
            {['🔥 Viral', '🧠 Thought Leader', '😂 Witty', '📢 Hype'].map((style, i) => (
              <button key={style} className={`text-[11px] px-3 py-1.5 rounded-full border transition-all ${i === 0 ? 'bg-gold/15 border-gold/40 text-gold' : 'border-border text-muted-foreground'}`}>
                {style}
              </button>
            ))}
          </div>

          <button className="w-full mt-4 py-3 bg-gradient-to-br from-gold to-[hsl(32,85%,48%)] rounded-lg text-primary-foreground font-bold text-sm shadow-[0_0_20px_hsl(var(--gold)/0.3)]">
            ⚡ Rewrite with AI
          </button>
        </div>

        {/* After panel */}
        <div className="bg-bg-deep/95 p-6">
          <div className="text-[13px] font-semibold text-muted-foreground mb-5 flex items-center gap-2">
            <span className="text-yi-green text-[10px]">◆</span> Rewritten by YiClaw
          </div>

          <div className="bg-cyan/[0.04] border border-cyan/15 rounded-[10px] px-4 py-4 text-[14px] leading-relaxed mb-4">
            <span className="text-foreground">We didn't fork a protocol.</span><br />
            <span className="text-foreground">We built one from scratch on @BNBCHAIN.</span><br /><br />
            <span className="text-foreground">🔹 Sub-second finality</span><br />
            <span className="text-foreground">🔹 80% cheaper than any competitor</span><br />
            <span className="text-foreground">🔹 Fully composable with PancakeSwap V4</span><br /><br />
            <span className="text-foreground">The best part? It's live right now.</span><br /><br />
            <span className="text-foreground">Try it → link in bio</span><br />
            <span className="text-foreground">RT if you're bullish on BSC DeFi 🔥</span>
          </div>

          <div className="flex gap-1.5 flex-wrap mb-4">
            {['Viral Style', 'Strong Hook', 'Clear CTA', 'Formatted', 'Engagement Bait'].map((tag) => (
              <span key={tag} className="font-mono-ibm text-[10px] px-2.5 py-1 rounded-full bg-yi-green/10 border border-yi-green/30 text-yi-green">{tag}</span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { val: '92/100', lbl: 'Viral Score' },
              { val: '~4.2x', lbl: 'Engagement Est.' },
              { val: '280', lbl: 'Characters' },
            ].map((s) => (
              <div key={s.lbl} className="bg-foreground/[0.03] rounded-lg py-2">
                <div className="font-mono-ibm text-sm font-semibold text-yi-green">{s.val}</div>
                <div className="text-[10px] text-muted-foreground">{s.lbl}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-4 text-[12px]">
            <button className="flex-1 py-2.5 bg-gold/10 border border-gold/30 rounded-lg text-gold font-semibold hover:bg-gold/20 transition-all">📋 Copy Tweet</button>
            <button className="flex-1 py-2.5 border border-border rounded-lg text-muted-foreground hover:text-foreground transition-all">🔄 Try Another Style</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderSection;
