import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PreviousButton from '@/assets/imgs/previous.svg';
import { JoinInButton } from '@/components/common/JoinInButton';
import { UserNameInput } from '@/components/join/usernameInput';
import SearchDropdown from '@/components/join/searchDropdown';
import { Nations as NationalityList } from '@/constants/nations';
import { Languages as NativeLanguageList } from '@/constants/languages';

export const ProfileSettings = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [isUserNameFormatInvalid, setIsUserNameFormatInvalid] = useState(false);
  const [isUserNameDuplicated, setIsUserNameDuplicated] = useState(false);
  const [nationality, setNationality] = useState('');
  const [isNationalitySelected, setIsNationalitySelected] = useState(false);
  const [nativeLanguage, setNativeLanguage] = useState('');
  const [isNativeLanguageSelected, setIsNativeLanguageSelected] = useState(false);

  const handleClickPreviousButton = () => {
    navigate(-1);
  };

  /** username 형식 확인 */
  const validateUserNameValue = (value) => {
    const regex = /^[a-z0-9]{5,20}$/;
    return regex.test(value);
  };

  const handleUserNameChange = (value) => {
    setUserName(value);
    setIsUserNameFormatInvalid(!validateUserNameValue(value));
  };

  const handleNationalityChange = (value) => {
    setNationality(value);
  };

  const handleNativeLanguageChange = (value) => {
    setNativeLanguage(value);
  };

  const disabled =
    !userName ||
    isUserNameFormatInvalid ||
    isUserNameDuplicated ||
    !isNationalitySelected ||
    !isNativeLanguageSelected;

  const handleClickJoinNow = () => {
    // 백이랑 연동
    // navigate('/welcome'); 등
  };

  return (
    <div className="h-full px-4">
      <div className="relative w-full h-[3.0625rem] mt-[1.25rem] mb-[.625rem] text-pageTitle text-neutral-title flex justify-center items-center">
        <img
          src={PreviousButton}
          alt="back button"
          onClick={handleClickPreviousButton}
          className="text-pageTitle w-[1.1875rem] h-[1.1875rem] absolute left-0 cursor-pointer"
        />
        Profile Settings
      </div>
      <div className="flex flex-col w-full space-y-[1.875rem] mt-12 mb-5">
        <UserNameInput
          userName={userName}
          onChange={handleUserNameChange}
          invalid={isUserNameFormatInvalid}
          duplicated={isUserNameDuplicated}
        />
        <SearchDropdown
          keyword={nationality}
          name="Nationality"
          placeholder="Select your nationality"
          onChange={handleNationalityChange}
          setIsSelected={setIsNationalitySelected}
          selected={isNationalitySelected}
          list={NationalityList}
          warn="You have to select your country"
        />
        <SearchDropdown
          keyword={nativeLanguage}
          name="Native language"
          placeholder="Select your native language"
          onChange={handleNativeLanguageChange}
          setIsSelected={setIsNativeLanguageSelected}
          selected={isNativeLanguageSelected}
          list={NativeLanguageList}
          warn="You have to select your language"
        />
      </div>
      <div className="flex mt-8 mb-5">
        <JoinInButton onClick={handleClickJoinNow} disabled={disabled}>
          Join Now
        </JoinInButton>
      </div>
    </div>
  );
};
