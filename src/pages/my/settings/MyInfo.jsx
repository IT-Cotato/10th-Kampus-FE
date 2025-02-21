import { DisabledInput } from '@/components/common/DisabledInput';
import { MainButton } from '@/components/common/MainButton';
import { MainWhiteButton } from '@/components/common/MainWhiteButton';
import { Modal } from '@/components/common/Modal';
import { TitleHeader } from '@/components/common/titleHeader';
import { SearchDropdown } from '@/components/join/searchDropdown';
import { UserNameInput } from '@/components/join/usernameInput';
import Languages from '@/constants/languages';
import useDebounce from '@/hooks/use-Debounce';
import { useDuplicateCheck } from '@/hooks/use-duplicateCheck';
import { useEffect, useState } from 'react';
import { postDuplicateCheck } from '@/apis/auth/duplicateCheck.api';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getUser } from '@/apis/user/userDetail.api';
import { path } from '@/routes/path';
import { useCheckSchoolStatus } from '@/hooks/use-CheckSchoolStatus';

export const MyInfo = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    universityName: '',
    nickname: '',
    preferredLanguage: '',
    nationality: '',
  });

  const [savedInfo, setSavedInfo] = useState({
    universityName: '',
    nickname: '',
    preferredLanguage: '',
    nationality: '',
  });

  const [isUserNameFormatInvalid, setIsUserNameFormatInvalid] = useState(false);
  const [isUserNameDuplicated, setIsUserNameDuplicated] = useState(false);
  const [isLanguageSelected, setIsLanguageSelected] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [status, setStatus] = useState(''); // 학교 인증 상태

  // 학교 인증 여부에 따라 학교 인증 버튼/학교 이름으로 보임
  const { mutate: checkSchoolStatus } = useCheckSchoolStatus();

  useEffect(() => {
    checkSchoolStatus(undefined, {
      onSuccess: (data) => {
        setStatus(data.status);
      },
      onError: (error) => {
        alert(error);
      },
    });
  }, []);

  const validateUserNameValue = (value) => {
    const regex = /^[a-z0-9]{5,20}$/;
    return regex.test(value);
  };

  const handleClickSave = () => {
    // 백 연동 후 마이페이지로 이동
    navigate(-1);
  };

  const handleBackClick = () => {
    if (!disabled) {
      setShowModal(true);
    } else {
      navigate(-1);
    }
  };

  const debouncedUserName = useDebounce(info.nickname, 300); // 입력을 마치고 300ms 후 중복 체크를 위함

  const handleUserNameChange = (value) => {
    setInfo((prev) => ({ ...prev, nickname: value }));
    setIsUserNameFormatInvalid(!validateUserNameValue(value));
  };

  const { mutate: checkDuplicate } = useDuplicateCheck(postDuplicateCheck);

  const handleDuplicateCheck = (value) => {
    checkDuplicate(
      { data: { nickname: value } },
      {
        onSuccess: (response) => {
          setIsUserNameDuplicated(!response?.isAvailable); // API 응답에 따라 상태 업데이트
        },
      },
    );
  };

  useEffect(() => {
    if (
      !isUserNameFormatInvalid &&
      debouncedUserName &&
      info.nickname !== savedInfo.nickname
    ) {
      handleDuplicateCheck(debouncedUserName);
    }
  }, [debouncedUserName, isUserNameFormatInvalid]);

  const disabled =
    !info.nickname ||
    isUserNameFormatInvalid ||
    isUserNameDuplicated ||
    !isLanguageSelected ||
    JSON.stringify(info) === JSON.stringify(savedInfo);

  const { data: userData } = useQuery({
    queryKey: [QUERY_KEYS.USER_INFO],
    queryFn: () => getUser(),
  });

  useEffect(() => {
    if (userData) {
      setInfo(userData);
      setSavedInfo(userData);
    }
  }, [userData]);

  return (
    <div className="flex flex-col w-full h-full">
      <TitleHeader text="My Information" onClick={handleBackClick} />
      <div className="flex flex-col w-full h-full px-4">
        <div className="mb-5 mt-12 flex w-full flex-col space-y-[1.875rem]">
          {info.universityName ? (
            <DisabledInput name="School" defaultValue={info.universityName} />
          ) : status === 'PENDING' ? (
            <div className='text-primary-base'>School verification is in progress.</div>
          ) : (
            <div className="flex flex-col gap-[.625rem]">
              <span className="text-primary-base">
                Verify your school to access the school board!
              </span>
              <MainWhiteButton
                onClick={() =>
                  navigate(`../../../${path.signup.base}/${path.signup.school}`)
                }
              >
                Search your school
              </MainWhiteButton>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-primary-base">User name</span>
            <UserNameInput
              userName={info.nickname}
              onChange={handleUserNameChange}
              invalid={isUserNameFormatInvalid}
              duplicated={isUserNameDuplicated}
              label={false}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-primary-base">Language</span>
            <SearchDropdown
              keyword={info.preferredLanguage}
              name="Language"
              placeholder="Select your nationality"
              onChange={(value) =>
                setInfo((prev) => ({ ...prev, preferredLanguage: value }))
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
          {showModal && (
            <Modal
              title="Do you want to save the changes?"
              onClickLeft={() => navigate(-1)}
              leftButton="Cancel"
              onClickRight={handleClickSave}
              rightButton="Save"
              onClose={() => setShowModal(false)}
            >
              If you cancel this, the changes will not be saved.
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};
