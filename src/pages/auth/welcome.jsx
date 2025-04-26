import { MainWhiteButton } from '@/components/common/MainWhiteButton';
import { SkipButton } from '@/components/join/skipButton';
import { path } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-[3.75rem] bg-primary-20 px-4 align-middle">
      <div className="flex w-full justify-center text-center text-title text-white">
        Welcome to
        <br />
        Kampus
      </div>
      <div className="flex w-full flex-col items-center gap-5 pb-10">
        <MainWhiteButton
          onClick={() =>
            navigate(`../${path.signup.school}`, { state: { isFirst: true } })
          }
        >
          Search your school
        </MainWhiteButton>
        <div className="w-full text-neutral-base">
          If you skip this, you can not enter to school community
          <span className="text-primary-red">*</span>
        </div>
        <SkipButton navigateTo={`../../${path.home}`} />
      </div>
    </div>
  );
};
