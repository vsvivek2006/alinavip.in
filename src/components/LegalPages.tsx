import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';

interface LegalPageProps {
  title: string;
  description: string;
  slug: string;
  content: { heading: string; paragraphs: string[] }[];
}

export function LegalPage({ title, description: _description, slug: _slug, content }: LegalPageProps) {
  return (
    <div className="bg-[#FFFDF6] min-h-screen text-[#2d2d2d]">
      <section className="relative bg-[#671725] text-white py-14 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            {title}
          </h1>
          <p className="text-sm md:text-base text-gray-200 max-w-2xl mx-auto">
            Official Regulatory, Privacy &amp; Operational Policies of ALINA VIP India
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs md:text-sm text-gray-300">
            <Link href="/" className="hover:text-white underline">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">{title}</span>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-10 space-y-8">
          {content.map((section, i) => (
            <div key={i} className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-[#111827] border-b border-gray-100 pb-2">
                {section.heading}
              </h2>
              {section.paragraphs.map((para, j) => (
                <p key={j} className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          ))}

          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
            <p>
              Platform: <a href={siteConfig.url} className="text-[#671725] font-bold hover:underline">{siteConfig.domain}</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="Official Terms and Conditions for ALINA VIP Escort Service"
      slug="terms"
      content={[
        {
          heading: "1. Legal Age and Mutual Consent",
          paragraphs: [
            "All clients booking companions through ALINA VIP must be of legal adult age (18 years or older). By using this service, you explicitly affirm that you are a consenting adult.",
            "All featured companions are independent consenting adults aged 21 years or older who voluntarily provide VIP companionship services."
          ]
        },
        {
          heading: "2. Zero Advance Payment Protocol",
          paragraphs: [
            "ALINA VIP does not demand advance registration fees, security deposits, or digital prepayment via UPI/Paytm prior to the arrival of your companion.",
            "Full service fees are settled directly with the companion upon in-person arrival at your private hotel room or residence."
          ]
        },
        {
          heading: "3. Mutual Respect & Safety Guidelines",
          paragraphs: [
            "Clients are expected to maintain the utmost courtesy, hygiene, and respect towards companions. Intoxication, aggressive behavior, or non-consensual demands will result in immediate termination of the booking without refunds."
          ]
        }
      ]}
    />
  );
}

export function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="Client Confidentiality and Data Protection Protocols"
      slug="privacy-policy"
      content={[
        {
          heading: "1. Absolute Confidentiality",
          paragraphs: [
            "We uphold an ironclad discretion policy. We do not store, archive, or disclose client phone numbers, chat logs, booking itineraries, or personal details to any external third party.",
            "All communications via WhatsApp and phone hotlines are encrypted and purged on a regular 24-hour retention cycle."
          ]
        },
        {
          heading: "2. Discreet Doorstep Outcall Arrival",
          paragraphs: [
            "Companions arrive in unmarked luxury transport, casually and elegantly dressed to blend naturally into 5-star hotel lobbies and luxury residential societies without drawing unwanted attention."
          ]
        }
      ]}
    />
  );
}

export function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      description="Operational and Informational Disclaimer"
      slug="disclaimer"
      content={[
        {
          heading: "1. Information Accuracy",
          paragraphs: [
            "The profiles, photos, and descriptions published on ALINA VIP represent verified independent companions. Rates and availability are subject to scheduling confirmations.",
            "This platform operates solely as a premium concierge referral service facilitating private social engagements between consenting adults."
          ]
        }
      ]}
    />
  );
}
