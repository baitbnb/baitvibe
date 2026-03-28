const tickerData = [
  { text: '🔥 "Just shipped v2.0" → 847 likes', green: true },
  { text: '🧵 Thread → 12K impressions', green: true },
  { text: '✍️ Rewritten in 3 sec → 5x engagement', green: false },
  { text: '📈 $BAIT +12.4% 24h', green: true },
  { text: '🚀 18,400 builders onboarded', green: false },
  { text: '⚡ Powered by BAIT AI', green: false },
];

const TickerBar = () => {
  const items = [...tickerData, ...tickerData];

  return (
    <div className="relative z-10 bg-muted/30 border-y border-border py-2 overflow-hidden">
      <div className="flex gap-16 animate-ticker w-max">
        {items.map((t, i) => (
          <div key={i} className="flex items-center gap-2 font-mono-ibm text-[12px] whitespace-nowrap">
            <span className={t.green ? 'text-bnb-green' : 'text-muted-foreground'}>{t.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerBar;
