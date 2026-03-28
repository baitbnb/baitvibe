import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 lg:px-10 h-16 bg-background/90 backdrop-blur-md border-b border-border">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-7 h-7 bg-primary rounded-sm flex items-center justify-center">
          <span className="text-primary-foreground font-display font-black text-xs">B</span>
        </div>
        <span className="font-display text-lg font-bold text-foreground">BAIT</span>
      </Link>

      <div className="hidden md:flex items-center gap-1">
        {[
          { label: 'Products', href: '#writer' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'About', href: '/about' },
          { label: 'Docs', href: '#docs' },
        ].map((item) => (
          item.href.startsWith('/') ? (
            <Link key={item.label} to={item.href} className="text-muted-foreground text-[13px] font-medium px-4 py-2 rounded hover:text-foreground hover:bg-muted/50 transition-all">
              {item.label}
            </Link>
          ) : (
            <a key={item.label} href={item.href} className="text-muted-foreground text-[13px] font-medium px-4 py-2 rounded hover:text-foreground hover:bg-muted/50 transition-all">
              {item.label}
            </a>
          )
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button className="text-muted-foreground text-[13px] font-medium px-4 py-2 hover:text-foreground transition-colors">
          Log In
        </button>
        <button className="bg-primary text-primary-foreground text-[13px] font-bold px-5 py-2 rounded hover:bg-primary/90 transition-all">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
