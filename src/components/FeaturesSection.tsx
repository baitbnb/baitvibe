const features = [
  { icon: '✍️', title: 'AI Tweet Writer', desc: 'Describe your idea in plain English. BAIT generates scroll-stopping tweets instantly.', color: 'gold' },
  { icon: '🔄', title: 'Smart Rewriter', desc: 'Paste a boring tweet, pick a style (viral, witty, professional), and get a polished version in seconds.', color: 'cyan' },
  { icon: '🧵', title: 'Thread Builder', desc: 'Turn one topic into a full thread with hooks, insights, data points, and a killer CTA.', color: 'cyan' },
  { icon: '🎯', title: 'Viral Score', desc: 'Every tweet gets an AI-powered engagement score so you know what will hit before you post.', color: 'gold' },
  { icon: '🧠', title: 'Web3 Native', desc: 'Trained on thousands of top crypto/Web3 tweets. It speaks DeFi, NFTs, and builder culture fluently.', color: 'gold' },
  { icon: '⚡', title: 'Powered by BAIT AI', desc: 'Built on advanced language models — fast, private, and optimized for crypto content.', color: 'cyan' },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-[6vw] relative z-10">
      <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-cyan mb-3">// Core Features</p>
      <h2 className="font-display font-extrabold leading-tight mb-4" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
        Built for Builders.
      </h2>

      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-px mt-16 border border-border rounded-2xl overflow-hidden">
        {features.map((f) => (
          <div key={f.title} className="p-9 bg-card relative overflow-hidden group hover:bg-gold/[0.03] transition-colors">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className={`text-[28px] mb-5 w-[52px] h-[52px] rounded-xl flex items-center justify-center bg-${f.color}/[0.08] border border-${f.color}/20`}>
              {f.icon}
            </div>
            <h3 className="font-display text-lg font-bold mb-2.5">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
