'use client';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {ArrowUpRight,ChevronDown,Menu} from 'lucide-react';
import {services,locations} from '@/lib/content';

export default function SiteHeader(){
 const headerRef=useRef<HTMLElement>(null);const solutionsHover=useRef(false);const regionHover=useRef(false);const [openDropdown,setOpenDropdown]=useState<'solutions'|'rajasthan'|null>(null);const pathname=usePathname();
 const closeMenus=()=>{setOpenDropdown(null);solutionsHover.current=false;regionHover.current=false;headerRef.current?.querySelectorAll<HTMLDetailsElement>('.mobile-nav[open]').forEach(detail=>{detail.open=false})};
 const handleLogoClick=(event:React.MouseEvent<HTMLAnchorElement>)=>{closeMenus();if(pathname==='/'){event.preventDefault();if(window.location.hash)window.history.replaceState(null,'',window.location.pathname+window.location.search);window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}};
 const toggleDropdown=(name:'solutions'|'rajasthan',hovered:boolean)=>{if(hovered){setOpenDropdown(name);return}setOpenDropdown(current=>current===name?null:name)};
 useEffect(()=>{closeMenus()},[pathname]);
 useEffect(()=>{
  const onPointerDown=(event:PointerEvent)=>{if(!headerRef.current?.contains(event.target as Node))closeMenus()};
  const onKeyDown=(event:KeyboardEvent)=>{if(event.key==='Escape'){closeMenus();headerRef.current?.querySelector<HTMLElement>('.nav-solutions summary')?.focus()}};
  document.addEventListener('pointerdown',onPointerDown);document.addEventListener('keydown',onKeyDown);
  return()=>{document.removeEventListener('pointerdown',onPointerDown);document.removeEventListener('keydown',onKeyDown)};
 },[]);
 const offeringGroups=[{title:'By property',items:services.filter(s=>['residential-solar','commercial-solar','housing-society-solar'].includes(s.slug))},{title:'By system',items:services.filter(s=>['on-grid-solar','hybrid-solar','off-grid-solar','pm-surya-ghar'].includes(s.slug))}];
 return <header ref={headerRef} className="site-header"><div className="wrap header-inner">
  <Link href="/" className="logo" aria-label="EXDELLS home" onClick={handleLogoClick}>EXDELLS<small>SOLAR · ENGINEERING · ENERGY</small></Link>
  <nav className="nav" aria-label="Main navigation">
   <Link href="/about" onClick={closeMenus}>About</Link>
   <details className="nav-solutions" open={openDropdown==='solutions'} onPointerEnter={event=>{if(event.pointerType==='mouse'){solutionsHover.current=true;setOpenDropdown('solutions')}}} onPointerLeave={event=>{if(event.pointerType==='mouse'){solutionsHover.current=false;setOpenDropdown(current=>current==='solutions'?null:current)}}}><summary onClick={event=>{event.preventDefault();toggleDropdown('solutions',solutionsHover.current)}}>Solutions <ChevronDown size={13}/></summary><div className="nav-dropdown mega-menu">{offeringGroups.map(group=><div key={group.title}><span className="eyebrow">{group.title}</span>{group.items.map(s=><Link href={`/services/${s.slug}`} key={s.slug} onClick={closeMenus}><b>{s.title}</b><small>{s.short}</small></Link>)}</div>)}<Link className="mega-compare" href="/compare-systems" onClick={closeMenus}>Compare on-grid, hybrid & off-grid <ArrowUpRight size={14}/></Link></div></details>
   <Link href="/projects" onClick={closeMenus}>Projects</Link><Link href="/pricing" onClick={closeMenus}>Pricing</Link><Link href="/compare-systems" onClick={closeMenus}>Compare</Link><Link href="/blog" onClick={closeMenus}>Insights</Link>
   <details className="nav-solutions" open={openDropdown==='rajasthan'} onPointerEnter={event=>{if(event.pointerType==='mouse'){regionHover.current=true;setOpenDropdown('rajasthan')}}} onPointerLeave={event=>{if(event.pointerType==='mouse'){regionHover.current=false;setOpenDropdown(current=>current==='rajasthan'?null:current)}}}><summary onClick={event=>{event.preventDefault();toggleDropdown('rajasthan',regionHover.current)}}>Rajasthan <ChevronDown size={13}/></summary><div className="nav-dropdown location-menu">{locations.map(l=><Link href={`/locations/${l.slug}`} key={l.slug} onClick={closeMenus}>{l.name} solar guide</Link>)}<Link href="/contact" onClick={closeMenus}>Ask about your location</Link></div></details>
   <Link href="/careers" onClick={closeMenus}>Careers</Link><Link href="/contact" onClick={closeMenus}>Contact</Link>
  </nav>
  <Link className="btn header-cta" href="/contact" onClick={closeMenus}>Free consultation <ArrowUpRight size={14}/></Link>
  <details className="mobile-nav"><summary aria-label="Open navigation"><Menu/></summary><div className="mobile-dropdown"><Link href="/about" onClick={closeMenus}>About EXDELLS</Link><span className="eyebrow">Solutions</span>{services.map(s=><Link href={`/services/${s.slug}`} key={s.slug} onClick={closeMenus}>{s.title}</Link>)}<span className="eyebrow">Explore</span><Link href="/projects" onClick={closeMenus}>Projects</Link><Link href="/pricing" onClick={closeMenus}>Price reference</Link><Link href="/compare-systems" onClick={closeMenus}>Compare systems</Link><Link href="/blog" onClick={closeMenus}>Insights</Link><Link href="/careers" onClick={closeMenus}>Careers</Link><span className="eyebrow">Rajasthan locations</span>{locations.map(l=><Link href={`/locations/${l.slug}`} key={l.slug} onClick={closeMenus}>{l.name} solar guide</Link>)}<Link href="/contact" onClick={closeMenus}>Contact & consultation</Link></div></details>
 </div></header>
}
