import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Sparkles, Copy, Check, Loader2, PenLine, RefreshCw, ListOrdered, TrendingUp, Lightbulb, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

type WriteResult = {
  tweet: string;
  viral_score: number;
  tips: string[];
};

type ThreadResult = {
  tweets: string[];
  viral_score: number;
  tips: string[];
};

const WriteTab = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<WriteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("chat-ai", {
        body: { type: "write", content: input.trim() },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate tweet", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copyTweet = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.tweet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="font-mono-ibm text-[11px] tracking-[2px] uppercase text-muted-foreground mb-2 block">
          Describe your tweet idea
        </label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Announce our new DeFi yield aggregator launching on BNB Chain with 12% APY..."
          className="bg-muted/30 border-border min-h-[100px] text-sm"
        />
      </div>
      <Button onClick={generate} disabled={loading || !input.trim()} className="w-full gap-2">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? "Generating..." : "Generate Viral Tweet"}
      </Button>

      {result && <ResultCard result={result} onCopy={copyTweet} copied={copied} />}
    </div>
  );
};

const RewriteTab = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<WriteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const rewrite = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("chat-ai", {
        body: { type: "rewrite", content: input.trim() },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to rewrite tweet", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copyTweet = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.tweet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="font-mono-ibm text-[11px] tracking-[2px] uppercase text-muted-foreground mb-2 block">
          Paste your tweet to rewrite
        </label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. We launched a new protocol on BNB chain. It's fast and cheap. Try it out."
          className="bg-muted/30 border-border min-h-[100px] text-sm"
        />
      </div>
      <Button onClick={rewrite} disabled={loading || !input.trim()} className="w-full gap-2">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
        {loading ? "Rewriting..." : "Rewrite for Viral"}
      </Button>

      {result && (
        <div className="space-y-4">
          {/* Before */}
          <div className="bg-muted/20 border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono-ibm text-[10px] tracking-wider uppercase text-destructive">Original</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{input}</p>
          </div>
          {/* After */}
          <ResultCard result={result} onCopy={copyTweet} copied={copied} label="Rewritten by BAIT" />
        </div>
      )}
    </div>
  );
};

const ThreadTab = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ThreadResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("chat-ai", {
        body: { type: "thread", content: input.trim() },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to generate thread", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copyAll = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.tweets.join("\n\n---\n\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="font-mono-ibm text-[11px] tracking-[2px] uppercase text-muted-foreground mb-2 block">
          Thread topic or idea
        </label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Why BNB Chain is the best L1 for DeFi builders in 2026..."
          className="bg-muted/30 border-border min-h-[100px] text-sm"
        />
      </div>
      <Button onClick={generate} disabled={loading || !input.trim()} className="w-full gap-2">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ListOrdered className="w-4 h-4" />}
        {loading ? "Building Thread..." : "Generate Thread"}
      </Button>

      {result && (
        <div className="space-y-4">
          {/* Score + Copy */}
          <div className="flex items-center justify-between">
            <ScoreBadge score={result.viral_score} />
            <Button variant="outline" size="sm" onClick={copyAll} className="gap-1.5 text-xs">
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied!" : "Copy All"}
            </Button>
          </div>

          {/* Thread tweets */}
          <div className="space-y-2">
            {result.tweets.map((tweet, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-4 relative">
                <span className="absolute top-3 right-3 font-mono-ibm text-[10px] text-muted-foreground">
                  {i + 1}/{result.tweets.length}
                </span>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line pr-10">{tweet}</p>
              </div>
            ))}
          </div>

          {/* Tips */}
          <TipsCard tips={result.tips} />
        </div>
      )}
    </div>
  );
};

const ScoreBadge = ({ score }: { score: number }) => {
  const color = score >= 80 ? "text-bnb-green" : score >= 50 ? "text-primary" : "text-destructive";
  const bg = score >= 80 ? "bg-bnb-green/10 border-bnb-green/20" : score >= 50 ? "bg-primary/10 border-primary/20" : "bg-destructive/10 border-destructive/20";

  return (
    <div className="flex items-center gap-3">
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded border ${bg}`}>
        <TrendingUp className={`w-3.5 h-3.5 ${color}`} />
        <span className={`font-mono-ibm text-sm font-bold ${color}`}>{score}</span>
        <span className="font-mono-ibm text-[10px] text-muted-foreground uppercase">Viral Score</span>
      </div>
      <Progress value={score} className="w-24 h-1.5" />
    </div>
  );
};

const TipsCard = ({ tips }: { tips: string[] }) => (
  <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-2">
      <Lightbulb className="w-3.5 h-3.5 text-primary" />
      <span className="font-mono-ibm text-[10px] tracking-wider uppercase text-primary">Engagement Tips</span>
    </div>
    <ul className="space-y-1.5">
      {tips.map((tip, i) => (
        <li key={i} className="flex items-start gap-2 text-[13px] text-muted-foreground">
          <span className="w-1 h-1 bg-primary rounded-full mt-1.5 shrink-0" />
          {tip}
        </li>
      ))}
    </ul>
  </div>
);

const ResultCard = ({
  result,
  onCopy,
  copied,
  label = "Generated Tweet",
}: {
  result: WriteResult;
  onCopy: () => void;
  copied: boolean;
  label?: string;
}) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <ScoreBadge score={result.viral_score} />
      <Button variant="outline" size="sm" onClick={onCopy} className="gap-1.5 text-xs">
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? "Copied!" : "Copy"}
      </Button>
    </div>

    <div className="bg-card border border-primary/20 rounded-lg p-5 shadow-[0_0_30px_hsl(43_96%_56%/0.04)]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-3.5 h-3.5 text-primary" />
        <span className="font-mono-ibm text-[10px] tracking-wider uppercase text-primary">{label}</span>
      </div>
      <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{result.tweet}</p>
    </div>

    <TipsCard tips={result.tips} />
  </div>
);

const Write = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "write";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-6 lg:px-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-primary mb-2">// AI Tools</p>
            <h1 className="font-display font-black text-3xl md:text-4xl leading-tight mb-2">
              Tweet <span className="text-primary">Command Center</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Write, rewrite, or build threads — powered by AI, optimized for Web3.
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="w-full bg-muted/30 border border-border mb-6">
              <TabsTrigger value="write" className="flex-1 gap-1.5 text-xs data-[state=active]:bg-card">
                <PenLine className="w-3.5 h-3.5" /> Write
              </TabsTrigger>
              <TabsTrigger value="rewrite" className="flex-1 gap-1.5 text-xs data-[state=active]:bg-card">
                <RefreshCw className="w-3.5 h-3.5" /> Rewrite
              </TabsTrigger>
              <TabsTrigger value="thread" className="flex-1 gap-1.5 text-xs data-[state=active]:bg-card">
                <ListOrdered className="w-3.5 h-3.5" /> Thread
              </TabsTrigger>
            </TabsList>

            <TabsContent value="write"><WriteTab /></TabsContent>
            <TabsContent value="rewrite"><RewriteTab /></TabsContent>
            <TabsContent value="thread"><ThreadTab /></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Write;
