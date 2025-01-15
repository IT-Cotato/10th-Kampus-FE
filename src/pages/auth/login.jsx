import KakaoLogin from '@/components/common/kakaoLogin';
import { GoogleLogin } from '@/components/common/googleLogin';
export const Login = () => {
  return (
    <div className="px-5 mx-auto my-auto">
      <KakaoLogin />
      <GoogleLogin />
    </div>
  );
};
