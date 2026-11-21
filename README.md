# EXDELLS Solar EPC

Responsive Next.js website for EXDELLS with public service pages, project and blog routes, solar savings estimator, lead capture, Supabase schema and an admin entry point.

## Local development

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env.local`.
3. Run `npm install`, then `npm run dev` and open http://localhost:3000.
4. Public pages render without credentials. Lead storage and CMS require Supabase configuration.

## Supabase setup

Create a Supabase project, then run the migrations in timestamp order: `202610310001_initial.sql`, `202610310002_rajasthan_content.sql`, and `202610310003_housing_society_solar.sql`. The last migration publishes the housing-society service and unpublishes the industrial service while preserving historic records. Configure `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and the server-only `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`. Never expose the service-role key in browser code. Create the admin account in Supabase Auth, then insert its profile with the `admin` role:

```sql
insert into public.profiles (id, full_name, role_id)
select '<AUTH_USER_UUID>', 'EXDELLS Administrator', id from public.roles where name='admin';
```

The lead endpoint validates requests on the server and writes through the service role. Public lead insertion is intentionally disabled in RLS. The admin sign-in and lead listing use Supabase Auth and RLS. Storage buckets and access policies are included in the migration.

## Deploy

Deploy as a Next.js application (for example, Vercel). Set the same environment variables in the hosting provider, set `NEXT_PUBLIC_SITE_URL` to the production canonical origin, run the migration, and create the staff account/profile. Verify Supabase Auth redirect URLs and storage policies for your deployed domain.

## Configuration and launch checklist

- Business contact details and the registered Jaipur address are transcribed from the EXDELLS corporate profile and solar price list provided for this site. Confirm they remain current before launch.
- The public initial service copy is descriptive demo content. No customer testimonials or completed project claims are fabricated. Create and publish only verified records in Supabase.
- The calculator uses a broad 120 units/kW/month planning assumption and does not estimate system price or payback. Review the separate `/pricing` page for dated 2025 package references. The PDF's with-subsidy and without-subsidy totals imply different package scopes and must be reconciled in a current written quotation before publication as live offers. Current scheme eligibility and subsidy amounts must be checked on the official PM Surya Ghar portal.
- The system comparison page is general planning guidance. Final design and scheme eligibility depend on site, consumer category, utility rules and current official guidance.
- Privacy and terms pages are starter drafts requiring company/legal review.
- Rich-text editing, full page builder, upload management, settings editor, lead status editing, and role-specific admin screens are not yet implemented. The schema supports the main records; current admin supports Supabase sign-in, aggregate counts, lead viewing and CSV export.

## Verification

`npm run lint` runs the TypeScript compiler and passes. The production build was attempted; in the restricted Windows workspace, Next.js encountered an `EPERM` while creating `.next-local-build/static/chunks/next/dist/client`. Database-backed flows need Supabase credentials for end-to-end verification.
