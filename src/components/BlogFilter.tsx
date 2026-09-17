'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Eye, User, ArrowRight, Search, X } from 'lucide-react';
import { BlogPost } from '@/data/blogs';

interface BlogFilterProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogFilter({ posts, categories }: BlogFilterProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState<string | null>(
    searchParams.get('category') || null
  );

  useEffect(() => {
    const q = searchParams.get('search') || '';
    const cat = searchParams.get('category') || null;
    setSearchQuery(q);
    setActiveCategory(cat);
  }, [searchParams]);

  const updateUrl = (query: string, category: string | null) => {
    const params = new URLSearchParams();
    if (query.trim()) params.set('search', query.trim());
    if (category) params.set('category', category);
    const qs = params.toString();
    const targetUrl = qs ? `/blog?${qs}` : '/blog';
    window.history.replaceState(null, '', targetUrl);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    updateUrl(val, activeCategory);
  };

  const handleCategoryChange = (cat: string | null) => {
    setActiveCategory(cat);
    updateUrl(searchQuery, cat);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveCategory(null);
    updateUrl('', null);
  };

  const trimmedQuery = searchQuery.toLowerCase().trim();

  const filteredPosts = posts.filter((post) => {
    if (activeCategory && post.category !== activeCategory) {
      return false;
    }

    if (!trimmedQuery) {
      return true;
    }

    const inTitle = post.title.toLowerCase().includes(trimmedQuery);
    const inExcerpt = post.excerpt.toLowerCase().includes(trimmedQuery);
    const inCategory = post.category.toLowerCase().includes(trimmedQuery);
    const inTags =
      Array.isArray(post.tags) &&
      post.tags.some((t) => t.toLowerCase().includes(trimmedQuery));

    return inTitle || inExcerpt || inCategory || inTags;
  });

  return (
    <>
      {/* Search Input Box */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative flex items-center">
          <label htmlFor="blog-search" className="sr-only">
            Search blog articles
          </label>
          <div className="absolute left-4 pointer-events-none text-gray-400">
            <Search className="w-5 h-5 text-primary-wine" />
          </div>
          <input
            id="blog-search"
            type="search"
            role="searchbox"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search articles by keyword, topic, or tag..."
            className="w-full bg-white border border-gray-200 rounded-full pl-12 pr-12 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:border-primary-wine focus:bg-white focus:outline-none transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchChange('')}
              aria-label="Clear search"
              className="absolute right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {(searchQuery.trim() || activeCategory) && (
          <div className="flex items-center justify-between mt-3 px-2 text-xs text-gray-500">
            <span>
              Showing {filteredPosts.length} of {posts.length}{' '}
              {filteredPosts.length === 1 ? 'article' : 'articles'}
              {searchQuery.trim() && (
                <>
                  {' '}
                  for &ldquo;<strong className="text-gray-700">{searchQuery.trim()}</strong>&rdquo;
                </>
              )}
              {activeCategory && (
                <>
                  {' '}
                  in <strong className="text-primary-wine">{activeCategory}</strong>
                </>
              )}
            </span>
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-primary-wine hover:underline font-medium ml-2"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`px-6 py-3 text-sm tracking-wider uppercase transition-all rounded-full font-semibold ${
            activeCategory === null
              ? 'bg-primary-wine text-white shadow-lg shadow-md'
              : 'border-2 border-gray-300 text-gray-600 hover:border-primary-wine hover:text-primary-wine hover:bg-[#FFFDF6]'
          }`}
        >
          All Articles
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-6 py-3 text-sm tracking-wider uppercase transition-all rounded-full font-semibold ${
              activeCategory === cat
                ? 'bg-primary-wine text-white shadow-lg shadow-md'
                : 'border-2 border-gray-300 text-gray-600 hover:border-primary-wine hover:text-primary-wine hover:bg-[#FFFDF6]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary-wine/40 flex flex-col justify-between"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                <Image
                  src={post.image || `/images/blog/${post.slug}.webp`}
                  alt={`${post.title} - Escort Service in Gurgaon | Call Girls`}
                  title={`${post.title} - Escort Service in Gurgaon | Call Girls`}
                  fill
                  sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 390px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-primary-wine text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                  {post.category}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-primary-wine" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary-wine" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-primary-wine" />
                    {post.views || '1.2k'}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-xl text-[#0B2154] mb-2 font-bold leading-tight group-hover:text-primary-wine transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#F9E1E5] flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-wine" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {post.author || 'ALINA VIP'}
                    </span>
                  </div>
                  <span className="text-primary-wine font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 max-w-2xl mx-auto">
          <p className="text-gray-700 text-lg font-semibold mb-2">No articles match your criteria</p>
          <p className="text-gray-500 text-sm mb-6">
            We couldn&apos;t find any articles matching
            {searchQuery.trim() ? ` "${searchQuery.trim()}"` : ''}
            {activeCategory ? ` in ${activeCategory}` : ''}.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="px-6 py-2.5 bg-primary-wine hover:bg-[#50121d] text-white rounded-full text-sm font-semibold transition-all shadow-md"
          >
            Clear Filters &amp; View All Articles
          </button>
        </div>
      )}
    </>
  );
}
