import { BUTTON_THEMES, ButtonRound } from '@/components/common/ButtonRound';
import bgErrorAnimation from '@/assets/lottie/bgError.json';
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <Player
        src={bgErrorAnimation}
        loop
        autoplay
        speed={1}
        className="absolute inset-0 z-0 h-full w-full opacity-70"
      />
      <div className="relative z-10 mx-auto flex flex-col items-center justify-center rounded-xl bg-white bg-opacity-10 p-6 text-center shadow-xl">
        <h2 className="text-2xl mb-3 font-extrabold text-primary-red">
          Page Not Found
        </h2>
        <p className="mb-4 text-base text-neutral-title">
          The page you are looking for does not exist.
          <br />
          Please check the URL and try again.
        </p>
        <ButtonRound
          text="Go to Home"
          onClick={() => navigate(PATH.HOME)}
          theme={BUTTON_THEMES.BASE}
        />
      </div>
    </div>
  );
};
