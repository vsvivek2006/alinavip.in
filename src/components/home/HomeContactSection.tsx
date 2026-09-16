import { Phone, Building2, Clock, ArrowRight } from 'lucide-react';
import HomeBookingForm from '@/components/HomeBookingForm';
import { siteConfig } from '@/data/siteConfig';

export default function HomeContactSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-subtitle text-gold-600">Get In Touch</p>
            <h2 className="section-title mb-6 text-[#0F172A]">
              Reserve Your <span className="text-gradient-gold">Private Appointment</span>
            </h2>
            <div className="gold-divider mb-8" />
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border border-gold-500/30 flex items-center justify-center flex-shrink-0 rounded-lg">
                  <Phone size={20} className="text-gold-500" />
                </div>
                <div>
                  <h3 className="font-sans text-xs tracking-ultra uppercase text-gray-500 mb-1 font-bold">
                    Phone VIP
                  </h3>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-[#0F172A] hover:text-gold-600 transition-colors font-bold text-lg"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border border-gold-500/30 flex items-center justify-center flex-shrink-0 rounded-lg">
                  <Building2 size={20} className="text-gold-500" />
                </div>
                <div>
                  <h3 className="font-sans text-xs tracking-ultra uppercase text-gray-500 mb-1 font-bold">
                    Location
                  </h3>
                  <p className="text-[#0F172A] font-medium">
                    {siteConfig.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border border-gold-500/30 flex items-center justify-center flex-shrink-0 rounded-lg">
                  <Clock size={20} className="text-gold-500" />
                </div>
                <div>
                  <h3 className="font-sans text-xs tracking-ultra uppercase text-gray-500 mb-1 font-bold">
                    Availability
                  </h3>
                  <p className="text-[#0F172A] font-bold">
                    24 Hours, 7 Days a Week
                  </p>
                  <p className="text-sm text-gray-500">
                    Concierge booking desk available anytime across NCR
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={siteConfig.url}
                className="text-gold-600 hover:text-gold-700 font-semibold flex items-center gap-2"
              >
                Visit {siteConfig.domain} <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-8 rounded-3xl shadow-2xl border border-gold-500/20">
            <HomeBookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
