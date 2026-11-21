import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer, Floating } from '@/components/chrome';
import Breadcrumbs from '@/components/breadcrumbs';
import { services } from '@/lib/content';
import { businessContact } from '@/lib/business';

const siteDescription = 'Rajasthan solar EPC for homes, businesses and housing societies. Explore site-specific system planning, transparent price references and project support from EXDELLS.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.exdells.com'),
  title: { default: 'EXDELLS | Solar EPC in Rajasthan', template: '%s | EXDELLS' },
  description: siteDescription,
  alternates: { canonical: '/' },
  openGraph: { title: 'EXDELLS | Solar EPC in Rajasthan', description: siteDescription, url: '/', siteName: 'EXDELLS', images: [{ url: '/images/exdells-solar-banner-daylight.webp', width: 1920, height: 1080, alt: 'Rajasthan rooftop solar planned around the site' }], type: 'website', locale: 'en_IN' },
  twitter: { card: 'summary_large_image', title: 'EXDELLS | Solar EPC in Rajasthan', description: siteDescription, images: ['/images/exdells-solar-banner-daylight.webp'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.exdells.com';
  const schema = { '@context': 'https://schema.org', '@type': 'Organization', name: 'EXDELLS', url: base, description: 'Solar EPC solutions for homes, businesses and housing societies across Rajasthan.', telephone: businessContact.office.href.replace('tel:', ''), email: 'info@exdells.com', address: { '@type': 'PostalAddress', streetAddress: '2nd Floor, Garima Tower, Niwaru Road', addressLocality: 'Jaipur', addressRegion: 'Rajasthan', postalCode: '302012', addressCountry: 'IN' }, contactPoint: businessContact.support.map(item => ({ '@type': 'ContactPoint', telephone: item.href.replace('tel:', ''), contactType: 'customer support', areaServed: 'IN' })), areaServed: { '@type': 'AdministrativeArea', name: 'Rajasthan, India' }, knowsAbout: services.map(service => service.title) };
  return <html lang="en-IN"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /><Header /><Breadcrumbs />{children}<Footer /><Floating /></body></html>;
}
