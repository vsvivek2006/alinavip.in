import ServiceDetailPage, { generateMetadata as getMeta } from '../services/[slug]/page';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return getMeta({ params: Promise.resolve({ slug: 'escort-service-for-1-2-3-hours' }) });
}

export default function Page() {
  return <ServiceDetailPage params={Promise.resolve({ slug: 'escort-service-for-1-2-3-hours' })} />;
}
