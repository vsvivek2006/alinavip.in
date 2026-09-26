import React from 'react';
import { normalizeContentToHtml, cleanHtml } from '@/lib/ai/contentFormatter';

interface ArticleContentRendererProps {
  content: string[] | string;
  className?: string;
}

/**
 * ArticleContentRenderer
 * Renders normalized, semantic HTML using the luxury .article-content typography design system.
 * Supports both raw semantic HTML strings and legacy markdown string arrays.
 */
export default function ArticleContentRenderer({
  content,
  className = '',
}: ArticleContentRendererProps) {
  if (!content) return null;

  let sanitizedHtml = '';
  try {
    const rawHtml = normalizeContentToHtml(content);
    sanitizedHtml = cleanHtml(rawHtml);
  } catch (err) {
    console.error('Error rendering article content:', err);
    sanitizedHtml = '<p>Content could not be displayed safely.</p>';
  }

  return (
    <div
      className={`article-content max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

