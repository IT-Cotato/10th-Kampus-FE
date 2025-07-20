import { path } from '@/routes/path';
import { useAuthStore } from '@/stores/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetAdminUserData } from '@/state/query/admin/useGetAdminUserData';
import { Forbidden } from '@/pages/Forbidden';
import { Loading } from '@/components/common/Loading';

export default function AdminRoute() {
  const { accessToken } = useAuthStore();

  // 관리자 사용자 정보를 가져와서 권한 확인
  const { data: userData, isLoading, error } = useGetAdminUserData();

  // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  if (!accessToken) {
    return <Navigate to={path.login.base} replace />;
  }

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loading />
        <p className="text-sm mt-2 text-gray-600">권한 확인 중...</p>
      </div>
    );
  }

  // 에러가 발생한 경우 (관리자 권한이 없는 경우)
  if (error) {
    return <Forbidden />;
  }

  // 관리자 권한이 확인된 경우
  if (userData) {
    return <Outlet />;
  }

  // 기본적으로 권한이 없는 경우
  return <Forbidden />;
}
