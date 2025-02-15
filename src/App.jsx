import './styles/global.css';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppRouter from '@/routes/AppRouter';
import { toast } from 'react-toastify';
import { WebsocketProvider } from '@/hooks/use-websocket';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      throwOnError: true,
    },
    mutations: {
      onError: (error) => {
        toast.error(error.message);
      },
    },
  },
});

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <WebsocketProvider>
          <RouterProvider router={AppRouter} />
          <ReactQueryDevtools initialIsOpen={false} />
        </WebsocketProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
