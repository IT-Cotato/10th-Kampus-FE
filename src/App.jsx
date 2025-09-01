import './styles/global.css';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from '@/routes/AppRouter';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { removeTokens } from './utils/authUtils';
import { useAuthStore } from './stores/useAuthStore';
import { reissueToken } from './apis/auth/reissueToken.api';

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
  useEffect(() => {
    const initAuth = async () => {
      try {
        const accessToken = await reissueToken();
        if (accessToken) {
          useAuthStore.getState().setAccessToken(accessToken);
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        await removeTokens();
      } finally {
        useAuthStore.getState().setInitializing(false);
      }
    };

    initAuth();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={AppRouter} />
    </QueryClientProvider>
  );
}

export default App;
