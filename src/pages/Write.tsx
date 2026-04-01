import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Sparkles, Copy, Check, Loader2, PenLine, RefreshCw, ListOrdered, TrendingUp, Lightbulb, Target, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const LANGUAGES = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "zh", label: "中文 (Chinese)", flag: "🇨🇳" },
  { value: "ja", label: "日本語 (Japanese)", flag: "🇯🇵" },
  { value: "vi", label: "Tiếng Việt (Vietnamese)", flag: "🇻🇳" },
  { value: "ko", label: "한국어 (Korean)", flag: "🇰🇷" },
  { value: "es", label: "Español (Spanish)", flag: "🇪🇸" },
  { value: "fr", label: "Français (French)", flag: "🇫🇷" },
  { value: "pt", label: "Português (Portuguese)", flag: "🇧🇷" },
  { value: "ru", label: "Русский (Russian)", flag: "🇷🇺" },
  { value: "ar", label: "العربية (Arabic)", flag: "🇸🇦" },
  { value: "th", label: "ไทย (Thai)", flag: "🇹🇭" },
  { value: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { value: "tr", label: "Türkçe (Turkish)", flag: "🇹🇷" },
];

const getLangInfo = (code: string) => LANGUAGES.find((l) => l.value === code) || { value: code, label: code, flag: "🌐" };

type WriteResult = {
  tweet: string;
  tweet_secondary?: string;
  language_detected?: string;
  viral_score: number;
  tips: string[];
};

type ThreadResult = {
  tweets: string[];
  tweets_secondary?: string[];
  language_detected?: string;
  viral_score: number;
  tips: string[];
};

type ScoreResult = {
  viral_score: number;
  breakdown: {
    hook: number;
    authenticity: number;
    emotion: number;
    cta: number;
    formatting: number;
  };
  verdict: string;
  tips: string[];
};

const BilingualToggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <div className="flex items-center gap-2">
    <Switch checked={checked} onCheckedChange={onChange} id="bilingual" />
    <label htmlFor="bilingual" className="text-sm text-muted-foreground cursor-pointer select-none">Bilingual</label>
  </div>
);

const LanguageRow = ({
  language,
  setLanguage,
  bilingual,
  setBilingual,
}: {
  language: string;
  setLanguage: (v: string) => void;
  bilingual: boolean;
  setBilingual: (v: boolean) => void;
}) => (
  <div className="flex items-end gap-4">
    <div className="flex-1">
      <label className="font-mono-ibm text-[11px] tracking-[2px] uppercase text-muted-foreground mb-2 block">
        <Globe className="w-3 h-3 inline mr-1.5 -mt-0.5" />Output Language
      </label>
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="bg-muted/30 border-border text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGES.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>{lang.flag} {lang.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <div className="pb-2">
      <BilingualToggle checked={bilingual} onChange={setBilingual} />
    </div>
  </div>
);

const WriteTab = () => {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");
  const [bilingual, setBilingual] = useState(false);
  const [result, setResult] = useState<WriteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("chat-ai", {
        body: { type: "write", content: input.trim(), language, bilingual },
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

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
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
      <LanguageRow language={language} setLanguage={setLanguage} bilingual={bilingual} setBilingual={setBilingual} />
      <Button onClick={generate} disabled={loading || !input.trim()} className="w-full gap-2">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? "Generating..." : "Generate Viral Tweet"}
      </Button>

      {result && (
        bilingual && result.tweet_secondary && result.language_detected ? (
          <BilingualResultCard
            primary={result.tweet}
            secondary={result.tweet_secondary}
            detectedLang={result.language_detected}
            targetLangCode={language}
            viralScore={result.viral_score}
            tips={result.tips}
            copied={copied}
            onCopy={copy}
          />
        ) : (
          <ResultCard result={result} onCopy={() => copy(result.tweet, "main")} copied={copied === "main"} />
        )
      )}
    </div>
  );
};

const RewriteTab = () => {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");
  const [bilingual, setBilingual] = useState(false);
  const [result, setResult] = useState<WriteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const rewrite = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("chat-ai", {
        body: { type: "rewrite", content: input.trim(), language, bilingual },
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

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
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
      <div>
        <label className="font-mono-ibm text-[11px] tracking-[2px] uppercase text-muted-foreground mb-2 block">
          <Globe className="w-3 h-3 inline mr-1.5 -mt-0.5" />Output Language
        </label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="bg-muted/30 border-border text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>{lang.flag} {lang.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <BilingualToggle checked={bilingual} onChange={setBilingual} />
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
          {bilingual && result.tweet_secondary && result.language_detected ? (
            <BilingualResultCard
              primary={result.tweet}
              secondary={result.tweet_secondary}
              detectedLang={result.language_detected}
              targetLangCode={language}
              viralScore={result.viral_score}
              tips={result.tips}
              copied={copied}
              onCopy={copy}
              label="Rewritten by BAIT"
            />
          ) : (
            <ResultCard result={result} onCopy={() => copy(result.tweet, "main")} copied={copied === "main"} label="Rewritten by BAIT" />
          )}
        </div>
      )}
    </div>
  );
};

const ThreadTab = () => {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");
  const [bilingual, setBilingual] = useState(false);
  const [result, setResult] = useState<ThreadResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("chat-ai", {
        body: { type: "thread", content: input.trim(), language, bilingual },
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

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const isBilingualResult = bilingual && result?.tweets_secondary && result?.language_detected;

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
      <div>
        <label className="font-mono-ibm text-[11px] tracking-[2px] uppercase text-muted-foreground mb-2 block">
          <Globe className="w-3 h-3 inline mr-1.5 -mt-0.5" />Output Language
        </label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="bg-muted/30 border-border text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>{lang.flag} {lang.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <BilingualToggle checked={bilingual} onChange={setBilingual} />
      <Button onClick={generate} disabled={loading || !input.trim()} className="w-full gap-2">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ListOrdered className="w-4 h-4" />}
        {loading ? "Building Thread..." : "Generate Thread"}
      </Button>

      {result && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <ScoreBadge score={result.viral_score} />
          </div>

          {isBilingualResult ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Detected language thread */}
              <ThreadBlock
                tweets={result.tweets}
                langLabel={`${result.language_detected} (Detected)`}
                onCopyAll={() => copy(result.tweets.join("\n\n---\n\n"), "primary")}
                copied={copied === "primary"}
              />
              {/* Target language thread */}
              <ThreadBlock
                tweets={result.tweets_secondary!}
                langLabel={`${getLangInfo(language).flag} ${getLangInfo(language).label} (Target)`}
                onCopyAll={() => copy(result.tweets_secondary!.join("\n\n---\n\n"), "secondary")}
                copied={copied === "secondary"}
              />
            </div>
          ) : (
            <>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={() => copy(result.tweets.join("\n\n---\n\n"), "all")} className="gap-1.5 text-xs">
                  {copied === "all" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied === "all" ? "Copied!" : "Copy All"}
                </Button>
              </div>
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
            </>
          )}

          <TipsCard tips={result.tips} />
        </div>
      )}
    </div>
  );
};

const ThreadBlock = ({
  tweets,
  langLabel,
  onCopyAll,
  copied,
}: {
  tweets: string[];
  langLabel: string;
  onCopyAll: () => void;
  copied: boolean;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="font-mono-ibm text-[11px] tracking-wider uppercase text-muted-foreground">{langLabel}</span>
      <Button variant="outline" size="sm" onClick={onCopyAll} className="gap-1.5 text-xs">
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? "Copied!" : "Copy All"}
      </Button>
    </div>
    {tweets.map((tweet, i) => (
      <div key={i} className="bg-card border border-border rounded-lg p-4 relative">
        <span className="absolute top-3 right-3 font-mono-ibm text-[10px] text-muted-foreground">
          {i + 1}/{tweets.length}
        </span>
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line pr-10">{tweet}</p>
      </div>
    ))}
  </div>
);

const ScoreTab = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("chat-ai", {
        body: { type: "score", content: input.trim() },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to analyze tweet", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const breakdownLabels: Record<string, string> = {
    hook: "Hook Strength",
    authenticity: "Authenticity",
    emotion: "Emotion",
    cta: "Call to Action",
    formatting: "Formatting",
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="font-mono-ibm text-[11px] tracking-[2px] uppercase text-muted-foreground mb-2 block">
          Paste your tweet to analyze
        </label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste any tweet here and get an honest viral score breakdown..."
          className="bg-muted/30 border-border min-h-[100px] text-sm"
        />
      </div>
      <Button onClick={analyze} disabled={loading || !input.trim()} className="w-full gap-2">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Target className="w-4 h-4" />}
        {loading ? "Analyzing..." : "Check Viral Score"}
      </Button>

      {result && (
        <div className="space-y-4">
          <ScoreBadge score={result.viral_score} />

          <div className="bg-card border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-foreground italic">"{result.verdict}"</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <span className="font-mono-ibm text-[10px] tracking-wider uppercase text-muted-foreground">Score Breakdown</span>
            {Object.entries(result.breakdown).map(([key, value]) => {
              const color = value >= 80 ? "bg-bnb-green" : value >= 50 ? "bg-primary" : "bg-destructive";
              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{breakdownLabels[key] || key}</span>
                    <span className="font-mono-ibm text-xs font-bold text-foreground">{value}</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${value}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

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

const BilingualResultCard = ({
  primary,
  secondary,
  detectedLang,
  targetLangCode,
  viralScore,
  tips,
  copied,
  onCopy,
  label = "Generated Tweet",
}: {
  primary: string;
  secondary: string;
  detectedLang: string;
  targetLangCode: string;
  viralScore: number;
  tips: string[];
  copied: string | null;
  onCopy: (text: string, key: string) => void;
  label?: string;
}) => {
  const targetLang = getLangInfo(targetLangCode);

  return (
    <div className="space-y-4">
      <ScoreBadge score={viralScore} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Primary — detected language */}
        <div className="bg-card border border-border rounded-lg p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-mono-ibm text-[10px] tracking-wider uppercase text-muted-foreground">
                {detectedLang} (Detected)
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={() => onCopy(primary, "primary")} className="gap-1.5 text-xs shrink-0">
              {copied === "primary" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied === "primary" ? "Copied!" : "Copy"}
            </Button>
          </div>
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line flex-1">{primary}</p>
        </div>

        {/* Secondary — target language */}
        <div className="bg-card border border-primary/20 rounded-lg p-5 shadow-[0_0_30px_hsl(43_96%_56%/0.04)] flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="font-mono-ibm text-[10px] tracking-wider uppercase text-primary">
                {targetLang.flag} {targetLang.label} (Target)
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={() => onCopy(secondary, "secondary")} className="gap-1.5 text-xs shrink-0">
              {copied === "secondary" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied === "secondary" ? "Copied!" : "Copy"}
            </Button>
          </div>
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line flex-1">{secondary}</p>
        </div>
      </div>

      <TipsCard tips={tips} />
    </div>
  );
};

const Write = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "write";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <p className="font-mono-ibm text-[11px] tracking-[3px] uppercase text-primary mb-2">// AI Tools</p>
            <h1 className="font-display font-black text-3xl md:text-4xl leading-tight mb-2">
              Tweet <span className="text-primary">Command Center</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Write, rewrite, score, or build threads — powered by AI, optimized for Web3.
            </p>
          </div>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="w-full bg-muted/30 border border-border mb-6">
              <TabsTrigger value="write" className="flex-1 gap-1.5 text-xs data-[state=active]:bg-card">
                <PenLine className="w-3.5 h-3.5" /> Write
              </TabsTrigger>
              <TabsTrigger value="rewrite" className="flex-1 gap-1.5 text-xs data-[state=active]:bg-card">
                <RefreshCw className="w-3.5 h-3.5" /> Rewrite
              </TabsTrigger>
              <TabsTrigger value="score" className="flex-1 gap-1.5 text-xs data-[state=active]:bg-card">
                <Target className="w-3.5 h-3.5" /> Score
              </TabsTrigger>
              <TabsTrigger value="thread" className="flex-1 gap-1.5 text-xs data-[state=active]:bg-card">
                <ListOrdered className="w-3.5 h-3.5" /> Thread
              </TabsTrigger>
            </TabsList>

            <TabsContent value="write"><WriteTab /></TabsContent>
            <TabsContent value="rewrite"><RewriteTab /></TabsContent>
            <TabsContent value="score"><ScoreTab /></TabsContent>
            <TabsContent value="thread"><ThreadTab /></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Write;
