

## Problem

The language instruction is appended at the end of a long system prompt, making it easy for the AI model to ignore. The instruction also only applies when `language !== "en"`, and the language enforcement is weak — a single paragraph buried after the style guide.

## Plan

**File: `supabase/functions/chat-ai/index.ts`**

1. **Move language instruction to the TOP of the system prompt** — not appended at the end. Prepend a strong, unmissable directive before all other instructions when a non-English language is selected.

2. **Also inject language into the user message** — wrap the user's content with an explicit reminder like:
   ```
   [OUTPUT LANGUAGE: Japanese]
   
   {user content here}
   
   [REMINDER: Write ALL tweet/thread content in Japanese. Do NOT write in English or any other language.]
   ```

3. **Reinforce in tool parameter descriptions** — update the `tweet`/`tweets`/`verdict` field descriptions in the tools to include "Must be written in the target language specified in the prompt" so the model gets the constraint from multiple angles.

4. **Add `en` to the languageMap** — currently missing, which means if someone picks English explicitly, the map returns `undefined`. Add `en: "English"` for completeness.

These 4 changes all happen in the single edge function file. The frontend code (`Write.tsx`) needs no changes.

### Technical Details

- **System prompt prefix** (when language is not English):
  ```
  ===== MANDATORY OUTPUT LANGUAGE =====
  You MUST write ALL tweet content, thread tweets, and verdicts in ${languageName}.
  The input may be in any language — IGNORE the input language.
  ONLY the "tips" array stays in English. Everything else MUST be in ${languageName}.
  ===== END LANGUAGE RULE =====
  
  {original system prompt}
  ```

- **User message wrapping**:
  ```
  [TARGET LANGUAGE: ${languageName}]\n\n${content}\n\n[WRITE OUTPUT IN ${languageName} ONLY]
  ```

- **Tool descriptions updated** to say e.g. `"The generated tweet text (must be in the target output language)"`

