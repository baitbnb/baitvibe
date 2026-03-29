

# Build AI Tweet Writer — Full Feature

Currently BAIT is a landing page only — no actual AI functionality exists. Here's the plan to make the "Start Writing" buttons work with real AI-powered tweet generation.

---

## What We'll Build

A dedicated **/write** page with three AI tools (Tweet Writer, Smart Rewriter, Thread Builder), each powered by Lovable AI via a backend function. Users type an idea or paste a tweet → get AI-generated viral content with engagement scoring.

---

## Architecture

```text
User Input → Edge Function (chat-ai) → Lovable AI Gateway → Response
                                          ↓
                              System prompt: crypto/Web3
                              tweet optimization expert
```

---

## Steps

### 1. Create Edge Function `supabase/functions/chat-ai/index.ts`
- Accepts `{ type, content }` where type = `"write"` | `"rewrite"` | `"thread"`
- Uses `LOVABLE_API_KEY` (already configured) to call Lovable AI Gateway
- System prompt tailored for Web3/BNB Chain tweet optimization
- Returns structured JSON via tool calling (tweet text, viral score, engagement tips)
- Handles 429/402 errors properly

### 2. Create `/write` Page — `src/pages/Write.tsx`
- Three tabs: **Write**, **Rewrite**, **Thread**
- **Write tab**: Text input for topic/idea → generates optimized tweet + viral score
- **Rewrite tab**: Paste existing tweet → get improved version with before/after comparison
- **Thread tab**: Input topic → generates 5-10 tweet thread
- Each output shows: generated content, viral score (0-100), copy button, engagement tips
- Loading state with typing animation consistent with hero section style

### 3. Add Route in `src/App.tsx`
- Add `/write` route pointing to the new Write page

### 4. Wire Up Navigation
- Hero "Start Writing — Free" button → links to `/write`
- DashboardSection "Try AI Tweet Writer" buttons → link to `/write?tab=write|rewrite|thread`
- Navbar: add "Write" link

### 5. Styling
- Match existing Binance-inspired dark theme with `primary`, `bnb-green` accents
- IBM Plex Mono for data/scores, display font for headings
- Card-based layout consistent with existing sections

---

## Technical Details

- **Model**: `google/gemini-3-flash-preview` (fast, cost-effective for tweet generation)
- **No auth required** for initial usage — edge function is public
- **Non-streaming** response since tweets are short (use `supabase.functions.invoke`)
- **Tool calling** for structured output: `{ tweet: string, viral_score: number, tips: string[] }`

