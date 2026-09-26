import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Approach from './pages/Approach';
import Team from './pages/Team';
import Insights from './pages/Insights';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import DesignSystem from './pages/DesignSystem';
import Calculators from './pages/Calculators';
import SipCalculatorPage from './pages/calculators/SipCalculatorPage';
import LumpsumCalculatorPage from './pages/calculators/LumpsumCalculatorPage';
import StepUpSipCalculatorPage from './pages/calculators/StepUpSipCalculatorPage';
import SwpCalculatorPage from './pages/calculators/SwpCalculatorPage';
import GoalPlanningCalculatorPage from './pages/calculators/GoalPlanningCalculatorPage';
import CapitalStrategyPage from './pages/solutions/CapitalStrategyPage';
import PortfolioManagementPage from './pages/solutions/PortfolioManagementPage';
import RiskWealthArchitecturePage from './pages/solutions/RiskWealthArchitecturePage';
import IntelligenceOversightPage from './pages/solutions/IntelligenceOversightPage';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'solutions', element: <Solutions /> },
      { path: 'solutions/capital-strategy', element: <CapitalStrategyPage /> },
      { path: 'solutions/portfolio-management', element: <PortfolioManagementPage /> },
      { path: 'solutions/risk-wealth-architecture', element: <RiskWealthArchitecturePage /> },
      { path: 'solutions/intelligence-oversight', element: <IntelligenceOversightPage /> },
      { path: 'approach', element: <Approach /> },
      { path: 'team', element: <Team /> },
      { path: 'insights', element: <Insights /> },
      { path: 'blog', element: <Blog /> },
      { path: 'insights/blog', element: <Navigate to="/blog" replace /> },
      { path: 'calculators', element: <Calculators /> },
      { path: 'calculators/sip', element: <SipCalculatorPage /> },
      { path: 'calculators/lumpsum', element: <LumpsumCalculatorPage /> },
      { path: 'calculators/step-up-sip', element: <StepUpSipCalculatorPage /> },
      { path: 'calculators/swp', element: <SwpCalculatorPage /> },
      { path: 'calculators/goal-planning', element: <GoalPlanningCalculatorPage /> },
      { path: 'contact', element: <Contact /> },
      { path: 'design-system', element: <DesignSystem /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
