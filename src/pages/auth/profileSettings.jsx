import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { path } from '@/routes/path';
import { MainButton } from '@/components/common/MainButton';
import { UserNameInput } from '@/components/join/usernameInput';
import { SearchDropdown } from '@/components/join/searchDropdown';
import Nations from '@/constants/nations';
import Languages from '@/constants/languages';
import { patchSignup } from '../../apis/auth/login.api';
import { TitleHeader } from '@/components/common/titleHeader';
import useDebounce from '@/hooks/use-Debounce';
import { useDuplicateCheck } from '@/hooks/use-duplicateCheck';
import { postDuplicateCheck } from '@/apis/auth/duplicateCheck.api';

export const ProfileSettings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [isUserNameFormatInvalid, setIsUserNameFormatInvalid] = useState(false);
  const [isUserNameDuplicated, setIsUserNameDuplicated] = useState(false);
  const [nationality, setNationality] = useState('');
  const [isNationalitySelected, setIsNationalitySelected] = useState(false);
  const [language, setLanguage] = useState('');
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);

  const term = location.state?.term;

  useEffect(() => {
    if (term === undefined) {
      navigate(`${path.signup.base}/${path.signup.terms}`);
    }
  }, [term]);

  /** username 형식 확인 */
  const validateUserNameValue = (value) => {
    const regex = /^[a-z0-9]{5,20}$/;
    return regex.test(value);
  };

  const debouncedUserName = useDebounce(userName, 300); // 입력을 마치고 300ms 후 중복 체크를 위함

  const handleUserNameChange = (value) => {
    setUserName(value);
    setIsUserNameFormatInvalid(!validateUserNameValue(value));
  };

  const { mutate } = useDuplicateCheck(duplicateCheck);

  const handleDuplicateCheck = (value) => {
    mutate({ data: { nickname: value } }, {
      onSuccess: (response) => {
        setIsUserNameDuplicated(!(response?.isAvailable)); // API 응답에 따라 상태 업데이트
      },
    });
  };

  useEffect(() => {
    if (!isUserNameFormatInvalid && debouncedUserName) {
      handleDuplicateCheck(debouncedUserName);
    }
  }, [debouncedUserName, isUserNameFormatInvalid]);

  const disabled =
    !userName ||
    isUserNameFormatInvalid ||
    isUserNameDuplicated ||
    !isNationalitySelected ||
    !isLanguageSelected;

  const returnSignupData = () => {
    const signupData = {
      nickname: userName,
      nationality: nationality,
      preferredLanguage: language,
      personalInfoAgreement: true,
      privacyPolicyAgreement: true,
      termsOfServiceAgreement: true,
      marketingAgreement: term,
    };
    return signupData;
  };

  const handleClickJoinNow = async () => {
    const { data, success } = await patchSignup(returnSignupData());
    if (success) {
      // 우선은 userId를 쓰는 곳이 없어서 저장안해뒀는데 필요하면 추가시키겠습니다!
      navigate(`${path.signup.base}/${path.signup.welcome}`);
    } else {
      alert('Something wrong. Please try again.');
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <TitleHeader text="Profile Settings" />
      <div className="flex flex-col px-4 py-[.625rem]">
        <div className="mb-5 mt-12 flex w-full flex-col space-y-[1.875rem]">
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
            onChange={(value) => setNationality(value)}
            setIsSelected={setIsNationalitySelected}
            selected={isNationalitySelected}
            list={Nations}
            warn="You have to select your country"
          />
          <SearchDropdown
            keyword={language}
            name="Language"
            placeholder="Select your language"
            onChange={(value) => setLanguage(value)}
            setIsSelected={setIsLanguageSelected}
            selected={isLanguageSelected}
            list={Languages}
            warn="You have to select your language"
          />
        </div>
        <div className="flex mt-8 mb-5">
          <MainButton onClick={handleClickJoinNow} disabled={disabled}>
            Join Now
          </MainButton>
        </div>
      </div>
    </div>
  );
};
