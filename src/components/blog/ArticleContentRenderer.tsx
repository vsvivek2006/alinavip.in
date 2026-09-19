import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, HelpCircle, Quote } from 'lucide-react';
import { getAssetUrl } from '@/lib/assets';

interface ArticleContentRendererProps {
  content: string[] | string;
  className?: string;
}

/**
 * Format inline markdown text:
 * - Links: [anchor text](/url)
 * - Bold: **text**
 * - Italic: *text*
 * - Images: ![alt](url)
 */
function renderInlineMarkdown(text: string): React.ReactNode[] {
  if (!text) return [];

  // Regex to match markdown images ![alt](url), links [text](url), bold **text**, italic *text*
  const tokenRegex = /(!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // 1. Markdown Image: ![alt](url)
    const imgMatch = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const [, alt, src] = imgMatch;
      return (
        <figure key={index} className="my-8 rounded-2xl overflow-hidden shadow-lg border border-stone-200">
          <div className="relative aspect-[16/9] w-full bg-stone-100">
            <Image
              src={getAssetUrl(src)}
              alt={alt || 'Article visual guide'}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
          {alt && (
            <figcaption className="text-xs text-center text-stone-500 py-2.5 px-4 bg-stone-50 border-t border-stone-100 italic">
              {alt}
            </figcaption>
          )}
        </figure>
      );
    }

    // 2. Markdown Link: [label](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isInternal = href.startsWith('/') || href.startsWith('#');
      if (isInternal) {
        return (
          <Link
            key={index}
            href={href}
            className="text-[#671725] underline underline-offset-4 decoration-[#671725]/40 hover:decoration-[#671725] hover:text-[#881337] transition-all"
          >
            {label}
          </Link>
        );
      }
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#671725] underline underline-offset-4 decoration-[#671725]/40 hover:decoration-[#671725] hover:text-[#881337] transition-all"
        >
          {label}
        </a>
      );
    }

    // 3. Bold Text: **text**
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={index} className="font-bold text-stone-950">
          {boldMatch[1]}
        </strong>
      );
    }

    // 4. Italic Text: *text*
    const italicMatch = part.match(/^\*([^*]+)\*$/);
    if (italicMatch) {
      return (
        <em key={index} className="italic text-stone-800">
          {italicMatch[1]}
        </em>
      );
    }

    // Plain text chunk
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

type ParsedBlock =
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string }
  | { type: 'h4'; text: string }
  | { type: 'quote'; text: string; isConcierge: boolean }
  | { type: 'bullet-list'; items: string[] }
  | { type: 'number-list'; items: string[] }
  | { type: 'faq'; question: string; answer: string }
  | { type: 'paragraph'; text: string };

export default function ArticleContentRenderer({
  content,
  className = '',
}: ArticleContentRendererProps) {
  // 1. Normalize all inputs into a clean raw string array
  let rawItems: string[] = [];
  if (Array.isArray(content)) {
    rawItems = content.flatMap(c => (typeof c === 'string' ? c.split(/\n\n+/) : []));
  } else if (typeof content === 'string') {
    rawItems = content.split(/\n\n+/);
  }

  const cleanItems = rawItems.map(s => s.trim()).filter(Boolean);

  // 2. Multi-pass intelligent block parser & group aggregator
  const parsedBlocks: ParsedBlock[] = [];
  let i = 0;

  while (i < cleanItems.length) {
    const item = cleanItems[i];

    // Case A: H2 Heading (## Title or # Title)
    if (item.startsWith('## ') || item.startsWith('# ')) {
      const headingText = item.replace(/^#{1,2}\s+/, '').trim();
      const headingId = headingText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      parsedBlocks.push({ type: 'h2', text: headingText, id: headingId });
      i++;
      continue;
    }

    // Case B: H3 Subheading (### Subtitle)
    if (item.startsWith('### ')) {
      parsedBlocks.push({ type: 'h3', text: item.replace(/^###\s+/, '').trim() });
      i++;
      continue;
    }

    // Case C: H4 Subheading (#### Subtitle)
    if (item.startsWith('#### ')) {
      parsedBlocks.push({ type: 'h4', text: item.replace(/^####\s+/, '').trim() });
      i++;
      continue;
    }

    // Case D: Luxury Concierge Callout / Blockquote (> Quote)
    if (item.startsWith('>')) {
      const quoteText = item.replace(/^>\s*/, '').trim();
      const lower = quoteText.toLowerCase();
      const isConcierge =
        lower.includes('concierge') ||
        lower.includes('recommendation') ||
        lower.includes('tip') ||
        lower.includes('advisory');
      parsedBlocks.push({ type: 'quote', text: quoteText, isConcierge });
      i++;
      continue;
    }

    // Case E: FAQ Q&A Block (Handles single-block Q&A OR consecutive items in array)
    const isQStart =
      item.startsWith('**Q:') ||
      item.startsWith('Q:') ||
      item.toLowerCase().startsWith('question:');

    if (isQStart) {
      // Check if current block has both Q and A inside
      if (item.includes('\nA:') || item.includes('\n**A:')) {
        const lines = item.split('\n').map(l => l.trim()).filter(Boolean);
        const qLine = lines[0].replace(/^\*\*|\*\*$/g, '').replace(/^[Qq]:\s*/, '');
        const aLine = lines.slice(1).join(' ').replace(/^[Aa]:\s*/, '');
        parsedBlocks.push({ type: 'faq', question: qLine, answer: aLine });
        i++;
        continue;
      }

      // Check if next item in array is the answer (A:)
      const nextItem = cleanItems[i + 1];
      if (nextItem && (nextItem.startsWith('A:') || nextItem.startsWith('**A:'))) {
        const qClean = item.replace(/^\*\*|\*\*$/g, '').replace(/^[Qq]:\s*/, '');
        const aClean = nextItem.replace(/^\*\*|\*\*$/g, '').replace(/^[Aa]:\s*/, '');
        parsedBlocks.push({ type: 'faq', question: qClean, answer: aClean });
        i += 2; // consumed both
        continue;
      }

      // Standalone Q without direct A
      parsedBlocks.push({
        type: 'faq',
        question: item.replace(/^\*\*|\*\*$/g, '').replace(/^[Qq]:\s*/, ''),
        answer: '',
      });
      i++;
      continue;
    }

    // Case F: Bullet List (- or *)
    const isBulletItem =
      item.startsWith('- ') ||
      item.startsWith('* ') ||
      item.includes('\n- ') ||
      item.includes('\n* ');

    if (isBulletItem) {
      const items: string[] = [];

      // Extract all bullet lines from current block
      const currentLines = item.split('\n').map(l => l.trim()).filter(Boolean);
      for (const line of currentLines) {
        if (line.startsWith('- ') || line.startsWith('* ')) {
          items.push(line.replace(/^[-*]\s+/, '').trim());
        } else if (items.length === 0) {
          // Intro text before bullets
          parsedBlocks.push({ type: 'paragraph', text: line });
        } else {
          // Continuation of bullet
          items[items.length - 1] += ' ' + line;
        }
      }

      // Check subsequent items for consecutive bullet blocks
      let nextIdx = i + 1;
      while (
        nextIdx < cleanItems.length &&
        (cleanItems[nextIdx].startsWith('- ') || cleanItems[nextIdx].startsWith('* '))
      ) {
        const lines = cleanItems[nextIdx].split('\n').map(l => l.trim()).filter(Boolean);
        for (const l of lines) {
          if (l.startsWith('- ') || l.startsWith('* ')) {
            items.push(l.replace(/^[-*]\s+/, '').trim());
          }
        }
        nextIdx++;
      }

      if (items.length > 0) {
        parsedBlocks.push({ type: 'bullet-list', items });
      }
      i = nextIdx;
      continue;
    }

    // Case G: Numbered List (1. 2. etc.)
    const isNumItem = /^\d+\.\s+/.test(item) || item.includes('\n1. ');
    if (isNumItem) {
      const items: string[] = [];
      const lines = item.split('\n').map(l => l.trim()).filter(Boolean);
      for (const line of lines) {
        if (/^\d+\.\s+/.test(line)) {
          items.push(line.replace(/^\d+\.\s+/, '').trim());
        } else if (items.length === 0) {
          parsedBlocks.push({ type: 'paragraph', text: line });
        } else {
          items[items.length - 1] += ' ' + line;
        }
      }

      let nextIdx = i + 1;
      while (nextIdx < cleanItems.length && /^\d+\.\s+/.test(cleanItems[nextIdx])) {
        items.push(cleanItems[nextIdx].replace(/^\d+\.\s+/, '').trim());
        nextIdx++;
      }

      if (items.length > 0) {
        parsedBlocks.push({ type: 'number-list', items });
      }
      i = nextIdx;
      continue;
    }

    // Case H: Standard Narrative Paragraph
    parsedBlocks.push({ type: 'paragraph', text: item });
    i++;
  }

  return (
    <div
      className={`space-y-6 text-stone-700 font-sans text-base sm:text-lg leading-relaxed ${className}`}
    >
      {parsedBlocks.map((block, idx) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={idx}
                id={block.id}
                className="text-2xl sm:text-3xl font-bold text-stone-900 mt-10 sm:mt-12 mb-4 pb-3 border-b border-stone-200 tracking-tight scroll-mt-24 font-sans"
              >
                {renderInlineMarkdown(block.text)}
              </h2>
            );

          case 'h3':
            return (
              <h3
                key={idx}
                className="text-xl sm:text-2xl font-bold text-[#671725] mt-8 mb-3 tracking-tight font-sans"
              >
                {renderInlineMarkdown(block.text)}
              </h3>
            );

          case 'h4':
            return (
              <h4
                key={idx}
                className="text-lg sm:text-xl font-bold text-stone-900 mt-6 mb-2 font-sans"
              >
                {renderInlineMarkdown(block.text)}
              </h4>
            );

          case 'quote':
            return (
              <div
                key={idx}
                className="my-7 rounded-2xl bg-gradient-to-r from-[#FAF6F0] via-[#FAF7F2] to-[#F5F0E6] border-l-4 border-[#671725] p-5 sm:p-6 shadow-xs relative overflow-hidden"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#671725]/10 text-[#671725] flex items-center justify-center shrink-0 mt-0.5">
                    {block.isConcierge ? (
                      <Sparkles className="w-4 h-4 text-[#671725]" />
                    ) : (
                      <Quote className="w-4 h-4 text-[#671725]" />
                    )}
                  </div>
                  <div className="flex-1 text-sm sm:text-base text-stone-700 leading-relaxed">
                    {renderInlineMarkdown(block.text)}
                  </div>
                </div>
              </div>
            );

          case 'bullet-list':
            return (
              <ul key={idx} className="my-6 space-y-3 pl-1">
                {block.items.map((bulletText, bIdx) => (
                  <li
                    key={bIdx}
                    className="flex items-start gap-3.5 text-sm sm:text-base text-stone-700 leading-relaxed"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#671725] shrink-0 mt-2 ring-4 ring-[#671725]/10" />
                    <div className="flex-1">{renderInlineMarkdown(bulletText)}</div>
                  </li>
                ))}
              </ul>
            );

          case 'number-list':
            return (
              <ol key={idx} className="my-6 space-y-3 pl-1">
                {block.items.map((numText, nIdx) => (
                  <li
                    key={nIdx}
                    className="flex items-start gap-3.5 text-sm sm:text-base text-stone-700 leading-relaxed"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#671725]/10 text-[#671725] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {nIdx + 1}
                    </span>
                    <div className="flex-1">{renderInlineMarkdown(numText)}</div>
                  </li>
                ))}
              </ol>
            );

          case 'faq':
            return (
              <div
                key={idx}
                className="my-5 p-5 sm:p-6 bg-[#FAF8F5] border border-[#EAE5DD] rounded-2xl shadow-xs space-y-3 hover:border-[#671725]/40 transition-colors"
              >
                <div className="flex items-start gap-3 font-bold text-base sm:text-lg text-stone-900">
                  <HelpCircle className="w-5 h-5 text-[#671725] shrink-0 mt-0.5" />
                  <span>{renderInlineMarkdown(block.question)}</span>
                </div>
                {block.answer && (
                  <div className="text-sm sm:text-base text-stone-700 pl-8 leading-relaxed">
                    {renderInlineMarkdown(block.answer)}
                  </div>
                )}
              </div>
            );

          case 'paragraph':
          default:
            return (
              <p
                key={idx}
                className="text-sm sm:text-base md:text-lg leading-relaxed text-stone-700 mb-4"
              >
                {renderInlineMarkdown(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
