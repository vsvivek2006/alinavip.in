import ServiceDetailPage from '../services/[slug]/page';

export default function Page() {
  return <ServiceDetailPage params={Promise.resolve({ slug: 'girlfriend-experience' })} />;
}
