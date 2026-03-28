import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-[6vw] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,hsl(var(--gold)/0.08),transparent_60%),radial-gradient(ellipse_50%_60%_at_80%_70%,hsl(var(--cyan)/0.06),transparent_50%)]" />

        <div className="relative z-10 max-w-[720px] mx-auto">
          {/* Tag */}
          <div className="animate-fade-up inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 font-mono-ibm text-[11px] text-gold tracking-[2px] uppercase mb-8">
            <span className="text-cyan text-[8px] animate-blink">●</span>
            Origin Story
          </div>

          <h1
            className="animate-fade-up-1 font-display font-extrabold leading-[0.95] mb-8"
            style={{ fontSize: "clamp(44px, 6vw, 80px)" }}
          >
            <span className="text-foreground">BAIT wasn't</span>
            <br />
            <span className="bg-gradient-to-r from-gold via-gold-light to-cyan bg-clip-text text-transparent">
              meant to exist.
            </span>
          </h1>
        </div>
      </section>

      {/* Story blocks */}
      <section className="relative z-10 px-[6vw] pb-28">
        <div className="max-w-[720px] mx-auto space-y-16">
          {/* Block 1 — The Glitch */}
          <div className="animate-fade-up-2">
            <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-cyan mb-4">
              // The Glitch
            </p>
            <div className="border-l-2 border-gold/40 pl-6 space-y-4">
              <p className="text-[20px] leading-relaxed text-foreground/90 font-display font-semibold">
                It was a test.
              </p>
              <p className="text-[20px] leading-relaxed text-foreground/90 font-display font-semibold">
                A signal.
              </p>
              <p className="text-[20px] leading-relaxed text-foreground/90 font-display font-semibold">
                A glitch inside{" "}
                <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                  Binance AI Pro.
                </span>
              </p>
            </div>
          </div>

          {/* Block 2 — The Signal */}
          <div className="animate-fade-up-3">
            <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-gold mb-4">
              // The Signal
            </p>
            <div className="bg-card border border-border rounded-2xl p-8">
              <p className="text-[18px] leading-relaxed text-muted-foreground mb-6">
                But the market noticed.
              </p>
              <p className="text-[22px] leading-relaxed text-foreground font-display font-bold">
                Now stepping in as building —
                <br />
                turning a test memecoin into a{" "}
                <span className="text-gold">real product.</span>
              </p>
            </div>
          </div>

          {/* Block 3 — What we're building */}
          <div>
            <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-cyan mb-6">
              // What We're Building
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: "🤖",
                  title: "AI-Powered Tweet dApp",
                  desc: "Generate, rewrite, and craft viral tweets with AI built for crypto culture.",
                },
                {
                  icon: "🛠️",
                  title: "Built for Web3 Builders",
                  desc: "Native Web3 context. Speaks DeFi, NFTs, and builder culture fluently.",
                },
                {
                  icon: "🧬",
                  title: "From Experiment → Ecosystem",
                  desc: "What started as a test is becoming an entire product ecosystem.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-card border border-border rounded-xl p-6 hover:border-gold/30 hover:bg-gold/[0.02] transition-all group"
                >
                  <div className="text-[32px] mb-4 w-[56px] h-[56px] rounded-xl flex items-center justify-center bg-gold/[0.08] border border-gold/20 group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-base font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Block 4 — The Philosophy */}
          <div className="text-center py-12">
            <div className="inline-block bg-foreground/[0.03] border border-border rounded-2xl px-10 py-8">
              <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-muted-foreground mb-4">
                // Philosophy
              </p>
              <p className="text-[24px] md:text-[32px] font-display font-extrabold leading-tight text-foreground mb-2">
                Some coins are launched.
              </p>
              <p className="text-[24px] md:text-[32px] font-display font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-gold via-gold-light to-cyan bg-clip-text text-transparent">
                  Some just… happen.
                </span>
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-gold to-[hsl(30,40%,48%)] text-primary-foreground font-bold text-[15px] px-8 py-3.5 rounded-lg shadow-[0_0_30px_hsl(var(--gold)/0.35),0_4px_20px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:shadow-[0_0_50px_hsl(var(--gold)/0.5)] transition-all"
            >
              ✍️ Start Using BAIT
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
