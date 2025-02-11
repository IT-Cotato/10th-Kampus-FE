import Prev from '@/assets/imgs/previous.svg?react';
import { SkipButton } from '@/components/join/skipButtonShadow';
import { MainWhiteButton } from '@/components/common/MainWhiteButton';
import { path } from '@/routes/path';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const SchoolVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const university = location.state;

  useEffect(() => {
    if (university === undefined) {
      navigate(`../${path.signup.school}`);
    }
  }, [university]);

  return (
    <div className="flex flex-col flex-1 gap-10 px-4 py-5">
      <div className="flex items-center justify-between">
        <Prev
          className="w-5 h-5 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <SkipButton navigateTo={`../../${path.home}`} />
      </div>
      <div className="flex flex-col gap-[3.125rem]">
        <div className="flex justify-center w-full text-pageTitle">
          How will you verify your school?
        </div>
        <div className="flex flex-col gap-[1.875rem]">
          <MainWhiteButton
            onClick={() =>
              navigate(path.signup.verify.email, { state: university })
            }
          >
            School email address
          </MainWhiteButton>
          <MainWhiteButton
            onClick={() =>
              navigate(path.signup.verify.file, { state: university })
            }
          >
            Student verification photo
          </MainWhiteButton>
        </div>
      </div>
    </div>
  );
};
