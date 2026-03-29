import { useEffect, useState, useCallback } from "react";
import { Sparkles, TrendingUp, Heart, MessageCircle, Repeat2, Eye, BarChart3 } from "lucide-react";

const rewriteExamples = [
  {
    original: "Just launched our new DeFi protocol on BSC. Check it out.",
    rewritten: "🚀 We just dropped the MOST anticipated DeFi protocol on @BNBCHAIN\n\nWhat makes it different?\n→ 12x faster swaps\n→ Zero slippage under $50K\n→ Auto-compounding yields\n\nEarly users are already up 340% 👀\n\nDon't fade this. Link in bio 🔗",
    metrics: { likes: 4_280, retweets: 1_920, replies: 347, views: 284_000 },
  },
  {
    original: "Our token is now available for trading. We have good tokenomics.",
    rewritten: "The $BAIT token just went LIVE 🟢\n\n• 40% burned at launch 🔥\n• 5% auto-staking rewards\n• Anti-whale: max 1% per wallet\n\nTokenomics so clean, even the devs are aping in.\n\n12,000 wallets in the first hour.\n\nAre you in or watching from the sidelines? 👇",
    metrics: { likes: 8_120, retweets: 3_400, replies: 892, views: 520_000 },
  },
  {
    original: "We partnered with a big project. More details coming soon.",
    rewritten: "🤝 PARTNERSHIP ANNOUNCEMENT\n\nWe just locked in a deal with the #1 DEX on BNB Chain.\n\nWhat this means for holders:\n✅ Deep liquidity pools\n✅ Featured trading pair\n✅ Exclusive farming rewards\n\n$2.4M TVL incoming.\n\nThe alpha was right here. RT if you didn't sleep on this 🫡",
    metrics: { likes: 6_750, retweets: 2_890, replies: 534, views: 410_000 },
  },
];

const HeroSection = () => {
  const [exampleIndex, setExampleIndex] = useState(0);
  const [phase, setPhase] = useState<"original" | "rewriting" | "rewritten" | "metrics">("original");
  const [typedText, setTypedText] = useState("");
  const [metricsAnimated, setMetricsAnimated] = useState({ likes: 0, retweets: 0, replies: 0, views: 0 });

  const current = rewriteExamples[exampleIndex];

  const animateMetrics = useCallback((target: typeof current.metrics) => {
    const duration = 1200;
    const steps = 30;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setMetricsAnimated({
        likes: Math.floor(target.likes * ease),
        retweets: Math.floor(target.retweets * ease),
        replies: Math.floor(target.replies * ease),
        views: Math.floor(target.views * ease),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return timer;
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let metricsTimer: ReturnType<typeof setInterval>;

    if (phase === "original") {
      setTypedText("");
      setMetricsAnimated({ likes: 0, retweets: 0, replies: 0, views: 0 });
      timeout = setTimeout(() => setPhase("rewriting"), 2500);
    } else if (phase === "rewriting") {
      const fullText = current.rewritten;
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        charIndex++;
        setTypedText(fullText.slice(0, charIndex));
        if (charIndex >= fullText.length) {
          clearInterval(typeInterval);
          setTimeout(() => setPhase("metrics"), 400);
        }
      }, 18);
      return () => clearInterval(typeInterval);
    } else if (phase === "metrics") {
      metricsTimer = animateMetrics(current.metrics);
      timeout = setTimeout(() => {
        setExampleIndex((i) => (i + 1) % rewriteExamples.length);
        setPhase("original");
      }, 4000);
    }

    return () => {
      clearTimeout(timeout);
      if (metricsTimer) clearInterval(metricsTimer);
    };
  }, [phase, current, animateMetrics]);

  const formatNum = (n: number) => {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
    return n.toString();
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,hsl(43_96%_56%/0.08),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
          {/* Left */}
          <div>
            <div className="animate-fade-up inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-sm px-3 py-1 font-mono-ibm text-[11px] text-primary tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 bg-bnb-green rounded-full animate-blink" />
              Live on BNB Chain
            </div>

            <h1 className="animate-fade-up-1 font-display font-black leading-[1.05] tracking-tight mb-5" style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}>
              AI Tweet Writer
              <br />
              <span className="text-primary">for Web3.</span>
            </h1>

            <p className="animate-fade-up-2 text-muted-foreground text-base leading-relaxed max-w-[420px] mb-8">
              Generate viral tweets, rewrite drafts, build threads — in seconds. Built for crypto builders who ship.
            </p>

            <div className="animate-fade-up-3 flex gap-3 items-center mb-12">
              <button className="bg-primary text-primary-foreground font-bold text-sm px-7 py-3 rounded hover:bg-primary/90 shadow-[0_0_30px_hsl(43_96%_56%/0.2)] hover:shadow-[0_0_50px_hsl(43_96%_56%/0.35)] transition-all">
                Start Writing — Free
              </button>
              <button className="text-foreground text-sm font-medium px-6 py-3 rounded border border-border hover:border-primary/40 hover:text-primary transition-all">
                View Demo →
              </button>
            </div>

            <div className="animate-fade-up-4 flex gap-8">
              {[
                { val: '2.4M+', lbl: 'Tweets Generated' },
                { val: '18.4K', lbl: 'Active Users' },
                { val: '4.2x', lbl: 'Avg Engagement' },
              ].map((s) => (
                <div key={s.lbl}>
                  <span className="font-mono-ibm text-xl font-bold text-primary block">{s.val}</span>
                  <span className="text-[11px] text-muted-foreground uppercase tracking-wider">{s.lbl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — AI Rewrite Animation */}
          <div className="animate-slide-in hidden lg:flex flex-col gap-3">
            {/* Original Tweet */}
            <div className={`bg-card border rounded-lg p-4 transition-all duration-500 ${phase === "original" ? "border-border" : "border-border/30 opacity-50 scale-[0.97]"}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-muted" />
                <span className="text-[12px] font-bold text-foreground">Your Draft</span>
                <span className="text-[10px] text-muted-foreground font-mono-ibm">@you</span>
              </div>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{current.original}</p>
              <div className="flex items-center gap-4 mt-3 text-muted-foreground/40">
                <span className="flex items-center gap-1 text-[11px]"><Heart className="w-3 h-3" /> 3</span>
                <span className="flex items-center gap-1 text-[11px]"><Repeat2 className="w-3 h-3" /> 0</span>
                <span className="flex items-center gap-1 text-[11px]"><Eye className="w-3 h-3" /> 42</span>
              </div>
            </div>

            {/* Arrow + AI badge */}
            <div className="flex items-center justify-center gap-2 py-1">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 ${phase === "rewriting" ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(43_96%_56%/0.3)] scale-105" : phase === "rewritten" || phase === "metrics" ? "bg-bnb-green/20 text-bnb-green border border-bnb-green/30" : "bg-muted text-muted-foreground"}`}>
                <Sparkles className={`w-3.5 h-3.5 ${phase === "rewriting" ? "animate-spin" : ""}`} />
                {phase === "original" ? "Waiting..." : phase === "rewriting" ? "BAIT AI Rewriting..." : "✓ Rewritten"}
              </div>
            </div>

            {/* Rewritten Tweet */}
            <div className={`bg-card border rounded-lg p-4 transition-all duration-500 ${phase === "original" ? "border-border/30 opacity-40" : "border-primary/30 shadow-[0_0_30px_hsl(43_96%_56%/0.06)]"}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-primary" />
                </div>
                <span className="text-[12px] font-bold text-primary">BAIT Rewrite</span>
                <span className="text-[10px] text-primary/60 font-mono-ibm">viral mode</span>
              </div>
              <div className="text-[13px] text-foreground leading-relaxed whitespace-pre-line min-h-[120px]">
                {phase === "original" ? (
                  <span className="text-muted-foreground/30 italic">AI rewrite will appear here...</span>
                ) : (
                  <>
                    {typedText || current.rewritten}
                    {phase === "rewriting" && <span className="inline-block w-[2px] h-4 bg-primary ml-0.5 animate-blink" />}
                  </>
                )}
              </div>

              {/* Metrics bar */}
              {(phase === "metrics" || phase === "rewritten") && (
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                  <span className="flex items-center gap-1 text-[11px] text-bnb-red font-mono-ibm font-bold">
                    <Heart className="w-3 h-3 fill-current" /> {formatNum(metricsAnimated.likes)}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-bnb-green font-mono-ibm font-bold">
                    <Repeat2 className="w-3 h-3" /> {formatNum(metricsAnimated.retweets)}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-primary font-mono-ibm font-bold">
                    <MessageCircle className="w-3 h-3" /> {formatNum(metricsAnimated.replies)}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-foreground font-mono-ibm font-bold ml-auto">
                    <Eye className="w-3 h-3" /> {formatNum(metricsAnimated.views)}
                  </span>
                </div>
              )}
            </div>

            {/* Viral traffic bar */}
            {(phase === "metrics") && (
              <div className="bg-bnb-green/5 border border-bnb-green/20 rounded-lg p-3 flex items-center gap-3 animate-fade-up">
                <TrendingUp className="w-5 h-5 text-bnb-green shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono-ibm text-bnb-green font-bold uppercase tracking-wider">Viral Traffic Boost</span>
                    <span className="text-[11px] font-mono-ibm text-bnb-green font-black">+{Math.floor(current.metrics.views / 420)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-bnb-green/10 rounded-full overflow-hidden">
                    <div className="h-full bg-bnb-green rounded-full animate-[grow_1.2s_ease-out_forwards]" style={{ width: '0%' }} />
                  </div>
                </div>
                <BarChart3 className="w-4 h-4 text-bnb-green/60 shrink-0" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
