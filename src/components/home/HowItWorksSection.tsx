const howItWorks = [
  {
    number: '01',
    title: 'Browse Profiles',
    description:
      'Explore our curated portfolio of verified escort profiles across specialized categories and premier Gurgaon locations.',
  },
  {
    number: '02',
    title: 'Contact Our Desk',
    description:
      'Call us directly or send a discreet WhatsApp message with your location, timing, and preferred escort.',
  },
  {
    number: '03',
    title: 'Instant Confirmation',
    description:
      'Our booking team confirms availability within minutes and coordinates discreet in-call or out-call arrangements.',
  },
  {
    number: '04',
    title: 'Enjoy Luxury Rendezvous',
    description:
      'Meet your verified escort at your hotel suite or residence and experience an unforgettable, premium engagement.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-luxury">
        <div className="text-center mb-14">
          <p className="section-subtitle text-gold-600">How It Works</p>
          <h2 className="section-title mb-4 text-[#0F172A]">
            Simple &amp; <span className="text-gradient-gold">Discreet Process</span>
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((item, i) => (
            <div
              key={i}
              className="text-center group p-6 rounded-2xl bg-gray-50 hover:bg-gold-50/50 transition-all border border-gray-100 hover:border-gold-300"
            >
              <div className="font-serif text-6xl text-gold-500/20 font-light mb-4 group-hover:text-gold-500/40 transition-colors">
                {item.number}
              </div>
              <h3 className="font-serif text-xl text-[#0F172A] mb-3 font-bold">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
