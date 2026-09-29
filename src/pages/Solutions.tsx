import { useEffect } from 'react';
import { SolutionsCatalogue } from '@/src/components/sections/solutions/SolutionsCatalogue';
import { SOLUTIONS_HUB } from '@/src/data/solutions-pages';

export default function Solutions() {
  useEffect(() => {
    document.title = SOLUTIONS_HUB.documentTitle;
  }, []);

  return <SolutionsCatalogue />;
}
