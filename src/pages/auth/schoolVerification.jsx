import Prev from '@/assets/imgs/previous.svg?react';
import { SkipButton } from '@/components/join/skipButtonShadow';
import { MainWhiteButton } from '@/components/common/MainWhiteButton';
import { path } from '@/routes/path';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SkipHeader } from '@/components/join/SkipHeader';
import { useCheckSchoolStatus } from '@/hooks/use-CheckSchoolStatus';

export const SchoolVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const university = location.state;
  const [status, setStatus] = useState('');

  const { mutate } = useCheckSchoolStatus();

  useEffect(() => {
    mutate(undefined, {
      onSuccess: (data) => {
        setStatus(data.status);
      },
      onError: (error) => {
        alert(error);
      },
    });
  }, []);

  useEffect(() => {
    if (status === 'APPROVED' || status === 'PENDING') {
      navigate(`../../${path.home}`);
    }
    if (university === undefined) {
      navigate(`../${path.signup.school}`);
    }
  }, [status, university]);

  return (
    <div className="flex flex-col w-full h-full">
      <SkipHeader />
      <div className="flex flex-col flex-1 gap-10 px-4 py-5">
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
    </div>
  );
};
