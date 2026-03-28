const Footer = () => {
  return (
    <footer className="border-t border-border px-[6vw] py-10 flex max-md:flex-col max-md:gap-4 justify-between items-center relative z-10">
      <div className="font-display text-xl font-extrabold bg-gradient-to-r from-gold to-cyan bg-clip-text text-transparent">
        YiClaw
      </div>
      <p className="text-[13px] text-muted-foreground">© 2025 YiClaw · Powered by OpenCLAW. All rights reserved.</p>
      <div className="flex gap-6">
        {['Twitter', 'Discord', 'GitHub', 'Docs'].map((link) => (
          <a key={link} href="#" className="text-[13px] text-muted-foreground hover:text-gold transition-colors">{link}</a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
