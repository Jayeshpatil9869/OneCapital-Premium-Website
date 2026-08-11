import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Approach from './pages/Approach';
import Team from './pages/Team';
import Insights from './pages/Insights';
import Contact from './pages/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'solutions', element: <Solutions /> },
      { path: 'approach', element: <Approach /> },
      { path: 'team', element: <Team /> },
      { path: 'insights', element: <Insights /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
