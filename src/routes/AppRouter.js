import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '@/pages/home';
import { NotFound } from '@/pages/notFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
