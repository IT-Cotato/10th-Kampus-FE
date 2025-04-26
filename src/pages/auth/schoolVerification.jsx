import { MainWhiteButton } from '@/components/common/MainWhiteButton';
import { path } from '@/routes/path';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SkipHeader } from '@/components/join/SkipHeader';
import { useCheckSchoolStatus } from '@/hooks/useCheckSchoolStatus';

export const SchoolVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const university = location.state;

  const { data: status } = useCheckSchoolStatus();

  useEffect(() => {
    if (status === 'APPROVED' || status === 'PENDING') {
      navigate(`../../${path.home}`);
    }
    if (university === undefined) {
      navigate(`../${path.signup.school}`);
    }
  }, [status, university]);

  return (
    <div className="flex h-full w-full flex-col">
      <SkipHeader />
      <div className="flex flex-1 flex-col gap-10 px-4 py-5">
        <div className="flex flex-col gap-[3.125rem]">
          <div className="flex w-full justify-center text-pageTitle">
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
