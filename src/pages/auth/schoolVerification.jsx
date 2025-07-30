import { MainWhiteButton } from '@/components/common/MainWhiteButton';
import { path } from '@/routes/path';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SkipHeader } from '@/components/join/SkipHeader';
import { useCheckSchoolStatus } from '@/hooks/useCheckSchoolStatus';
import { UNIV_STATUS } from '@/constants/universityStatus';
import { useGetUserData } from '@/state/query/common/useGetUserData';

export const SchoolVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { university, isInitialAuthFlow } = location.state;

  const { data: userInfo } = useGetUserData();

  const { data: status } = useCheckSchoolStatus(
    !!userInfo && userInfo.universityId !== -1,
  );

  useEffect(() => {
    if (status === UNIV_STATUS.APPROVE || status === UNIV_STATUS.PENDING) {
      navigate(path.home, { replace: true });
    }
    if (university === undefined) {
      navigate(`${path.signup.base}/${path.signup.school}`, { replace: true });
    }
  }, [status, university]);

  return (
    <div className="flex h-full w-full flex-col">
      <SkipHeader isInitialAuthFlow={isInitialAuthFlow} />
      <div className="flex flex-1 flex-col gap-10 px-4 py-5">
        <div className="flex flex-col gap-[3.125rem]">
          <div className="flex w-full justify-center text-pageTitle">
            How will you verify your school?
          </div>
          <div className="flex flex-col gap-[1.875rem]">
            <MainWhiteButton
              onClick={() =>
                navigate(path.signup.verify.email, {
                  state: { university, isInitialAuthFlow },
                })
              }
            >
              School email address
            </MainWhiteButton>
            {/** 
             * 사진 인증 관리자 페이지 미완성으로 우선 보류 
            <MainWhiteButton
              onClick={() =>
                navigate(path.signup.verify.file, {
                  state: { university, isInitialAuthFlow },
                })
              }
            >
              Student verification photo
            </MainWhiteButton>
             */}
          </div>
        </div>
      </div>
    </div>
  );
};
