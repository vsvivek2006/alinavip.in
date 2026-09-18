'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useAdminTenant } from '@/context/AdminTenantContext';
import { BlogPostRecord } from '@/lib/admin/supabaseAdmin';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  Clock,
  ExternalLink,
  Edit3,
  Trash2,
  Search,
  RefreshCw,
  Globe,
  Image as ImageIcon,
  Loader2,
  Send,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { activeSite, loading: sitesLoading } = useAdminTenant();
  const [posts, setPosts] = useState<BlogPostRecord[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    if (!activeSite) return;
    setLoadingPosts(true);
    try {
      const res = await fetch(`/api/admin/posts?siteId=${encodeURIComponent(activeSite.id)}`);
      const data = await res.json();
      if (data.posts) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoadingPosts(false);
    }
  }, [activeSite]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePublish = async (post: BlogPostRecord) => {
    setPublishingId(post.id);
    setActionMessage(null);
    try {
      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: post.id }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setActionMessage(`Published & ISR revalidated on ${activeSite?.domain}!`);
        await fetchPosts();
      } else {
        throw new Error(data.error || 'Failed to publish');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Publish error';
      alert(`Publishing failed: ${msg}`);
    } finally {
      setPublishingId(null);
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const handleDelete = async (post: BlogPostRecord) => {
    if (!confirm(`Are you sure you want to delete "${post.title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/posts/${post.id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(prev => prev.filter(p => p.id !== post.id));
        setActionMessage('Post deleted successfully.');
      }
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      const matchesSearch =
        !search.trim() ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [posts, search, statusFilter]);

  const publishedCount = useMemo(() => posts.filter(p => p.status === 'published').length, [posts]);
  const draftCount = useMemo(() => posts.filter(p => p.status === 'draft').length, [posts]);

  return (
    <div className="space-y-8">
      {/* Top Banner & Active Tenant Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#20131c] via-[#1a0f16] to-[#140b11] border border-amber-900/40 rounded-3xl p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <Globe className="w-3.5 h-3.5" />
              {activeSite ? activeSite.name : 'Loading Site...'}
            </span>
            {activeSite && (
              <a
                href={`https://${activeSite.domain}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-stone-400 hover:text-white flex items-center gap-1 underline underline-offset-2"
              >
                {activeSite.domain}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Central Blog Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Write, AI-generate, and publish SEO blog posts with instant Next.js ISR cache updates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPosts}
            disabled={loadingPosts}
            className="p-3 bg-[#2a1a25] hover:bg-[#34202e] text-stone-300 rounded-xl border border-amber-900/30 transition-colors"
            title="Refresh Posts"
          >
            <RefreshCw className={`w-4 h-4 ${loadingPosts ? 'animate-spin text-amber-400' : ''}`} />
          </button>

          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-lg shadow-amber-950/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create New Post</span>
          </Link>
        </div>
      </div>

      {actionMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {actionMessage}
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#191017] border border-amber-900/30 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400">Total Posts</span>
            <FileText className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white mt-2">{posts.length}</p>
          <span className="text-[11px] text-stone-500">On {activeSite?.domain}</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#191017] border border-amber-900/30 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400">Published</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">{publishedCount}</p>
          <span className="text-[11px] text-stone-500">Live in Google SERP</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#191017] border border-amber-900/30 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400">Drafts</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-300 mt-2">{draftCount}</p>
          <span className="text-[11px] text-stone-500">In Preparation</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#191017] border border-amber-900/30 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400">Master Assets</span>
            <ImageIcon className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-rose-300 mt-2">70</p>
          <span className="text-[11px] text-stone-500">Live on ImageKit CDN</span>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#160e14] border border-amber-900/30">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search posts by title or slug..."
            className="w-full pl-10 pr-4 py-2 bg-[#22151e] border border-amber-900/40 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto bg-[#22151e] p-1 rounded-xl border border-amber-900/30">
          {(['all', 'published', 'draft'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                statusFilter === tab
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-[#180f16] border border-amber-900/30 rounded-3xl overflow-hidden shadow-xl">
        {loadingPosts || sitesLoading ? (
          <div className="p-16 text-center text-stone-400 flex flex-col items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
            <span className="text-xs">Loading posts from Supabase...</span>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-16 text-center text-stone-400 flex flex-col items-center gap-4">
            <FileText className="w-10 h-10 text-stone-600" />
            <div>
              <p className="text-sm font-semibold text-white">No blog posts found</p>
              <p className="text-xs text-stone-500 mt-1">
                {search ? 'Try adjusting your search query.' : 'Get started by creating or generating your first post.'}
              </p>
            </div>
            <Link
              href="/admin/blog/new"
              className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors"
            >
              + Create Post
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-amber-900/30 bg-[#1c1219] text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  <th className="py-4 px-5">Post Title & Slug</th>
                  <th className="py-4 px-4">Tags</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-900/20 text-xs text-stone-300">
                {filteredPosts.map(post => {
                  const isPublished = post.status === 'published';
                  const liveUrl = activeSite ? `https://${activeSite.domain}/blog/${post.slug}` : null;

                  return (
                    <tr
                      key={post.id}
                      className="hover:bg-[#22151e]/60 transition-colors group"
                    >
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3.5">
                          {post.cover_image ? (
                            <img
                              src={`${post.cover_image}?tr=w-80,h-60,fo-auto`}
                              alt={post.title}
                              className="w-14 h-11 object-cover rounded-lg border border-amber-900/30 shrink-0 bg-stone-900"
                            />
                          ) : (
                            <div className="w-14 h-11 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-500 shrink-0">
                              <ImageIcon className="w-4 h-4" />
                            </div>
                          )}
                          <div className="max-w-md">
                            <Link
                              href={`/admin/blog/${post.id}`}
                              className="font-bold text-white hover:text-amber-400 transition-colors line-clamp-1 text-sm"
                            >
                              {post.title}
                            </Link>
                            <p className="text-[11px] text-stone-500 font-mono truncate mt-0.5">
                              /{post.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {(post.tags || []).slice(0, 2).map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-stone-800/80 text-[10px] text-stone-400 border border-stone-700/50"
                            >
                              {t}
                            </span>
                          ))}
                          {(post.tags || []).length > 2 && (
                            <span className="text-[10px] text-stone-500">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isPublished
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                              : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isPublished ? 'bg-emerald-400' : 'bg-amber-400'
                            }`}
                          />
                          {post.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-stone-400 text-[11px]">
                        {post.published_at ? post.published_at.split('T')[0] : 'Draft'}
                      </td>

                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {!isPublished && (
                            <button
                              onClick={() => handlePublish(post)}
                              disabled={publishingId === post.id}
                              title="Publish instantly & purge ISR cache"
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors disabled:opacity-50"
                            >
                              {publishingId === post.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Send className="w-3.5 h-3.5" />
                              )}
                              <span>Publish</span>
                            </button>
                          )}

                          {isPublished && liveUrl && (
                            <a
                              href={liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              title="View published page on live website"
                              className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-400 hover:bg-stone-800/60 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}

                          <Link
                            href={`/admin/blog/${post.id}`}
                            title="Edit Post"
                            className="p-1.5 rounded-lg text-stone-400 hover:text-amber-400 hover:bg-stone-800/60 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleDelete(post)}
                            title="Delete Post"
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
