import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Website Terms and Conditions',
  description: 'Terms for using EXDELLS website information, pricing references and solar estimate tools.',
  alternates: { canonical: '/terms' },
};

const terms = [
  ['Website information', 'The pages on this site explain solar systems, project steps and general planning considerations. They are provided for information and do not replace a site survey, engineering design, written quotation or signed project agreement.'],
  ['Estimates and pricing', 'Calculator results, generation figures, savings examples and historical price references are indicative. Actual system design and cost depend on the property, electricity use, equipment, tariff, utility requirements and site conditions. A current written proposal should set out the confirmed scope, assumptions, inclusions and exclusions.'],
  ['Schemes and approvals', 'Government programme rules, subsidy eligibility, vendor requirements and utility processes can change. Confirm current information with the official programme and the distribution utility serving the consumer meter before making a decision.'],
  ['Project enquiries', 'Submitting a consultation request does not create an installation contract or guarantee project acceptance, service availability, savings or a particular completion date. Any agreed work is governed by the final written proposal and project agreement.'],
  ['Using this website', 'Please use the site lawfully and do not attempt to disrupt its operation, submit false enquiry details or access restricted areas. EXDELLS may update website content as products, processes and programme information change.'],
];

export default function Terms() {
  return <main><div className="title-band"><div className="wrap"><span className="eyebrow">Website information</span><h1 className="display">Clear terms for using <span className="gold">this website.</span></h1><p className="muted" style={{ maxWidth: 700 }}>These terms cover the information and tools published on the EXDELLS website. A project proposal or signed agreement sets the terms for any installation work.</p></div></div><section className="section"><div className="wrap policy-content">{terms.map(([title, text]) => <section key={title}><h2>{title}</h2><p className="muted">{text}</p></section>)}<p className="policy-updated">Last updated: 12 November 2026</p><Link className="text-link" href="/contact">Contact EXDELLS <span>→</span></Link></div></section></main>;
}
