import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PreviousButton from '@/assets/imgs/previous.svg';
import { JoinInButton } from '@/components/common/JoinInButton';
import { UserNameInput } from '@/components/join/usernameInput';
import SearchDropdown from '@/components/join/searchDropdown';

export const ProfileSettings = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [isUserNameFormatInvalid, setIsUserNameFormatInvalid] = useState(false);
    const [isUserNameDuplicated, setIsUserNameDuplicated] = useState(false);
    const [nationality, setNationality] = useState("");
    const [isNationalitySelected, setIsNationalitySelected] = useState(false);
    const [nativeLanguage, setNativeLanguage] = useState("");
    const [isNativeLanguageSelected, setIsNativeLanguageSelected] = useState(false);

    // 변경 예정
    const NationalityList = [
        { name: 'Korea', code: 'KR' },
        { name: 'United States', code: 'US' },
        { name: 'China', code: 'CN' },
        { name: 'Japan', code: 'JP '},
        { name: 'Russia', code: 'RU' },
        { name: 'Canada', code: 'CA' },
        { name: 'France', code: 'FRA' },
    ]

    const NativeLanguageList = [
        { name: 'Arabic', code: 'AR' },
        { name: 'Bulgarian', code: 'BG' },
        { name: 'Czech', code: 'CS' },
        { name: 'Danish', code: 'DA' },
        { name: 'German', code: 'DE' },
        { name: 'Greek', code: 'EL' },
        { name: 'English (British)', code: 'EN-GB' },
        { name: 'English (American)', code: 'EN-US' },
        { name: 'Spanish', code: 'ES' },
        { name: 'Estonian', code: 'ET' },
        { name: 'Finnish', code: 'FI' },
        { name: 'French', code: 'FR' },
        { name: 'Hungarian', code: 'HU' },
        { name: 'Indonesian', code: 'ID' },
        { name: 'Italian', code: 'IT' },
        { name: 'Japanese', code: 'JA' },
        { name: 'Korean', code: 'KO' },
        { name: 'Lithuanian', code: 'LT' },
        { name: 'Latvian', code: 'LV' },
        { name: 'Norwegian Bokmål', code: 'NB'},
        { name: 'Dutch', code: 'NL' },
        { name: 'Polish', code: 'PL' },
        { name: 'Portuguese (Brazilian)', code: 'PT-BR' },
        { name: 'Portuguese', code: 'PT-PT' },
        { name: 'Romanian', code: 'RO' },
        { name: 'Russian', code: 'RU' },
        { name: 'Slovak', code: 'SK' },
        { name: 'Slovenian', code: 'SL' },
        { name: 'Swedish', code: 'SV' },
        { name: 'Turkish', code: 'TR' },
        { name: 'Ukrainian', code: 'UK' },
        { name: 'Chinese (simplified)', code: 'ZH-HANS' },
        { name: 'Chinese (traditional)', code: 'ZH-HANT' },
    ]

    const handleClickPreviousButton = () => {
        navigate(-1);
    }

    /** username 형식 확인 */
    const validateUserNameValue = (value) => {
        const regex = /^[a-z0-9]{5,20}$/;
        return regex.test(value);
    }

    const handleUserNameChange = (value) => {
        setUserName(value);
        setIsUserNameFormatInvalid(!validateUserNameValue(value));
    }

    const handleNationalityChange = (value) => {
        setNationality(value);
    }

    const handleNativeLanguageChange = (value) => {
        setNativeLanguage(value);
        setIsNativeLanguageSelected(true);
    }

    const disabled = !userName || isUserNameFormatInvalid || isUserNameDuplicated || !isNationalitySelected || !isNativeLanguageSelected
    
    const handleClickJoinNow = () => {
        // 백이랑 연동
        // navigate('/welcome'); 등
    }

    return (
        <div className='h-full px-4'>
            <div className='relative w-full h-[3.0625rem] mt-[1.25rem] mb-[.625rem] text-pageTitle text-neutral-title flex justify-center items-center'>
                <img src={PreviousButton} alt="previous" onClick={handleClickPreviousButton} className='text-pageTitle w-[1.1875rem] h-[1.1875rem] absolute left-0 cursor-pointer' />
                Profile Settings
            </div>
            <div className='flex flex-col w-full space-y-[1.875rem] mt-12 mb-5'>
                <UserNameInput userName={userName} onChange={handleUserNameChange} invalid={isUserNameFormatInvalid} duplicated={isUserNameDuplicated} />
                <SearchDropdown keyword={nationality} name="Nationality" placeholder="Select your nationality" onChange={handleNationalityChange} isSelected={setIsNationalitySelected} selected={isNationalitySelected} list={NationalityList} warn="You have to select your country" />
                <SearchDropdown keyword={nativeLanguage} name="Native language" placeholder="Select your native language" onChange={handleNativeLanguageChange} isSelected={setIsNativeLanguageSelected} selected={isNativeLanguageSelected} list={NativeLanguageList} warn="You have to select your language" />
            </div>
            <div className='flex mt-8 mb-5'>
                <JoinInButton onClick={handleClickJoinNow} disabled={disabled}>Join Now</JoinInButton>
            </div>
        </div>
    );
};