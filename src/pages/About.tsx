import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-16 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,hsl(43_96%_56%/0.06),transparent_60%)]" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="animate-fade-up inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-sm px-3 py-1 font-mono-ibm text-[11px] text-primary tracking-wider uppercase mb-6">
            <span className="w-1.5 h-1.5 bg-bnb-green rounded-full animate-blink" />
            Origin Story
          </div>

          <h1 className="animate-fade-up-1 font-display font-black leading-[1.05] tracking-tight mb-6" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            BAIT wasn't
            <br />
            <span className="text-primary">meant to exist.</span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="relative z-10 px-6 lg:px-10 pb-20">
        <div className="max-w-3xl mx-auto space-y-14">
          {/* The Glitch */}
          <div className="animate-fade-up-2">
            <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-primary mb-4">// The Glitch</p>
            <div className="border-l-2 border-primary/30 pl-5 space-y-3">
              <p className="text-xl font-display font-bold text-foreground/90">It was a test.</p>
              <p className="text-xl font-display font-bold text-foreground/90">A signal.</p>
              <p className="text-xl font-display font-bold text-foreground/90">
                A glitch inside <span className="text-primary">Binance AI Pro.</span>
              </p>
            </div>
          </div>

          {/* The Signal */}
          <div>
            <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-primary mb-4">// The Signal</p>
            <div className="bg-card border border-border rounded p-7">
              <p className="text-muted-foreground text-base mb-4">But the market noticed.</p>
              <p className="text-xl font-display font-bold leading-relaxed">
                Now stepping in as building — turning a test memecoin into a <span className="text-primary">real product.</span>
              </p>
            </div>
          </div>

          {/* What we're building */}
          <div>
            <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-primary mb-5">// What We're Building</p>
            <div className="grid md:grid-cols-3 gap-px bg-border rounded overflow-hidden">
              {[
                { icon: "🤖", title: "AI Tweet dApp", desc: "Generate, rewrite, and craft viral tweets with AI built for crypto." },
                { icon: "🛠️", title: "Web3 Native", desc: "Native Web3 context. Speaks DeFi, NFTs, and builder culture." },
                { icon: "🧬", title: "Experiment → Ecosystem", desc: "From test to product ecosystem. Organic growth." },
              ].map((item) => (
                <div key={item.title} className="bg-card p-5 group hover:bg-card/80 transition-colors">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="font-display text-sm font-bold mb-1.5">{item.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy */}
          <div className="text-center py-8">
            <div className="inline-block bg-card border border-border rounded px-10 py-8">
              <p className="font-mono-ibm text-[10px] tracking-[3px] uppercase text-muted-foreground mb-4">// Philosophy</p>
              <p className="text-2xl md:text-3xl font-display font-black text-foreground mb-1">Some coins are launched.</p>
              <p className="text-2xl md:text-3xl font-display font-black text-primary">Some just… happen.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a href="/" className="inline-flex bg-primary text-primary-foreground font-bold text-sm px-8 py-3 rounded hover:bg-primary/90 shadow-[0_0_30px_hsl(43_96%_56%/0.2)] transition-all">
              Start Using BAIT →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
