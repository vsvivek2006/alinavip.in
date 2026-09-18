/**
 * AI Blog Post Generator Engine
 * Generates 100% humanized, brand-grounded SEO editorial articles for the active sister site.
 * Enforces strict anti-AI tone rules, natural internal linking (3+ links spaced across the body),
 * varied formatting (H2/H3, bullet points, callout quotes, FAQs), and exclusive brand loyalty.
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

  if (apiKey) {
    try {
      if (provider === 'groq') {
        return await generateWithGroq(req, apiKey);
      } else if (provider === 'gemini') {
        return await generateWithGemini(req, apiKey);
      }
    } catch (err) {
      console.warn('[aiBlogGenerator] LLM API call failed, falling back to expert humanized template:', err);
    }
  }

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
      temperature: 0.72,
    }),
  });

  if (!res.ok) throw new Error(`Groq API error: ${res.statusText}`);
  const data = await res.json();
  const rawContent = data.choices[0].message.content;
  const parsed = JSON.parse(rawContent);

  return sanitizeOutput(parsed, req);
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
        temperature: 0.72,
      },
    }),
  });

  if (!res.ok) throw new Error(`Gemini API error: ${res.statusText}`);
  const data = await res.json();
  const text = data.candidates[0].content.parts[0].text;
  const parsed = JSON.parse(text);

  return sanitizeOutput(parsed, req);
}

function sanitizeOutput(parsed: Record<string, unknown>, req: GenerationRequest): GeneratedBlog {
  const title = (parsed.title as string) || req.topic;
  let content = Array.isArray(parsed.content) ? (parsed.content as string[]) : [String(parsed.content)];

  // Ensure at least 3 internal links exist across the body
  content = ensureInternalLinks(content, req);

  return {
    title,
    slug: slugify((parsed.slug as string) || (parsed.title as string) || req.topic),
    seoTitle: (parsed.seoTitle as string) || title,
    seoDescription: (parsed.seoDescription as string) || (parsed.excerpt as string),
    excerpt: (parsed.excerpt as string) || '',
    content,
    tags: (parsed.tags as string[]) || [req.focusKeyword, 'Luxury Concierge', 'Gurgaon Escorts'],
    coverImage: selectBestImage(req.topic, req.focusKeyword),
    author: `${req.siteName} Editorial Desk`,
  };
}

/**
 * Guarantees at least 3 contextual internal markdown links spaced across the body
 */
function ensureInternalLinks(paragraphs: string[], _req: GenerationRequest): string[] {
  const fullText = paragraphs.join(' ');
  const linkCount = (fullText.match(/\[([^\]]+)\]\(([^)]+)\)/g) || []).length;

  if (linkCount >= 3) return paragraphs;

  const result = [...paragraphs];

  // 1. Early link in intro (paragraph 0 or 1)
  if (result.length > 0 && !result[0].includes('](/')) {
    result[0] = result[0] + ` Patrons seeking verified standards can browse our curated [companion gallery](/gallery) for authentic, authenticated portfolios.`;
  }

  // 2. Middle link in section 2 or 3
  const midIndex = Math.floor(result.length / 2);
  if (result[midIndex] && !result[midIndex].includes('](/')) {
    result[midIndex] = result[midIndex] + ` Explore our premier [5-star hotel outcall services](/services) tailored for corporate executives and international visitors across Gurgaon.`;
  }

  // 3. Late link in location/rates/contact section
  const lateIndex = Math.max(1, result.length - 2);
  if (result[lateIndex] && !result[lateIndex].includes('](/')) {
    result[lateIndex] = result[lateIndex] + ` For personalized requests in DLF Phase 1, Cyber City, and Aerocity, review our [service locations](/locations) or connect with our 24/7 desk via [private contact](/contact).`;
  }

  return result;
}

function createSystemPrompt(req: GenerationRequest) {
  return {
    system: `You are a senior lifestyle journalist and private concierge director writing exclusively for ${req.siteName} (https://${req.domain}).
Your writing must be 100% human, authoritative, polished, and natural.

STRICT BRAND LOYALTY RULES:
1. ONLY speak positively and authoritatively about ${req.siteName} (${req.domain}).
2. NEVER mention other competitor websites, third-party phone numbers, or rival platforms.
3. Position ${req.siteName} as the gold standard of verified, safe, zero-advance, and discreet companionship in Gurgaon and Delhi NCR.

STRICT HUMAN WRITING RULES (ANTI-AI GUARDRAILS):
- FORBIDDEN WORDS & PHRASES (DO NOT USE): "In this fast-paced world", "delve into", "tapestry", "beacon", "testament", "look no further", "in conclusion", "furthermore", "moreover", "plethora", "crucial role", "navigating the world of", "dive into", "embark on".
- Write naturally with conversational authority: use first-person plural ("we", "our concierge desk", "clients frequently share with us").
- Keep paragraphs compact (2-4 sentences max). Never produce giant walls of monotonous text.
- Ground the writing in real locations: DLF CyberHub, Horizon Plaza, Golf Course Road, Aerocity, The Oberoi, The Leela Ambience, Trident Gurgaon.

MANDATORY FORMATTING DIVERSITY:
- Mix of ## H2 and ### H3 headings.
- Bulleted checklist: Include 3-5 crisp bullet points highlighting safety, vetting, or booking etiquette.
- Blockquote tip: Include a "> Tip for 5-Star Hotel Guests:" blockquote.
- FAQ Section: Include a "## Frequently Asked Questions" section with 2-3 practical, realistic Q&As.

MANDATORY INTERNAL LINKING (SPACED THROUGHOUT):
You MUST weave at least 3 internal markdown links naturally into the body text at different points (NOT bunched together):
- Link 1 in the introduction or early section: e.g. [verified companion gallery](/gallery) or [curated escort categories](/categories)
- Link 2 in the middle section: e.g. [5-star hotel outcall services](/services) or [Russian call girls in Gurgaon](/category/russian-call-girls)
- Link 3 near the end: e.g. [Gurgaon service areas](/locations) or [private concierge contact](/contact) or [transparent rates](/rates)

JSON OUTPUT SCHEMA:
{
  "title": "Natural H1 Title (50-65 chars)",
  "slug": "url-friendly-slug",
  "seoTitle": "SEO meta title (under 60 chars)",
  "seoDescription": "Engaging meta description (140-155 chars)",
  "excerpt": "Compelling 2-sentence preview for article cards (180-220 chars)",
  "content": [
    "Paragraph 1 with natural intro...",
    "Paragraph 2 with early internal link e.g. [verified gallery](/gallery)...",
    "## H2 Section Headline",
    "Paragraph exploring local venue dynamics...",
    "- Bullet feature 1\\n- Bullet feature 2\\n- Bullet feature 3",
    "> Pro-Tip: In-person settlement only after arrival...",
    "## H2 Section Headline with Mid Link e.g. [outcall services](/services)",
    "Detailed practical advice...",
    "## Frequently Asked Questions",
    "**Q: How quickly can a companion arrive at major Gurgaon hotels?**\\n\\nA: Our dispatch arrives within 20 to 30 minutes across DLF, Cyber City, and Golf Course Road.",
    "**Q: Are advance payments required?**\\n\\nA: Never. ${req.siteName} maintains a strict zero-advance policy.",
    "## Reserving with ${req.siteName}",
    "Final paragraph with closing link to [our 24/7 concierge](/contact)..."
  ],
  "tags": ["Focus Keyword", "Gurgaon Escorts", "VIP Companions", "Hotel Outcalls"]
}`,
    user: `Topic: ${req.topic}
Focus Keyword: ${req.focusKeyword}
Secondary Keywords: ${req.secondaryKeywords || 'luxury hotel outcalls, DLF Cyber City, verified profiles'}
Target Word Count: ${req.wordCount || 1000} words.`
  };
}

function generateEditorialFallback(req: GenerationRequest): GeneratedBlog {
  const title = req.topic.length > 10 ? req.topic : `The Discerning Gentleman’s Guide to ${req.focusKeyword} in Gurgaon`;
  const slug = slugify(title);

  const content: string[] = [
    `Gurgaon’s emergence as a premier international business hub has brought with it an executive lifestyle that values high privacy, sophistication, and refined social companionship. When gentlemen travel to Delhi NCR for business meetings or leisure, finding authentic ${req.focusKeyword} requires partnering with an established agency that respects confidentiality.`,
    
    `At ${req.siteName}, we take pride in curating authentic, handpicked companions. Rather than browsing generic unverified portals, patrons can review our authenticated [companion gallery](/gallery) to inspect authentic photographs and genuine profiles with total confidence.`,
    
    `## What Defines Verified Standards at ${req.siteName}`,
    
    `A distinguished agency operates with clear, transparent principles that safeguard the client at every stage of the reservation:`,
    
    `- **100% Photo Authenticity**: Every companion profile is photographed in person, eliminating misleading stock images.\n- **Strict Zero-Advance Policy**: Never transfer money via UPI or wire in advance. Payment is settled in person only after your companion arrives.\n- **Discreet Executive Transport**: Companions travel via private chauffeur, arriving punctually at upscale venues.\n- **Complete Digital Anonymity**: Inquiry chats and details are purged immediately following your engagement.`,
    
    `> **Concierge Tip for 5-Star Hotel Guests**: When scheduling an outcall to properties such as The Oberoi on Udyog Vihar or The Leela Ambience near CyberHub, simply provide your room details to our desk. Our companions arrive dressed in tasteful evening wear that blends effortlessly with upscale lobby ambiance.`,
    
    `## Tailored Outcalls Across Prime Gurgaon Locations`,
    
    `Whether you are hosting a client dinner along Golf Course Road or unwinding in a private penthouse suite, our [exclusive escort services](/services) cater to varied social and personal requirements. We regularly serve corporate executives across DLF Phase 1, Phase 2, Phase 5, Cyber City, and Aerocity.`,
    
    `Our portfolio includes sophisticated multilingual escorts, fashion models, and executive companions who bring intelligence, charm, and social grace to any evening.`,
    
    `## Frequently Asked Questions`,
    
    `**Q: How fast is dispatch to hotels in Gurgaon?**\n\nA: Dispatch typically takes between 20 to 35 minutes to major hotels across Cyber City, MG Road, and Sohna Road.`,
    
    `**Q: Does ${req.siteName} ask for advance booking fees?**\n\nA: Absolutely not. We strictly adhere to a zero-advance policy. You only settle directly once your companion arrives at your suite and you are completely pleased.`,
    
    `**Q: Which areas are covered in Delhi NCR?**\n\nA: We cover over 100+ sectors in Gurgaon as well as Aerocity, South Delhi, and Noida. Explore our complete list of [service locations](/locations) for local response times.`,
    
    `## Connecting with Our Private Concierge Desk`,
    
    `Ready to arrange your rendezvous? Connect directly with our team through our [24/7 private concierge](/contact) on WhatsApp or direct hotline. Share your preferred time, hospitality venue, and companion preferences, and our desk will confirm arrangements promptly with absolute discretion.`
  ];

  return {
    title,
    slug,
    seoTitle: `${title} | ${req.siteName}`,
    seoDescription: `Discover verified ${req.focusKeyword} in Gurgaon with ${req.siteName}. 5-star hotel outcalls, zero advance payment, and 100% discrete companionship.`,
    excerpt: `An insider guide to ${req.focusKeyword} in Gurgaon. Learn how ${req.siteName} delivers 100% verified profiles, 5-star hotel outcalls, and total discretion.`,
    content,
    tags: [req.focusKeyword, 'Gurgaon Escorts', 'VIP Companions', '5-Star Hotel Outcalls'],
    coverImage: selectBestImage(req.topic, req.focusKeyword),
    author: `${req.siteName} Editorial Desk`,
  };
}
