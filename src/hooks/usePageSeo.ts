import { useEffect } from 'react';
import { clearPageSeo, setPageSeo, type PageSeoInput } from '@/src/lib/seo';

/** Applies page SEO on mount and clears injected tags on unmount. */
export function usePageSeo(input: PageSeoInput): void {
  const keywordsKey = input.keywords?.join('|') ?? '';
  const jsonLdKey = input.jsonLd ? JSON.stringify(input.jsonLd) : '';

  useEffect(() => {
    setPageSeo(input);
    return () => {
      clearPageSeo();
    };
    // Serialize nested fields so callers can pass inline objects safely.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional key deps
  }, [
    input.title,
    input.description,
    input.path,
    input.image,
    input.type,
    keywordsKey,
    jsonLdKey,
  ]);
}
