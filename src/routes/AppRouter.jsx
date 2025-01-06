import { Home } from '@/pages/home';
import { NotFound } from '@/pages/notFound';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
]);

export default AppRouter;
