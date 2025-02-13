import { MainButton } from '@/components/common/MainButton';
import { MainWhiteButton } from '@/components/common/MainWhiteButton';
import { TitleHeader } from '@/components/common/titleHeader';
import { SearchDropdownWithNoLabel } from '@/components/join/searchDropdownWithNoLabel';
import { UserNameInput } from '@/components/join/usernameInput';
import Languages from '@/constants/languages';
import { useEffect, useState } from 'react';

export const MyInfo = () => {
  const [info, setInfo] = useState({
    school: '',
    username: '',
    language: '',
    nationality: '',
  });

  const [savedInfo, setSavedInfo] = useState({
    school: '',
    username: '',
    language: '',
    nationality: '',
  });

  const [isUserNameFormatInvalid, setIsUserNameFormatInvalid] = useState(false);
  const [isUserNameDuplicated, setIsUserNameDuplicated] = useState(false);
  const [isLanguageSelected, setIsLanguageSelected] = useState(true);

  const validateUserNameValue = (value) => {
    const regex = /^[a-z0-9]{5,20}$/;
    return regex.test(value);
  };

  const handleUserNameChange = (value) => {
    setInfo((prev) => ({ ...prev, username: value }));
    setIsUserNameFormatInvalid(!validateUserNameValue(value));
  };

  const disabled =
    !info.username ||
    isUserNameFormatInvalid ||
    isUserNameDuplicated ||
    !isLanguageSelected ||
    JSON.stringify(info) === JSON.stringify(savedInfo);

  useEffect(() => {
    const userData = {
      school: '홍익대학교',
      username: 'cotato',
      language: 'French',
      nationality: 'France',
    };
    setInfo(userData);
    setSavedInfo(userData);
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <TitleHeader text="My Information" />
      <div className="flex flex-col w-full h-full px-4">
        <div className="mb-5 mt-12 flex w-full flex-col space-y-[1.875rem]">
          {info.school ? (
            <div className="flex flex-col">
              <label htmlFor="school" className="text-neutral-base">
                School
              </label>
              <div className="relative flex flex-col mt-1">
                <input
                  id="school"
                  type="text"
                  className="flex w-full py-1 align-middle bg-transparent border-b border-neutral-base text-neutral-base"
                  defaultValue={info.school}
                  disabled
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-[.625rem]">
              <span className="text-primary-base">
                What's the name of your school?
              </span>
              <MainWhiteButton>Search your school</MainWhiteButton>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-primary-base">User name</span>
            <UserNameInput
              userName={info.username}
              onChange={handleUserNameChange}
              invalid={isUserNameFormatInvalid}
              duplicated={isUserNameDuplicated}
              label={false}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-primary-base">Language</span>
            <SearchDropdownWithNoLabel
              keyword={info.language}
              name="Language"
              placeholder="Select your nationality"
              onChange={(value) =>
                setInfo((prev) => ({ ...prev, language: value }))
              }
              setIsSelected={setIsLanguageSelected}
              selected={isLanguageSelected}
              list={Languages}
              warn="You have to select your language"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="nationality" className="text-neutral-base">
              Nationality
            </label>
            <div className="relative flex flex-col mt-1">
              <input
                id="nationality"
                type="text"
                className="flex w-full py-1 align-middle bg-transparent border-b border-neutral-base text-neutral-base"
                defaultValue={info.nationality}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="flex mt-8 mb-5">
          <MainButton onClick={() => console.log(info)} disabled={disabled}>
            Save
          </MainButton>
        </div>
      </div>
    </div>
  );
};
