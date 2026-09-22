import { Navigate } from 'react-router-dom';
import { getDedicatedPageConfig } from '@/src/data/solutions-pages';
import SolutionDedicatedPage from './SolutionDedicatedPage';

export default function CapitalStrategyPage() {
  const config = getDedicatedPageConfig('capital-strategy');
  if (!config) return <Navigate to="/solutions" replace />;
  return <SolutionDedicatedPage config={config} />;
}
