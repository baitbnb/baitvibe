import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Wallet, ChevronDown, LogOut, Copy, Check, ExternalLink } from "lucide-react";

const WalletButton = () => {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConnectors, setShowConnectors] = useState(false);

  const shortenAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isConnected && address) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary text-[13px] font-bold px-4 py-2 rounded hover:bg-primary/20 transition-all"
        >
          <div className="w-2 h-2 rounded-full bg-bnb-green animate-pulse" />
          {shortenAddress(address)}
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        {showDropdown && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
            <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden">
              <div className="p-3 border-b border-border">
                <p className="text-[11px] text-muted-foreground font-mono">
                  {chain?.name || "BSC"}
                </p>
                <p className="text-sm font-mono text-foreground mt-0.5">
                  {shortenAddress(address)}
                </p>
              </div>
              <div className="p-1">
                <button
                  onClick={copyAddress}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-bnb-green" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy Address"}
                </button>
                <a
                  href={`https://bscscan.com/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on BscScan
                </a>
                <button
                  onClick={() => { disconnect(); setShowDropdown(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-destructive hover:bg-destructive/10 rounded transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Disconnect
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowConnectors(!showConnectors)}
        disabled={isPending}
        className="flex items-center gap-2 bg-primary text-primary-foreground text-[13px] font-bold px-5 py-2 rounded hover:bg-primary/90 transition-all disabled:opacity-50"
      >
        <Wallet className="w-4 h-4" />
        {isPending ? "Connecting..." : "Connect Wallet"}
      </button>

      {showConnectors && !isPending && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowConnectors(false)} />
          <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden">
            <div className="p-3 border-b border-border">
              <p className="text-sm font-bold text-foreground">Connect to BSC</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">BNB Smart Chain (BSC)</p>
            </div>
            <div className="p-1">
              {connectors.map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => {
                    connect({ connector });
                    setShowConnectors(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-[13px] text-foreground hover:bg-muted/50 rounded transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{connector.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {connector.type === 'injected' ? 'Browser Wallet' : 'QR Code'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WalletButton;
