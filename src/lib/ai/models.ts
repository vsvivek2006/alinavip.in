export interface AIModelOption {
  id: string;
  name: string;
  provider: 'Groq' | 'Google Gemini';
  badge: string;
  description: string;
  contextWindow: string;
  speed: string;
  isDefault?: boolean;
}

export const AVAILABLE_MODELS: AIModelOption[] = [
  {
    id: 'openai/gpt-oss-120b',
    name: 'OpenAI GPT-OSS 120B (Groq)',
    provider: 'Groq',
    badge: 'Recommended • Flagship',
    description: 'Deep analytical substance, varied human editorial cadence, elite SEO strategy',
    contextWindow: '131k',
    speed: '~5s',
    isDefault: true,
  },
  {
    id: 'qwen/qwen3.8-27b',
    name: 'Qwen 3.8 27B (Groq)',
    provider: 'Groq',
    badge: 'High Reasoning',
    description: 'Strict structural and link compliance, balanced long-form editorial framework',
    contextWindow: '131k',
    speed: '~4s',
  },
  {
    id: 'openai/gpt-oss-20b',
    name: 'OpenAI GPT-OSS 20B (Groq)',
    provider: 'Groq',
    badge: 'Ultra-Fast',
    description: 'Sub-3s generation speed, punchy conversion structure, agile hospitality guides',
    contextWindow: '131k',
    speed: '~2.5s',
  },
  {
    id: 'gemini-3.6-flash',
    name: 'Google Gemini 3.6 Flash',
    provider: 'Google Gemini',
    badge: 'Google AI Flagship',
    description: 'Next-generation reasoning, multimodal depth, and high SERP search-intent fidelity',
    contextWindow: '1M',
    speed: '~3s',
  },
  {
    id: 'gemini-3.5-flash',
    name: 'Google Gemini 3.5 Flash',
    provider: 'Google Gemini',
    badge: 'Deep Editorial',
    description: 'Nuanced long-form composition, exhaustive VIP hospitality guidelines',
    contextWindow: '1M',
    speed: '~3.5s',
  },
];

export const DEFAULT_MODEL_ID = 'openai/gpt-oss-120b';

export function getValidModel(modelId?: string): string {
  if (!modelId) return DEFAULT_MODEL_ID;
  const match = AVAILABLE_MODELS.find((m) => m.id === modelId);
  return match ? match.id : DEFAULT_MODEL_ID;
}

