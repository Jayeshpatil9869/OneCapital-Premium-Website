import { Navigate } from 'react-router-dom';
import { getDedicatedPageConfig } from '@/src/data/solutions-pages';
import SolutionDedicatedPage from './SolutionDedicatedPage';

export default function RiskWealthArchitecturePage() {
  const config = getDedicatedPageConfig('risk-wealth-architecture');
  if (!config) return <Navigate to="/solutions" replace />;
  return <SolutionDedicatedPage config={config} />;
}
