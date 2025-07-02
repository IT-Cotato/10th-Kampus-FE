import { path } from '@/routes/path';
import { useAuthStore } from '@/stores/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const { accessToken } = useAuthStore();

  if (!accessToken) {
    return <Navigate to={path.login.base} replace />;
  }
  return <Outlet />;
}
