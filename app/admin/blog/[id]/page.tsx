import React from 'react';
import { getPostById } from '@/lib/admin/supabaseAdmin';
import PostEditorForm from '@/components/admin/PostEditorForm';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    return (
      <div className="p-8 sm:p-12 text-center space-y-4 max-w-md mx-auto bg-white border border-[#EAE5DD] rounded-3xl shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#671725] border border-rose-200 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-stone-900">Post Not Found</h2>
        <p className="text-xs text-stone-600">
          The requested blog post could not be located in Supabase. It may have been deleted.
        </p>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#671725] text-white hover:bg-[#7d1c2e] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  return <PostEditorForm initialPost={post} isNew={false} />;
}
