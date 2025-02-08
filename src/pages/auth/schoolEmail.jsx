import Prev from '@/assets/imgs/previous.svg?react';
import { MainButton } from '@/components/common/MainButton';
import { SkipButton } from '@/components/join/skipButtonShadow';
import { path } from '@/routes/path';
import { cn } from '@/utils/cn';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const SchoolEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verified, setVerified] = useState(true); // verify 실패 시 false

  const university = location.state;

  const handleVerify = () => {
    
  }

  useEffect(() => {
    if (university === undefined) {
      navigate(`../${path.signup.school}`);
    }
  }, [university]);

  return (
    <div className="flex flex-col flex-1 gap-10 px-4 py-5">
      <div className="flex items-center justify-between">
        <Prev className="w-5 h-5 cursor-pointer" onClick={() => navigate(-1)} />
        <SkipButton navigateTo={`../../${path.home}`} />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-center w-full text-pageTitle">
          How will you verify your school?
        </div>
        <div className="flex justify-center text-center text-neutral-base">
          Write down your school email adress
        </div>
        <input
          type="email"
          className="w-full border-b border-neutral-base placeholder-neutral-border-50"
          placeholder="School email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <MainButton
          onClick={handleVerify}
          disabled={!email || !verified}
        >
          Send Verification Code
        </MainButton>
      </div>
    </div>
  );
};
