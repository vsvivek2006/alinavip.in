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
  Key,
  ChevronDown,
  ChevronUp,
  Wand2,
  Settings2,
  BookOpen,
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

  // UI state
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(isNew);
  const [showAdvancedKeys, setShowAdvancedKeys] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string; url?: string } | null>(null);

  // AI Assistant state
  const [aiTopic, setAiTopic] = useState('');
  const [aiFocusKeyword, setAiFocusKeyword] = useState('');
  const [aiSecondaryKeywords, setAiSecondaryKeywords] = useState('');
  const [aiWordCount, setAiWordCount] = useState(1200);
  const [aiProvider, setAiProvider] = useState<'groq' | 'gemini'>('groq');
  const [aiGroqKey, setAiGroqKey] = useState('');
  const [aiGeminiKey, setAiGeminiKey] = useState('');
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

  // Handle AI generation inline
  const handleGenerateAI = async () => {
    setAiError(null);

    if (!aiTopic.trim()) {
      setAiError('Please enter what you would like to write about (Topic or Title).');
      return;
    }
    if (!aiFocusKeyword.trim()) {
      setAiError('Please enter a Primary Search Keyword.');
      return;
    }

    const activeKey = aiProvider === 'groq' ? aiGroqKey.trim() : aiGeminiKey.trim();

    if (aiProvider === 'groq' && !activeKey && !serverKeyStatus.hasGroqKey) {
      setAiError('Groq key is missing on the server. Please paste your custom key in the settings below.');
      return;
    }

    try {
      if (aiGroqKey.trim()) localStorage.setItem('alina_admin_groq_key', aiGroqKey.trim());
      if (aiGeminiKey.trim()) localStorage.setItem('alina_admin_gemini_key', aiGeminiKey.trim());
      localStorage.setItem('alina_admin_ai_provider', aiProvider);
    } catch (err) {
      void err;
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

      // Auto-collapse assistant to let the user review the written article
      setIsAiAssistantOpen(false);
      setFeedback({
        type: 'success',
        message: `Article successfully written! Review the formatted sections, headings, and internal links below.`,
      });

      // Smooth scroll to the editor
      const editorElement = document.getElementById('blog-content-area');
      if (editorElement) {
        editorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'AI writing error';
      setAiError(msg);
    } finally {
      setAiGenerating(false);
    }
  };

  // Save post
  const handleSave = async (publishImmediate = false) => {
    if (!title.trim() || !slug.trim()) {
      setFeedback({ type: 'error', message: 'Article Title and Web Address (Slug) are required.' });
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

        const liveUrl = targetSite ? `https://${targetSite.domain}/blog/${payload.slug}` : null;
        setStatus('published');
        setFeedback({
          type: 'success',
          message: `Published successfully! View live on https://${targetSite?.domain}/blog/${payload.slug}`,
          url: liveUrl || undefined,
        });
      } else {
        setFeedback({
          type: 'success',
          message: 'Article draft saved successfully.',
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
    <div className="space-y-6 pb-24 font-sans max-w-7xl mx-auto">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-[#EAE5DD] shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2.5 rounded-2xl bg-[#FAF9F6] hover:bg-[#F2ECE4] text-stone-600 hover:text-stone-900 border border-[#E2DDD5] shadow-2xs transition-colors"
            title="Back to Posts"
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
            onClick={() => setIsAiAssistantOpen(!isAiAssistantOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              isAiAssistantOpen
                ? 'bg-purple-100 text-purple-900 border border-purple-300'
                : 'bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white shadow-xs hover:-translate-y-0.5'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAiAssistantOpen ? 'Hide AI Assistant' : '✨ Open AI Writer'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={saving || publishing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold bg-[#FAF9F6] hover:bg-[#F4EFE7] text-stone-800 border border-[#DCD6CC] shadow-2xs transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin text-stone-500" /> : <Save className="w-4 h-4 text-stone-600" />}
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={saving || publishing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-[#671725] to-[#881337] hover:from-[#7a1b2d] hover:to-[#9f1239] text-white shadow-xs hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-50"
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
        {/* Left 2 Columns: Inline AI Writing Studio + Article Canvas */}
        <div className="lg:col-span-2 space-y-6">
          {/* INLINE AI WRITING ASSISTANT (Embedded directly into page, NO POPUP) */}
          {isAiAssistantOpen && (
            <div className="rounded-3xl bg-gradient-to-b from-[#FDFBF9] to-white border-2 border-purple-200/80 shadow-md p-5 sm:p-6 space-y-5 animate-in fade-in duration-200">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-purple-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#671725] to-purple-800 text-white flex items-center justify-center shadow-xs">
                    <Wand2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-stone-900 flex items-center gap-2">
                      <span>AI Article Writing Assistant</span>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 tracking-wider">
                        1-Click Writer
                      </span>
                    </h2>
                    <p className="text-xs text-stone-500">
                      Creates a complete, humanized article with headings, concierge tips, FAQs, and internal links.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAiAssistantOpen(false)}
                  className="text-stone-400 hover:text-stone-700 p-1.5 rounded-xl hover:bg-stone-100 transition-colors text-xs font-bold"
                  title="Close Assistant"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
              </div>

              {/* Form Controls */}
              <div className="space-y-4">
                {/* Topic / Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    What would you like to write about? <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={aiTopic}
                    onChange={e => setAiTopic(e.target.value)}
                    placeholder="e.g. 5-Star Luxury Dining & VIP Companionship in DLF Cyber City"
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E2DDD5] rounded-2xl text-sm font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#671725] focus:bg-white transition-all"
                  />
                </div>

                {/* Focus Keyword & Target Length */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Main Search Keyword <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={aiFocusKeyword}
                      onChange={e => setAiFocusKeyword(e.target.value)}
                      placeholder="e.g. Russian Escorts Gurgaon"
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#E2DDD5] rounded-2xl text-xs sm:text-sm font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#671725] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Article Length
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#FAF8F5] border border-[#E2DDD5] rounded-2xl">
                      {[
                        { count: 800, label: 'Quick Read' },
                        { count: 1200, label: 'Standard' },
                        { count: 1600, label: 'Deep Dive' },
                      ].map(pill => (
                        <button
                          key={pill.count}
                          type="button"
                          onClick={() => setAiWordCount(pill.count)}
                          className={`py-1.5 text-xs font-bold rounded-xl transition-all ${
                            aiWordCount === pill.count
                              ? 'bg-[#671725] text-white shadow-xs'
                              : 'text-stone-600 hover:text-stone-900'
                          }`}
                        >
                          {pill.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Writing Style / Assistant Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Writing Tone & Style
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setAiProvider('groq');
                        setAiError(null);
                      }}
                      className={`text-left p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        aiProvider === 'groq'
                          ? 'border-[#671725] bg-rose-50/40 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300 bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-600" />
                          <span className="font-extrabold text-stone-900 text-xs">⚡ Fast Conversational Writer</span>
                        </div>
                        <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Recommended
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-snug">
                        Natural cadence, uncensored hospitality & companion topics, fast ~5s generation.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAiProvider('gemini');
                        setAiError(null);
                      }}
                      className={`text-left p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        aiProvider === 'gemini'
                          ? 'border-[#671725] bg-rose-50/40 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300 bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          <span className="font-extrabold text-stone-900 text-xs">✨ Deep NCR Storyteller</span>
                        </div>
                        <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          Regional
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-snug">
                        Rich descriptive prose, luxury hotel atmosphere, and local landmark knowledge.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Optional Secondary Keywords */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Optional Keywords / Venues to Mention
                  </label>
                  <input
                    type="text"
                    value={aiSecondaryKeywords}
                    onChange={e => setAiSecondaryKeywords(e.target.value)}
                    placeholder="e.g. The Oberoi, DLF Horizon Plaza, zero advance policy, verified photos"
                    className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#671725] focus:bg-white"
                  />
                </div>

                {/* Optional Custom API Key (Subtle accordion, hidden by default) */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAdvancedKeys(!showAdvancedKeys)}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-stone-500 hover:text-stone-800 transition-colors"
                  >
                    <Key className="w-3 h-3" />
                    <span>Custom API Keys (Optional)</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${showAdvancedKeys ? 'rotate-180' : ''}`} />
                  </button>

                  {showAdvancedKeys && (
                    <div className="mt-2 p-3 bg-stone-100 rounded-2xl space-y-2 text-xs">
                      <p className="text-[11px] text-stone-600">
                        Secure keys are already pre-configured on the server. You only need to enter a key here if you want to override with your personal account.
                      </p>
                      <input
                        type="password"
                        value={aiProvider === 'groq' ? aiGroqKey : aiGeminiKey}
                        onChange={e => {
                          if (aiProvider === 'groq') setAiGroqKey(e.target.value);
                          else setAiGeminiKey(e.target.value);
                        }}
                        placeholder={`Paste custom ${aiProvider === 'groq' ? 'Groq (gsk_...)' : 'Gemini'} key`}
                        className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-[#671725]"
                      />
                    </div>
                  )}
                </div>

                {/* Actionable Error Banner */}
                {aiError && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="font-bold">Unable to complete generation</div>
                      <div>{aiError}</div>
                    </div>
                  </div>
                )}

                {/* Generate Button */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-purple-100">
                  <div className="text-[11px] text-stone-500 space-y-0.5">
                    <div>✓ Formatted with H2/H3 headings, checklist, concierge tip, & FAQs</div>
                    <div>✓ Automatically weaves 3+ internal links & attaches random ImageKit photo</div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGenerateAI}
                    disabled={aiGenerating}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-black bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer shrink-0"
                  >
                    {aiGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Writing Complete Article...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4" />
                        <span>Write Complete Article Draft</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

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
                placeholder="e.g. 5-Star Luxury Dining & Escort Companionship in DLF Cyber City"
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

          {/* Editorial Content Canvas with Toolbar & Live Preview Tab */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EAE5DD] shadow-xs space-y-4">
            {/* View Switcher & Word Count */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAE5DD]">
              <div className="flex items-center gap-1.5 bg-[#F4EFE7] p-1 rounded-2xl border border-[#E8E2D8]">
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
                  className="px-2.5 py-1.5 text-xs font-extrabold text-stone-700 hover:text-stone-900 hover:bg-white rounded-xl transition-colors"
                  title="Insert Section Heading (H2)"
                >
                  H2 Section
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('### ')}
                  className="px-2.5 py-1.5 text-xs font-bold text-stone-700 hover:text-stone-900 hover:bg-white rounded-xl transition-colors"
                  title="Insert Subheading (H3)"
                >
                  H3 Subhead
                </button>
                <span className="text-stone-300">|</span>
                <button
                  type="button"
                  onClick={() => insertFormatting('**', '**')}
                  className="px-2.5 py-1.5 text-xs font-bold text-stone-700 hover:text-stone-900 hover:bg-white rounded-xl transition-colors"
                  title="Bold Text"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('*', '*')}
                  className="px-2.5 py-1.5 text-xs italic font-serif text-stone-700 hover:text-stone-900 hover:bg-white rounded-xl transition-colors"
                  title="Italic Text"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('- ')}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-stone-700 hover:text-stone-900 hover:bg-white rounded-xl transition-colors"
                  title="Bullet List"
                >
                  <List className="w-3.5 h-3.5" />
                  <span>List</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertFormatting('> **Concierge Tip:** ')}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-stone-700 hover:text-stone-900 hover:bg-white rounded-xl transition-colors"
                  title="Insert Concierge Highlight Box"
                >
                  <Quote className="w-3.5 h-3.5" />
                  <span>Highlight Box</span>
                </button>
                <span className="text-stone-300">|</span>
                <button
                  type="button"
                  onClick={() => insertFormatting('[Link Title](', ')')}
                  className="px-2.5 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
                  title="Insert Internal Link"
                >
                  + Add Link
                </button>
                <button
                  type="button"
                  onClick={() => setIsAssetModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#671725] bg-rose-50/70 hover:bg-rose-100/70 rounded-xl transition-colors"
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
                placeholder="Write your article here. Separate paragraphs with double enter (blank line). You can also click 'Write Complete Article Draft' above to automatically craft the full post..."
                className="w-full p-5 bg-[#FAF8F5] border border-[#E2DDD5] rounded-2xl text-sm sm:text-base text-stone-800 font-sans leading-relaxed focus:outline-none focus:border-[#671725] focus:bg-white transition-all"
              />
            ) : (
              /* Beautiful Formatted Preview */
              <div className="p-6 sm:p-8 bg-[#FAF8F5] border border-[#E2DDD5] rounded-2xl min-h-[450px] font-sans text-stone-800 space-y-4">
                {content.split('\n\n').map((paragraph, idx) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;

                  // H2 Heading
                  if (trimmed.startsWith('## ')) {
                    return (
                      <h2
                        key={idx}
                        className="text-xl sm:text-2xl font-black text-stone-900 mt-8 mb-3 pb-2 border-b border-stone-200 tracking-tight"
                      >
                        {trimmed.replace('## ', '')}
                      </h2>
                    );
                  }

                  // H3 Subhead
                  if (trimmed.startsWith('### ')) {
                    return (
                      <h3
                        key={idx}
                        className="text-lg sm:text-xl font-bold text-[#671725] mt-6 mb-2"
                      >
                        {trimmed.replace('### ', '')}
                      </h3>
                    );
                  }

                  // Styled Luxury Callout Quote
                  if (trimmed.startsWith('> ')) {
                    return (
                      <blockquote
                        key={idx}
                        className="border-l-4 border-[#671725] bg-[#FDFBF7] p-4 sm:p-5 my-5 rounded-r-2xl shadow-2xs italic text-stone-800 text-sm sm:text-base leading-relaxed"
                      >
                        {trimmed.replace('> ', '')}
                      </blockquote>
                    );
                  }

                  // Bulleted List
                  if (trimmed.startsWith('- ')) {
                    const items = trimmed.split('\n').filter(Boolean);
                    return (
                      <ul key={idx} className="list-disc pl-6 space-y-2 my-4 text-sm sm:text-base text-stone-700 leading-relaxed">
                        {items.map((it, i) => {
                          const itemText = it.replace(/^-\s*/, '');
                          // Format bold inside list
                          const formattedItem = itemText.replace(
                            /\*\*([^*]+)\*\*/g,
                            '<strong class="font-bold text-stone-900">$1</strong>'
                          );
                          return (
                            <li
                              key={i}
                              dangerouslySetInnerHTML={{ __html: formattedItem }}
                            />
                          );
                        })}
                      </ul>
                    );
                  }

                  // Markdown links & bold text inside paragraphs
                  let renderedText = trimmed.replace(
                    /\[([^\]]+)\]\(([^)]+)\)/g,
                    '<a href="$2" target="_blank" class="text-[#671725] font-bold underline underline-offset-4 hover:text-[#881337]">$1</a>'
                  );
                  renderedText = renderedText.replace(
                    /\*\*([^*]+)\*\*/g,
                    '<strong class="font-bold text-stone-900">$1</strong>'
                  );

                  return (
                    <p
                      key={idx}
                      className="text-sm sm:text-base leading-relaxed text-stone-700 mb-4"
                      dangerouslySetInnerHTML={{ __html: renderedText }}
                    />
                  );
                })}
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
                className="text-xs font-bold text-[#671725] hover:underline"
              >
                Photo Library
              </button>
            </div>

            {coverImage ? (
              <div className="relative rounded-2xl overflow-hidden border border-[#E2DDD5] group aspect-video bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt={title || 'Cover image'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAssetModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-white text-stone-900 text-xs font-bold shadow-md hover:bg-stone-100 transition-colors"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={() => setCoverImage(null)}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md hover:bg-rose-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAssetModalOpen(true)}
                className="w-full p-8 border-2 border-dashed border-[#DCD6CC] hover:border-[#671725] rounded-2xl text-center space-y-2 group transition-colors bg-[#FAF8F5]"
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
