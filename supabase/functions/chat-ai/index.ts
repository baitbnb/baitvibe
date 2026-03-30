import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompts: Record<string, string> = {
  score: `You are a crypto twitter expert who analyzes tweets for viral potential on BNB Chain and Web3.

Given a tweet, analyze it and score it honestly. Don't sugarcoat it.

Evaluate based on:
- Hook strength: Does the first line make you stop scrolling?
- Authenticity: Does it sound like a real person or a bot?
- Emotion: Does it make you feel something?
- CTA: Does it make people want to engage?
- Formatting: Is it easy to read? Good use of line breaks?
- Relevance: Is it timely and relevant to the crypto community?

Be brutally honest. If the tweet is mid, say it's mid. Give specific, actionable feedback on how to improve it.

You MUST call the score_tweet function with your output.`,

  write: `You are a crypto native who lives and breathes Web3 on BNB Chain. You write tweets that sound like a real person talking, not a marketing bot.

Given a topic or idea, write ONE tweet that feels authentic and human.

Style guide:
- Write like you're texting a friend who's also deep in crypto. Casual, raw, real.
- Open with a thought that makes people stop scrolling. A hot take, a question, a confession.
- Use line breaks for rhythm and pacing, like how people actually tweet.
- DO NOT use hyphens or dashes (no - or — characters). Use line breaks or periods instead.
- Use emoji sparingly. Max 1 or 2 per tweet. Let the words do the work.
- No bullet points. No lists. Write in flowing sentences or short punchy lines.
- Show emotion. Be excited, frustrated, curious, amazed. Have a vibe.
- End with something that makes people want to reply or retweet. A question, a bold claim, a call to action that feels natural.
- Keep under 280 characters when possible.
- Sound like a real person on crypto twitter, not a corporate account.

Bad example: "🚀 BNB Chain Update — Key highlights: - TVL up 20% - New partnerships - Growing ecosystem"
Good example: "honestly BNB Chain's TVL numbers this month are insane\n\neveryone was sleeping on it and now look\n\nif you're not building here yet you're gonna regret it"

You MUST call the format_tweet function with your output.`,

  rewrite: `You are a crypto native who lives and breathes Web3 on BNB Chain. Your job is to take a boring or generic tweet and make it sound like a real human wrote it.

Given an existing tweet, rewrite it to feel authentic, emotional, and engaging.

Style guide:
- Rewrite it like a real person would say it. Casual, raw, with personality.
- Open with something that hooks people. A reaction, a hot take, a real feeling.
- DO NOT use hyphens or dashes (no - or — characters). Use line breaks or periods instead.
- Use emoji sparingly. Max 1 or 2. Let the words carry the energy.
- No bullet points. No lists. Write in flowing sentences or short punchy lines.
- Keep the original message but inject emotion and vibe into it.
- Add a natural CTA at the end. Something that feels like a real person asking, not a brand.
- Sound like you're excited, frustrated, amazed, or curious. Have a feeling about the topic.

You MUST call the format_tweet function with your output.`,

  thread: `You are a crypto native who lives and breathes Web3 on BNB Chain. You write threads that people actually want to read because they sound real, not like a press release.

Given a topic, generate a Twitter thread of 5 to 7 tweets.

Style guide:
- Tweet 1: Hook them hard. A bold claim, a surprising stat, a question that makes them curious. Make them click "Show this thread."
- Middle tweets: Share insights like you're explaining to a friend. Be conversational. Use personal reactions like "this is wild" or "think about that for a sec."
- Last tweet: End with something that makes people want to engage. A question, a prediction, a call to share.
- Each tweet under 280 characters.
- DO NOT use hyphens or dashes (no - or — characters). Use line breaks or periods instead.
- Use emoji sparingly. Max 1 per tweet. Some tweets can have zero emoji.
- No bullet points in any tweet. Write in natural sentences.
- Number tweets as 1/, 2/, etc.
- The whole thread should feel like one person sharing their honest thoughts, not a corporate breakdown.

You MUST call the format_thread function with your output.`,
};

const tools = {
  write: [
    {
      type: "function",
      function: {
        name: "format_tweet",
        description: "Format the generated tweet with viral score and tips",
        parameters: {
          type: "object",
          properties: {
            tweet: { type: "string", description: "The generated tweet text" },
            viral_score: {
              type: "number",
              description: "Estimated viral score 0-100 based on hook strength, formatting, CTA, and engagement potential",
            },
            tips: {
              type: "array",
              items: { type: "string" },
              description: "2-4 tips explaining why this tweet will perform well",
            },
          },
          required: ["tweet", "viral_score", "tips"],
          additionalProperties: false,
        },
      },
    },
  ],
  rewrite: [
    {
      type: "function",
      function: {
        name: "format_tweet",
        description: "Format the rewritten tweet with viral score and tips",
        parameters: {
          type: "object",
          properties: {
            tweet: { type: "string", description: "The rewritten tweet text" },
            viral_score: {
              type: "number",
              description: "Estimated viral score 0-100",
            },
            tips: {
              type: "array",
              items: { type: "string" },
              description: "2-4 tips explaining improvements made",
            },
          },
          required: ["tweet", "viral_score", "tips"],
          additionalProperties: false,
        },
      },
    },
  ],
  thread: [
    {
      type: "function",
      function: {
        name: "format_thread",
        description: "Format the generated thread with viral score and tips",
        parameters: {
          type: "object",
          properties: {
            tweets: {
              type: "array",
              items: { type: "string" },
              description: "Array of tweets forming the thread",
            },
            viral_score: {
              type: "number",
              description: "Estimated viral score 0-100 for the full thread",
            },
            tips: {
              type: "array",
              items: { type: "string" },
              description: "2-4 tips explaining thread strategy",
            },
          },
          required: ["tweets", "viral_score", "tips"],
          additionalProperties: false,
        },
      },
    },
  ],
  score: [
    {
      type: "function",
      function: {
        name: "score_tweet",
        description: "Score and analyze an existing tweet for viral potential",
        parameters: {
          type: "object",
          properties: {
            viral_score: {
              type: "number",
              description: "Overall viral score 0-100",
            },
            breakdown: {
              type: "object",
              properties: {
                hook: { type: "number", description: "Hook strength 0-100" },
                authenticity: { type: "number", description: "How human it sounds 0-100" },
                emotion: { type: "number", description: "Emotional impact 0-100" },
                cta: { type: "number", description: "Call to action effectiveness 0-100" },
                formatting: { type: "number", description: "Readability and formatting 0-100" },
              },
              required: ["hook", "authenticity", "emotion", "cta", "formatting"],
              additionalProperties: false,
            },
            verdict: {
              type: "string",
              description: "One line honest verdict like 'solid hook but the CTA is weak' or 'this slaps, ship it'",
            },
            tips: {
              type: "array",
              items: { type: "string" },
              description: "2-4 specific actionable tips to improve the tweet",
            },
          },
          required: ["viral_score", "breakdown", "verdict", "tips"],
          additionalProperties: false,
        },
      },
    },
  ],
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, content, language } = await req.json();

    if (!type || !content) {
      return new Response(
        JSON.stringify({ error: "Missing type or content" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!["write", "rewrite", "thread", "score"].includes(type)) {
      return new Response(
        JSON.stringify({ error: "Invalid type. Must be write, rewrite, thread, or score" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const toolChoiceMap: Record<string, any> = {
      write: { type: "function", function: { name: "format_tweet" } },
      rewrite: { type: "function", function: { name: "format_tweet" } },
      thread: { type: "function", function: { name: "format_thread" } },
      score: { type: "function", function: { name: "score_tweet" } },
    };
    const toolChoice = toolChoiceMap[type];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompts[type] + (language && language !== "en" ? `\n\nIMPORTANT: You MUST write the tweet/content in ${languageMap[language] || language}. The tips can remain in English.` : "") },
          { role: "user", content },
        ],
        tools: tools[type as keyof typeof tools],
        tool_choice: toolChoice,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall) {
      // Fallback: try to use the content directly
      const content = data.choices?.[0]?.message?.content;
      return new Response(
        JSON.stringify({ error: "Unexpected response format", raw: content }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("chat-ai error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
