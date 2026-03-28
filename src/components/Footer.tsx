import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border px-6 lg:px-10 py-8 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
            <span className="text-primary-foreground font-display font-black text-[10px]">B</span>
          </div>
          <span className="font-display text-sm font-bold">BAIT</span>
        </div>

        <p className="text-[12px] text-muted-foreground">© 2025 BAIT. All rights reserved.</p>

        <div className="flex gap-5">
          {[
            { label: 'Twitter', href: '#' },
            { label: 'Discord', href: '#' },
            { label: 'GitHub', href: '#' },
            { label: 'Docs', href: '#' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'About', href: '/about' },
          ].map((link) => (
            link.href.startsWith('/') ? (
              <Link key={link.label} to={link.href} className="text-[12px] text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
            ) : (
              <a key={link.label} href={link.href} className="text-[12px] text-muted-foreground hover:text-primary transition-colors">{link.label}</a>
            )
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
