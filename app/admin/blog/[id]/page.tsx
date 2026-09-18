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
      <div className="p-12 text-center space-y-4 max-w-md mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-rose-950/50 text-rose-400 border border-rose-800/40 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-white">Post Not Found</h2>
        <p className="text-xs text-stone-400">
          The requested blog post could not be located in Supabase. It may have been deleted.
        </p>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  return <PostEditorForm initialPost={post} isNew={false} />;
}
