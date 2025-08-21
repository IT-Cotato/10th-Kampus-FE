import { useAuthStore } from '@/stores/useAuthStore';
import { Outlet } from 'react-router-dom';
import { Loading } from '@/components/common/Loading';

export default function PrivateRoute() {
  const { isInitializing } = useAuthStore();

  // 토큰 갱신 중일 때는 로딩 화면 표시
  if (isInitializing) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loading />
        <p className="text-sm mt-2 text-gray-600">인증 확인 중...</p>
      </div>
    );
  }

  // 토큰 갱신이 완료된 후 토큰이 없으면 로그인 페이지로 리다이렉트
  // if (!isInitializing && !accessToken) {
  //   return <Navigate to={PATH.LOGIN.BASE} replace />;
  // }

  return <Outlet />;
}
