import { MessageCircle, Phone } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {/* Phone Hotline Float */}
      <a
        href={`tel:${siteConfig.phone}`}
        className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-gold-500 to-gold-600 text-neutral-900 rounded-full flex items-center justify-center shadow-xl shadow-gold-900/30 hover:scale-110 transition-transform duration-300 group"
        aria-label="Call ALINA VIP Concierge"
        title="Direct VIP Call"
      >
        <Phone size={22} className="text-neutral-950" />
      </a>

      {/* WhatsApp Chat Float */}
      <a
        href={`https://wa.me/${siteConfig.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center shadow-xl shadow-emerald-950/40 hover:scale-110 transition-transform duration-300"
        aria-label="Chat on WhatsApp"
        title="WhatsApp"
      >
        <MessageCircle size={26} className="text-white" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold-400 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold-400 rounded-full" />
      </a>
    </div>
  );
}
