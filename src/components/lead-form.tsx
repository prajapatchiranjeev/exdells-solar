'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';

type FormStatus = { kind: 'success' | 'error'; message: string } | null;

export default function LeadForm() {
  const [status, setStatus] = useState<FormStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState('Residential');
  const [state, setState] = useState('Rajasthan');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const customer = params.get('customer');
    const categories: Record<string, string> = {
      residential: 'Residential',
      commercial: 'Commercial',
      'housing-society': 'Housing Society',
      'housing-society-solar': 'Housing Society',
    };

    if (customer && categories[customer]) setCategory(categories[customer]);
    const requestedState = params.get('state');
    if (requestedState) setState(requestedState.slice(0, 80));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const params = new URLSearchParams(window.location.search);
    data.utm_source = params.get('utm_source') || '';
    data.utm_campaign = params.get('utm_campaign') || '';
    data.source = 'website consultation';

    setStatus(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus({ kind: 'error', message: result.error || 'We could not send your request. Please try again.' });
        return;
      }

      form.reset();
      setStatus({ kind: 'success', message: 'Thank you. Your request has been received; our team will be in touch.' });
    } catch {
      setStatus({ kind: 'error', message: 'Connection issue. Please check your internet and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form card" onSubmit={submit}>
      <label>Name <span aria-hidden="true">*</span><input name="name" autoComplete="name" required minLength={2} maxLength={120} /></label>
      <label>Mobile number <span aria-hidden="true">*</span><input name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" required pattern="[6-9][0-9]{9}" title="Enter a 10-digit Indian mobile number" /></label>
      <label>Email address <span className="muted">(optional)</span><input name="email" type="email" autoComplete="email" maxLength={254} /></label>
      <label>City <span aria-hidden="true">*</span><input name="city" autoComplete="address-level2" required maxLength={120} /></label>
      <label>State<input name="state" autoComplete="address-level1" value={state} onChange={event => setState(event.target.value)} maxLength={80} /></label>
      <label>Project type<select name="customer_type" value={category} onChange={event => setCategory(event.target.value)}><option>Residential</option><option>Commercial</option><option>Housing Society</option></select></label>
      <label>Monthly electricity bill <span className="muted">(₹, optional)</span><input name="monthly_bill" type="number" min="0" max="100000000" step="100" inputMode="numeric" /></label>
      <label>Approximate system size <span className="muted">(optional)</span><input name="capacity" placeholder="For example, 5 kW" maxLength={80} /></label>
      <label>Tell us about your site <span className="muted">(optional)</span><textarea name="message" rows={4} maxLength={3000} placeholder="Location, roof or facility type, and what you would like to achieve" /></label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="form-honeypot" />
      <button className="btn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending your request…' : 'Request a consultation'} <ArrowUpRight size={15} aria-hidden="true" />
      </button>
      <p className="form-privacy">We’ll use these details to respond to your project enquiry. <Link href="/privacy">Privacy notice</Link></p>
      {status && <p role="status" aria-live="polite" className={`form-status form-status-${status.kind}`}>{status.message}</p>}
    </form>
  );
}
