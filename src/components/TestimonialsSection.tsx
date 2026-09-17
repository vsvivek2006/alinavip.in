import { Star } from 'lucide-react';
import { testimonials } from '@/data/content';

interface TestimonialsSectionProps {
  theme?: 'light' | 'dark';
}

export default function TestimonialsSection({ theme = 'dark' }: TestimonialsSectionProps) {
  const isLight = theme === 'light';

  return (
    <section className={`py-20 md:py-28 ${isLight ? 'bg-[#FFFDF6]' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className={`section-subtitle ${isLight ? 'text-primary-wine' : ''}`}>Client Testimonials</p>
          <h2 className={`section-title mb-4 ${isLight ? 'text-[#0B2154]' : ''}`}>
            What Our <span className="text-primary-wine">Clients Say</span>
          </h2>
          <div className="w-16 h-1 bg-primary-wine mx-auto my-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={
                isLight
                  ? 'bg-white p-8 rounded-2xl border border-gray-100 hover:border-primary-wine/40 hover:shadow-xl transition-all'
                  : 'bg-white border border-gray-200 shadow-sm rounded-xl p-8 group hover:shadow-lg hover:shadow-md'
              }
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-luxury-gold fill-luxury-gold" />
                ))}
              </div>
              <p className={`text-sm leading-relaxed mb-6 italic ${isLight ? 'text-gray-600' : 'text-gray-600'}`}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className={`font-sans text-sm ${isLight ? 'text-[#0B2154] font-bold' : 'text-white font-medium'}`}>{t.name}</p>
                <p className={`text-xs mt-1 ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
