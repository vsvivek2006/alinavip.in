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
  const [aiWordCount, setAiWordCount] = useState(1000);
  const [aiApiKey, setAiApiKey] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);

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
    if (!aiTopic.trim() || !aiFocusKeyword.trim()) {
      alert('Please provide at least a Topic and Focus Keyword');
      return;
    }

    setAiGenerating(true);
    try {
      const res = await fetch('/api/admin/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteName: targetSite?.name || 'ALINA VIP',
          domain: targetSite?.domain || 'alinavip.in',
          topic: aiTopic,
          focusKeyword: aiFocusKeyword,
          secondaryKeywords: aiSecondaryKeywords,
          wordCount: aiWordCount,
          apiKey: aiApiKey || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate');

      const b = data.blog;
      setTitle(b.title);
      setSlug(b.slug);
      setExcerpt(b.excerpt);
      setSeoTitle(b.seoTitle);
      setSeoDescription(b.seoDescription);
      setContent(Array.isArray(b.content) ? b.content.join('\n\n') : b.content);
      setCoverImage(b.coverImage);
      setTagsInput(b.tags.join(', '));
      setIsAiModalOpen(false);
      setFeedback({ type: 'success', message: '100% Humanized SEO Article with internal links generated & loaded!' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'AI generation error';
      alert(`AI Generation error: ${msg}`);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white border border-[#EAE5DD] rounded-3xl w-full max-w-xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE5DD]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-stone-900">Humanized AI SEO Article Writer</h3>
                  <p className="text-xs text-stone-500">100% brand-grounded for {targetSite?.name} with 3+ natural internal links</p>
                </div>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Article Topic / Concept
                </label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={e => setAiTopic(e.target.value)}
                  placeholder="e.g. Slavic Elegance: Why Russian Escorts in Gurgaon Remain the Gold Standard"
                  className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Focus SEO Keyword
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
                    <option value={800}>800 words (Standard)</option>
                    <option value={1200}>1,200 words (Deep Guide)</option>
                    <option value={1600}>1,600 words (Ultimate Pillar)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Secondary LSI Keywords (optional)
                </label>
                <input
                  type="text"
                  value={aiSecondaryKeywords}
                  onChange={e => setAiSecondaryKeywords(e.target.value)}
                  placeholder="e.g. 5 star hotel outcalls, DLF Cyber City, verified profiles"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Custom AI Key (Gemini or Groq - Optional)
                </label>
                <input
                  type="password"
                  value={aiApiKey}
                  onChange={e => setAiApiKey(e.target.value)}
                  placeholder="Leave blank to use built-in luxury editorial template engine"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EAE5DD]">
              <button
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-500 hover:text-stone-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={aiGenerating}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white shadow-xs disabled:opacity-50 transition-all"
              >
                {aiGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Writing Humanized Article...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate & Populate Editor</span>
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
