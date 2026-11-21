import type {MetadataRoute} from 'next';
import {services,articles,locations} from '@/lib/content';
import {db} from '@/lib/supabase';

export const revalidate=3600;
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const base=process.env.NEXT_PUBLIC_SITE_URL||'https://www.exdells.com';
 const staticPaths=['/','/about','/contact','/careers','/projects','/blog','/faqs','/calculator','/pricing','/compare-systems','/privacy','/terms',...locations.map(l=>`/locations/${l.slug}`)];
 const client=db();let serviceSlugs=services.map(s=>s.slug),blogSlugs=articles.map(a=>a.slug),projectSlugs:string[]=[];
 if(client){const [serviceRows,blogRows,projectRows]=await Promise.all([
  client.from('services').select('slug,created_at').eq('published',true),
  client.from('blogs').select('slug,created_at').eq('status','published'),
  client.from('projects').select('slug,created_at').eq('published',true)
 ]);if(serviceRows.data?.length)serviceSlugs=serviceRows.data.map(x=>x.slug);if(blogRows.data?.length)blogSlugs=blogRows.data.map(x=>x.slug);projectSlugs=projectRows.data?.map(x=>x.slug)||[]}
 const paths=[...staticPaths,...serviceSlugs.map(s=>`/services/${s}`),...blogSlugs.map(s=>`/blog/${s}`),...projectSlugs.map(s=>`/projects/${s}`)];
 return paths.map(path=>({url:`${base}${path}`,lastModified:new Date(),changeFrequency:path==='/'?'weekly':'monthly',priority:path==='/'?1:.7}));
}
