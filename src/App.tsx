import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Approach from './pages/Approach';
import Team from './pages/Team';
import Insights from './pages/Insights';
import Blog from './pages/Blog';
import Newsletter from './pages/Newsletter';
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
import ProductPage from './pages/solutions/ProductPage';
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
      { path: 'solutions/mutual-funds', element: <ProductPage productId="mutual-funds" /> },
      { path: 'solutions/pms', element: <ProductPage productId="pms" /> },
      { path: 'solutions/aif', element: <ProductPage productId="aif" /> },
      { path: 'solutions/equity', element: <ProductPage productId="equity" /> },
      { path: 'solutions/equity-baskets', element: <ProductPage productId="equity-baskets" /> },
      { path: 'solutions/options-baskets', element: <ProductPage productId="options-baskets" /> },
      { path: 'solutions/equity-broking', element: <ProductPage productId="equity-broking" /> },
      { path: 'solutions/retail-broking', element: <ProductPage productId="retail-broking" /> },
      { path: 'solutions/investment-advisory', element: <ProductPage productId="investment-advisory" /> },
      { path: 'approach', element: <Approach /> },
      { path: 'team', element: <Team /> },
      { path: 'insights', element: <Insights /> },
      { path: 'blog', element: <Blog /> },
      { path: 'newsletter', element: <Newsletter /> },
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
