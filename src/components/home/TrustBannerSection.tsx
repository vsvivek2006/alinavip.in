import { ShieldCheck, Lock, Sparkles, Clock } from 'lucide-react';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Genuine Profiles',
    desc: 'Real Profiles. No Fake Listings.',
  },
  {
    icon: Lock,
    title: 'Discreet Booking',
    desc: 'Private, Discreet & Professional Bookings',
  },
  {
    icon: Sparkles,
    title: 'Russian & Independent Profiles',
    desc: 'Leading Agency for Russian & Independent Escorts in Gurgaon',
  },
  {
    icon: Clock,
    title: '24-7 Availability',
    desc: '24/7 Booking for same-day or advance reservations.',
  },
];

export default function TrustBannerSection() {
  return (
    <section className="banner-bottom-text py-10 md:py-12 bg-[#0B2154]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="callout-head mb-2 text-white font-bold text-2xl md:text-3xl">
            11+ Years of Trusted Escort Service in Gurgaon
          </h2>
          <p className="sub-text text-gray-300 text-sm md:text-base">
            A Long-Standing Escort Agency You Can Trust
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-white/10">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="sub-point text-center p-3 relative group">
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#671725] transition-colors duration-300">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-white text-base md:text-lg mb-1 group-hover:text-[#FFD700] transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
