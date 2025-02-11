import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../../components/common/MainButton';
import { Term } from '../../components/join/term';
import PreviousButton from '@/assets/imgs/previous.svg';
import Check from '@/assets/imgs/check.svg?react';
import detailedTerms from '@/constants/detailedTerms';

export const Terms = () => {
  const navigate = useNavigate();
  const [isAllAgreed, setIsAllAgreed] = useState(false);
  const [terms, setTerms] = useState({
    term1: false,
    term2: false,
    term3: false,
    term4: false,
  });
  const isSignInActive = terms.term1 && terms.term2 && terms.term3;

  const handleClickPreviousButton = () => {
    navigate(-1);
  };

  const handleClickAgreeWithAll = () => {
    if (terms.term1 && terms.term2 && terms.term3 && terms.term4) {
      setTerms({
        term1: false,
        term2: false,
        term3: false,
        term4: false,
      });
      setIsAllAgreed(false);
    } else {
      setTerms({
        term1: true,
        term2: true,
        term3: true,
        term4: true,
      });
      setIsAllAgreed(true);
    }
  };

  const handleClickAgree = (key) => {
    setTerms((prev) => {
      const newTerms = {
        ...prev,
        [key]: !prev[key],
      };

      const isAllAgreed = Object.values(newTerms).every(
        (term) => term === true,
      );
      setIsAllAgreed(isAllAgreed);

      return newTerms;
    });
  };

  const handleSignInButtonClick = () => {
    const term = terms.term4;
    navigate('/signup/profile', { state: { term } });
  };

  return (
    <div className="h-full px-4">
      <div className="relative mb-[.625rem] mt-[1.25rem] flex h-[3.0625rem] w-full items-center justify-center text-pageTitle text-neutral-title">
        <img
          src={PreviousButton}
          alt="back button"
          onClick={handleClickPreviousButton}
          className="absolute left-0 h-[1.1875rem] w-[1.1875rem] cursor-pointer text-pageTitle"
        />
        Terms and Conditions
      </div>
      <div>
        <div className="text-neutral-base">
          To complete your subscription, you must agree to the Terms and
          Conditions
        </div>
        <button
          onClick={handleClickAgreeWithAll}
          className={`h-[3.4375rem] w-full rounded-[.625rem] bg-white text-subTitle ${isAllAgreed ? 'border-2 border-primary-30' : 'shadow-[0rem_0rem_.25rem_0rem_rgba(0,0,0,0.25)]'} mb-[2.375rem] mt-[3.1875rem] flex flex-row items-center justify-center space-x-3`}
        >
          <div className="flex h-[1.875rem] w-[1.875rem] items-center justify-center rounded-[.3125rem] border border-neutral-border-40">
            {isAllAgreed ? <Check className="text-primary-base" /> : ''}
          </div>
          <div className="text-subTitle text-neutral-title">Agree with all</div>
        </button>
        <div className="flex h-64 flex-col justify-between">
          <Term
            onClick={() => handleClickAgree('term1')}
            isChecked={terms.term1}
            detailedTerm={detailedTerms.term1}
          >
            {detailedTerms.term1.title}
          </Term>
          <Term
            onClick={() => handleClickAgree('term2')}
            isChecked={terms.term2}
            detailedTerm={detailedTerms.term2}
          >
            {detailedTerms.term2.title}
          </Term>
          <Term
            onClick={() => handleClickAgree('term3')}
            isChecked={terms.term3}
            detailedTerm={detailedTerms.term3}
          >
            {detailedTerms.term3.title}
          </Term>
          <Term
            onClick={() => handleClickAgree('term4')}
            isChecked={terms.term4}
            detailedTerm={detailedTerms.term4}
          >
            {detailedTerms.term4.title}
          </Term>
        </div>
        <div className="mb-5 mt-7">
          <MainButton
            onClick={handleSignInButtonClick}
            disabled={!isSignInActive}
          >
            Sign Up
          </MainButton>
        </div>
      </div>
    </div>
  );
};
