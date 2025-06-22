import Logo from '@/assets/imgs/kampusLogo.svg?react';
import { KakaoLogin } from '@/components/common/kakaoLogin';
import { GoogleLogin } from '@/components/common/googleLogin';
import { useNavigate } from 'react-router-dom';
import { path } from '@/routes/path';
import { Bubble } from '@/components/common/Bubble';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-1 items-center">
      <button
        onClick={() =>
          navigate(`${path.mypage.base}/${path.mypage.service.base}`)
        }
        className="absolute right-4 top-4 px-4 py-2 text-base text-neutral-base"
      >
        Contact us
      </button>
      <div className="flex w-full -translate-y-12 flex-col items-center justify-center gap-6 px-8">
        <Logo className="w-40 text-primary-base" />
        <div className="flex w-full flex-col gap-4">
          <Bubble
            type="kakao"
            dir="bottom"
            text="Quick start with Kakao in 3 seconds!"
            className="mx-auto"
          />
          <KakaoLogin />
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};
