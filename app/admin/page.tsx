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
import { toast } from 'sonner';

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
      toast.error('Failed to fetch posts for active site.');
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
        const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        const viewUrl = isLocal
          ? `/blog/${post.slug}`
          : `https://${activeSite?.domain || 'alinavip.in'}/blog/${post.slug}`;

        toast.success(`Published live on ${activeSite?.name || 'site'}!`, {
          description: `Post is live at /blog/${post.slug}`,
          action: {
            label: 'View Live Post',
            onClick: () => window.open(viewUrl, '_blank'),
          },
          duration: 9000,
        });
        await fetchPosts();
      } else {
        throw new Error(data.error || 'Failed to publish');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Publish error';
      toast.error(`Publishing failed: ${msg}`);
    } finally {
      setPublishingId(null);
    }
  };

  const handleDelete = async (post: BlogPostRecord) => {
    toast(`Delete "${post.title}"?`, {
      description: 'This will permanently remove the article from local and cloud storage.',
      action: {
        label: 'Confirm Delete',
        onClick: async () => {
          try {
            const res = await fetch(`/api/admin/posts/${post.id}`, { method: 'DELETE' });
            if (res.ok) {
              setPosts(prev => prev.filter(p => p.id !== post.id));
              toast.success('Post deleted successfully');
            } else {
              toast.error('Failed to delete post');
            }
          } catch (err) {
            console.error('Delete failed:', err);
            toast.error('Delete failed. Please try again.');
          }
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    });
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
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner & Active Tenant Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-br from-[#F8F5F0] via-[#FAF7F2] to-[#F3EFE7] border border-[#E8E2D8] rounded-3xl p-5 sm:p-6 shadow-xs">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#671725]/10 text-[#671725] border border-[#671725]/20">
              <Globe className="w-3.5 h-3.5 text-[#671725]" />
              {activeSite ? activeSite.name : 'Loading Site...'}
            </span>
            {activeSite && (
              <a
                href={`https://${activeSite.domain}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-stone-600 hover:text-[#671725] font-medium flex items-center gap-1 underline underline-offset-2"
              >
                {activeSite.domain}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Central Blog Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Humanized AI-generated articles with instant on-demand Next.js ISR cache updates.
          </p>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            onClick={fetchPosts}
            disabled={loadingPosts}
            className="p-2.5 sm:p-3 bg-white hover:bg-[#F5F2EB] text-stone-700 rounded-xl border border-[#E2DDD5] shadow-xs transition-colors"
            title="Refresh Posts"
          >
            <RefreshCw className={`w-4 h-4 ${loadingPosts ? 'animate-spin text-[#671725]' : ''}`} />
          </button>

          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white shadow-sm shadow-rose-950/20 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Create New Post</span>
          </Link>
        </div>
      </div>

      {actionMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EAE5DD] shadow-xs hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-600">Total Posts</span>
            <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">{posts.length}</p>
          <span className="text-[11px] text-stone-600 font-medium">{activeSite?.domain}</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EAE5DD] shadow-xs hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-600">Live Published</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-700 mt-2">{publishedCount}</p>
          <span className="text-[11px] text-emerald-700 font-medium">Active in Google</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EAE5DD] shadow-xs hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-600">Drafts</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-700 mt-2">{draftCount}</p>
          <span className="text-[11px] text-stone-600 font-medium">In Preparation</span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EAE5DD] shadow-xs hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-600">Master Assets</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-[#671725]">
              <ImageIcon className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#671725] mt-2">70</p>
          <span className="text-[11px] text-stone-600 font-medium">ImageKit CDN</span>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-[#EAE5DD] shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search posts by title or slug..."
            className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs text-stone-900 placeholder-stone-500 focus:outline-none focus:border-[#671725] transition-colors"
          />
        </div>

        <div className="flex items-center gap-1 w-full sm:w-auto bg-[#F4EFE7] p-1 rounded-xl border border-[#E8E2D8]">
          {(['all', 'published', 'draft'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                statusFilter === tab
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white border border-[#EAE5DD] rounded-3xl overflow-hidden shadow-xs">
        {loadingPosts || sitesLoading ? (
          <div className="p-16 text-center text-stone-500 flex flex-col items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-[#671725]" />
            <span className="text-xs font-medium">Loading posts from Supabase...</span>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-16 text-center text-stone-500 flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F6F2EB] flex items-center justify-center text-stone-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-800">No blog posts found</p>
              <p className="text-xs text-stone-500 mt-1">
                {search ? 'Try adjusting your search query.' : 'Get started by creating or generating your first post.'}
              </p>
            </div>
            <Link
              href="/admin/blog/new"
              className="mt-1 px-4 py-2 rounded-xl text-xs font-bold bg-[#671725] text-white hover:bg-[#7d1c2e] transition-colors shadow-xs"
            >
              + Create Post
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EAE5DD] bg-[#FAF8F5] text-[11px] font-extrabold uppercase tracking-wider text-stone-600">
                  <th className="py-3.5 px-5">Post Title & Slug</th>
                  <th className="py-3.5 px-4">Tags</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE5DD] text-xs text-stone-700">
                {filteredPosts.map(post => {
                  const isPublished = post.status === 'published';
                  const liveUrl = activeSite ? `https://${activeSite.domain}/blog/${post.slug}` : null;

                  return (
                    <tr
                      key={post.id}
                      className="hover:bg-[#FAF8F5] transition-colors group"
                    >
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3.5">
                          {post.cover_image ? (
                            <img
                              src={`${post.cover_image}?tr=w-80,h-60,fo-auto`}
                              alt={post.title}
                              className="w-14 h-11 object-cover rounded-lg border border-[#E2DDD5] shrink-0 bg-stone-100 shadow-2xs"
                            />
                          ) : (
                            <div className="w-14 h-11 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-400 shrink-0">
                              <ImageIcon className="w-4 h-4" />
                            </div>
                          )}
                          <div className="max-w-md">
                            <Link
                              href={`/admin/blog/${post.id}`}
                              className="font-bold text-stone-900 hover:text-[#671725] transition-colors line-clamp-1 text-sm"
                            >
                              {post.title}
                            </Link>
                            <p className="text-[11px] text-stone-600 font-mono truncate mt-0.5">
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
                              className="px-2 py-0.5 rounded-md bg-[#F4EFE7] text-[10px] font-medium text-stone-700 border border-[#E8E2D8]"
                            >
                              {t}
                            </span>
                          ))}
                          {(post.tags || []).length > 2 && (
                            <span className="text-[10px] text-stone-600">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isPublished
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isPublished ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                          />
                          {post.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-stone-600 text-[11px]">
                        {post.published_at ? post.published_at.split('T')[0] : 'Draft'}
                      </td>

                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {!isPublished && (
                            <button
                              onClick={() => handlePublish(post)}
                              disabled={publishingId === post.id}
                              title="Publish instantly & purge ISR cache"
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xs transition-colors disabled:opacity-50"
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
                              className="p-1.5 rounded-lg text-stone-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}

                          <Link
                            href={`/admin/blog/${post.id}`}
                            title="Edit Post"
                            className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-[#F2ECE4] transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleDelete(post)}
                            title="Delete Post"
                            className="p-1.5 rounded-lg text-stone-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
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
