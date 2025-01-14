import kakaoLogin from '@/assets/imgs/loginKakao.png';
import googleLogin from '@/assets/imgs/loginGoogle.svg';
import KakaoLogin from '@/components/common/kakaoLogin';
export const Login = () => {
  return (
    <div className="px-5 mx-auto my-auto">
      <KakaoLogin />
      <img
        src={googleLogin}
        alt="Google Login"
        className="w-4/5 mx-auto mt-6"
      />
    </div>
  );
};
