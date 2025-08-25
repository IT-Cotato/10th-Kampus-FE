import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { useGetUserData } from '@/state/query/common/useGetUserData';

export default function PrivateRoute() {
  const { data, isError } = useGetUserData();

  if (isError) {
    return <Navigate to={PATH.LOGIN.BASE} replace />;
  }

  if (data) return <Outlet />;
}
