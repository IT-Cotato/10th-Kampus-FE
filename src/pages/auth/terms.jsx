import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JoinInButton as Button } from '../../components/common/JoinInButton';
import { Term } from '../../components/common/term';
import PreviousButton from '@/assets/imgs/previous.svg';
import Check from '@/assets/imgs/check.svg?react';

export const Terms = () => {
    const navigate = useNavigate();
    const [isAllAgreed, setIsAllAgreed] = useState(false);
    const [terms, setTerms] = useState({
        term1: false,
        term2: false,
        term3: false,
        term4: false
    });
    const isSignInActive = terms.term1 && terms.term2 && terms.term3;

    const handleClickPreviousButton = () => {
        navigate(-1);
    }

    const handleClickAgreeWithAll = () => {
        if(terms.term1 && terms.term2 && terms.term3 && terms.term4) {
            setTerms({
                term1: false,
                term2: false,
                term3: false,
                term4: false
            });
            setIsAllAgreed(false);
        } else {
            setTerms({
                term1: true,
                term2: true,
                term3: true,
                term4: true
            });
            setIsAllAgreed(true);
        }
    }
    
    const handleClickAgree = (key) => {
        setTerms((prev) => {
            const newTerms = {
                ...prev,
                [key]: !prev[key]
            };

            const isAllAgreed = Object.values(newTerms).every(term => term === true);
            setIsAllAgreed(isAllAgreed);
            
            return newTerms;
        });
    }

    const handleSignInButtonClick = () => {
        navigate('/signup/profile', { state: { terms }});
    }

    return (
        <div className='px-4 bg-white'>
            <div className='w-[100%] h-[49px] my-[10px] text-pageTitle flex justify-center items-center'>
                <img src={PreviousButton} alt="previous" onClick={handleClickPreviousButton} className='w-[19px] h-[19px] absolute left-[10px] cursor-pointer' />
                Terms and Conditions
            </div>
            <div>
                <div className='text-neutral-base'>
                    To complete your subscription, you must agree to the Terms and Conditions
                </div>
                <button onClick={handleClickAgreeWithAll} className={`w-[100%] h-[55px] text-subTitle bg-white rounded-[10px] ${isAllAgreed ? "border-primary-30 border-2" : "shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]"} flex flex-row justify-center items-center space-x-3 mt-[51px] mb-[38px]`}>
                    <div className='w-[30px] h-[30px] border-neutral-border-40 border-[1px] rounded-[5px] flex justify-center items-center'>
                        { isAllAgreed ? <Check className='text-primary-base' /> : "" }
                    </div>
                    <div>Agree with all</div>
                </button>
                <div className='flex flex-col h-[270px] justify-between'>
                    <Term onClick={() => handleClickAgree('term1')} isChecked={terms.term1} required={true}>Personal Information collection and Usage Agreement</Term>
                    <Term onClick={() => handleClickAgree('term2')} isChecked={terms.term2} required={true}>Consent to the Privacy Policy</Term>
                    <Term onClick={() => handleClickAgree('term3')} isChecked={terms.term3} required={true}>Terms of Use of Service</Term>
                    <Term onClick={() => handleClickAgree('term4')} isChecked={terms.term4} required={false}>Consent to Marketing Communications</Term>
                </div>
                <div className='mt-[50px] mb-5'>
                    <Button onClick={handleSignInButtonClick} disabled={!isSignInActive}>
                        Sign Up
                    </Button>
                </div>
            </div>
        </div>
    );
}