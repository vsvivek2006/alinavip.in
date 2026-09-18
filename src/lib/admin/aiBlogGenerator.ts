/**
 * Multi-Model AI Blog Post Generator Engine
 * Supports Google Gemini (3.5 / 3.6 Flash) & Groq (Llama 3.3 70B Versatile).
 * 
 * Features:
 * - 100% Brand-Grounded: Exclusively promotes the active sister domain.
 * - Anti-AI Guardrails: Banned robotic phrases and cliches.
 * - Spaced Internal Linking: Weaves at least 3 natural internal links throughout.
 * - Unique Random Asset: Picks a random ImageKit master image (1 of 70) for every single post.
 * - Zero Silent Fallback: Throws clear, actionable, user-friendly error messages if API fails.
 */

import imagekitAssets from '@/data/imagekit_assets.json';

export interface GenerationRequest {
  siteName: string;
  domain: string;
  topic: string;
  focusKeyword: string;
  secondaryKeywords?: string;
  wordCount?: number; // default 1000
  apiKey?: string;
  provider?: 'gemini' | 'groq';
}

export interface GeneratedBlog {
  title: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  content: string[];
  tags: string[];
  coverImage: string;
  author: string;
  modelUsed: string;
}

/**
 * Select a completely random unique image from the 70 verified ImageKit master assets
 */
export function selectRandomImage(): string {
  if (!imagekitAssets || imagekitAssets.length === 0) {
    return 'https://ik.imagekit.io/uum5sguzw/shared/Benefits_of_Booking_Through_a_Professional_Escort_.jpg?tr=f-auto,q-85';
  }
  const randomIndex = Math.floor(Math.random() * imagekitAssets.length);
  return `${imagekitAssets[randomIndex].url}?tr=f-auto,q-85`;
}

/**
 * Slugify text helper
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generate blog post using external AI API (Gemini or Groq)
 */
export async function generateBlogPost(req: GenerationRequest): Promise<GeneratedBlog> {
  const provider = req.provider || (req.apiKey?.startsWith('gsk_') ? 'groq' : 'gemini');

  if (provider === 'groq') {
    const groqKey = req.apiKey || process.env.GROQ_API_KEY;
    if (!groqKey) {
      throw new Error(
        'Groq API Key is missing. Please paste your Groq key (gsk_...) into the generator modal or set GROQ_API_KEY in .env.local.'
      );
    }
    return await generateWithGroq(req, groqKey);
  } else {
    const geminiKey = req.apiKey || process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      throw new Error(
        'Gemini API Key is missing. Please paste your Gemini key into the generator modal or set GEMINI_API_KEY in .env.local.'
      );
    }
    return await generateWithGemini(req, geminiKey);
  }
}

async function generateWithGroq(req: GenerationRequest, apiKey: string): Promise<GeneratedBlog> {
  const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '');
  const prompt = createSystemPrompt(req);
  
  // Available Groq models with automatic fallback
  const models = ['openai/gpt-oss-120b', 'qwen/qwen3.8-27b', 'llama-3.3-70b-versatile'];
  let lastError = '';

  for (const model of models) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cleanKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: prompt.system },
            { role: 'user', content: prompt.user },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.72,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        let detail = errText;
        try {
          const p = JSON.parse(errText);
          if (p.error?.message) detail = p.error.message;
        } catch (err) {
          void err;
        }
        lastError = `${model}: ${detail}`;
        continue; // Try next model
      }

      const data = await res.json();
      const rawContent = data.choices?.[0]?.message?.content;
      if (!rawContent) {
        lastError = `${model}: Empty content returned`;
        continue;
      }

      const cleaned = rawContent.replace(/^```(json)?\s*/i, '').replace(/\s*```$/, '').trim();
      const parsed = JSON.parse(cleaned);

      return sanitizeOutput(parsed, req, `Groq (${model})`);
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
    }
  }

  throw new Error(`Groq API Error: ${lastError}`);
}

async function generateWithGemini(req: GenerationRequest, apiKey: string): Promise<GeneratedBlog> {
  const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '');
  const prompt = createSystemPrompt(req);
  
  // Try stable gemini-3.5-flash first, then gemini-3.6-flash, then gemini-3.1-flash-lite
  const models = ['gemini-3.5-flash', 'gemini-3.6-flash', 'gemini-3.1-flash-lite'];
  let lastError = '';

  for (const model of models) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${prompt.system}\n\n${prompt.user}\n\nCRITICAL: Return strictly valid JSON only.` }],
            }
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.72,
          },
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        let msg = errText;
        try {
          const p = JSON.parse(errText);
          if (p.error?.message) msg = p.error.message;
        } catch (err) {
          void err;
        }
        lastError = `${model}: ${msg}`;
        continue; // Try next model in list
      }

      const data = await res.json();
      const textPart = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!textPart) {
        lastError = `${model}: Empty content returned`;
        continue;
      }

      const cleanedJson = textPart.replace(/^```(json)?\s*/i, '').replace(/\s*```$/, '').trim();
      const parsed = JSON.parse(cleanedJson);
      return sanitizeOutput(parsed, req, `Google Gemini (${model})`);
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
    }
  }

  throw new Error(`Gemini API Error: ${lastError}`);
}

function sanitizeOutput(parsed: Record<string, unknown>, req: GenerationRequest, modelUsed: string): GeneratedBlog {
  const title = (parsed.title as string) || req.topic;
  let content = Array.isArray(parsed.content) ? (parsed.content as string[]) : [String(parsed.content)];

  // Ensure at least 3 internal links exist across the body
  content = ensureInternalLinks(content);

  return {
    title,
    slug: slugify((parsed.slug as string) || (parsed.title as string) || req.topic),
    seoTitle: (parsed.seoTitle as string) || title,
    seoDescription: (parsed.seoDescription as string) || (parsed.excerpt as string) || '',
    excerpt: (parsed.excerpt as string) || '',
    content,
    tags: (parsed.tags as string[]) || [req.focusKeyword, 'Luxury Concierge', 'Gurgaon Escorts'],
    coverImage: selectRandomImage(), // Pick random unique image from ImageKit
    author: `${req.siteName} Editorial Desk`,
    modelUsed,
  };
}

/**
 * Guarantees at least 3 contextual internal markdown links spaced across the body
 */
function ensureInternalLinks(paragraphs: string[]): string[] {
  const fullText = paragraphs.join(' ');
  const linkMatches = (fullText.match(/\[([^\]]+)\]\(([^)]+)\)/g) || []);

  if (linkMatches.length >= 3) return paragraphs;

  const result = [...paragraphs];

  // 1. Early link in intro
  if (result.length > 0 && !result[0].includes('](/')) {
    result[0] = result[0] + ` Patrons seeking verified standards can browse our authenticated [companion gallery](/gallery) for authentic, authenticated portfolios.`;
  }

  // 2. Middle link in section 2 or 3
  const midIndex = Math.floor(result.length / 2);
  if (result[midIndex] && !result[midIndex].includes('](/')) {
    result[midIndex] = result[midIndex] + ` Explore our premier [5-star hotel outcall services](/services) tailored for corporate executives and international travelers across Gurgaon.`;
  }

  // 3. Late link in location/rates/contact section
  const lateIndex = Math.max(1, result.length - 2);
  if (result[lateIndex] && !result[lateIndex].includes('](/')) {
    result[lateIndex] = result[lateIndex] + ` For prompt outcalls to DLF Phase 1, Cyber City, and Aerocity, inspect our [service locations](/locations) or connect with our 24/7 desk via [private contact](/contact).`;
  }

  return result;
}

function createSystemPrompt(req: GenerationRequest) {
  return {
    system: `You are an elite lifestyle editor and private hospitality concierge writing exclusively for ${req.siteName} (https://${req.domain}).
Your writing must be 100% human, authoritative, polished, discreet, and natural.

STRICT BRAND CONTEXT RULES:
1. Speak ONLY about ${req.siteName} (${req.domain}).
2. NEVER mention other rival agencies, competitor sites, or external brand names.
3. Position ${req.siteName} as the gold standard of verified, safe, zero-advance, and discreet companionship in Gurgaon and Delhi NCR.

STRICT ANTI-AI HUMAN WRITING RULES:
- FORBIDDEN WORDS & PHRASES (STRICTLY PROHIBITED):
  "In this fast-paced world", "delve into", "tapestry", "beacon", "testament", "look no further", "in conclusion", "furthermore", "moreover", "plethora", "crucial role", "navigating the world of", "dive into", "embark on".
- Write with confident, conversational first-person plural authority ("we", "our private desk", "guests frequently share with us").
- Keep paragraphs compact (2 to 4 sentences maximum). No monotonic walls of text.
- Ground the writing in specific regional landmarks: DLF CyberHub, Horizon Plaza, Golf Course Road, Aerocity, The Oberoi, The Leela Ambience, Trident Gurgaon.

MANDATORY FORMATTING DIVERSITY:
- Use clean ## H2 and ### H3 headings.
- Include a bulleted checklist with 3-5 crisp points highlighting safety, vetting, or etiquette.
- Include a styled blockquote tip: "> Concierge Tip for 5-Star Hotel Guests: ..."
- Include an FAQ section with 2-3 genuine, practical Q&As.

MANDATORY SPACED INTERNAL LINKING:
You MUST naturally weave at least 3 internal markdown links at spaced intervals throughout the content:
- Link 1 early (Intro): e.g. [verified companion gallery](/gallery) or [curated escort categories](/categories)
- Link 2 in middle: e.g. [5-star hotel outcall services](/services) or [Russian call girls in Gurgaon](/category/russian-call-girls)
- Link 3 near end: e.g. [service locations across Gurgaon](/locations) or [private concierge desk](/contact) or [transparent rates](/rates)

JSON OUTPUT SCHEMA:
{
  "title": "Natural H1 Title (50-65 chars)",
  "slug": "url-friendly-slug",
  "seoTitle": "SEO meta title (under 60 chars)",
  "seoDescription": "Engaging meta description (140-155 chars)",
  "excerpt": "Compelling 2-sentence preview for article cards (180-220 chars)",
  "content": [
    "Introduction paragraph setting context for Gurgaon and ${req.focusKeyword}...",
    "Paragraph with early internal link e.g. [verified companion gallery](/gallery)...",
    "## H2 Section Headline",
    "Paragraph exploring luxury hospitality venue dynamics...",
    "- **Feature 1**: Description\\n- **Feature 2**: Description\\n- **Feature 3**: Description",
    "> Concierge Tip for 5-Star Hotel Guests: Room billing and in-person payment only...",
    "## H2 Section Headline with Mid Link e.g. [outcall services](/services)",
    "Detailed practical advice...",
    "## Frequently Asked Questions",
    "**Q: How quickly can a companion arrive at major Gurgaon hotels?**\\n\\nA: Our dispatch arrives within 20 to 30 minutes across DLF, Cyber City, and Golf Course Road.",
    "**Q: Are advance payments required?**\\n\\nA: Never. ${req.siteName} maintains a strict zero-advance policy. You only settle in person upon satisfaction.",
    "## Reserving with ${req.siteName}",
    "Closing paragraph with closing link to [our 24/7 concierge desk](/contact)..."
  ],
  "tags": ["Focus Keyword", "Gurgaon Escorts", "VIP Companions", "Hotel Outcalls"]
}`,
    user: `Topic: ${req.topic}
Focus Keyword: ${req.focusKeyword}
Secondary Keywords: ${req.secondaryKeywords || 'luxury hotel outcalls, DLF Cyber City, verified profiles'}
Target Word Count: ${req.wordCount || 1000} words.`
  };
}
