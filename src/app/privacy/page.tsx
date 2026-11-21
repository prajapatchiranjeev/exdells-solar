import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How EXDELLS uses information submitted through its solar consultation forms and website.',
  alternates: { canonical: '/privacy' },
};

const sections = [
  ['Information you submit', 'The consultation form asks for contact and project details such as your name, mobile number, email (optional), city, property type, electricity bill, approximate system size and message. You can leave optional fields blank. Please do not send passwords, payment details or other sensitive information through the enquiry form.'],
  ['How we use it', 'We use enquiry details to respond to your request, understand the site or project and coordinate relevant follow-up. If a campaign link brought you to the site, basic campaign source values may be submitted with the form so the enquiry can be attributed to that campaign.'],
  ['Handling and sharing', 'A submitted enquiry is sent to the website service and, when the configured lead system is available, stored for the EXDELLS team to review. Information may be processed by the providers needed to operate the website and enquiry service. We do not use form details to publish a customer story without permission.'],
  ['Your choices', 'You may choose not to submit an enquiry. To request access to, correction of or deletion of information you have submitted, contact EXDELLS and identify the enquiry so the team can locate it.'],
  ['Contact', 'For privacy questions, email info@exdells.com.'],
];

export default function Privacy() {
  return <main><div className="title-band"><div className="wrap"><span className="eyebrow">Website information</span><h1 className="display">Privacy, in <span className="gold">plain language.</span></h1><p className="muted" style={{ maxWidth: 700 }}>This notice describes the information collected when you use the EXDELLS website enquiry form and how it is used to respond to your request.</p></div></div><section className="section"><div className="wrap policy-content">{sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p className="muted">{text}</p></section>)}<p className="policy-updated">Last updated: 12 November 2026</p><Link className="text-link" href="/contact">Contact EXDELLS <span>→</span></Link></div></section></main>;
}
