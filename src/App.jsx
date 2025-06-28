import './styles/global.css';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from '@/routes/AppRouter';
import { toast } from 'react-toastify';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      throwOnError: true,
    },
    mutations: {
      throwOnError: false,
      onError: (error) => {
        toast.error(`[${error.code}] ${error.message}`);
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={AppRouter} />
    </QueryClientProvider>
  );
}

export default App;
