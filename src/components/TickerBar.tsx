const tickerData = [
  { text: '🔥 "Just shipped v2.0" → 847 likes', highlight: true },
  { text: '🧵 Thread: "Why we chose Rust" → 12K impressions', highlight: true },
  { text: '✍️ Rewritten in 3 sec → 5x more engagement', highlight: false },
  { text: '💡 Idea → viral tweet in one click', highlight: false },
  { text: '🚀 Used by top Web3 founders daily', highlight: true },
  { text: '⚡ Powered by BAIT AI', highlight: false },
];

const TickerBar = () => {
  const items = [...tickerData, ...tickerData];

  return (
    <div className="relative z-10 bg-cyan/[0.04] border-y border-[hsl(var(--border-cyan))] py-2.5 overflow-hidden">
      <div className="flex gap-[60px] animate-ticker w-max">
        {items.map((t, i) => (
          <div key={i} className="flex items-center gap-2.5 font-mono-ibm text-[13px] whitespace-nowrap">
            <span className={t.highlight ? 'text-gold' : 'text-muted-foreground'}>{t.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerBar;
