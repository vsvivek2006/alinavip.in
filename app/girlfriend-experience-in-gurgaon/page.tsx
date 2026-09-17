import ServiceDetailPage, { generateMetadata as getMeta } from '../services/[slug]/page';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return getMeta({ params: Promise.resolve({ slug: 'girlfriend-experience-in-gurgaon' }) });
}

export default function Page() {
  return <ServiceDetailPage params={Promise.resolve({ slug: 'girlfriend-experience-in-gurgaon' })} />;
}
