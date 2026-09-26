'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminTenant } from '@/context/AdminTenantContext';
import type { BlogPostRecord } from '@/lib/admin/supabaseAdmin';
import AssetPickerModal from '@/components/admin/AssetPickerModal';
import { slugify } from '@/lib/slugify';
import {
  Sparkles,
  Save,
  Send,
  ArrowLeft,
  Image as ImageIcon,
  Globe,
  CheckCircle2,
  AlertCircle,
  Eye,
  Edit3,
  Loader2,
  ExternalLink,
  List,
  Quote,
  Wand2,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import ArticleContentRenderer from '@/components/blog/ArticleContentRenderer';

const AI_MODEL_OPTIONS = [
  {
    id: 'openai/gpt-oss-120b',
    name: 'Groq GPT-OSS 120B',
    provider: 'groq' as const,
    badge: 'Top Pick',
    desc: 'LPU Ultra-fast • Unfiltered 120B',
  },
  {
    id: 'qwen/qwen3.8-27b',
    name: 'Groq Qwen 27B',
    provider: 'groq' as const,
    badge: 'Lightning',
    desc: 'Instant generation • High precision',
  },
  {
    id: 'gemini-3.6-flash',
    name: 'Gemini 3.6 Flash',
    provider: 'gemini' as const,
    badge: 'Google AI',
    desc: 'Next-gen reasoning • Top SERP intent',
  },
  {
    id: 'gemini-3.5-flash',
    name: 'Gemini 3.5 Flash',
    provider: 'gemini' as const,
    badge: 'Google AI',
    desc: 'Deep editorial & long-form nuance',
  },
];

interface PostEditorFormProps {
  initialPost?: BlogPostRecord | null;
  isNew?: boolean;
}

export default function PostEditorForm({ initialPost, isNew = false }: PostEditorFormProps) {
  const router = useRouter();
  const { sites, activeSite } = useAdminTenant();

  // Target site
  const [selectedSiteId, setSelectedSiteId] = useState<string>(
    initialPost?.site_id || activeSite?.id || ''
  );

  // Form states
  const [title, setTitle] = useState(initialPost?.title || '');
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '');
  const [coverImage, setCoverImage] = useState<string | null>(initialPost?.cover_image || null);
  const [author, setAuthor] = useState(initialPost?.author || 'ALINA VIP Editorial Team');
  const [tagsInput, setTagsInput] = useState((initialPost?.tags || []).join(', '));
  const [seoTitle, setSeoTitle] = useState(initialPost?.seo_title || '');
  const [seoDescription, setSeoDescription] = useState(initialPost?.seo_description || '');

  // Content state
  const initialContentString = useMemo(() => {
    if (!initialPost?.content) return '';
    if (Array.isArray(initialPost.content)) return initialPost.content.join('\n\n');
    if (typeof initialPost.content === 'object' && 'paragraphs' in initialPost.content) {
      return (initialPost.content as { paragraphs: string[] }).paragraphs.join('\n\n');
    }
    return String(initialPost.content);
  }, [initialPost]);

  const [content, setContent] = useState(initialContentString);
  const [status, setStatus] = useState<'draft' | 'published'>(
    initialPost?.status === 'published' ? 'published' : 'draft'
  );

  // UI states
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string; url?: string } | null>(null);

  // Inline AI Generator states (Inline Choice - Zero Popups)
  const [aiTopic, setAiTopic] = useState('');
  const [aiFocusKeyword, setAiFocusKeyword] = useState('');
  const [aiSecondaryKeywords, setAiSecondaryKeywords] = useState('');
  const [aiSelectedModel, setAiSelectedModel] = useState('openai/gpt-oss-120b');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Sync selected site if activeSite loads later
  useEffect(() => {
    if (!selectedSiteId && activeSite?.id) {
      setSelectedSiteId(activeSite.id);
    }
  }, [selectedSiteId, activeSite]);

  // Current Target Site details
  const targetSite = useMemo(() => {
    return sites.find(s => s.id === selectedSiteId) || activeSite;
  }, [sites, selectedSiteId, activeSite]);

  // Auto-generate slug from title if new
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (isNew && (!slug || slug === slugify(title))) {
      setSlug(slugify(newTitle));
    }
  };

  // Word count & read time
  const wordCount = useMemo(() => {
    return content.trim().split(/\s+/).filter(Boolean).length;
  }, [content]);

  const readTime = useMemo(() => {
    return `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
  }, [wordCount]);

  // Toolbar action helpers
  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('blog-content-area') as HTMLTextAreaElement | null;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || 'text';
    const before = content.substring(0, start);
    const after = content.substring(end);
    const newContent = `${before}${prefix}${selectedText}${suffix}${after}`;
    setContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 50);
  };

  // Handle AI generation inline with user-selected model
  const handleGenerateAI = async () => {
    setAiError(null);

    if (!aiTopic.trim()) {
      const err = 'Please enter what you would like to write about.';
      setAiError(err);
      toast.error(err);
      return;
    }
    if (!aiFocusKeyword.trim()) {
      const err = 'Please enter a Primary Search Keyword.';
      setAiError(err);
      toast.error(err);
      return;
    }

    const chosenModelConfig = AI_MODEL_OPTIONS.find(m => m.id === aiSelectedModel) || AI_MODEL_OPTIONS[0];

    setAiGenerating(true);
    toast.info(`Generating article with ${chosenModelConfig.name}...`, { duration: 4000 });
    try {
      const res = await fetch('/api/admin/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteName: targetSite?.name || 'ALINA VIP',
          domain: targetSite?.domain || 'alinavip.in',
          topic: aiTopic.trim(),
          focusKeyword: aiFocusKeyword.trim(),
          secondaryKeywords: aiSecondaryKeywords.trim() || undefined,
          wordCount: 1200,
          provider: chosenModelConfig.provider,
          model: chosenModelConfig.id,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate article');
      }

      const b = data.blog;
      setTitle(b.title);
      setSlug(b.slug);
      setExcerpt(b.excerpt);
      setSeoTitle(b.seoTitle);
      setSeoDescription(b.seoDescription);
      setContent(Array.isArray(b.content) ? b.content.join('\n\n') : b.content);
      setCoverImage(b.coverImage);
      setTagsInput(b.tags.join(', '));
      if (b.author) setAuthor(b.author);

      setFeedback({
        type: 'success',
        message: 'Article draft successfully written! Review the formatted sections, headings, and links below.',
      });
      toast.success('Article draft generated!', {
        description: 'Formatted sections, headings, and SEO keywords ready to review.',
      });

      // Smooth scroll to the article canvas
      const editorElement = document.getElementById('blog-content-area');
      if (editorElement) {
        editorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'AI generation failed';
      setAiError(msg);
      toast.error(`AI generation failed: ${msg}`);
    } finally {
      setAiGenerating(false);
    }
  };

  // Save post
  const handleSave = async (publishImmediate = false) => {
    if (!title.trim() || !slug.trim()) {
      const msg = 'Article Title and Web Address (URL) are required.';
      setFeedback({ type: 'error', message: msg });
      toast.error(msg);
      return;
    }

    if (!selectedSiteId) {
      const msg = 'Please choose a target website from the sidebar before saving or publishing.';
      setFeedback({ type: 'error', message: msg });
      toast.error(msg);
      return;
    }

    const nextStatus = publishImmediate ? 'published' : status;
    if (publishImmediate) setPublishing(true);
    else setSaving(true);
    setFeedback(null);

    const paragraphs = content
      .split('\n\n')
      .map(p => p.trim())
      .filter(Boolean);

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const payload = {
      site_id: selectedSiteId,
      slug: slugify(slug),
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: paragraphs,
      cover_image: coverImage,
      author: author.trim(),
      status: nextStatus,
      ai_generated: Boolean(initialPost?.ai_generated),
      seo_title: (seoTitle || title).trim(),
      seo_description: (seoDescription || excerpt).trim(),
      tags,
    };

    try {
      let savedId = initialPost?.id;

      if (isNew) {
        const res = await fetch('/api/admin/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to create post');
        savedId = data.post.id;
      } else {
        const res = await fetch(`/api/admin/posts/${initialPost?.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update post');
      }

      if (publishImmediate && savedId) {
        const pubRes = await fetch('/api/admin/publish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId: savedId }),
        });
        const pubData = await pubRes.json();
        if (!pubRes.ok) throw new Error(pubData.error || 'Failed to publish');

        const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        const liveUrl = isLocal
          ? `/blog/${payload.slug}`
          : (targetSite ? `https://${targetSite.domain}/blog/${payload.slug}` : `/blog/${payload.slug}`);

        setStatus('published');
        setFeedback({
          type: 'success',
          message: `Published successfully! View live on ${isLocal ? 'Local Server' : targetSite?.domain}`,
          url: liveUrl,
        });

        toast.success('Article published & live!', {
          description: `Post is live at /blog/${payload.slug}`,
          action: {
            label: 'View Live Post',
            onClick: () => window.open(liveUrl, '_blank'),
          },
          duration: 10000,
        });
      } else {
        setFeedback({
          type: 'success',
          message: 'Article draft saved successfully.',
        });
        toast.success('Article draft saved successfully.');
        if (isNew && savedId) {
          router.push(`/admin/blog/${savedId}`);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Save error';
      setFeedback({ type: 'error', message: msg });
      toast.error(`Save error: ${msg}`);
    } finally {
      setSaving(false);
      setPublishing(false);
    }
  };

  return (
    <div className="space-y-6 pb-24 font-sans max-w-7xl mx-auto">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-[#EAE5DD] shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2.5 rounded-2xl bg-[#FAF9F6] hover:bg-[#F2ECE4] text-stone-600 hover:text-stone-900 border border-[#E2DDD5] shadow-2xs transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {isNew ? 'Write New Article' : 'Edit Article'}
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Publishing to: <span className="text-[#671725] font-bold">{targetSite?.name}</span> ({targetSite?.domain})
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={saving || publishing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold bg-[#FAF9F6] hover:bg-[#F4EFE7] text-stone-800 border border-[#DCD6CC] shadow-2xs transition-colors disabled:opacity-50 cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin text-stone-500" /> : <Save className="w-4 h-4 text-stone-600" />}
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={saving || publishing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-[#671725] to-[#881337] hover:from-[#7a1b2d] hover:to-[#9f1239] text-white shadow-xs hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
          >
            {publishing ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>Publish Article</span>
          </button>
        </div>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm font-medium flex items-center justify-between gap-3 animate-in fade-in duration-200 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          {feedback.url && (
            <a
              href={feedback.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 underline font-bold text-[#671725] hover:text-[#881337] shrink-0"
            >
              <span>View Live Post</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      )}

      {/* Main Workspace: 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Columns: Inline AI Writing Bar + Article Canvas */}
        <div className="lg:col-span-2 space-y-6">
          {/* INLINE AI GENERATOR (Inside page, ZERO POPUP, Model Selection Inline) */}
          <div className="rounded-3xl bg-gradient-to-r from-[#FAF8F5] to-[#F7F2ED] border border-[#E2DDD5] shadow-xs p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#671725] text-white flex items-center justify-center shadow-xs shrink-0">
                <Wand2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black text-stone-900 flex items-center gap-2">
                  <span>Write Full Article with AI</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 tracking-wider">
                    Instant 1-Click
                  </span>
                </h2>
                <p className="text-xs text-stone-500">
                  Creates a complete, structured article with call girls FAQs, concierge tips, headings, and internal links.
                </p>
              </div>
            </div>

            {/* Choose Model Option (Inline - No Popups) */}
            <div className="pt-1">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700">
                  Choose AI Model
                </label>
                <span className="text-[10px] font-medium text-stone-500">
                  Active: <strong className="text-[#671725]">{AI_MODEL_OPTIONS.find(m => m.id === aiSelectedModel)?.name}</strong>
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {AI_MODEL_OPTIONS.map(m => {
                  const isSelected = aiSelectedModel === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setAiSelectedModel(m.id)}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#671725] text-white border-[#671725] shadow-xs ring-1 ring-[#671725]'
                          : 'bg-white text-stone-800 border-[#E2DDD5] hover:border-stone-400 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-xs font-bold truncate">{m.name}</span>
                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                        }`}>
                          {m.badge}
                        </span>
                      </div>
                      <p className={`text-[10px] leading-tight line-clamp-1 ${
                        isSelected ? 'text-rose-100' : 'text-stone-500'
                      }`}>
                        {m.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
              <div className="sm:col-span-5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Article Topic / Headline <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={e => setAiTopic(e.target.value)}
                  placeholder="e.g. 5-Star Luxury Dining & VIP Escort Service in DLF Cyber City"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DDD5] rounded-xl text-xs sm:text-sm font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#671725] transition-all"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Search Keyword <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={aiFocusKeyword}
                  onChange={e => setAiFocusKeyword(e.target.value)}
                  placeholder="e.g. Russian Escorts Gurgaon"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E2DDD5] rounded-xl text-xs sm:text-sm font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#671725] transition-all"
                />
              </div>

              <div className="sm:col-span-3 flex items-end">
                <button
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={aiGenerating}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-[#671725] to-[#881337] hover:from-[#7a1b2d] hover:to-[#9f1239] text-white shadow-xs hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer h-[42px]"
                >
                  {aiGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Writing Draft...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Write Article</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Optional Secondary Keywords */}
            <div className="pt-0.5">
              <input
                type="text"
                value={aiSecondaryKeywords}
                onChange={e => setAiSecondaryKeywords(e.target.value)}
                placeholder="Optional secondary keywords for ranking (e.g. DLF Cyber City, 5-star hotel outcalls, zero advance)"
                className="w-full px-3.5 py-1.5 bg-white/80 border border-[#E2DDD5] rounded-lg text-xs font-medium text-stone-700 placeholder-stone-400 focus:outline-none focus:border-[#671725] transition-all"
              />
            </div>

            {aiError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{aiError}</span>
              </div>
            )}
          </div>

          {/* Article Title & Overview Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EAE5DD] shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Article Title (H1 Headline)
              </label>
              <input
                type="text"
                value={title}
                onChange={e => handleTitleChange(e.target.value)}
                placeholder="e.g. 5-Star Luxury Dining & VIP Escort Service in DLF Cyber City"
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E2DDD5] rounded-2xl text-base font-bold text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#671725] focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Web Address (URL)
                </label>
                <div className="flex items-center bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl px-3 py-2 text-xs">
                  <span className="text-stone-500">/blog/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={e => setSlug(slugify(e.target.value))}
                    placeholder="article-url-slug"
                    className="flex-1 bg-transparent text-[#671725] font-bold focus:outline-none ml-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Author Signature
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  placeholder="e.g. ALINA VIP Editorial Desk"
                  className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#671725] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Article Excerpt (Quick Summary for Cards & Social Previews)
              </label>
              <textarea
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                rows={2}
                placeholder="A compelling 1-2 sentence preview to engage readers..."
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#671725] focus:bg-white leading-relaxed font-sans"
              />
            </div>
          </div>

          {/* Editorial Content Canvas with Toolbar & Live Formatted Preview Tab */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EAE5DD] shadow-xs space-y-4">
            {/* View Switcher & Word Count */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAE5DD]">
              <div className="flex items-center gap-1.5 bg-[#F4EFE7] p-1 rounded-2xl border border-[#E8E2D8]">
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'edit'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Visual Writer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'preview'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Formatted Preview</span>
                </button>
              </div>

              <div className="text-xs text-stone-500 font-semibold flex items-center gap-2">
                <span>{wordCount} words</span>
                <span>•</span>
                <span>{readTime}</span>
              </div>
            </div>

            {/* Editorial Quick Formatting Bar */}
            {activeTab === 'edit' && (
              <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#FAF8F5] rounded-2xl border border-[#E2DDD5]">
                <button
                  type="button"
                  onClick={() => insertFormatting('## ')}
                  className="px-2.5 py-1.5 text-xs font-extrabold text-stone-700 hover:text-stone-900 hover:bg-white rounded-xl transition-colors cursor-pointer"
                  title="Insert Section Heading (H2)"
                >
                  H2 Section
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('### ')}
                  className="px-2.5 py-1.5 text-xs font-bold text-stone-700 hover:text-stone-900 hover:bg-white rounded-xl transition-colors cursor-pointer"
                  title="Insert Subheading (H3)"
                >
                  H3 Subhead
                </button>
                <span className="text-stone-300">|</span>
                <button
                  type="button"
                  onClick={() => insertFormatting('**', '**')}
                  className="px-2.5 py-1.5 text-xs font-bold text-stone-700 hover:text-stone-900 hover:bg-white rounded-xl transition-colors cursor-pointer"
                  title="Bold Text"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('*', '*')}
                  className="px-2.5 py-1.5 text-xs italic font-serif text-stone-700 hover:text-stone-900 hover:bg-white rounded-xl transition-colors cursor-pointer"
                  title="Italic Text"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('- ')}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-stone-700 hover:text-stone-900 hover:bg-white rounded-xl transition-colors cursor-pointer"
                  title="Bullet List"
                >
                  <List className="w-3.5 h-3.5" />
                  <span>List</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('> **Concierge Recommendation:** ')}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-stone-700 hover:text-stone-900 hover:bg-white rounded-xl transition-colors cursor-pointer"
                  title="Insert Concierge Highlight Box"
                >
                  <Quote className="w-3.5 h-3.5" />
                  <span>Highlight Box</span>
                </button>
                <span className="text-stone-300">|</span>
                <button
                  type="button"
                  onClick={() => insertFormatting('[Link Title](', ')')}
                  className="px-2.5 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
                  title="Insert Internal Link"
                >
                  + Add Link
                </button>
                <button
                  type="button"
                  onClick={() => setIsAssetModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#671725] bg-rose-50/70 hover:bg-rose-100/70 rounded-xl transition-colors cursor-pointer"
                  title="Choose from Photo Library"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Insert Photo</span>
                </button>
              </div>
            )}

            {/* Editor Canvas (Poppins font, NO font-mono) */}
            {activeTab === 'edit' ? (
              <textarea
                id="blog-content-area"
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={20}
                placeholder="Write your article here. Separate paragraphs with double enter (blank line). You can also click 'Write Article' above to automatically draft the full post..."
                className="w-full p-5 bg-[#FAF8F5] border border-[#E2DDD5] rounded-2xl text-sm sm:text-base text-stone-800 font-sans leading-relaxed focus:outline-none focus:border-[#671725] focus:bg-white transition-all shadow-2xs"
              />
            ) : (
              /* Beautiful Formatted Preview */
              <div className="p-6 sm:p-8 bg-[#FAF8F5] border border-[#E2DDD5] rounded-2xl min-h-[450px] font-sans text-stone-800">
                <ArticleContentRenderer content={content} />
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Column: Publishing Target, Cover Photo, Google Search Preview */}
        <div className="space-y-6">
          {/* Target Website Selector */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EAE5DD] shadow-xs space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Publish to Website
            </label>
            <select
              value={selectedSiteId}
              onChange={e => setSelectedSiteId(e.target.value)}
              className="w-full px-3.5 py-3 bg-[#FAF8F5] border border-[#E2DDD5] rounded-2xl text-xs sm:text-sm font-bold text-stone-900 focus:outline-none focus:border-[#671725]"
            >
              {sites.map(site => (
                <option key={site.id} value={site.id}>
                  {site.name} ({site.domain})
                </option>
              ))}
            </select>
            <div className="text-[11px] text-stone-500 flex items-center gap-1.5 font-medium">
              <Globe className="w-3.5 h-3.5 text-stone-400" />
              <span>Posts go live immediately on this site upon publishing.</span>
            </div>
          </div>

          {/* Featured Cover Photo */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EAE5DD] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Featured Cover Photo
              </label>
              <button
                type="button"
                onClick={() => setIsAssetModalOpen(true)}
                className="text-xs font-bold text-[#671725] hover:underline cursor-pointer"
              >
                Photo Library
              </button>
            </div>

            {coverImage ? (
              <div className="relative rounded-2xl overflow-hidden border border-[#E2DDD5] group aspect-video bg-stone-100">
                <img
                  src={coverImage}
                  alt={title || 'Cover image'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAssetModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-white text-stone-900 text-xs font-bold shadow-md hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverImage(null)}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md hover:bg-rose-700 transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAssetModalOpen(true)}
                className="w-full p-8 border-2 border-dashed border-[#DCD6CC] hover:border-[#671725] rounded-2xl text-center space-y-2 group transition-colors bg-[#FAF8F5] cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-white text-[#671725] flex items-center justify-center mx-auto shadow-2xs group-hover:scale-105 transition-transform">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-stone-800">
                  Select Featured Photo
                </div>
                <div className="text-[11px] text-stone-500">
                  Pick 1 of 70 high-resolution verified assets
                </div>
              </button>
            )}

            <input
              type="text"
              value={coverImage || ''}
              onChange={e => setCoverImage(e.target.value)}
              placeholder="Or paste direct image URL..."
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-700 placeholder-stone-400 focus:outline-none focus:border-[#671725]"
            />
          </div>

          {/* Tags / Categories */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EAE5DD] shadow-xs space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Article Tags (Comma-Separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="e.g. Russian Escorts, DLF Cyber City, Hotel Outcalls"
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#671725]"
            />
            <div className="text-[11px] text-stone-500">
              Used for related posts and search matching.
            </div>
          </div>

          {/* Google Search Preview */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EAE5DD] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Google Search Preview
              </label>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                SEO Optimized
              </span>
            </div>

            {/* Google SERP Snippet Box */}
            <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-stone-200 space-y-1">
              <div className="text-[11px] text-stone-600 truncate">
                https://{targetSite?.domain || 'alinavip.in'}/blog/{slug || 'article-slug'}
              </div>
              <div className="text-sm font-bold text-[#1a0dab] hover:underline cursor-pointer truncate">
                {seoTitle || title || 'Your Article Title Displays Here'}
              </div>
              <div className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {seoDescription || excerpt || 'Your meta description will appear here on Google search results...'}
              </div>
            </div>

            {/* Editable SEO Overrides */}
            <div className="space-y-2 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">
                  Custom Search Title ({seoTitle.length}/60 chars)
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={e => setSeoTitle(e.target.value)}
                  placeholder="Defaults to Article Title"
                  className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#671725]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">
                  Custom Meta Description ({seoDescription.length}/155 chars)
                </label>
                <textarea
                  value={seoDescription}
                  onChange={e => setSeoDescription(e.target.value)}
                  rows={2}
                  placeholder="Defaults to Article Excerpt"
                  className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#671725] leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Picker Modal */}
      <AssetPickerModal
        isOpen={isAssetModalOpen}
        onClose={() => setIsAssetModalOpen(false)}
        onSelectImage={url => setCoverImage(url)}
        currentSelectedUrl={coverImage}
      />
    </div>
  );
}
