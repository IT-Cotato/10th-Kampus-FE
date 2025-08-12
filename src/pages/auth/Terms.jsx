import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../../components/common/MainButton';
import { Term } from '../../components/join/Term';
import Check from '@/assets/imgs/icon/check.svg?react';
import DETAILED_TERMS from '@/constants/detailedTerms';
import { TitleHeader } from '@/components/common/TitleHeader';
import { cn } from '@/utils/cn';
import { PATH } from '@/routes/path';

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
    navigate(`${PATH.SIGNUP.BASE}/${PATH.SIGNUP.PROFILE}`, { state: { term } });
  };

  return (
    <div className="flex h-full w-full flex-col">
      <TitleHeader text="Terms and Conditions" />
      <div className="flex flex-col gap-12 px-4 py-[.625rem]">
        <div className="text-neutral-base">
          To complete your subscription, you must agree to the Terms and
          Conditions
        </div>
        <button
          onClick={handleClickAgreeWithAll}
          className={`h-[3.4375rem] w-full rounded-[.625rem] bg-white text-subTitle ${isAllAgreed ? 'border-[1px] border-primary-30' : 'shadow-[0rem_0rem_.25rem_0rem_rgba(0,0,0,0.25)]'} flex flex-row items-center justify-center space-x-3`}
        >
          <div
            className={cn(
              'flex aspect-square h-[1.625rem] w-[1.625rem] items-center justify-center rounded-full',
              {
                'bg-primary-base': isAllAgreed,
                'border border-neutral-border-40': !isAllAgreed,
              },
            )}
          >
            {isAllAgreed ? <Check className="h-3.5 w-3.5 text-white" /> : ''}
          </div>
          <div className="text-subTitle text-neutral-title">Agree with all</div>
        </button>
        <div className="flex flex-col gap-14">
          <Term
            onClick={() => handleClickAgree('term1')}
            isChecked={terms.term1}
            detailedTerm={DETAILED_TERMS.term1}
          >
            {DETAILED_TERMS.term1.title}
          </Term>
          <Term
            onClick={() => handleClickAgree('term2')}
            isChecked={terms.term2}
            detailedTerm={DETAILED_TERMS.term2}
          >
            {DETAILED_TERMS.term2.title}
          </Term>
          <Term
            onClick={() => handleClickAgree('term3')}
            isChecked={terms.term3}
            detailedTerm={DETAILED_TERMS.term3}
          >
            {DETAILED_TERMS.term3.title}
          </Term>
          <Term
            onClick={() => handleClickAgree('term4')}
            isChecked={terms.term4}
            detailedTerm={DETAILED_TERMS.term4}
          >
            {DETAILED_TERMS.term4.title}
          </Term>
        </div>
        <MainButton
          onClick={handleSignInButtonClick}
          disabled={!isSignInActive}
        >
          Sign Up
        </MainButton>
      </div>
    </div>
  );
};
