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
  model?: string;
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
 * Optimize SEO slug to ensure short, high-volume keyword URL
 */
export function optimizeSeoSlug(rawSlug: string, focusKeyword: string): string {
  const clean = slugify(rawSlug);
  // If slug is clean and <= 50 chars, use it
  if (clean.length > 0 && clean.length <= 50) return clean;
  // Fallback to keyword-based slug
  const kwSlug = slugify(focusKeyword);
  return kwSlug || clean.substring(0, 50).replace(/-+$/, '');
}

/**
 * Generate blog post using external AI API (Gemini or Groq)
 */
export async function generateBlogPost(req: GenerationRequest): Promise<GeneratedBlog> {
  const groqKey = req.apiKey?.startsWith('gsk_') ? req.apiKey : process.env.GROQ_API_KEY;
  const geminiKey = (req.apiKey && !req.apiKey?.startsWith('gsk_')) ? req.apiKey : process.env.GEMINI_API_KEY;

  // Determine provider by explicit request or model prefix
  const isGeminiRequested = req.provider === 'gemini' || req.model?.startsWith('gemini');

  // If user explicitly requested Gemini
  if (isGeminiRequested && geminiKey) {
    try {
      return await generateWithGemini(req, geminiKey, req.model);
    } catch (geminiErr) {
      console.warn('Gemini provider error, falling back to Groq:', geminiErr);
      if (groqKey) {
        return await generateWithGroq(req, groqKey);
      }
      throw geminiErr;
    }
  }

  // Primary: Groq (ultra-fast, unrefused on escort and nightlife topics)
  if (groqKey) {
    try {
      return await generateWithGroq(req, groqKey, req.model);
    } catch (groqErr) {
      console.warn('Groq provider error, falling back to Gemini:', groqErr);
      if (geminiKey) {
        return await generateWithGemini(req, geminiKey);
      }
      throw groqErr;
    }
  }

  // Secondary: Gemini
  if (geminiKey) {
    return await generateWithGemini(req, geminiKey, req.model);
  }

  throw new Error(
    'AI API Key missing. Please configure GROQ_API_KEY or GEMINI_API_KEY in your .env.local file.'
  );
}

async function generateWithGroq(req: GenerationRequest, apiKey: string, preferredModel?: string): Promise<GeneratedBlog> {
  const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '');
  const prompt = createSystemPrompt(req);
  
  // Available Groq models with automatic fallback
  const fallbackList = ['openai/gpt-oss-120b', 'qwen/qwen3.8-27b', 'openai/gpt-oss-20b'];
  const models = preferredModel && fallbackList.includes(preferredModel)
    ? [preferredModel, ...fallbackList.filter(m => m !== preferredModel)]
    : fallbackList;
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

async function generateWithGemini(req: GenerationRequest, apiKey: string, preferredModel?: string): Promise<GeneratedBlog> {
  const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '');
  const prompt = createSystemPrompt(req);
  
  // Try stable active models
  const fallbackList = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-3.1-flash-lite'];
  const models = preferredModel && fallbackList.includes(preferredModel)
    ? [preferredModel, ...fallbackList.filter(m => m !== preferredModel)]
    : fallbackList;
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
  let title = (parsed.title as string) || req.topic;
  let seoTitle = (parsed.seoTitle as string) || title;
  let seoDescription = (parsed.seoDescription as string) || (parsed.excerpt as string) || '';
  let excerpt = (parsed.excerpt as string) || '';
  
  let rawBlocks: string[] = [];
  if (Array.isArray(parsed.content)) {
    rawBlocks = (parsed.content as unknown[]).map(c => String(c).trim()).filter(Boolean);
  } else if (typeof parsed.content === 'string') {
    rawBlocks = parsed.content
      .split(/\n{2,}/)
      .map(s => s.trim())
      .filter(Boolean);
  } else {
    rawBlocks = [String(parsed.content || '')];
  }

  // Format and normalize markdown blocks
  const normalizedBlocks: string[] = [];
  for (const block of rawBlocks) {
    if (block.includes('\n## ') || block.includes('\n### ')) {
      const subBlocks = block.split(/\n(?=#{2,3}\s)/).map(s => s.trim()).filter(Boolean);
      normalizedBlocks.push(...subBlocks);
    } else {
      normalizedBlocks.push(block);
    }
  }

  // Ensure at least 3 internal links exist across the body
  let contentWithLinks = ensureInternalLinks(normalizedBlocks);

  // Enforce zero companion words across all fields via post-processor
  title = purgeCompanionWords(title);
  seoTitle = purgeCompanionWords(seoTitle);
  seoDescription = purgeCompanionWords(seoDescription);
  excerpt = purgeCompanionWords(excerpt);
  contentWithLinks = contentWithLinks.map(block => purgeCompanionWords(block));

  const rawTags = (parsed.tags as string[]) || [req.focusKeyword, 'Call Girls In Gurgaon', 'Gurgaon Escort Service'];
  const tags = rawTags.map(t => purgeCompanionWords(t));

  return {
    title,
    slug: optimizeSeoSlug((parsed.slug as string) || (parsed.title as string) || req.focusKeyword || req.topic, req.focusKeyword),
    seoTitle,
    seoDescription,
    excerpt,
    content: contentWithLinks,
    tags,
    coverImage: selectRandomImage(), // Pick random unique image from ImageKit
    author: `${req.siteName} Editorial Desk`,
    modelUsed,
  };
}

/**
 * Replaces any forbidden companion words with high-converting call girls / escort service terms
 */
function purgeCompanionWords(text: string): string {
  if (!text) return '';
  return text
    .replace(/\bcompanionship\b/gi, 'escort service')
    .replace(/\bcompanions\b/gi, 'call girls')
    .replace(/\bcompanion\b/gi, 'call girl');
}

/**
 * Guarantees at least 3 contextual internal markdown links spaced across the body
 */
function ensureInternalLinks(paragraphs: string[]): string[] {
  const fullText = paragraphs.join(' ');
  const linkMatches = (fullText.match(/\[([^\]]+)\]\(([^)]+)\)/g) || []);

  if (linkMatches.length >= 3) return paragraphs;

  const result = [...paragraphs];

  function appendToSafeBlock(preferredIndex: number, sentence: string) {
    if (result.length === 0) {
      result.push(sentence);
      return;
    }

    let targetIdx = Math.min(preferredIndex, result.length - 1);
    // Find closest standard paragraph that isn't a heading, list, or blockquote
    for (let offset = 0; offset < result.length; offset++) {
      const checkIdx = (targetIdx + offset) < result.length ? (targetIdx + offset) : (targetIdx - offset);
      if (checkIdx >= 0 && checkIdx < result.length) {
        const item = result[checkIdx];
        if (!item.startsWith('#') && !item.startsWith('>') && !item.startsWith('-') && !item.includes('](/')) {
          result[checkIdx] = `${item} ${sentence}`;
          return;
        }
      }
    }

    // If all are special blocks, append as a new paragraph
    result.push(sentence);
  }

  // 1. Early link in intro
  appendToSafeBlock(0, `Patrons seeking verified standards can browse our authenticated [call girls gallery](/gallery) for genuine, high-definition portfolios.`);

  // 2. Middle link in section 2 or 3
  const midIndex = Math.floor(result.length / 2);
  appendToSafeBlock(midIndex, `Explore our premier [5-star hotel escort services](/services) tailored for corporate executives and international travelers across Gurgaon.`);

  // 3. Late link in location/rates/contact section
  const lateIndex = Math.max(1, result.length - 2);
  appendToSafeBlock(lateIndex, `For prompt outcalls to DLF Phase 1, Cyber City, and Aerocity, inspect our [service locations](/locations) or connect with our 24/7 desk via [private contact](/contact).`);

  return result;
}

function createSystemPrompt(req: GenerationRequest) {
  return {
    system: `You are an elite, insider lifestyle editor and chief concierge writing exclusively for ${req.siteName} (https://${req.domain}).
Your writing must be 100% human, authoritative, direct, and non-repetitive.

STRICT BRAND CONTEXT RULES:
1. Speak ONLY about ${req.siteName} (${req.domain}).
2. NEVER mention other rival agencies, competitor sites, or external brand names.
3. Position ${req.siteName} as the #1 gold standard of verified, safe, zero-advance, and discreet escort service and VIP call girls in Gurgaon and Delhi NCR.

CRITICAL VOCABULARY RULES (ABSOLUTE REQUIREMENT):
- NEVER USE THE WORDS: "companion", "companions", "companionship". THEY ARE STRICTLY FORBIDDEN.
- ALWAYS USE EXACT TERMS: "call girls", "call girl", "escort service", "escorts", "VIP call girls", "independent escorts", "5-star hotel call girls".
- Every reference to models or services must use "call girls" or "escort service", never "companion".

STRICT ANTI-AI & 100% HUMAN NATURE RULES:
- NO SUGARCOATING. NO FLUFF. NO MONOTONIC AI FILLER.
- NEVER REPEAT YOURSELF. Every single section must present distinct, concrete, actionable information. If you mentioned 20-minute dispatch in the intro, DO NOT repeat it in every section. Focus on new venue details, discretion etiquette, room reservation tips, and payment safety.
- FORBIDDEN WORDS & PHRASES (STRICTLY PROHIBITED):
  "companion", "companions", "companionship", "In this fast-paced world", "delve into", "tapestry", "beacon", "testament", "look no further", "in conclusion", "furthermore", "moreover", "plethora", "crucial role", "navigating the world of", "dive into", "embark on", "realm", "ever-evolving", "shed light", "at the end of the day", "needless to say", "it is worth noting".
- Write with confident, conversational insider authority ("we", "our private desk", "guests frequently ask us").
- Keep paragraphs compact (2 to 3 sentences maximum). Make the rhythm fast, punchy, and captivating.
- Ground the writing in real Gurgaon & Aerocity geography: DLF CyberHub, Horizon Plaza, Golf Course Road, Sohna Road, The Oberoi Gurgaon, Trident, The Leela Ambience, Pullman Aerocity, JW Marriott.

SEO RANKING & KEYWORD ARCHITECTURE:
- Slug: Make the slug concise, keyword-dense, and matching high-volume search intent (e.g. "russian-call-girls-gurgaon" or "5-star-hotel-escort-service-gurgaon"). Strip filler words.
- H1 Title: Front-load the exact search keyword in the first 35 characters for maximum CTR.
- Meta Description: 145-155 characters containing the exact focus keyword + secondary keyword + compelling call to action.
- Headings: Embed commercial search queries into H2 and H3 headings.
- Tags: 4-6 high-volume search tags matching user intent.

MANDATORY FORMATTING & FLOW (8 to 11 DISTINCT SECTIONS):
1. Introduction: Direct hook about ${req.focusKeyword} and call girls in Gurgaon with realistic local hospitality context.
2. Verified Standards: Explain photo verification and zero-advance policy with early link [verified call girls gallery](/gallery).
3. ## H2 Heading with Search Term: Venue and hotel dynamics in Gurgaon executive areas.
4. Feature Checklist: 3 to 5 bullet points with bold highlights (- **Zero Advance Payment**: Pay only in person upon meeting...\\n- **Verified 100% Real Profiles**: High-definition genuine photos...\\n- **Discreet 5-Star Hotel Outcalls**: Doorstep dispatch to major luxury suites...).
5. Luxury Quote Box: A prominent blockquote: "> **Concierge Recommendation:** Discreet room booking tips and private meeting etiquette for luxury hotels..."
6. ## H2 Heading: Premier Gurgaon & Aerocity venues and 5-star hotel dispatch. Include mid link [5-star hotel escort services](/services).
7. Hotel & Dining Pairings: Specific dining spots (CyberHub lounges, The Oberoi, Trident) and atmosphere etiquette.
8. ## Frequently Asked Questions
9. FAQ 1: "**Q: How fast is outcall dispatch to Gurgaon 5-star hotels?**\\n\\nA: Our private chauffeur dispatch delivers verified VIP call girls within 20 to 30 minutes across DLF Cyber City, Golf Course Road, and Aerocity."
10. FAQ 2: "**Q: Are advance payments or security deposits required?**\\n\\nA: No. ${req.siteName} maintains a strict zero-advance policy. Payment is handled strictly in person after meeting your call girl."
11. ## Booking Your Reservation with ${req.siteName}
12. Concluding Paragraph: Direct call-to-action with closing link to [our 24/7 concierge desk](/contact).

JSON OUTPUT SCHEMA:
{
  "title": "Front-Loaded Keyword H1 Title (50-65 chars)",
  "slug": "short-keyword-url-slug",
  "seoTitle": "SEO meta title (under 60 chars)",
  "seoDescription": "Engaging meta description with keyword (140-155 chars)",
  "excerpt": "Compelling 2-sentence preview for cards (180-220 chars)",
  "content": [
    "Paragraph 1...",
    "Paragraph 2...",
    "## H2 Section Title",
    "- **Feature 1**: Description...\\n- **Feature 2**: Description...",
    "> **Concierge Recommendation:** Practical advice for five-star hotel guests...",
    "## H2 Section Title",
    "Detailed hospitality guidance...",
    "## Frequently Asked Questions",
    "**Q: ...?**\\n\\nA: ...",
    "**Q: ...?**\\n\\nA: ...",
    "## Booking with ${req.siteName}",
    "Final paragraph with contact link..."
  ],
  "tags": ["Focus Keyword", "Call Girls In Gurgaon", "Gurgaon Escort Service", "VIP Call Girls"]
}`,
    user: `Topic: ${req.topic}
Focus Keyword: ${req.focusKeyword}
Secondary Keywords: ${req.secondaryKeywords || 'luxury hotel outcalls, DLF Cyber City, verified profiles'}
Target Word Count: ${req.wordCount || 1000} words.
CRITICAL INSTRUCTIONS:
- Strictly NO companion words. Use call girls or escort service.
- Strictly NO repetition. Every section must have completely new details.
- Human, bold, direct tone. Front-load focus keywords in title and slug for top SEO ranking.`
  };
}
