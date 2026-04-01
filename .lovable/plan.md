

## Bilingual Toggle Feature

### What it does
A toggle switch on each tab (Write, Rewrite, Thread) that enables bilingual output. When ON, the AI generates **two versions** of each tweet/thread:
1. **Version 1**: Auto-detected input language (e.g. if user types in Vietnamese, output is Vietnamese)
2. **Version 2**: The selected target output language

When OFF (default), behavior stays as-is — single output in the selected target language.

### Changes

**1. Frontend — `src/pages/Write.tsx`**

- Add a `bilingual` boolean state (default `false`) to `WriteTab`, `RewriteTab`, and `ThreadTab`
- Add a `Switch` toggle labeled "Bilingual Mode" next to the language selector
- Pass `bilingual: true` in the request body to the edge function when enabled
- Update result display to show two result cards side-by-side or stacked:
  - Card 1: labeled with detected input language (e.g. "🇻🇳 Tiếng Việt")
  - Card 2: labeled with target language (e.g. "🇺🇸 English")
- Update types: `WriteResult` gets an optional `tweet_secondary` + `language_detected`, `ThreadResult` gets `tweets_secondary` + `language_detected`
- Each card gets its own copy button

**2. Backend — `supabase/functions/chat-ai/index.ts`**

- Read `bilingual` from request body
- When `bilingual === true`:
  - Update system prompt to instruct: "Generate two versions. First in the detected input language, second in ${targetLanguage}"
  - Update tool schemas to include secondary fields:
    - `tweet_secondary` (string) for write/rewrite
    - `tweets_secondary` (string[]) for thread
    - `language_detected` (string) — the detected input language name
  - Use a modified tool definition that includes these extra fields
- When `bilingual === false`: no change to current behavior

### Technical Details

**Modified tool schema example (write, bilingual=true):**
```json
{
  "tweet": "detected-language tweet",
  "tweet_secondary": "target-language tweet",
  "language_detected": "Vietnamese",
  "viral_score": 85,
  "tips": ["..."]
}
```

**UI layout for bilingual results:**
```text
┌─────────────────────────────┐
│ 🇻🇳 Vietnamese (Detected)   │  [Copy]
│ tweet content...            │
├─────────────────────────────┤
│ 🇺🇸 English (Target)        │  [Copy]
│ tweet content...            │
└─────────────────────────────┘
│ Viral Score: 85             │
│ Tips: ...                   │
```

**Files modified:**
- `src/pages/Write.tsx` — bilingual toggle UI + dual result display
- `supabase/functions/chat-ai/index.ts` — bilingual prompt + extended tool schemas

