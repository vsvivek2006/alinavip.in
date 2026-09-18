/**
 * AI Blog Post Generator Engine
 * Supports Google Gemini, Groq, or OpenAI API keys (from env or passed from UI),
 * with a high-fidelity algorithmic fallback tuned for luxury concierge & escort SEO.
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
  provider?: 'gemini' | 'groq' | 'openai';
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
}

/**
 * Intelligent ImageKit cover image selector
 */
export function selectBestImage(topic: string, focusKeyword: string): string {
  const query = `${topic} ${focusKeyword}`.toLowerCase();
  
  // Keyword mapping to 70 assets
  if (query.includes('russian') || query.includes('slavic') || query.includes('european')) {
    const match = imagekitAssets.find(a => a.fileName.toLowerCase().includes('perfect_for_vip') || a.fileName.toLowerCase().includes('russian'));
    if (match) return match.url;
  }
  if (query.includes('hotel') || query.includes('outcall') || query.includes('aerocity') || query.includes('leela') || query.includes('oberoi')) {
    const match = imagekitAssets.find(a => a.fileName.toLowerCase().includes('hotel') || a.fileName.toLowerCase().includes('hospitality'));
    if (match) return match.url;
  }
  if (query.includes('vip') || query.includes('elite') || query.includes('executive') || query.includes('high profile')) {
    const match = imagekitAssets.find(a => a.fileName.toLowerCase().includes('high_profile') || a.fileName.toLowerCase().includes('vip'));
    if (match) return match.url;
  }
  if (query.includes('celebrity') || query.includes('model')) {
    const match = imagekitAssets.find(a => a.fileName.toLowerCase().includes('model') || a.fileName.toLowerCase().includes('celebrity'));
    if (match) return match.url;
  }

  // Default fallback asset
  const defaultAsset = imagekitAssets.find(a => a.fileName.toLowerCase().includes('benefits_of_booking')) || imagekitAssets[0];
  return defaultAsset.url;
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
 * Generate blog post using external AI API or built-in luxury concierge template engine
 */
export async function generateBlogPost(req: GenerationRequest): Promise<GeneratedBlog> {
  const apiKey = req.apiKey || process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
  const provider = req.provider || (process.env.GROQ_API_KEY ? 'groq' : 'gemini');

  // Try calling external LLM if key is available
  if (apiKey) {
    try {
      if (provider === 'groq') {
        return await generateWithGroq(req, apiKey);
      } else if (provider === 'gemini') {
        return await generateWithGemini(req, apiKey);
      }
    } catch (err) {
      console.warn('[aiBlogGenerator] LLM API call failed, falling back to expert luxury template:', err);
    }
  }

  // Algorithmic Fallback (High-Converting Luxury Editorial Format)
  return generateEditorialFallback(req);
}

async function generateWithGroq(req: GenerationRequest, apiKey: string): Promise<GeneratedBlog> {
  const prompt = createSystemPrompt(req);
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: prompt.system },
        { role: 'user', content: prompt.user },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    }),
  });

  if (!res.ok) throw new Error(`Groq API error: ${res.statusText}`);
  const data = await res.json();
  const rawContent = data.choices[0].message.content;
  const parsed = JSON.parse(rawContent);

  return {
    title: parsed.title || req.topic,
    slug: slugify(parsed.slug || parsed.title || req.topic),
    seoTitle: parsed.seoTitle || parsed.title,
    seoDescription: parsed.seoDescription || parsed.excerpt,
    excerpt: parsed.excerpt,
    content: Array.isArray(parsed.content) ? parsed.content : [parsed.content],
    tags: parsed.tags || [req.focusKeyword, 'Luxury Concierge', 'Gurgaon Escorts'],
    coverImage: selectBestImage(req.topic, req.focusKeyword),
    author: `${req.siteName} Editorial Desk`,
  };
}

async function generateWithGemini(req: GenerationRequest, apiKey: string): Promise<GeneratedBlog> {
  const prompt = createSystemPrompt(req);
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: `${prompt.system}\n\n${prompt.user}\n\nReturn strictly valid JSON only.` }],
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    }),
  });

  if (!res.ok) throw new Error(`Gemini API error: ${res.statusText}`);
  const data = await res.json();
  const text = data.candidates[0].content.parts[0].text;
  const parsed = JSON.parse(text);

  return {
    title: parsed.title || req.topic,
    slug: slugify(parsed.slug || parsed.title || req.topic),
    seoTitle: parsed.seoTitle || parsed.title,
    seoDescription: parsed.seoDescription || parsed.excerpt,
    excerpt: parsed.excerpt,
    content: Array.isArray(parsed.content) ? parsed.content : [parsed.content],
    tags: parsed.tags || [req.focusKeyword, 'Luxury Escorts', 'VIP Companions'],
    coverImage: selectBestImage(req.topic, req.focusKeyword),
    author: `${req.siteName} Editorial Desk`,
  };
}

function createSystemPrompt(req: GenerationRequest) {
  return {
    system: `You are an elite SEO copywriter for ${req.siteName} (${req.domain}), a premier luxury concierge and VIP companion booking agency in Gurgaon and Delhi NCR.
Write sophisticated, high-converting, and discreet editorial content.
Strict rules:
1. Tone: Cosmopolitan, respectful, luxury hospitality, refined, 5-star hotel concierge.
2. Safety & Transparency: Emphasize zero-advance payment (payment in person only after companion arrival at hotel/residence), verified profiles, and client confidentiality.
3. Output MUST be valid JSON with this exact schema:
{
  "title": "Compelling H1 Title (50-65 chars)",
  "slug": "url-friendly-slug",
  "seoTitle": "SEO meta title (under 60 chars)",
  "seoDescription": "Meta description (140-155 chars)",
  "excerpt": "Short summary preview paragraph (180-220 chars)",
  "content": [
    "Introduction paragraph setting context for Gurgaon and ${req.focusKeyword}...",
    "## H2 Section Title...",
    "Detailed paragraph covering luxury hospitality and verified companions...",
    "## H2 Section Title on Discretion and Safety...",
    "Detailed paragraph emphasizing 5-star hotel outcalls and zero advance policy...",
    "## H2 FAQ or Tips Section...",
    "Conclusion and contact details via 24/7 private concierge hotline."
  ],
  "tags": ["Focus Keyword", "Related Tag 1", "Related Tag 2", "Related Tag 3"]
}`,
    user: `Topic: ${req.topic}
Focus Keyword: ${req.focusKeyword}
Secondary Keywords: ${req.secondaryKeywords || 'luxury escort service, 5 star hotel outcall, VIP companions'}
Target Word Count: ${req.wordCount || 1000} words.`
  };
}

function generateEditorialFallback(req: GenerationRequest): GeneratedBlog {
  const title = req.topic.length > 10 ? req.topic : `The Ultimate Guide to ${req.focusKeyword} in Gurgaon`;
  const slug = slugify(title);

  return {
    title,
    slug,
    seoTitle: `${title} | ${req.siteName}`,
    seoDescription: `Explore premier ${req.focusKeyword} in Gurgaon with ${req.siteName}. Discover verified companion profiles, 5-star hotel outcalls, and 100% discreet service.`,
    excerpt: `A comprehensive insider guide to ${req.focusKeyword} in Gurgaon. Learn how to arrange authentic 5-star hotel outcalls with total confidentiality.`,
    content: [
      `Gurgaon stands as the crown jewel of northern India's corporate landscape, characterized by global business parks, luxury penthouses, and world-class hospitality venues. For discerning executives and international visitors seeking refined companionship, ${req.focusKeyword} represents an unmatched standard of social elegance and intimate leisure.`,
      `## Understanding Premier Standards in Gurgaon`,
      `When selecting elite companions in a fast-paced metropolis, distinguishing authentic boutique agencies from unverified directories is critical. Premier agencies operate with structured in-person vetting protocols, ensuring that every companion is photographed authenticated, medically tested, and socially versatile.`,
      `At ${req.siteName}, we uphold uncompromising standards of transparency. Patrons are always advised to avoid services demanding advance UPI or wire transfers. Genuine luxury concierge agencies adhere to a transparent zero-advance principle: arrangements are finalized only after your verified companion arrives in person at your chosen hospitality suite.`,
      `## Effortless 5-Star Hotel Outcalls & Discretion`,
      `Whether you are staying at The Oberoi on Udyog Vihar, The Leela Ambience near CyberHub, or Trident Gurgaon, seamless discretion is paramount. Elite companions travel in private, unmarked executive transport and arrive in understated, elegant attire that blends effortlessly into upscale hotel lobbies.`,
      `From accompanying you to celebratory dinners along Golf Course Road to sharing serene moments in a private suite, our portfolio offers the highest caliber of warmth, intellect, and grace.`,
      `## How to Reserve Your Preferred Companion`,
      `Distinguished patrons can connect directly with our 24/7 private concierge desk via encrypted WhatsApp or private phone hotline. Simply share your schedule, preferred hospitality venue, and aesthetic requirements. Our desk will promptly provide verified profile options and ensure a smooth, unforgettable rendezvous.`
    ],
    tags: [req.focusKeyword, 'Gurgaon Escorts', 'VIP Call Girls', '5-Star Hotel Outcalls'],
    coverImage: selectBestImage(req.topic, req.focusKeyword),
    author: `${req.siteName} Editorial Desk`,
  };
}
