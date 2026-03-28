const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[6vw] py-5 bg-background/70 backdrop-blur-xl border-b border-border">
      <div className="font-display text-[22px] font-extrabold bg-gradient-to-r from-gold to-cyan bg-clip-text text-transparent">
        BAIT
      </div>
      <div className="hidden md:flex gap-8">
        {['Writer', 'Rewrite', 'Threads', 'Pricing', 'Docs'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-muted-foreground text-sm hover:text-foreground transition-colors">
            {item}
          </a>
        ))}
      </div>
      <button className="bg-gold/10 border border-gold/40 text-gold text-[13px] font-semibold px-5 py-2 rounded-md hover:bg-gold/20 hover:shadow-[0_0_20px_hsl(var(--gold)/0.2)] transition-all">
        Start Writing ✍️
      </button>
    </nav>
  );
};

export default Navbar;
