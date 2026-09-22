import { Navigate } from 'react-router-dom';
import { getDedicatedPageConfig } from '@/src/data/solutions-pages';
import SolutionDedicatedPage from './SolutionDedicatedPage';

export default function IntelligenceOversightPage() {
  const config = getDedicatedPageConfig('intelligence-oversight');
  if (!config) return <Navigate to="/solutions" replace />;
  return <SolutionDedicatedPage config={config} />;
}
