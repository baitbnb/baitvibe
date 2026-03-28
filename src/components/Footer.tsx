import { Link } from "react-router-dom";
import baitLogo from "@/assets/bait-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border px-6 lg:px-10 py-8 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-1">
          <img src={baitLogo} alt="BAIT" className="h-7 w-7 object-contain" />
          <span className="font-display text-sm font-bold">BAIT</span>
        </div>

        <p className="text-[12px] text-muted-foreground">© 2025 BAIT. All rights reserved.</p>

        <div className="flex gap-5">
          {[
            { label: 'Twitter', href: '#' },
            { label: 'Discord', href: '#' },
            { label: 'GitHub', href: '#' },
            { label: 'Docs', href: '#' },
            
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
