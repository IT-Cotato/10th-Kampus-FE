import kakaoLogin from '@/assets/imgs/loginKakao.png';
import googleLogin from '@/assets/imgs/loginGoogle.svg';

export const Login = () => {
  return (
    <div className="px-5 mx-auto my-auto">
      <img src={kakaoLogin} alt="kakaoLogin" />
      <img
        src={googleLogin}
        alt="Google Login"
        className="w-4/5 mx-auto mt-6"
      />
    </div>
  );
};
