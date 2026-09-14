export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Kabir V.',
    location: 'DLF Cyber City, Gurgaon',
    rating: 5,
    text: 'ALINA VIP India is in a league of its own. I reserved a VIP escort for an executive dinner at CyberHub, and she exceeded every expectation. Stunning appearance, intellectual conversational flair, and absolute discretion throughout. Truly a 5-star experience.',
  },
  {
    name: 'Devendra M.',
    location: 'The Oberoi, Golf Course Road',
    rating: 5,
    text: 'Having stayed at luxury hotels across the globe, I demand uncompromising standards. The Russian companion who arrived at my suite within 30 minutes was genuine, statuesque, and captivating. The zero-advance policy gave me complete confidence.',
  },
  {
    name: 'Siddharth R.',
    location: 'DLF Phase 5 (The Camellias)',
    rating: 5,
    text: 'The discretion and attention to detail from ALINA VIP are unmatched in Delhi NCR. From the rapid concierge WhatsApp support to the companion’s radiant charm and poise, everything was handled with executive elegance.',
  },
  {
    name: 'Sameer N.',
    location: 'Aerocity Hospitality District',
    rating: 5,
    text: 'Booked an air hostess escort during a brief transit layover in Aerocity. Punctual, beautifully groomed, and an absolute pleasure to converse with. Easily the most reliable companion agency in Gurgaon and Delhi.',
  },
  {
    name: 'Anish T.',
    location: 'Sohna Road, Gurgaon',
    rating: 5,
    text: 'I was hesitant about agency bookings, but ALINA VIP put all concerns to rest. The independent companion was verified in-person, warm, affectionate, and completely unhurried. Highly recommended for discerning gentlemen.',
  },
  {
    name: 'Rohan P.',
    location: 'Sector 29, Gurgaon',
    rating: 5,
    text: 'Arranged a luxury weekend travel escort for an outstation trip to a heritage palace in Rajasthan. Cultured, well-travelled, and magnetic company. Thank you ALINA VIP India for making the entire getaway unforgettable.',
  },
];

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    slug: 'dinner-escort-service',
    title: 'Fine Dining Companionship',
    shortDescription: 'Elegant, statuesque companions for romantic dinners and Michelin-grade dining.',
    description: 'Elevate your culinary evenings with a glamorous, articulate companion well-versed in high-end restaurant etiquette. Whether dining at DLF CyberHub, Horizon Plaza, or an intimate private table at The Oberoi, our companions bring effortless grace, magnetic charm, and captivating conversation.',
    icon: 'UtensilsCrossed',
  },
  {
    slug: 'event-escort-service',
    title: 'Social Gala & Red Carpet Hosting',
    shortDescription: 'Polished, high-fashion models to enhance your status at high-profile gatherings.',
    description: 'Command attention at exclusive corporate galas, charity balls, art exhibitions, and luxury launches across Delhi NCR. Our event escorts are impeccably styled, socially poised, and trained to blend seamlessly into elite circles as your sophisticated guest.',
    icon: 'Calendar',
  },
  {
    slug: 'travel-escort-service',
    title: 'Luxury Vacation & Travel Escorts',
    shortDescription: 'Well-travelled, multilingual jet-set partners for domestic and worldwide holidays.',
    description: 'Transform business conferences and leisure escapes into extraordinary getaways. Our travel escorts possess valid passports, international travel experience, and the adaptability to accompany discerning gentlemen to luxury beach villas, ski resorts, or overseas metropolitan hubs.',
    icon: 'Plane',
  },
  {
    slug: 'party-escort-service',
    title: 'VIP Nightlife & Lounge Accompaniment',
    shortDescription: 'Vivacious, high-energy companions for premier cocktail lounges and private parties.',
    description: 'Experience Gurgaon’s vibrant nightlife with a gorgeous, fun-loving partner. From exclusive rooftop lounges in Sector 29 to private farmhouse pool parties, our companions bring joyful energy, dazzling smiles, and sophisticated revelry.',
    icon: 'PartyPopper',
  },
  {
    slug: 'business-escort-service',
    title: 'Corporate Executive Companionship',
    shortDescription: 'Educated, professional companions for business conventions and corporate entertainment.',
    description: 'Tailored for senior executives, business tycoons, and visiting multinational directors. Our corporate companions possess university backgrounds, sharp intellect, and flawless English fluency, making them ideal partners for business dinners and corporate retreats.',
    icon: 'Briefcase',
  },
  {
    slug: 'private-escort-service',
    title: 'Private Hotel Suite Outcalls',
    shortDescription: 'Discreet, unhurried companionship in the sanctuary of your 5-star hotel suite or home.',
    description: 'Unwind in total serenity with our confidential private escort service. Delivered directly to your five-star hotel room or private penthouse in Gurgaon, this service focuses on intimate relaxation, emotional warmth, and total sensory rejuvenation without time pressures.',
    icon: 'Lock',
  },
];
