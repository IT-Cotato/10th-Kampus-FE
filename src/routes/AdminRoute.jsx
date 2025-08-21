import { Outlet } from 'react-router-dom';
import { useGetAdminUserData } from '@/state/query/admin/useGetAdminUserData';
import { Forbidden } from '@/pages/Forbidden';
import { Loading } from '@/components/common/Loading';
import { AdminLayout } from '@/pages';

export default function AdminRoute() {
  // 관리자 사용자 정보를 가져와서 권한 확인
  const { data: userData, isLoading, isError, error } = useGetAdminUserData();

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
        <Loading />
        <p className="text-sm text-gray-600">권한 확인 중...</p>
      </div>
    );
  }

  if (isError && error instanceof Error && error.message === 'FORBIDDEN') {
    return <Forbidden />;
  }

  // 관리자 권한이 확인된 경우
  if (userData) {
    return (
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    );
  }

  return null;
}
