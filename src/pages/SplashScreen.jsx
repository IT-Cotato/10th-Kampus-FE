import { path } from '@/routes/path';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import Logo from '@/assets/imgs/kampusLogo.svg?react';

export const SplashScreen = () => {
  //   const { user, isUserLoading } = useUser(true)
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      // 로그인 상태일 경우 홈페이지로, 아닐 경우 로그인 페이지로 이동
      if (accessToken) {
        navigate(path.home);
      } else {
        navigate(path.login.base);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [accessToken, navigate]);

  return (
    <div className="flex flex-1 items-center justify-center bg-primary-base">
      <Logo className="w-[12.5rem] text-white" />
    </div>
  );
};
