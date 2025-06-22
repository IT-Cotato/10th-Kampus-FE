import { path } from '@/routes/path';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/imgs/kampusLogo.svg?react';

export const SplashScreen = () => {
  //   const { user, isUserLoading } = useUser(true)
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      //로그인 상태일경우 path.board로 이동
      navigate(path.login.base);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center bg-primary-base">
      <Logo className="w-[12.5rem] text-white" />
    </div>
  );
};
