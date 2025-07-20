import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { path } from '@/routes/path';

export default function PublicRoute() {
  const { accessToken } = useAuthStore();

  if (accessToken) {
    return <Navigate to={path.home} replace />;
  }

  return <Outlet />;
}
