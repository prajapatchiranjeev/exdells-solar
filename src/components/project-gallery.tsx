'use client';
import {useMemo,useState} from 'react';
import Link from 'next/link';
import {ArrowRight,MapPin} from 'lucide-react';

type Project={id:string;slug:string;name:string;location?:string|null;project_type?:string|null;capacity_kw?:number|null;description:string;project_images?:{image_url:string;alt_text?:string|null}[]};

export default function ProjectGallery({projects}:{projects:Project[]}){
 const [filter,setFilter]=useState('All');
 const categories=['All',...Array.from(new Set(projects.map(p=>p.project_type).filter(Boolean) as string[]))];
 const visible=useMemo(()=>filter==='All'?projects:projects.filter(p=>p.project_type===filter),[filter,projects]);
 return <>
  <div className="project-filters" role="group" aria-label="Filter projects by type">{categories.map(category=><button key={category} className={filter===category?'active':''} aria-pressed={filter===category} onClick={()=>setFilter(category)}>{category}</button>)}</div>
  <div className="project-gallery">{visible.map(p=>{
   const shot=p.project_images?.[0]?.image_url;
   return <Link className="project-tile" href={`/projects/${p.slug}`} key={p.id}>
    <div className="project-tile-image" style={shot?{backgroundImage:`linear-gradient(0deg,#090b10e8,transparent 80%),url(${shot})`}:{}} role="img" aria-label={p.project_images?.[0]?.alt_text||`${p.name} solar project`}/>
    <div className="project-tile-copy"><span className="eyebrow"><MapPin size={12} style={{verticalAlign:'-2px',marginRight:4}}/>{p.location||'Rajasthan'} · {p.project_type||'Solar EPC'}</span><h2 className="display">{p.name}</h2><p className="muted">{p.capacity_kw?`${p.capacity_kw} kW · `:''}{p.description}</p><span className="service-link">View project details <ArrowRight size={14}/></span></div>
   </Link>
  })}</div>
 </>;
}
