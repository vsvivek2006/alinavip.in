import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, CheckCircle, Shield, Clock, Star } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { siteConfig } from '@/data/siteConfig';

interface ServiceDetail {
  slug: string;
  title: string;
  subtitle: string;
  price: string;
  duration: string;
  image: string;
  description: string[];
  features: string[];
  faqs: { q: string; a: string }[];
}

const serviceDetails: Record<string, ServiceDetail> = {
  '1-2-3-hours': {
    slug: '1-2-3-hours',
    title: 'Escort Service for 1/2/3 Hours in Gurgaon',
    subtitle: 'Quick, intense, and revitalizing companion sessions for busy executives and travelers.',
    price: 'From ₹15,000',
    duration: '1 to 3 Hours',
    image: '/images/assets/image_290x280_1.jpg',
    description: [
      'Our 1, 2, and 3-hour short-term escort packages are engineered for men on tight schedules who demand intense, concentrated pleasure without dedicating an entire evening.',
      'Whether you need a lunchtime rendezvous between meetings at DLF Cyber City or a relaxing afternoon companion at your 5-star hotel room, our verified companions arrive at your door within 20 to 30 minutes.',
      'Every session includes full intimacy, oral pleasure, French kissing, and warm sensual massage, ensuring you return to your day completely relaxed and re-energized.',
    ],
    features: [
      'Rapid 20-30 min hotel doorstep arrival',
      'One or two rounds of passionate intimacy',
      'Warm body-to-body sensual rubdown',
      'Zero advance payment – cash on arrival',
      'Strict discretion & client privacy guaranteed',
    ],
    faqs: [
      {
        q: 'Can I extend my 1-hour booking to 2 or 3 hours?',
        a: 'Yes, you can simply inform the companion or concierge during your session and settle the nominal difference directly in cash.',
      },
      {
        q: 'Do I have to pay any advance deposit for short calls?',
        a: 'No! We never ask for prepayments, hotel registration fees, or advance transfers. You pay directly upon her arrival.',
      },
    ],
  },
  'full-night': {
    slug: 'full-night',
    title: 'Full Night Escort Service in Gurgaon (Overnight Companionship)',
    subtitle: 'Unrestricted intimacy, late-night cuddles, and morning breakfast companionship from 10 PM to 8 AM.',
    price: 'From ₹30,000',
    duration: 'Full Night (10 PM - 8 AM)',
    image: '/images/assets/image_290x280_2.jpg',
    description: [
      'Experience the pinnacle of luxury with our overnight escort service. Designed for discerning VIPs who desire unhurried, multiple intimate sessions and the comforting warmth of sleeping next to an enchanting woman.',
      'Your companion arrives at your 5-star suite or luxury condominium around 10:00 PM. Enjoy dinner, drinks, deep conversations, and unrestricted erotic exploration throughout the night.',
      'Wake up together in the morning for tender cuddling, morning intimacy, and breakfast before she departs with supreme discretion at 8:00 AM.',
    ],
    features: [
      'Unlimited intimate sessions throughout the night',
      'Romantic dinner, clubbing, and lounge accompaniment',
      'Sensual oil massage and bathtub intimacy',
      'Sleep together and wake up with morning intimacy',
      'VIP concierge support with replacement guarantee',
    ],
    faqs: [
      {
        q: 'What time does the full night service start and finish?',
        a: 'Standard full night service runs from 10:00 PM to 08:00 AM, but hours can be customized to suit your flight or work schedule.',
      },
      {
        q: 'Can she accompany me to high-end restaurants or clubs in Gurgaon?',
        a: 'Absolutely. Our overnight models are impeccably dressed, cultured, and fluent in English, making them the ultimate arm candy for any upscale venue.',
      },
    ],
  },
  'sensual-massage': {
    slug: 'sensual-massage',
    title: 'Full Body Sensual & Erotic Massage in Gurgaon',
    subtitle: 'Melt away executive stress with exotic aromatic oils, warm skin-to-skin touch, and euphoric release.',
    price: 'From ₹15,000',
    duration: '60 to 90 Minutes',
    image: '/images/assets/Full_Body_Sensual_Massage.jpg',
    description: [
      'Our full body sensual massage blends ancient tantric healing touches with modern erotic relaxation. Skilled masseuses use warm natural essential oils to systematically release tension from every muscle group.',
      'Experience body-to-body gliding, feather-light strokes, deep tissue relief, and exhilarating climax relief in the comfort of your private hotel room.',
      'Designed specifically for stressed corporate travelers and executives wanting total mental clarity and physical euphoria.',
    ],
    features: [
      'Aromatic warm essential oils and relaxing music',
      'Head-to-toe full body sensual massage',
      'Body-to-body (Nuru-style) gliding and touch',
      'Shower intimacy and mutual body washing',
      'Complete physical and mental stress release',
    ],
    faqs: [
      {
        q: 'Where does the massage take place?',
        a: 'At your private hotel room or residence across Gurgaon, Aerocity, and South Delhi. The companion brings her own scented oils and essentials.',
      },
      {
        q: 'Does the massage include full intimacy?',
        a: 'Yes, all our sensual massage packages include full adult intimacy and passionate release.',
      },
    ],
  },
  'girlfriend-experience': {
    slug: 'girlfriend-experience',
    title: 'Girlfriend Experience (GFE) Escorts in Gurgaon',
    subtitle: 'Deep emotional connection, tender kisses, and unscripted romance that feels genuinely real.',
    price: 'From ₹20,000',
    duration: '2 to 6 Hours / Full Night',
    image: '/images/assets/image_290x280_4.jpg',
    description: [
      'The Girlfriend Experience (GFE) is our most sought-after booking package. Unlike purely transactional encounters, GFE offers genuine warmth, tender eye contact, deep French kissing, and affectionate conversation.',
      'Hold hands while walking, share laughter over cocktails, and enjoy passionate bedroom intimacy where both partners are thoroughly immersed in pleasure.',
      'Our GFE companions are compassionate, natural, and dedicated to making you feel genuinely desired and cherished.',
    ],
    features: [
      'Passionate French kissing and eye contact',
      'Emotional chemistry and relaxed dinner conversations',
      'Hand holding, gentle caressing, and affectionate cuddles',
      'Unscripted, natural bedroom intimacy',
      'No rush, no clocks, purely genuine passion',
    ],
    faqs: [
      {
        q: 'Which escort categories specialize in GFE?',
        a: 'Our independent escorts, college girls, and high-profile companions excel at delivering authentic Girlfriend Experiences.',
      },
    ],
  },
  'in-out-call': {
    slug: 'in-out-call',
    title: 'In-Call and Out-Call Escort Service in Gurgaon',
    subtitle: 'Flexible meeting options: visit our verified private apartments or book swift doorstep delivery to your location.',
    price: 'From ₹15,000',
    duration: 'Flexible Hours',
    image: '/images/assets/image_290x280_5.jpg',
    description: [
      'We offer both convenient in-call apartments and rapid out-call delivery across Gurgaon, Aerocity, and Delhi NCR.',
      'Outcalls: Your companion comes directly to your hotel room or private luxury residence within 20-30 minutes.',
      'In-calls: Discreet, sanitized luxury private suites located in upscale gated societies with secure parking and complete anonymity.',
    ],
    features: [
      'Discreet outcalls to all 4-star and 5-star hotels',
      'Luxury sanitized in-call apartments available',
      'Zero advance payment required',
      'Strict privacy protocol for public figures',
      '24/7 round-the-clock booking hotline',
    ],
    faqs: [
      {
        q: 'Which option is safer for first-time clients?',
        a: 'Hotel outcalls are our most popular and effortless option. Simply provide your hotel name and room number, and your companion arrives at your door.',
      },
    ],
  },
};

export function generateStaticParams() {
  return [
    { slug: '1-2-3-hours' },
    { slug: 'full-night' },
    { slug: 'sensual-massage' },
    { slug: 'girlfriend-experience' },
    { slug: 'in-out-call' },
  ];
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const serviceSlug = resolvedParams.slug;
  const service = serviceDetails[serviceSlug];

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#333333]">
      {/* Page Title Bar */}
      <div className="bg-[#671725] text-white py-12 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="mb-3">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: service.title },
              ]}
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {service.title}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-rose-100 font-light max-w-2xl">
            {service.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg mb-6">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#671725] text-white text-xs font-bold px-3 py-1.5 rounded shadow">
                  {service.price}
                </div>
                <div className="absolute bottom-4 right-4 bg-[#0B2154]/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded shadow">
                  Duration: {service.duration}
                </div>
              </div>

              <h2 className="text-2xl font-extrabold text-[#0B2154] mb-4">
                Service Overview &amp; Experience
              </h2>
              <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
                {service.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Package Inclusions */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-bold text-[#0B2154] mb-4">
                  What is Included in This Package
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs text-gray-700 bg-[#FFFDF6] p-3 rounded-lg border border-gray-100">
                      <CheckCircle size={15} className="text-[#671725] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-extrabold text-[#0B2154] mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {service.faqs.map((faq, i) => (
                  <div key={i} className="border-b border-gray-100 pb-4">
                    <h4 className="font-bold text-[#671725] text-sm mb-1">{faq.q}</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Booking Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white p-6 rounded-xl border border-gray-100 shadow-md space-y-6">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Book Package</span>
                <h3 className="text-xl font-black text-[#0B2154] mt-1">{service.title.split(' in ')[0]}</h3>
                <div className="mt-3 bg-[#F9E1E5]/50 p-3 rounded-lg border border-rose-200">
                  <span className="text-xs text-gray-500 block">Package Starting Price</span>
                  <span className="text-2xl font-black text-[#671725]">{service.price}</span>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20ALINA%20VIP,%20I%20want%20to%20book%20${encodeURIComponent(service.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#13bc18] hover:bg-[#0fa714] text-white text-xs font-bold rounded-lg shadow flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Book on WhatsApp Concierge</span>
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="w-full py-3 bg-[#671725] hover:bg-[#52121d] text-white text-xs font-bold rounded-lg shadow flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone size={14} />
                  <span>Call {siteConfig.phoneDisplay}</span>
                </a>
              </div>

              <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-2">
                <p className="flex items-center gap-2">
                  <Shield size={14} className="text-[#671725]" />
                  Zero Advance Payment Guaranteed
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={14} className="text-[#671725]" />
                  20-30 Min Outcall Across Gurgaon
                </p>
                <p className="flex items-center gap-2">
                  <Star size={14} className="text-[#671725]" />
                  100% Genuine Profile Commitment
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <Link
                  href="/rates"
                  className="block text-center text-xs font-bold text-[#671725] hover:underline"
                >
                  View Full Rates Matrix &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
