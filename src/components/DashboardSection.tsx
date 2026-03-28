const DashboardSection = () => {
  return (
    <section id="writer" className="py-20 px-6 lg:px-10 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-primary mb-2">// Products</p>
            <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl leading-tight">
              Your Tweet <span className="text-primary">Command Center</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[12px] font-mono-ibm text-bnb-green">
            <span className="w-1.5 h-1.5 bg-bnb-green rounded-full animate-blink" /> 3 tools live
          </div>
        </div>

        {/* Product cards grid */}
        <div className="grid md:grid-cols-3 gap-px bg-border rounded overflow-hidden">
          {[
            {
              tag: 'WRITE',
              title: 'AI Tweet Writer',
              desc: 'Describe your idea → get a scroll-stopping tweet. Pick a style, hit generate.',
              stat: '2.4M tweets',
              statLabel: 'generated',
              features: ['One-click generate', 'Multiple styles', 'Viral scoring'],
            },
            {
              tag: 'REWRITE',
              title: 'Smart Rewriter',
              desc: 'Paste a boring tweet. BAIT rewrites it with viral hooks, structure, and CTAs.',
              stat: '4.2x',
              statLabel: 'avg. boost',
              features: ['Before/after compare', 'Style picker', 'Engagement analysis'],
            },
            {
              tag: 'THREADS',
              title: 'Thread Builder',
              desc: 'Turn one idea into a structured thread with hooks, insights, and a killer CTA.',
              stat: '847K',
              statLabel: 'impressions avg.',
              features: ['5-10 tweet threads', 'Auto-structure', 'Copy all'],
            },
          ].map((product, i) => (
            <div key={product.tag} className="bg-card p-7 flex flex-col group hover:bg-card/80 transition-colors">
              {/* Tag */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono-ibm text-[10px] tracking-[3px] text-primary uppercase">{product.tag}</span>
                <span className="text-[10px] font-mono-ibm text-muted-foreground">0{i + 1}</span>
              </div>

              <h3 className="font-display text-xl font-bold mb-2">{product.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{product.desc}</p>

              {/* Stat */}
              <div className="bg-muted/30 border border-border rounded p-3 mb-5">
                <div className="font-mono-ibm text-2xl font-bold text-primary">{product.stat}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{product.statLabel}</div>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6 flex-1">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[13px] text-muted-foreground">
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {f}
                  </li>
                ))}
              </ul>

              <button className="w-full py-2.5 text-[13px] font-semibold border border-border rounded hover:border-primary hover:text-primary transition-all">
                Try {product.title} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
