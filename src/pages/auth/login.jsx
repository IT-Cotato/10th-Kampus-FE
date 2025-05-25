import Logo from '@/assets/imgs/kampusLogo.svg?react';
import { KakaoLogin } from '@/components/common/kakaoLogin';
import { GoogleLogin } from '@/components/common/googleLogin';
import { useEffect } from 'react';
import { parseTokenFromUrl } from '@/utils/authUtils';
import { getUserDetail } from '../../apis/auth/login.api';
import { useNavigate } from 'react-router-dom';
import { path } from '@/routes/path';
import { setTokens } from '../../utils/authUtils';
import { Bubble } from '@/components/common/Bubble';

export const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      const { accessToken, refreshToken } = parseTokenFromUrl();
      if (!accessToken || !refreshToken) {
        return;
      }
      await setTokens({ accessToken, refreshToken });
      const { data, success } = await getUserDetail();
      if (data === undefined) {
        window.location.reload();
      }
      if (success && data.needSetup) {
        navigate(path.signup.base);
      } else if (success && !data.needSetup) {
        navigate(path.home);
      } else {
        alert('Login Failed!');
      }
    };
    handleLogin();
  }, []);
  return (
    <div className="relative flex items-center flex-1">
      <button
        onClick={() =>
          navigate(`${path.mypage.base}/${path.mypage.service.base}`)
        }
        className="absolute px-4 py-2 text-base right-4 top-4 text-neutral-base"
      >
        Contact us
      </button>
      <div className="flex flex-col items-center justify-center w-full gap-6 px-8 -translate-y-12">
        <Logo className="w-40 text-primary-base" />
        <div className="flex flex-col w-full gap-4">
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
