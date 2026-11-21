import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { db } from '@/lib/supabase';
import ProjectGallery from '@/components/project-gallery';

export const metadata: Metadata = { title: 'Solar Projects and EPC Capabilities', description: 'Explore EXDELLS solar EPC project details and capabilities across residential, commercial and housing-society sites in Rajasthan.', alternates: { canonical: '/projects' } };
export const revalidate = 300;

export default async function Projects() {
  const client = db();
  let rows: any[] = [];
  if (client) {
    const { data } = await client.from('projects').select('*,project_images(image_url,alt_text,sort_order)').eq('published', true).order('created_at', { ascending: false });
    rows = data || [];
  }
  return <main><div className="title-band projects-title"><div className="wrap"><span className="eyebrow">Rajasthan · EXDELLS project work</span><h1 className="display">Designed for the site.<br /><span className="gold">Delivered with care.</span></h1><p className="muted" style={{ maxWidth: 720 }}>A solar EPC project is more than installed capacity. Each published project should explain the property, system approach, delivery scope and the decisions that shaped the result.</p></div></div><section className="section"><div className="wrap">{rows.length ? <ProjectGallery projects={rows} /> : <div className="projects-empty"><span className="eyebrow">A transparent project library</span><h2 className="display">Verified project stories are being prepared.</h2><p className="muted">We publish completed work with approved photography, confirmed location and capacity, clear project scope and the technical details that made each design suitable. Until then, we do not present sample installations as EXDELLS projects.</p><div className="project-proof-grid">{[['Site context', 'Property type, location, roof or facility conditions.'], ['System scope', 'Capacity, architecture and equipment confirmed for the project.'], ['Delivery record', 'Installation, commissioning and documented handover.']].map(([title, copy]) => <div key={title}><b>{title}</b><p className="muted">{copy}</p></div>)}</div><Link className="btn" href="/contact">Discuss your project <ArrowUpRight size={15} /></Link></div>}</div></section><section className="section projects-cta"><div className="wrap projects-cta-inner"><div><span className="eyebrow">Ready to scope a site?</span><h2 className="display">Start with the meter, the roof and the load.</h2><p className="muted">Share your location and recent electricity bill. We’ll confirm what can be assessed and which project details are needed next.</p></div><Link className="btn" href="/contact">Request a site conversation <ArrowRight size={15} /></Link></div></section></main>;
}
