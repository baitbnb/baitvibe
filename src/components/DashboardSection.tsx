const DashboardSection = () => {
  return (
    <section id="writer" className="py-24 px-[6vw] relative z-10">
      <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-cyan mb-3">// AI Tweet Writer</p>
      <h2 className="font-display font-extrabold leading-tight mb-4" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
        Your Tweet Command Center
      </h2>
      <p className="text-muted-foreground text-base max-w-[480px] leading-relaxed">
        Paste an idea, pick a style, and let YiClaw craft the perfect tweet. Rewrite drafts, generate from scratch, or build threads.
      </p>

      {/* Writer mockup */}
      <div className="mt-16 border border-border rounded-2xl overflow-hidden shadow-[0_0_80px_hsl(var(--gold)/0.08),0_40px_100px_rgba(0,0,0,0.6)]">
        {/* Title bar */}
        <div className="flex items-center bg-bg-3 text-muted-foreground font-mono-ibm text-xs px-5 py-3 border-b border-border">
          YiClaw Writer — powered by OpenCLAW
        </div>

        <div className="grid grid-cols-[220px_1fr] max-md:grid-cols-1 min-h-[550px] bg-bg-2">
          {/* Sidebar */}
          <div className="bg-bg-deep/90 border-r border-border py-6 max-md:hidden">
            <div className="font-display text-xl font-extrabold bg-gradient-to-r from-gold to-cyan bg-clip-text text-transparent px-5 pb-5 border-b border-border mb-4">
              YiClaw
            </div>
            {[
              { icon: '✍️', label: 'Write Tweet', active: true },
              { icon: '🔄', label: 'Rewrite' },
              { icon: '🧵', label: 'Thread Builder' },
              { icon: '📊', label: 'Analytics' },
            ].map((item) => (
              <div key={item.label} className={`flex items-center gap-3 px-5 py-2.5 text-[13px] transition-all ${item.active ? 'text-foreground bg-gold/[0.07] border-r-2 border-gold' : 'text-muted-foreground hover:text-foreground hover:bg-gold/[0.04]'}`}>
                <span className="w-5 text-center">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}

            <div className="font-mono-ibm text-[10px] tracking-[2px] text-muted-foreground/50 uppercase px-5 pt-4 pb-1.5">Styles</div>
            {['🔥 Viral', '🧠 Thought Leader', '😂 Witty'].map((item) => (
              <div key={item} className="flex items-center gap-3 px-5 py-2.5 text-[13px] text-muted-foreground hover:text-foreground transition-all">
                {item}
              </div>
            ))}

            <div className="font-mono-ibm text-[10px] tracking-[2px] text-muted-foreground/50 uppercase px-5 pt-4 pb-1.5">History</div>
            {['📝 Recent Tweets', '⭐ Saved Drafts'].map((item) => (
              <div key={item} className="flex items-center gap-3 px-5 py-2.5 text-[13px] text-muted-foreground hover:text-foreground transition-all">
                {item}
              </div>
            ))}

            <div className="mx-3 mt-4 bg-gold/[0.07] border border-gold/20 rounded-lg p-2.5">
              <div className="font-mono-ibm text-[11px] text-gold flex items-center">
                <span className="inline-block w-1.5 h-1.5 bg-yi-green rounded-full mr-1.5 animate-blink" />
                Free Plan
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">47 / 50 tweets remaining</div>
            </div>
          </div>

          {/* Main */}
          <div className="p-6 overflow-hidden">
            {/* Top bar */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-[22px] font-bold">Write Tweet</h3>
              <div className="flex gap-2.5 items-center">
                <span className="flex items-center gap-1.5 bg-yi-green/10 border border-yi-green/30 rounded-full px-3 py-1 font-mono-ibm text-[11px] text-yi-green">
                  <span className="w-1.5 h-1.5 bg-yi-green rounded-full animate-blink" /> AI Ready
                </span>
              </div>
            </div>

            {/* Input area */}
            <div className="bg-foreground/[0.03] border border-border rounded-xl p-4 mb-4">
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-3">Your idea or draft</div>
              <div className="text-[15px] text-foreground/80 leading-relaxed min-h-[60px]">
                We just launched our new DeFi protocol on BSC. It's faster and cheaper than competitors. Want to announce it on Twitter.
              </div>
            </div>

            {/* Style selector */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {['🔥 Viral', '🧠 Professional', '😂 Witty', '📢 Announcement', '🎯 Thread'].map((style, i) => (
                <button key={style} className={`text-[12px] px-3 py-1.5 rounded-full border transition-all ${i === 3 ? 'bg-gold/15 border-gold/40 text-gold' : 'border-border text-muted-foreground hover:border-gold/30 hover:text-foreground'}`}>
                  {style}
                </button>
              ))}
            </div>

            <button className="w-full py-3 bg-gradient-to-br from-gold to-[hsl(32,85%,48%)] rounded-lg text-primary-foreground font-bold text-sm shadow-[0_0_20px_hsl(var(--gold)/0.3)] mb-5">
              ✨ Generate Tweet
            </button>

            {/* Generated output */}
            <div className="bg-cyan/[0.04] border border-cyan/15 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-cyan text-[10px]">◆</span>
                <span className="text-[13px] font-semibold text-muted-foreground">AI Generated</span>
                <span className="ml-auto text-[10px] font-mono-ibm text-yi-green">Score: 92/100</span>
              </div>
              <div className="text-[15px] leading-relaxed mb-3">
                🚀 Big news: we just shipped our DeFi protocol on BSC.<br /><br />
                → 10x faster execution<br />
                → 80% lower fees<br />
                → Full composability with PancakeSwap<br /><br />
                This isn't just another fork. We rebuilt the stack from scratch.<br /><br />
                Live now. Link in bio 👇
              </div>
              <div className="flex gap-3 text-[11px]">
                <button className="text-gold hover:text-gold-light transition-colors">📋 Copy</button>
                <button className="text-cyan hover:text-foreground transition-colors">🔄 Regenerate</button>
                <button className="text-yi-purple hover:text-foreground transition-colors">✏️ Edit</button>
                <button className="text-yi-green hover:text-foreground transition-colors">🧵 Make Thread</button>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { val: '267', lbl: 'Characters', color: 'text-foreground' },
                { val: '92/100', lbl: 'Viral Score', color: 'text-yi-green' },
                { val: '~4.2x', lbl: 'Engagement Est.', color: 'text-gold' },
              ].map((s) => (
                <div key={s.lbl} className="bg-foreground/[0.03] border border-border rounded-lg p-3 text-center">
                  <div className={`font-mono-ibm text-sm font-semibold ${s.color}`}>{s.val}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
