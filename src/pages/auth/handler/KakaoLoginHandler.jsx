import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import { Loading } from '@/components/common/Loading';
import { PATH } from '@/routes/path';
import { getUserDetail } from '@/apis/auth/login.api';

export const KakaoLoginHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAccessToken } = useAuthStore();

  useEffect(() => {
    // URL에 토큰 정보가 남지 않도록 replace: true 추가
    const handleLogin = async () => {
      const { data, success } = await getUserDetail();
      if (data === undefined) {
        alert('Login Failed!');
        navigate(PATH.LOGIN.BASE, { replace: true });
        return;
      }
      if (success && data.needSetup) {
        navigate(PATH.SIGNUP.BASE, { replace: true });
      } else if (success && !data.needSetup) {
        navigate(PATH.HOME, { replace: true });
      } else {
        alert('Login Failed!');
        navigate(PATH.LOGIN.BASE, { replace: true });
      }
    };

    // URL의 쿼리 문자열에서 accessToken을 파싱
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      setAccessToken(accessToken);
      handleLogin();
    } else {
      // 토큰이 없는 경우, alert 창 이후 로그인 창으로 리다이렉트
      console.error('카카오 로그인 처리 중 에러: Access Token이 없습니다.');
      alert('Kakao Login Failed!');
      navigate(PATH.LOGIN.BASE, { replace: true });
    }
  }, [location]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Loading />
    </div>
  );
};
