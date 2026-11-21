-- Replace the former industrial offering with a housing-society service.
-- Existing industrial records remain in the database for historical integrity,
-- but are no longer published as a current EXDELLS service.

insert into public.services(
  title, slug, short_description, description, benefits, features,
  image_url, seo_title, meta_description, published
) values (
  'Housing Society & Community Solar',
  'housing-society-solar',
  'Shared rooftop solar planning for apartments, RWAs and common facilities.',
  'Housing-society solar brings shared rooftops, common-area electricity, multiple meters and resident coordination into one project scope. EXDELLS reviews the association decision process, sanctioned connections, common loads such as lifts and water pumps, roof access, structure, shading and waterproofing. The assessment clarifies which meter or facility could be served and what the local utility permits. A proposal records assumptions, allocation method, approvals, safety, installation phasing and handover. Final capacity and savings require a site and bill review.',
  '["Map common-area loads, meters and recent electricity bills", "Review shared rooftop access, structure, shade and waterproofing", "Confirm meter ownership, sanctioned load and DISCOM process", "Check whether generation can serve common facilities or other meters under current rules", "Plan RWA approvals, resident communication, safe phasing and handover"]'::jsonb,
  '["Apartment rooftop assessment", "Common-area load and meter review", "RWA project planning and installation coordination"]'::jsonb,
  '/images/exdells-housing-society-solar.webp',
  'Housing Society Solar EPC in Rajasthan | EXDELLS',
  'Plan rooftop solar for Rajasthan apartments and housing societies. Review common-area loads, shared meters, roof conditions and current DISCOM requirements with EXDELLS.',
  true
)
on conflict (slug) do update set
  title = excluded.title,
  short_description = excluded.short_description,
  description = excluded.description,
  benefits = excluded.benefits,
  features = excluded.features,
  image_url = excluded.image_url,
  seo_title = excluded.seo_title,
  meta_description = excluded.meta_description,
  published = true;

update public.services set published = false where slug = 'industrial-solar';

insert into public.faqs(question, answer, category, sort_order, published)
values (
  'Can solar serve a housing society’s common facilities?',
  'A shared rooftop system may be planned around eligible common-area loads such as lifts, water pumps, corridor lighting and security. The usable meter arrangement and any credit sharing depend on current DISCOM rules, so confirm them before choosing a system size.',
  'Housing Society Solar',
  90,
  true
)
on conflict do nothing;
