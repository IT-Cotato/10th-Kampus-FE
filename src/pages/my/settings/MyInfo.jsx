// @ts-nocheck

import { DisabledInput } from '@/components/common/DisabledInput';
import { MainButton } from '@/components/common/MainButton';
import { MainWhiteButton } from '@/components/common/MainWhiteButton';
import { Popup } from '@/components/common/popup';
import { TitleHeader } from '@/components/common/titleHeader';
import { SearchDropdown } from '@/components/join/searchDropdown';
import { UserNameInput } from '@/components/join/usernameInput';
import Languages from '@/constants/languages';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

export const MyInfo = () => {
  const navigate = useNavigate();
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
  const [showModal, setShowModal] = useState(false);

  const validateUserNameValue = (value) => {
    const regex = /^[a-z0-9]{5,20}$/;
    return regex.test(value);
  };

  const handleUserNameChange = (value) => {
    setInfo((prev) => ({ ...prev, username: value }));
    setIsUserNameFormatInvalid(!validateUserNameValue(value));
  };

  const handleClickSave = () => {
    // 백 연동 후 마이페이지로 이동
    navigate(-1);
  };

  const handleBackClick = () => {
    if(!disabled) {
      setShowModal(true);
    } else {
      navigate(-1);
    }
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
      <TitleHeader text="My Information" onClick={handleBackClick} />
      <div className="flex flex-col w-full h-full px-4">
        <div className="mb-5 mt-12 flex w-full flex-col space-y-[1.875rem]">
          {info.school ? (
            <DisabledInput name="School" defaultValue={info.school} />
          ) : (
            <div className="flex flex-col gap-[.625rem]">
              <span className="text-primary-base">
                Verify your school to access the school board!
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
            <SearchDropdown
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
              label={false}
            />
          </div>
          <DisabledInput name="Nationality" defaultValue={info.nationality} />
        </div>
        <div className="flex mt-8 mb-5">
          <MainButton onClick={handleClickSave} disabled={disabled}>
            Save
          </MainButton>
          {showModal &&
            createPortal(
              <Popup
                title="Do you want to save the changes?"
                text="If you cancel this, the changes will not be saved."
                onClickLeft={() => setShowModal(false)}
                leftButton="Cancel"
                onClickRight={handleClickSave}
                rightButton="Save"
              />,
              document.getElementById('modal-root'),
            )}
        </div>
      </div>
    </div>
  );
};
