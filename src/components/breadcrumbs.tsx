'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

const labels:Record<string,string>={about:'About EXDELLS',services:'Solar solutions',projects:'Projects',blog:'Insights',locations:'Rajasthan locations',calculator:'Solar savings calculator',contact:'Contact',careers:'Careers',faqs:'Solar FAQs',privacy:'Privacy policy',terms:'Terms and conditions',admin:'Admin'};
export default function Breadcrumbs(){const pathname=usePathname();if(!pathname||pathname==='/'||pathname==='/admin')return null;const parts=pathname.split('/').filter(Boolean);return <nav className="breadcrumb-wrap" aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li>{parts.map((part,i)=>{const href='/'+parts.slice(0,i+1).join('/');const label=labels[part]||decodeURIComponent(part).split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');const current=i===parts.length-1;return <li key={href}>{current?<span aria-current="page">{label}</span>:<Link href={href}>{label}</Link>}</li>})}</ol></nav>}
