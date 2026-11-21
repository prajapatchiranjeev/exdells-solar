import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, MapPin, Users, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers at EXDELLS | Build Solar Across Rajasthan',
  description: 'Explore career paths in solar EPC at EXDELLS, from engineering and site execution to sales and customer engagement across Rajasthan.',
  alternates: { canonical: '/careers' },
};

const roles = [
  { no: '01', team: 'Engineering & EPC', title: 'Solar Design Engineer', text: 'Help translate site conditions, energy use and electrical requirements into clear rooftop solar designs and project scopes.', fit: 'Electrical / solar design experience · Jaipur', icon: Wrench },
  { no: '02', team: 'Projects & Execution', title: 'Site Engineer / Supervisor', text: 'Coordinate installation teams, site readiness, material movement, safety practices and quality checks through commissioning.', fit: 'Field role · Rajasthan project locations', icon: BriefcaseBusiness },
  { no: '03', team: 'Site Assessment', title: 'Site Visit Executive', text: 'Visit homes, businesses and housing societies to document roofs, meters, access, shade and customer requirements accurately.', fit: 'Field travel · Rajasthan', icon: MapPin },
  { no: '04', team: 'Business Development', title: 'Solar Sales Executive', text: 'Understand customer goals, explain system options in plain language and coordinate qualified enquiries through the proposal stage.', fit: 'Customer-facing · Rajasthan', icon: Users },
  { no: '05', team: 'Customer Engagement', title: 'Telecaller', text: 'Respond to incoming enquiries, gather essential project details and arrange timely follow-ups with the appropriate team.', fit: 'Phone and CRM coordination · Jaipur', icon: BriefcaseBusiness },
  { no: '06', team: 'Project Coordination', title: 'EPC Project Coordinator', text: 'Keep customer communication, documentation, schedules and internal hand-offs organised from survey through handover.', fit: 'Coordination role · Jaipur', icon: Wrench },
];

const values = [
  ['Safety comes first', 'Plan field work carefully and respect site, electrical and working-at-height safety requirements.'],
  ['Be clear with customers', 'Set realistic expectations, communicate progress and record project details accurately.'],
  ['Learn on real projects', 'Work across rooftops, businesses and housing communities, with guidance from the wider EPC team.'],
];

export default function CareersPage() {
  const subject = encodeURIComponent('Career application | EXDELLS');
  const body = encodeURIComponent('Hello EXDELLS team,\n\nI am interested in a career opportunity.\n\nRole: \nPreferred city: \nRelevant experience: \nPhone number: \n\nI have attached my resume.');
  const applyHref = `mailto:info@exdells.com?subject=${subject}&body=${body}`;

  return <main className="careers-page">
    <section className="careers-hero">
      <div className="careers-hero-image" aria-hidden="true" />
      <div className="wrap careers-hero-content">
        <span className="eyebrow">Careers · EXDELLS · Rajasthan</span>
        <h1 className="display">Build the work<br /><span className="gold">behind a brighter grid.</span></h1>
        <p>Solar projects move forward through thoughtful engineering, dependable site teams and honest customer conversations. Explore the kinds of roles that help us plan and deliver solar across Rajasthan.</p>
        <div className="careers-hero-actions"><a className="btn" href={applyHref}>Share your resume <ArrowUpRight size={15} /></a><a className="btn secondary" href="#opportunities">Explore career paths <ArrowRight size={15} /></a></div>
        <div className="careers-hero-meta"><span>JAIPUR · RAJASTHAN</span><span>ENGINEERING · FIELD · CUSTOMER TEAMS</span></div>
      </div>
    </section>

    <section className="section careers-intro"><div className="wrap careers-intro-grid"><div><span className="eyebrow">Work with purpose and precision</span><h2 className="display">Good solar work is a <span className="gold">team effort.</span></h2></div><div><p className="muted">From the first roof measurement to the final handover, every role contributes to a system that fits a real site. At EXDELLS, career paths span design, field execution, customer engagement and project coordination.</p><p className="muted">We welcome people who take ownership, communicate clearly and are ready to learn. Role requirements, location and travel expectations are discussed during the hiring process.</p></div></div></section>

    <section className="section careers-opportunities" id="opportunities"><div className="wrap"><div className="section-intro"><div><span className="eyebrow">Career paths</span><h2 className="display">Find your place in the <span className="gold">solar journey.</span></h2><p className="muted">These are the functions we hire for as project needs arise. Please confirm current openings with our team before applying.</p></div></div>
      <div className="careers-role-grid">{roles.map(({ no, team, title, text, fit, icon: Icon }) => <article className="careers-role" key={no}><div className="careers-role-top"><span>{no} / {team}</span><Icon size={19} strokeWidth={1.5} aria-hidden="true" /></div><h3>{title}</h3><p>{text}</p><div className="careers-role-fit">{fit}</div><a href={applyHref} aria-label={`Apply for ${title}`}>Apply with your resume <ArrowUpRight size={14} /></a></article>)}</div>
    </div></section>

    <section className="section careers-values"><div className="wrap"><div className="careers-values-heading"><span className="eyebrow">How we work</span><h2 className="display">A strong team is built on <span className="gold">good fundamentals.</span></h2></div><div className="careers-value-grid">{values.map(([title, text], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="section careers-apply"><div className="wrap careers-apply-panel"><div><span className="eyebrow">Start a conversation</span><h2 className="display">Ready to work on <span className="gold">what comes next?</span></h2><p className="muted">Email your resume and mention the role, your preferred location and relevant experience. Our team can share details about suitable openings and next steps.</p></div><div className="careers-apply-actions"><a className="btn" href={applyHref}>Email your resume <ArrowUpRight size={15} /></a><Link className="text-link" href="/contact">Contact EXDELLS <ArrowRight size={14} /></Link><span>Applications: info@exdells.com</span></div></div></section>
  </main>;
}
