import { useEffect, useState } from "react";
import { TrendingUp, Zap, Users, BarChart3, ArrowUpRight } from "lucide-react";

const liveFeed = [
  { user: "@whale_0x9a3", action: "generated 12 viral tweets", time: "2s ago", gain: "+340% reach" },
  { user: "@bnb_degen", action: "thread got 4.2K likes", time: "8s ago", gain: "+1,200 followers" },
  { user: "@cryptoKOL_", action: "minted tweet as NFT", time: "14s ago", gain: "0.8 BNB earned" },
  { user: "@0xBuilder", action: "launched token with BAIT copy", time: "22s ago", gain: "sold out in 3min" },
  { user: "@alpha_hunter", action: "generated 50 tweets batch", time: "31s ago", gain: "+890% engagement" },
  { user: "@defi_maxi", action: "auto-posted thread series", time: "45s ago", gain: "+2.1K impressions" },
];

const HeroSection = () => {
  const [feedIndex, setFeedIndex] = useState(0);
  const [tweetCount, setTweetCount] = useState(2_412_847);

  useEffect(() => {
    const feedTimer = setInterval(() => setFeedIndex((i) => (i + 1) % liveFeed.length), 3000);
    const countTimer = setInterval(() => setTweetCount((c) => c + Math.floor(Math.random() * 5) + 1), 2000);
    return () => { clearInterval(feedTimer); clearInterval(countTimer); };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      {/* BG gradient */}
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

            {/* Stats bar */}
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

          {/* Right — Live FOMO Dashboard */}
          <div className="animate-slide-in hidden lg:flex flex-col gap-3">
            {/* Live counter */}
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-[11px] font-mono-ibm text-muted-foreground uppercase tracking-wider">Total Tweets Generated</span>
                </div>
                <span className="w-2 h-2 bg-bnb-green rounded-full animate-blink" />
              </div>
              <div className="font-mono-ibm text-3xl font-black text-foreground tabular-nums">
                {tweetCount.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-bnb-green" />
                <span className="text-[11px] font-mono-ibm text-bnb-green">+12.4% last 24h</span>
              </div>
            </div>

            {/* Live feed */}
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-[11px] font-mono-ibm text-muted-foreground uppercase tracking-wider">Live Activity</span>
              </div>
              <div className="space-y-2">
                {liveFeed.slice(feedIndex, feedIndex + 4).concat(liveFeed.slice(0, Math.max(0, feedIndex + 4 - liveFeed.length))).map((item, i) => (
                  <div
                    key={`${item.user}-${i}`}
                    className={`flex items-center justify-between py-2 px-3 rounded text-[12px] transition-all duration-500 ${i === 0 ? 'bg-primary/5 border border-primary/10' : 'border border-transparent'}`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-primary font-bold font-mono-ibm shrink-0">{item.user}</span>
                      <span className="text-muted-foreground truncate">{item.action}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-bnb-green font-mono-ibm font-bold text-[11px]">{item.gain}</span>
                      <span className="text-muted-foreground/50 text-[10px]">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini stats grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: BarChart3, label: "Avg. Likes", value: "847", change: "+24%" },
                { icon: ArrowUpRight, label: "Viral Rate", value: "34%", change: "+8.2%" },
                { icon: Users, label: "Online Now", value: "1,247", change: "live" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border border-border rounded-lg p-3">
                  <stat.icon className="w-3.5 h-3.5 text-muted-foreground mb-2" />
                  <div className="font-mono-ibm text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                  <div className={`text-[10px] font-mono-ibm mt-1 ${stat.change === 'live' ? 'text-primary' : 'text-bnb-green'}`}>
                    {stat.change === 'live' ? (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-bnb-green rounded-full animate-blink" />
                        live
                      </span>
                    ) : stat.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
