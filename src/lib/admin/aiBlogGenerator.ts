/**
 * Multi-Model AI Blog Post Generator Engine
 * Powered by Groq (with structured outputs & OpenAI GPT-OSS / Qwen / Llama) & Google Gemini fallback.
 * 
 * Re-exports core functionality from @/lib/ai with full backward compatibility.
 */

export { slugify } from '@/lib/slugify';
export {
  generateBlogPost,
  selectRandomImage,
  optimizeSeoSlug,
  purgeCompanionWords,
} from '@/lib/ai/generateBlogPost';

export type {
  GenerateBlogPostInput as GenerationRequest,
  GenerateBlogPostOutput as GeneratedBlog,
} from '@/lib/ai/generateBlogPost';
