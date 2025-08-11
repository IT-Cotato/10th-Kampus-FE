import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { ButtonRound, BUTTON_THEMES } from '@/components/common/ButtonRound';

export const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-6xl mb-6 font-bold text-primary-red">403</div>
        <h1 className="text-2xl mb-4 font-bold text-neutral-80">Forbidden</h1>
        <p className="mb-8 text-neutral-title">
          You do not have permission to access this page.
          <br />
          Only administrators can access this page.
        </p>
        <div className="flex justify-center gap-4">
          <ButtonRound
            text="Go to Home"
            onClick={() => navigate(PATH.HOME, { replace: true })}
            theme={BUTTON_THEMES.BASE}
          />
          <ButtonRound
            text="Go Back"
            onClick={() => navigate(-1)}
            theme={BUTTON_THEMES.OUTLINE}
          />
        </div>
      </div>
    </div>
  );
};
