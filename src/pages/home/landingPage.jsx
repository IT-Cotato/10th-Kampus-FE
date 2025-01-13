import { path } from '@/routes/path';
import { cn } from '@/utils/cn';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingPage = ({ isLanding = false }) => {
  //   const { user, isUserLoading } = useUser(isLanding)
  const navigate = useNavigate();
  useEffect(() => {
    if (isLanding) {
      const timer = setTimeout(() => {
        //로그인 상태일경우 path.board로 이동
        navigate(path.login);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [navigate, isLanding]);

  return (
    <div
      className={cn([
        'container flex flex-col items-center justify-center gap-y-10',
        !isLanding && 'hidden lg:flex',
      ])}
    >
      <div className="relative">
        {/* <img
          src={}
          alt="Landing Logo"
          width={240}
          height={240}
          className="relative -left-2"
        /> */}
      </div>
      <h3 className="relative text-neutral-700">유학생 커뮤니티 Kampus</h3>
    </div>
  );
};
