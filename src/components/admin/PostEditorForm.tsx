'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminTenant } from '@/context/AdminTenantContext';
import { BlogPostRecord } from '@/lib/admin/supabaseAdmin';
import AssetPickerModal from '@/components/admin/AssetPickerModal';
import { slugify } from '@/lib/admin/aiBlogGenerator';
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
  Zap,
  Cpu,
  Key,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

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

  // Content state (stored as string in editor, serialized as paragraphs or text)
  const initialContentString = useMemo(() => {
    if (!initialPost?.content) return '';
    if (Array.isArray(initialPost.content)) return initialPost.content.join('\n\n');
    if (typeof initialPost.content === 'object' && 'paragraphs' in initialPost.content) {
      return (initialPost.content as { paragraphs: string[] }).paragraphs.join('\n\n');
    }
    return String(initialPost.content);
  }, [initialPost]);

  const [content, setContent] = useState(initialContentString);
  const [status, setStatus] = useState<'draft' | 'published'>(initialPost?.status === 'published' ? 'published' : 'draft');

  // UI state
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string; url?: string } | null>(null);

  // AI Generator state
  const [aiTopic, setAiTopic] = useState('');
  const [aiFocusKeyword, setAiFocusKeyword] = useState('');
  const [aiSecondaryKeywords, setAiSecondaryKeywords] = useState('');
  const [aiWordCount, setAiWordCount] = useState(1200);
  const [aiProvider, setAiProvider] = useState<'groq' | 'gemini'>('groq');
  const [aiGroqKey, setAiGroqKey] = useState('');
  const [aiGeminiKey, setAiGeminiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [rememberKeys, setRememberKeys] = useState(true);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [serverKeyStatus, setServerKeyStatus] = useState<{ hasGeminiKey: boolean; hasGroqKey: boolean }>({
    hasGeminiKey: true,
    hasGroqKey: false,
  });

  // Load saved keys & server key status
  useEffect(() => {
    try {
      const savedGroq = localStorage.getItem('alina_admin_groq_key');
      if (savedGroq) setAiGroqKey(savedGroq);
      const savedGemini = localStorage.getItem('alina_admin_gemini_key');
      if (savedGemini) setAiGeminiKey(savedGemini);
      const savedProvider = localStorage.getItem('alina_admin_ai_provider');
      if (savedProvider === 'groq' || savedProvider === 'gemini') {
        setAiProvider(savedProvider);
      }
    } catch (err) {
      void err;
    }

    fetch('/api/admin/generate-blog')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.hasGeminiKey === 'boolean') {
          setServerKeyStatus({
            hasGeminiKey: data.hasGeminiKey,
            hasGroqKey: Boolean(data.hasGroqKey),
          });
        }
      })
      .catch(() => {});
  }, []);

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

  // Handle AI generation
  const handleGenerateAI = async () => {
    setAiError(null);

    if (!aiTopic.trim()) {
      setAiError('Please enter an Article Topic / Concept.');
      return;
    }
    if (!aiFocusKeyword.trim()) {
      setAiError('Please enter a Primary Focus Keyword.');
      return;
    }

    const activeKey = aiProvider === 'groq' ? aiGroqKey.trim() : aiGeminiKey.trim();

    if (aiProvider === 'groq' && !activeKey && !serverKeyStatus.hasGroqKey) {
      setAiError('Groq API Key is required. Please paste your Groq key (starts with gsk_...) below or set GROQ_API_KEY in .env.local.');
      return;
    }

    if (rememberKeys) {
      try {
        if (aiGroqKey.trim()) localStorage.setItem('alina_admin_groq_key', aiGroqKey.trim());
        if (aiGeminiKey.trim()) localStorage.setItem('alina_admin_gemini_key', aiGeminiKey.trim());
        localStorage.setItem('alina_admin_ai_provider', aiProvider);
      } catch (err) {
        void err;
      }
    }

    setAiGenerating(true);
    try {
      const res = await fetch('/api/admin/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteName: targetSite?.name || 'ALINA VIP',
          domain: targetSite?.domain || 'alinavip.in',
          topic: aiTopic.trim(),
          focusKeyword: aiFocusKeyword.trim(),
          secondaryKeywords: aiSecondaryKeywords.trim(),
          wordCount: aiWordCount,
          provider: aiProvider,
          apiKey: activeKey || undefined,
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
      setIsAiModalOpen(false);
      setFeedback({
        type: 'success',
        message: `Article successfully generated via ${b.modelUsed || aiProvider.toUpperCase()} with 3+ spaced internal links!`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'AI generation error';
      setAiError(msg);
    } finally {
      setAiGenerating(false);
    }
  };

  // Save post
  const handleSave = async (publishImmediate = false) => {
    if (!title.trim() || !slug.trim()) {
      setFeedback({ type: 'error', message: 'Title and Slug are required.' });
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

      // If publish immediate requested, call publish and revalidate webhook
      if (publishImmediate && savedId) {
        const pubRes = await fetch('/api/admin/publish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId: savedId }),
        });
        const pubData = await pubRes.json();
        if (!pubRes.ok) throw new Error(pubData.error || 'Failed to publish');

        const liveUrl = targetSite ? `https://${targetSite.domain}/blog/${payload.slug}` : null;
        setStatus('published');
        setFeedback({
          type: 'success',
          message: `Published successfully! Live on https://${targetSite?.domain}/blog/${payload.slug}`,
          url: liveUrl || undefined,
        });
      } else {
        setFeedback({
          type: 'success',
          message: 'Post draft saved successfully to Supabase.',
        });
        if (isNew && savedId) {
          router.push(`/admin/blog/${savedId}`);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Save error';
      setFeedback({ type: 'error', message: msg });
    } finally {
      setSaving(false);
      setPublishing(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2 rounded-xl bg-white hover:bg-[#F2ECE4] text-stone-600 hover:text-stone-900 border border-[#E2DDD5] shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900">
              {isNew ? 'Create New Blog Post' : 'Edit Blog Post'}
            </h1>
            <p className="text-xs text-stone-600 mt-0.5">
              Target domain: <span className="text-[#671725] font-bold">{targetSite?.name}</span> ({targetSite?.domain})
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white shadow-xs hover:-translate-y-0.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Generator</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={saving || publishing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white hover:bg-[#F4EFE7] text-stone-800 border border-[#DCD6CC] shadow-2xs transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5 text-stone-600" />}
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={saving || publishing}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xs hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {publishing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Publish to Live Site</span>
          </button>
        </div>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold flex items-center justify-between gap-3 animate-in fade-in duration-200 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          {feedback.url && (
            <a
              href={feedback.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 underline font-bold text-[#671725] hover:text-[#881337] shrink-0"
            >
              <span>View Post Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      )}

      {/* Two Column Layout: Main Editor + Sidebar Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Title, Excerpt, Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post Title & Slug */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EAE5DD] shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                Article Title (H1)
              </label>
              <input
                type="text"
                value={title}
                onChange={e => handleTitleChange(e.target.value)}
                placeholder="e.g. The Discerning Gentleman’s Guide to Elite Escort Services in Gurgaon"
                className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E2DDD5] rounded-2xl text-base font-bold text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#671725] focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  URL Slug
                </label>
                <div className="flex items-center bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl px-3 py-2 text-xs">
                  <span className="text-stone-500 font-mono">/blog/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={e => setSlug(slugify(e.target.value))}
                    placeholder="my-new-post"
                    className="flex-1 bg-transparent text-[#671725] font-bold font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Author
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  placeholder="e.g. ALINA VIP Editorial Desk"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#671725] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                Article Excerpt (Summary for Cards & RSS)
              </label>
              <textarea
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                rows={2}
                placeholder="A compelling 1-2 sentence preview to engage incoming readers..."
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#671725] focus:bg-white leading-relaxed"
              />
            </div>
          </div>

          {/* Content Editor with Toolbar & Preview Tab */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EAE5DD] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE5DD]">
              <div className="flex items-center gap-1.5 bg-[#F4EFE7] p-1 rounded-xl border border-[#E8E2D8]">
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'edit'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Write / Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'preview'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Preview</span>
                </button>
              </div>

              <div className="text-[11px] text-stone-600 font-medium">
                {wordCount} words • {readTime}
              </div>
            </div>

            {/* Quick Formatting Bar */}
            {activeTab === 'edit' && (
              <div className="flex flex-wrap items-center gap-1 p-2 bg-[#FAF8F5] rounded-xl border border-[#E2DDD5]">
                <button
                  type="button"
                  onClick={() => insertFormatting('## ')}
                  className="px-2.5 py-1 text-xs font-bold text-stone-700 hover:text-stone-900 hover:bg-white rounded transition-colors"
                  title="Heading 2"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('### ')}
                  className="px-2.5 py-1 text-xs font-bold text-stone-700 hover:text-stone-900 hover:bg-white rounded transition-colors"
                  title="Heading 3"
                >
                  H3
                </button>
                <span className="text-stone-300">|</span>
                <button
                  type="button"
                  onClick={() => insertFormatting('**', '**')}
                  className="px-2.5 py-1 text-xs font-bold text-stone-700 hover:text-stone-900 hover:bg-white rounded transition-colors"
                  title="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('*', '*')}
                  className="px-2.5 py-1 text-xs italic font-serif text-stone-700 hover:text-stone-900 hover:bg-white rounded transition-colors"
                  title="Italic"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('- ')}
                  className="p-1.5 text-xs text-stone-700 hover:text-stone-900 hover:bg-white rounded transition-colors"
                  title="Bullet List"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('> ')}
                  className="p-1.5 text-xs text-stone-700 hover:text-stone-900 hover:bg-white rounded transition-colors"
                  title="Blockquote"
                >
                  <Quote className="w-3.5 h-3.5" />
                </button>
                <span className="text-stone-300">|</span>
                <button
                  type="button"
                  onClick={() => insertFormatting('[Link Text](', ')')}
                  className="px-2.5 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
                  title="Insert Internal Link"
                >
                  + Link
                </button>
                <button
                  type="button"
                  onClick={() => setIsAssetModalOpen(true)}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#671725] hover:bg-rose-50 rounded transition-colors"
                  title="Insert CDN Image"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Insert Asset</span>
                </button>
              </div>
            )}

            {/* Textarea or Markdown Preview */}
            {activeTab === 'edit' ? (
              <textarea
                id="blog-content-area"
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={18}
                placeholder="Write paragraphs or paste article content here. Separate paragraphs with double enter (blank line)..."
                className="w-full p-4 bg-[#FAF8F5] border border-[#E2DDD5] rounded-2xl text-xs sm:text-sm text-stone-900 font-sans leading-relaxed focus:outline-none focus:border-[#671725] focus:bg-white font-mono"
              />
            ) : (
              <div className="p-6 bg-[#FAF8F5] border border-[#E2DDD5] rounded-2xl min-h-[400px] prose max-w-none text-stone-800">
                {content.split('\n\n').map((paragraph, idx) => {
                  const trimmed = paragraph.trim();
                  if (trimmed.startsWith('## ')) {
                    return (
                      <h2 key={idx} className="text-xl font-extrabold text-stone-900 mt-6 mb-3 border-b border-stone-200 pb-1">
                        {trimmed.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (trimmed.startsWith('### ')) {
                    return (
                      <h3 key={idx} className="text-lg font-bold text-[#671725] mt-4 mb-2">
                        {trimmed.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (trimmed.startsWith('> ')) {
                    return (
                      <blockquote key={idx} className="border-l-4 border-[#671725] pl-4 italic text-stone-700 my-4 bg-white p-3 rounded-r-xl shadow-2xs">
                        {trimmed.replace('> ', '')}
                      </blockquote>
                    );
                  }
                  if (trimmed.startsWith('- ')) {
                    const items = trimmed.split('\n').filter(Boolean);
                    return (
                      <ul key={idx} className="list-disc pl-5 space-y-1.5 my-3 text-sm text-stone-700">
                        {items.map((it, i) => (
                          <li key={i}>{it.replace(/^-\s*/, '')}</li>
                        ))}
                      </ul>
                    );
                  }

                  // Render markdown links [text](url) inside preview paragraph
                  const renderedText = trimmed.replace(
                    /\[([^\]]+)\]\(([^)]+)\)/g,
                    '<a href="$2" class="text-[#671725] font-bold underline underline-offset-2 hover:text-[#881337]">$1</a>'
                  );

                  return (
                    <p
                      key={idx}
                      className="text-sm leading-relaxed text-stone-700 mb-4"
                      dangerouslySetInnerHTML={{ __html: renderedText }}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Column: Tenant Selector, Cover Image, SEO SERP Preview */}
        <div className="space-y-6">
          {/* Target Tenant Site */}
          <div className="p-5 rounded-3xl bg-white border border-[#EAE5DD] shadow-xs space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
              Target Sister Site
            </label>
            <select
              value={selectedSiteId}
              onChange={e => setSelectedSiteId(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs font-bold text-stone-900 focus:outline-none focus:border-[#671725]"
            >
              {sites.map(site => (
                <option key={site.id} value={site.id}>
                  {site.name} ({site.domain})
                </option>
              ))}
            </select>
            <div className="text-[11px] text-stone-500 flex items-center gap-1 font-medium">
              <Globe className="w-3.5 h-3.5 text-[#671725]" />
              <span>Publishes to: https://{targetSite?.domain}</span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="p-5 rounded-3xl bg-white border border-[#EAE5DD] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Cover Image
              </label>
              <button
                type="button"
                onClick={() => setIsAssetModalOpen(true)}
                className="text-xs font-bold text-[#671725] hover:text-[#881337] flex items-center gap-1"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Select Asset</span>
              </button>
            </div>

            {coverImage ? (
              <div className="relative rounded-2xl overflow-hidden border border-[#E2DDD5] bg-stone-100 group shadow-2xs">
                <img
                  src={coverImage}
                  alt="Post Cover"
                  className="w-full aspect-video object-cover"
                />
                <button
                  type="button"
                  onClick={() => setIsAssetModalOpen(true)}
                  className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-bold text-white transition-opacity"
                >
                  Change Cover Image
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsAssetModalOpen(true)}
                className="aspect-video w-full rounded-2xl border-2 border-dashed border-[#DCD6CD] hover:border-[#671725] bg-[#FAF8F5] flex flex-col items-center justify-center cursor-pointer p-4 text-center transition-colors"
              >
                <ImageIcon className="w-8 h-8 text-stone-400 mb-2" />
                <span className="text-xs font-bold text-stone-700">Choose from 70 ImageKit Assets</span>
                <span className="text-[10px] text-stone-500 mt-1">High-res WebP / AVIF CDN images</span>
              </div>
            )}
          </div>

          {/* Tags & Categories */}
          <div className="p-5 rounded-3xl bg-white border border-[#EAE5DD] shadow-xs space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="Russian Escorts, Gurgaon Escorts, 5 Star Hotels"
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#671725]"
            />
          </div>

          {/* SEO & SERP Preview */}
          <div className="p-5 rounded-3xl bg-white border border-[#EAE5DD] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                SEO Search Appearance
              </label>
              <span className="text-[10px] bg-rose-50 text-[#671725] px-2 py-0.5 rounded font-mono font-bold border border-rose-200">
                Google SERP
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                <span>SEO Meta Title</span>
                <span className={seoTitle.length > 60 ? 'text-rose-600 font-bold' : 'text-stone-400'}>
                  {seoTitle.length}/60 chars
                </span>
              </div>
              <input
                type="text"
                value={seoTitle}
                onChange={e => setSeoTitle(e.target.value)}
                placeholder={title || 'SEO Title...'}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#671725]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                <span>Meta Description</span>
                <span className={seoDescription.length > 155 ? 'text-rose-600 font-bold' : 'text-stone-400'}>
                  {seoDescription.length}/155 chars
                </span>
              </div>
              <textarea
                value={seoDescription}
                onChange={e => setSeoDescription(e.target.value)}
                rows={2}
                placeholder={excerpt || 'Meta Description...'}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#671725]"
              />
            </div>

            {/* Google SERP Live Simulation */}
            <div className="p-3.5 rounded-xl bg-white border border-stone-200 space-y-1 shadow-2xs">
              <div className="text-[11px] text-stone-500 truncate">
                https://{targetSite?.domain} &rsaquo; blog &rsaquo; {slug || 'article-slug'}
              </div>
              <div className="text-sm font-medium text-[#1a0dab] hover:underline cursor-pointer line-clamp-1">
                {seoTitle || title || 'Article Title Preview | Brand'}
              </div>
              <div className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {seoDescription || excerpt || 'Detailed description of this luxury guide will display in Google search results here...'}
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

      {/* AI Generator Modal Drawer */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white border border-[#EAE5DD] rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#EAE5DD] bg-[#FAF8F5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#671725] to-purple-800 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-stone-900">AI SEO Article Studio</h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      Multi-Model
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">
                    Targeting <strong className="text-stone-800">{targetSite?.name}</strong> ({targetSite?.domain}) • 100% Brand-Grounded
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 text-sm font-bold transition-all"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-5 text-xs">
              {/* Model Selection Tabs */}
              <div>
                <label className="block font-bold text-stone-700 mb-2">
                  Select AI Generation Engine
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Groq Card */}
                  <button
                    type="button"
                    onClick={() => {
                      setAiProvider('groq');
                      setAiError(null);
                    }}
                    className={`text-left p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                      aiProvider === 'groq'
                        ? 'border-purple-600 bg-purple-50/50 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            aiProvider === 'groq' ? 'bg-purple-600 text-white' : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          <Zap className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-extrabold text-stone-900 text-xs">Groq LPU</div>
                          <div className="text-[10px] text-stone-500 font-medium">Llama 3.3 70B</div>
                        </div>
                      </div>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        ★ Best for SEO
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      Uncensored escort/concierge keywords, humanized conversational tone, zero robotic cliches.
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px]">
                      <span className="text-stone-500">Speed: ~250 tok/s</span>
                      {aiGroqKey || serverKeyStatus.hasGroqKey ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Key Ready
                        </span>
                      ) : (
                        <span className="text-amber-600 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" /> Enter Key Below
                        </span>
                      )}
                    </div>
                  </button>

                  {/* Gemini Card */}
                  <button
                    type="button"
                    onClick={() => {
                      setAiProvider('gemini');
                      setAiError(null);
                    }}
                    className={`text-left p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                      aiProvider === 'gemini'
                        ? 'border-purple-600 bg-purple-50/50 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            aiProvider === 'gemini' ? 'bg-purple-600 text-white' : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          <Cpu className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-extrabold text-stone-900 text-xs">Google Gemini</div>
                          <div className="text-[10px] text-stone-500 font-medium">3.5 Flash Model</div>
                        </div>
                      </div>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        Server Ready
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      Deep Google knowledge graph & Indian NCR local landmark intelligence.
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px]">
                      <span className="text-stone-500">Auto Fallback</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Built-in Active
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Contextual API Key Box */}
              {aiProvider === 'groq' ? (
                <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs">
                      <Key className="w-3.5 h-3.5 text-amber-700" />
                      <span>Groq API Key (gsk_...)</span>
                    </div>
                    {serverKeyStatus.hasGroqKey && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Server Key Configured
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showKey ? 'text' : 'password'}
                      value={aiGroqKey}
                      onChange={e => setAiGroqKey(e.target.value)}
                      placeholder={
                        serverKeyStatus.hasGroqKey
                          ? 'Leave blank to use server GROQ_API_KEY or paste custom key'
                          : 'Paste your Groq key (gsk_...)'
                      }
                      className="w-full pl-3 pr-16 py-2 bg-white border border-amber-300 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-purple-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-[10px] font-bold text-stone-500 hover:text-stone-800"
                    >
                      {showKey ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-amber-800 pt-0.5">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberKeys}
                        onChange={e => setRememberKeys(e.target.checked)}
                        className="rounded text-purple-600 focus:ring-purple-500"
                      />
                      <span>Remember key on this browser</span>
                    </label>
                    <span className="text-stone-500 text-[10px]">Saved in localStorage</span>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-blue-900 text-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                      <span>Google Gemini Authentication</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Ready in .env.local
                    </span>
                  </div>
                  <p className="text-[11px] text-blue-800">
                    Pre-configured with verified Google Gemini key. Leave blank to use server default or paste custom key to override.
                  </p>
                  <div className="relative">
                    <input
                      type={showKey ? 'text' : 'password'}
                      value={aiGeminiKey}
                      onChange={e => setAiGeminiKey(e.target.value)}
                      placeholder="Leave blank to use pre-configured server key"
                      className="w-full pl-3 pr-16 py-2 bg-white border border-blue-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-purple-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-[10px] font-bold text-stone-500 hover:text-stone-800"
                    >
                      {showKey ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
              )}

              {/* Topic Input */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Article Topic / Concept <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={e => setAiTopic(e.target.value)}
                  placeholder="e.g. Slavic Elegance: Why Russian Escorts in Gurgaon Remain the Gold Standard"
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-purple-600"
                />
              </div>

              {/* Keyword & Word Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Primary SEO Focus Keyword <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={aiFocusKeyword}
                    onChange={e => setAiFocusKeyword(e.target.value)}
                    placeholder="e.g. Russian Escorts Gurgaon"
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Target Word Count
                  </label>
                  <select
                    value={aiWordCount}
                    onChange={e => setAiWordCount(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-900 focus:outline-none focus:border-purple-600 font-medium"
                  >
                    <option value={800}>800 words (Standard Article)</option>
                    <option value={1200}>1,200 words (SEO Deep Guide - Recommended)</option>
                    <option value={1600}>1,600 words (Ultimate Pillar Authority)</option>
                  </select>
                </div>
              </div>

              {/* Secondary Keywords */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Secondary LSI Keywords (optional)
                </label>
                <input
                  type="text"
                  value={aiSecondaryKeywords}
                  onChange={e => setAiSecondaryKeywords(e.target.value)}
                  placeholder="e.g. 5 star hotel outcalls, DLF Cyber City, verified profiles, zero advance"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-purple-600"
                />
              </div>

              {/* Guarantees Box */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-[11px] text-stone-600 space-y-1">
                <div className="font-bold text-stone-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Guaranteed Editorial Standards:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-stone-600 pl-1">
                  <li>
                    <strong>100% Brand-Loyal:</strong> Exclusively promotes {targetSite?.name} ({targetSite?.domain}), zero competitor mentions.
                  </li>
                  <li>
                    <strong>Spaced Internal Links:</strong> Automatically weaves 3+ natural links across intro, middle, and end.
                  </li>
                  <li>
                    <strong>Random Unique Image:</strong> Automatically picks 1 of 70 verified ImageKit master CDN assets.
                  </li>
                  <li>
                    <strong>Rich Formatting:</strong> Uses H2/H3 headings, safety checklist, styled Concierge Tip, and FAQs.
                  </li>
                </ul>
              </div>

              {/* Visible Actionable Error Banner (No Silent Fallback) */}
              {aiError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 space-y-1 animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold text-xs text-rose-900">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Generation Error Encountered</span>
                  </div>
                  <p className="text-xs leading-relaxed text-rose-800">{aiError}</p>
                  <div className="text-[11px] text-rose-700 pt-1 border-t border-rose-200/70">
                    Tip: If using Groq, confirm your API key starts with <code className="bg-rose-100 px-1 py-0.5 rounded font-mono">gsk_...</code>. You can also switch to Gemini to generate immediately.
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-t border-[#EAE5DD] bg-[#FAF8F5]">
              <button
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={aiGenerating}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white shadow-md disabled:opacity-50 transition-all cursor-pointer"
              >
                {aiGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Writing Article via {aiProvider === 'groq' ? 'Groq LPU' : 'Gemini'}...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate with {aiProvider === 'groq' ? 'Groq Llama 3.3' : 'Gemini 3.5'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
