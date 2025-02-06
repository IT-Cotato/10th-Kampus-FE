import { MainWhiteButton } from '@/components/common/MainWhiteButton';
import { SkipButton } from '@/components/join/skipButton';
import { path } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full px-4 align-middle bg-primary-20 gap-[3.75rem]">
      <div className="flex justify-center w-full text-center text-white text-title">
        Welcome to
        <br />
        Kampus
      </div>
      <div className='flex flex-col items-center w-full gap-5 pb-10'>
        <MainWhiteButton onClick={() => navigate(`../${path.signup.school}`)}>
          Search your school
        </MainWhiteButton>
        <div className="w-full text-neutral-base">
          If you skip this, you can not enter to school community
          <span className="text-primary-red">*</span>
        </div>
        <SkipButton navigateTo={`../../${path.home}`}/>
      </div>
    </div>
  );
};
