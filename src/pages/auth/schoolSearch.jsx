import University from '@/constants/university';
import { path } from '@/routes/path';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '@/components/common/MainButton';
import { SearchDropdown } from '@/components/join/searchDropdown';
import { SkipHeader } from '@/components/join/SkipHeader';

export const SchoolSearch = () => {
  const UniversityList = University;
  const [university, setUniversity] = useState('');
  const [isUniversitySelected, setIsUniversitySelected] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-full">
      <SkipHeader />
      <div className="flex flex-col flex-1 gap-10 px-4 py-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-[3.125rem]">
            <div className="flex justify-center w-full gap-7 text-pageTitle">
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
              warn="No school found. Kampus supports 397 universities in Korea."
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
