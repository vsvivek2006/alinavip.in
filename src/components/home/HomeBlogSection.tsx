'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { blogPosts } from '@/data/blogs';

export default function HomeBlogSection() {
  const latestBlogs = blogPosts.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-[#FAFAF8]" id="latest-blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading matching Roshni Khanna */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] tracking-tight">
            Latest Blog
          </h2>
          <div className="w-16 h-1 bg-[#671725] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
            Insights, guides, and expert advice for luxury escort experiences in Gurgaon
          </p>
        </div>

        {/* 3 Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestBlogs.map((post, idx) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={idx === 0 ? '/images/assets/Gurgaon_Escorts_are_Perfect_for_VIP_Cients_Heres_H.jpg' : idx === 1 ? '/images/assets/Benefits_of_Booking_Through_a_Professional_Escort_.jpg' : '/images/assets/Hiring_a_Gurgaon_escort_for_the_first_time_Best_ti.jpg'}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-[#671725] text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                    {post.category || 'Gurgaon Guide'}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <Calendar size={13} />
                    <span>{post.date || 'Recent Article'}</span>
                  </div>

                  <h3 className="font-bold text-base md:text-lg text-[#111827] group-hover:text-[#671725] transition-colors line-clamp-2 mb-2 leading-snug">
                    <Link href={"/blog/" + post.slug}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs md:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  href={"/blog/" + post.slug}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#671725] hover:text-[#52121d] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Blogs */}
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-7 py-3 border border-[#671725] text-[#671725] hover:bg-[#671725] hover:text-white text-xs font-semibold rounded-full transition-all duration-300"
          >
            <span>View All Articles</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
