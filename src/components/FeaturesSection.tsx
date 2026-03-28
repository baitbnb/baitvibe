import { Zap, RefreshCw, MessageSquare, BarChart3, Globe, Shield } from "lucide-react";

const features = [
  { icon: Zap, title: 'AI Tweet Writer', desc: 'Describe your idea → get a viral tweet. One click.', tag: 'CORE' },
  { icon: RefreshCw, title: 'Smart Rewriter', desc: 'Paste a boring tweet, pick a style, get a polished version in seconds.', tag: 'CORE' },
  { icon: MessageSquare, title: 'Thread Builder', desc: 'One topic → full thread with hooks, insights, data, and CTA.', tag: 'CORE' },
  { icon: BarChart3, title: 'Viral Scoring', desc: 'Every tweet gets an AI score so you know what will hit before you post.', tag: 'AI' },
  { icon: Globe, title: 'Web3 Native', desc: 'Trained on top crypto tweets. Speaks DeFi, NFTs, and builder culture.', tag: 'AI' },
  { icon: Shield, title: 'BAIT Engine', desc: 'Advanced language models — fast, private, optimized for crypto.', tag: 'INFRA' },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-6 lg:px-10 relative z-10 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-primary mb-2">// Features</p>
            <h2 className="font-display font-black text-3xl md:text-4xl leading-tight">
              Built for <span className="text-primary">Builders</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border rounded overflow-hidden">
          {features.map((f) => (
            <div key={f.title} className="bg-card p-6 group hover:bg-card/80 transition-colors relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded bg-primary/10 border border-primary/15 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-mono-ibm text-[9px] tracking-wider text-muted-foreground uppercase">{f.tag}</span>
              </div>

              <h3 className="font-display text-base font-bold mb-2">{f.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
