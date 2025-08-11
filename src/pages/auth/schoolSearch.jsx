import UNIVERSITY from '@/constants/university';
import { PATH } from '@/routes/path';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainButton } from '@/components/common/MainButton';
import { SearchDropdown } from '@/components/join/searchDropdown';
import { SkipHeader } from '@/components/join/SkipHeader';
import { UNIV_STATUS } from '@/constants/universityStatus';
import { useGetUserData } from '@/state/query/common/useGetUserData';
import { useCheckSchoolStatus } from '@/hooks/useCheckSchoolStatus';

export const SchoolSearch = () => {
  const [university, setUniversity] = useState('');
  const [isUniversitySelected, setIsUniversitySelected] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { isInitialAuthFlow } = location.state || false;

  const { data: userInfo } = useGetUserData();

  const { data: status } = useCheckSchoolStatus(
    !!userInfo && userInfo.universityId !== -1,
  );

  useEffect(() => {
    if (status === UNIV_STATUS.APPROVE || status === UNIV_STATUS.PENDING) {
      navigate(PATH.HOME, { replace: true });
    }
  }, [status]);

  return (
    <div className="flex h-full w-full flex-col">
      <SkipHeader isInitialAuthFlow={isInitialAuthFlow} />
      <div className="flex flex-1 flex-col gap-10 px-4 py-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-[3.125rem]">
            <div className="flex w-full justify-center gap-7 text-pageTitle">
              What is your school name?
            </div>
            <SearchDropdown
              keyword={university}
              name="Language"
              placeholder="Search your school"
              onChange={(value) => setUniversity(value)}
              setIsSelected={setIsUniversitySelected}
              selected={isUniversitySelected}
              list={UNIVERSITY}
              warn={`No school found.\nKampus supports 408 universities in Korea.`}
              label={false}
            />
          </div>
          <MainButton
            onClick={() =>
              navigate(`../${PATH.SIGNUP.VERIFY.BASE}`, {
                state: { university, isInitialAuthFlow },
              })
            }
            disabled={!isUniversitySelected}
          >
            Next
          </MainButton>
        </div>
      </div>
    </div>
  );
};
