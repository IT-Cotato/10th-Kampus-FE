import University from '@/constants/university';
import { path } from '@/routes/path';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '@/components/common/MainButton';
import { SearchDropdown } from '@/components/join/searchDropdown';
import { SkipHeader } from '@/components/join/SkipHeader';
import { useCheckSchoolStatus } from '@/hooks/useCheckSchoolStatus';

export const SchoolSearch = () => {
  const UniversityList = University;
  const [university, setUniversity] = useState('');
  const [isUniversitySelected, setIsUniversitySelected] = useState(false);

  const navigate = useNavigate();

  const { data: status } = useCheckSchoolStatus();

  useEffect(() => {
    if (status === 'APPROVED' || status === 'PENDING') {
      navigate(`../../${path.home}`);
    }
  }, [status, university]);

  return (
    <div className="flex h-full w-full flex-col">
      <SkipHeader />
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
              list={UniversityList}
              warn={`No school found.\nKampus supports 408 universities in Korea.`}
              label={false}
            />
          </div>
          <MainButton
            onClick={() =>
              navigate(`../${path.signup.verify.base}`, { state: university })
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
