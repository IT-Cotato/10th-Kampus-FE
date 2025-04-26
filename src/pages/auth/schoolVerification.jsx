import { MainWhiteButton } from '@/components/common/MainWhiteButton';
import { path } from '@/routes/path';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SkipHeader } from '@/components/join/SkipHeader';
import { useCheckSchoolStatus } from '@/hooks/useCheckSchoolStatus';
import { UNIV_STATUS } from '@/constants/universityStatus';

export const SchoolVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { university, isFirst } = location.state;

  const { data: status } = useCheckSchoolStatus();

  useEffect(() => {
    if (status === UNIV_STATUS.APPROVE || status === UNIV_STATUS.PENDING) {
      navigate(path.home, { replace: true });
    }
    if (university === undefined) {
      navigate(path.signup.base + '/' + path.signup.school, { replace: true });
    }
  }, [status, university]);

  return (
    <div className="flex h-full w-full flex-col">
      <SkipHeader isFirst={isFirst} />
      <div className="flex flex-1 flex-col gap-10 px-4 py-5">
        <div className="flex flex-col gap-[3.125rem]">
          <div className="flex w-full justify-center text-pageTitle">
            How will you verify your school?
          </div>
          <div className="flex flex-col gap-[1.875rem]">
            <MainWhiteButton
              onClick={() =>
                navigate(path.signup.verify.email, {
                  state: { university: university, isFirst: isFirst },
                })
              }
            >
              School email address
            </MainWhiteButton>
            <MainWhiteButton
              onClick={() =>
                navigate(path.signup.verify.file, {
                  state: { university: university, isFirst: isFirst },
                })
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
