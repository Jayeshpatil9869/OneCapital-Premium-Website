import { useEffect, useState, type FormEvent } from 'react';
import { InsightsBreadcrumb } from '@/src/components/sections/insights/InsightsBreadcrumb';
import { Container } from '@/src/components/ui';
import { COMPANY } from '@/src/data/company';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = `Newsletter | ${COMPANY.brandName}`;
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.includes('@') || !email.includes('.')) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="w-full bg-black pt-[max(7.5rem,env(safe-area-inset-top))] pb-[var(--space-section)] text-white">
      <Container className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <InsightsBreadcrumb current="Newsletter" />
        <h1 className="mt-6 max-w-[14ch] font-sans text-[2.5rem] font-bold leading-[1.02] tracking-[-0.03em] sm:mt-8 sm:text-6xl">
          <span className="block">Notes, when</span>
          <span className="block font-medium text-white/40">they matter.</span>
        </h1>
        <p className="mt-8 max-w-[36rem] border-t border-white/15 pt-6 font-sans text-[15px] font-light leading-[1.65] text-white/80 sm:pt-8 sm:text-base lg:text-lg">
          A short dispatch from {COMPANY.brandName} on allocation, planning, and the decisions that sit behind a portfolio. No product pitches.
        </p>

        {submitted ? (
          <p className="mt-10 max-w-md font-sans text-base text-white" role="status">
            You are on the list. The next note will go to {email}.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 flex max-w-lg flex-col gap-3 sm:flex-row sm:items-center">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              className="h-12 w-full rounded-full border border-white/15 bg-white/[0.03] px-5 font-sans text-sm text-white placeholder:text-white/35 focus:border-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="h-12 shrink-0 rounded-full bg-white px-6 font-sans text-sm font-medium text-black transition-colors hover:bg-white/90"
            >
              Subscribe
            </button>
            {error ? (
              <p className="font-sans text-sm text-white/70 sm:basis-full">{error}</p>
            ) : null}
          </form>
        )}
      </Container>
    </section>
  );
}
