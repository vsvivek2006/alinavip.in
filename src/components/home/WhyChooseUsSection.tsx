import { ShieldCheck, Lock, Clock, BadgeCheck, Star, Phone, Camera } from 'lucide-react';

const whyChooseUs = [
  {
    icon: ShieldCheck,
    title: '100% Verified Profiles',
    description:
      'Every profile undergoes a thorough in-person verification process to ensure authenticity, genuine photos, and client safety.',
  },
  {
    icon: Lock,
    title: 'Complete Ironclad Discretion',
    description:
      'Your privacy is our utmost priority. All bookings, conversations, and client information are kept strictly confidential.',
  },
  {
    icon: Clock,
    title: '24/7 Rapid NCR Dispatch',
    description:
      'Our concierge desk operates round the clock with rapid 20 to 30 minute arrival across all Gurgaon and Delhi NCR hotels.',
  },
  {
    icon: BadgeCheck,
    title: 'Premium Handpicked Quality',
    description:
      'We select only cultured, educated models who meet our exacting standards of elegance, grace, and sophisticated conversation.',
  },
  {
    icon: Star,
    title: 'Elite Diverse Selection',
    description:
      'From VIP models and European escorts to independent call girls and air hostesses, choose from the finest roster in India.',
  },
  {
    icon: Phone,
    title: 'Dedicated VIP Support',
    description:
      'Our dedicated booking team provides personalized assistance from your initial inquiry until the conclusion of your rendezvous.',
  },
];

const standards = [
  {
    title: 'Identity Verified',
    description:
      'All profiles provide valid government identification securely verified by our concierge team prior to profile listing.',
    icon: BadgeCheck,
  },
  {
    title: 'Photos Verified',
    description:
      'Profile galleries are verified to be recent, genuine representations with zero misleading edits or false representations.',
    icon: Camera,
  },
  {
    title: 'Background Checked',
    description:
      'We conduct thorough background checks to maintain highest standards of safety, professional etiquette, and client discretion.',
    icon: ShieldCheck,
  },
];

export default function WhyChooseUsSection() {
  return (
    <>
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <p className="section-subtitle text-gold-600">Why Choose Us</p>
            <h2 className="section-title mb-4 text-[#0F172A]">
              The <span className="text-gradient-gold">ALINA VIP</span> Difference
            </h2>
            <div className="gold-divider" />
            <p className="text-gray-600 max-w-xl mx-auto mt-4 text-sm leading-relaxed">
              We provide the highest level of confidentiality, verified profile safety, and personalized five-star service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-gold-300 hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 border border-gold-500/30 flex items-center justify-center mb-6 group-hover:border-gold-500 group-hover:bg-gold-50/50 transition-colors rounded-lg">
                    <Icon size={24} className="text-gold-500" />
                  </div>
                  <h3 className="font-serif text-xl text-[#0F172A] mb-3 font-bold">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <p className="section-subtitle text-gold-600">Client Confidence</p>
            <h2 className="section-title mb-4 text-[#0F172A]">
              Rigorous <span className="text-gradient-gold">Verification Standards</span>
            </h2>
            <div className="gold-divider" />
            <p className="text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed">
              Every profile on ALINA VIP undergoes a comprehensive screening process to ensure total authenticity, safety, and mutual peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {standards.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-gray-50 p-8 text-center rounded-2xl border border-gray-100 hover:border-gold-300 hover:shadow-lg transition-all group"
                >
                  <div className="w-16 h-16 mx-auto border-2 border-gold-500/30 rounded-full flex items-center justify-center mb-6 group-hover:border-gold-500 group-hover:bg-gold-50 transition-colors">
                    <Icon size={28} className="text-gold-500" />
                  </div>
                  <h3 className="font-serif text-xl text-[#0F172A] mb-3 font-bold">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
