import '@/styles/global.css';
import { RouterProvider } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      throwOnError: true,
    },
    mutations: {
      onError: (error) => {
        CustomToast({
          type: error.status,
          message: error.message,
        });
      },
    },
  },
});

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={AppRouter} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer limit={1} />
    </div>
  );
}

export default App;
