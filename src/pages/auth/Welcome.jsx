import { MainButton } from '@/components/common/MainButton';
import { SkipButton } from '@/components/join/SkipButton.jsx';
import { PATH } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-[3.75rem] bg-primary-5 px-4 align-middle">
      <div className="flex w-full justify-center text-center text-title text-primary-base">
        Welcome to
        <br />
        Kampus
      </div>
      <div className="flex w-full flex-col items-center gap-5 pb-10">
        <MainButton
          onClick={() =>
            navigate(`../${PATH.SIGNUP.SCHOOL}`, {
              state: { isInitialAuthFlow: true },
            })
          }
        >
          Search your school
        </MainButton>
        <div className="w-full text-neutral-base">
          If you skip this, you can not enter to school community
          <span className="text-primary-red">*</span>
        </div>
        <SkipButton navigateTo={`../../${PATH.HOME}`} />
      </div>
    </div>
  );
};
