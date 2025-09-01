import Logo from '@/assets/imgs/icon/kampus-logo.svg?react';
import { KakaoLogin } from '@/components/common/KakaoLogin';
import { Bubble } from '@/components/common/Bubble';
import OfficialMail from '@/constants/officialMail.json';

export const Login = () => {
  //token cleanup 기능이 필요할 것 같음

  return (
    <div className="relative flex flex-1 items-center">
      <a
        aria-label="Contact us button"
        className="absolute right-4 top-4 px-4 py-2 text-base text-neutral-base"
        href={`mailto:${OfficialMail.mail}`}
      >
        Contact us
      </a>
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
        </div>
      </div>
    </div>
  );
};
