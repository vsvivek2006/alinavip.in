import 'server-only';

import { buildBlogPostPrompt, blogPostResponseSchema } from './prompts/blogPost';
import { normalizeContentToHtml } from './contentFormatter';
import { getValidModel } from './models';
import imagekitAssets from '@/data/imagekit_assets.json';
import { slugify } from '@/lib/slugify';

export { slugify };

export interface GenerateBlogPostInput {
  topic: string;
  focusKeyword: string;
  secondaryKeywords?: string;
  tone?: string;
  wordCount?: number;
  audience?: string;
  siteName?: string;
  domain?: string;
  model?: string;
  apiKey?: string;
  provider?: 'groq' | 'gemini';
}

export interface GenerateBlogPostOutput {
  title: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  content: string; // Clean, rich semantic HTML
  suggestedTags: string[];
  coverImage: string;
  author: string;
  modelUsed: string;
}

export function selectRandomImage(): string {
  if (!imagekitAssets || imagekitAssets.length === 0) {
    return 'https://ik.imagekit.io/uum5sguzw/shared/Benefits_of_Booking_Through_a_Professional_Escort_.jpg?tr=f-auto,q-85';
  }
  const randomIndex = Math.floor(Math.random() * imagekitAssets.length);
  return `${imagekitAssets[randomIndex].url}?tr=f-auto,q-85`;
}

export function optimizeSeoSlug(rawSlug: string, focusKeyword: string): string {
  const clean = slugify(rawSlug);
  if (clean.length > 0 && clean.length <= 50) return clean;
  const kwSlug = slugify(focusKeyword);
  return kwSlug || clean.substring(0, 50).replace(/-+$/, '');
}

/**
 * Purge any forbidden companion words across text fields
 */
export function purgeCompanionWords(text: string): string {
  if (!text) return '';
  return text
    .replace(/\bcompanionship\b/gi, 'escort service')
    .replace(/\bcompanions\b/gi, 'call girls')
    .replace(/\bcompanion\b/gi, 'call girl');
}

/** Retry on transient network/API errors */
async function withRetry<T>(fn: () => Promise<T>, maxRetries = 2): Promise<T> {
  const RETRIABLE_CODES = [429, 502, 503, 504];
  const BACKOFF_MS = [1000, 3000];
  let lastError: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err: unknown) {
      lastError = err;
      const status = (err as { status?: number })?.status;
      if (!status || !RETRIABLE_CODES.includes(status) || attempt === maxRetries) {
        throw err;
      }
      await new Promise((res) => setTimeout(res, BACKOFF_MS[attempt] ?? 3000));
    }
  }
  throw lastError;
}

interface ParsedBlogResponse {
  title?: string;
  metaDescription?: string;
  content?: string;
  suggestedTags?: string[];
}

function safeParseJson(raw: string): ParsedBlogResponse {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '').trim();
  }
  try {
    return JSON.parse(cleaned);
  } catch {
    let repaired = cleaned;
    if (!repaired.endsWith('}')) {
      const quoteCount = (repaired.match(/(?<!\\)"/g) || []).length;
      if (quoteCount % 2 !== 0) {
        repaired += '"';
      }
      repaired += '}';
    }
    try {
      return JSON.parse(repaired);
    } catch {
      const title = repaired.match(/"title"\s*:\s*"([^"]+)"/)?.[1] || '';
      const metaDescription = repaired.match(/"metaDescription"\s*:\s*"([^"]+)"/)?.[1] || '';
      const contentMatch = repaired.match(/"content"\s*:\s*"([\s\S]*?)(?:"\s*,\s*"suggestedTags"|"$)/);
      const content = contentMatch
        ? contentMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"')
        : '';
      return { title, metaDescription, content, suggestedTags: [] };
    }
  }
}

/**
 * Generate blog post using Groq with structured outputs
 */
async function generateWithGroq(
  input: GenerateBlogPostInput,
  apiKey: string
): Promise<GenerateBlogPostOutput> {
  const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '');
  const prompt = buildBlogPostPrompt(input);
  const model = getValidModel(input.model || process.env.GROQ_MODEL);

  const fallbackModels = [
    model,
    'openai/gpt-oss-120b',
    'openai/gpt-oss-20b',
    'qwen/qwen3.8-27b',
    'llama-3.3-70b-versatile',
  ];
  const uniqueModels = Array.from(new Set(fallbackModels));

  let lastError = '';

  for (const currentModel of uniqueModels) {
    try {
      const completion = await withRetry(async () => {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${cleanKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: currentModel,
            messages: [
              {
                role: 'system',
                content:
                  'You are a seasoned human editorial director and VIP concierge practitioner with 15+ years of live experience. You write with deep analytical substance, natural burstiness, and zero detectable AI clichés or synthetic filler. Output strictly valid JSON matching the requested schema. The content field MUST be clean, valid semantic HTML with rich visual hierarchy (h2, h3, p, ul, ol, li, strong, blockquote). Never output markdown code blocks or commentary around the JSON.',
              },
              {
                role: 'user',
                content: prompt,
              },
            ],
            max_completion_tokens: 8000,
            reasoning_effort: 'low',
            response_format: { type: 'json_schema', json_schema: blogPostResponseSchema },
            temperature: 0.72,
          }),
        });

        if (!res.ok) {
          const errText = await res.text();
          let detail = errText;
          try {
            const p = JSON.parse(errText);
            if (p.error?.message) detail = p.error.message;
          } catch {
            // Ignore parse error
          }
          const err = new Error(`Groq HTTP ${res.status}: ${detail}`);
          (err as { status?: number }).status = res.status;
          throw err;
        }

        return await res.json();
      });

      const choice = completion.choices?.[0];
      const raw = choice?.message?.content;

      if (!raw) {
        lastError = `${currentModel}: Empty content returned`;
        continue;
      }

      const parsed = safeParseJson(raw);
      const title = purgeCompanionWords(parsed.title || input.topic);
      const metaDescription = purgeCompanionWords(parsed.metaDescription || '');
      const rawContent = purgeCompanionWords(parsed.content || '');
      const formattedHtml = normalizeContentToHtml(rawContent);

      const rawTags = Array.isArray(parsed.suggestedTags)
        ? parsed.suggestedTags.map((t: unknown) => String(t).trim()).filter(Boolean)
        : [input.focusKeyword, 'Call Girls In Gurgaon', 'Gurgaon Escort Service', 'VIP Escorts'];
      const tags = rawTags.map((t: string) => purgeCompanionWords(t));

      const excerptMatch = formattedHtml.match(/<p>([\s\S]*?)<\/p>/i);
      const excerpt = excerptMatch
        ? excerptMatch[1].replace(/<[^>]+>/g, '').trim().substring(0, 200)
        : metaDescription;

      return {
        title,
        slug: optimizeSeoSlug(title, input.focusKeyword),
        seoTitle: title,
        seoDescription: metaDescription,
        excerpt,
        content: formattedHtml,
        suggestedTags: tags,
        coverImage: selectRandomImage(),
        author: `${input.siteName || 'ALINA VIP'} Editorial Desk`,
        modelUsed: `Groq (${currentModel})`,
      };
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
    }
  }

  throw new Error(`Groq API Error: ${lastError}`);
}

/**
 * Generate blog post using Gemini as secondary fallback
 */
async function generateWithGemini(
  input: GenerateBlogPostInput,
  apiKey: string
): Promise<GenerateBlogPostOutput> {
  const cleanKey = apiKey.trim().replace(/^["']|["']$/g, '');
  const prompt = buildBlogPostPrompt(input);
  const models = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-3.1-flash-lite'];
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
              parts: [{ text: `${prompt}\n\nCRITICAL: Return strictly valid JSON only.` }],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.72,
          },
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        lastError = `${model}: ${errText}`;
        continue;
      }

      const data = await res.json();
      const textPart = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!textPart) {
        lastError = `${model}: Empty content returned`;
        continue;
      }

      const parsed = safeParseJson(textPart);
      const title = purgeCompanionWords(parsed.title || input.topic);
      const metaDescription = purgeCompanionWords(parsed.metaDescription || '');
      const rawContent = purgeCompanionWords(parsed.content || '');
      const formattedHtml = normalizeContentToHtml(rawContent);

      const rawTags = Array.isArray(parsed.suggestedTags)
        ? parsed.suggestedTags.map((t: unknown) => String(t).trim()).filter(Boolean)
        : [input.focusKeyword, 'Call Girls In Gurgaon', 'Gurgaon Escort Service'];
      const tags = rawTags.map((t: string) => purgeCompanionWords(t));

      const excerptMatch = formattedHtml.match(/<p>([\s\S]*?)<\/p>/i);
      const excerpt = excerptMatch
        ? excerptMatch[1].replace(/<[^>]+>/g, '').trim().substring(0, 200)
        : metaDescription;

      return {
        title,
        slug: optimizeSeoSlug(title, input.focusKeyword),
        seoTitle: title,
        seoDescription: metaDescription,
        excerpt,
        content: formattedHtml,
        suggestedTags: tags,
        coverImage: selectRandomImage(),
        author: `${input.siteName || 'ALINA VIP'} Editorial Desk`,
        modelUsed: `Google Gemini (${model})`,
      };
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
    }
  }

  throw new Error(`Gemini API Error: ${lastError}`);
}

/**
 * Universal blog post generator entry point
 */
export async function generateBlogPost(input: GenerateBlogPostInput): Promise<GenerateBlogPostOutput> {
  const groqKey = input.apiKey?.startsWith('gsk_') ? input.apiKey : process.env.GROQ_API_KEY;
  const geminiKey = input.apiKey && !input.apiKey.startsWith('gsk_') ? input.apiKey : process.env.GEMINI_API_KEY;

  if (groqKey) {
    try {
      return await generateWithGroq(input, groqKey);
    } catch (groqErr) {
      console.warn('Groq provider error, trying Gemini fallback:', groqErr);
      if (geminiKey) {
        return await generateWithGemini(input, geminiKey);
      }
      throw groqErr;
    }
  }

  if (geminiKey) {
    return await generateWithGemini(input, geminiKey);
  }

  throw new Error(
    'AI API Key missing. Please configure GROQ_API_KEY or GEMINI_API_KEY in environment variables.'
  );
}
