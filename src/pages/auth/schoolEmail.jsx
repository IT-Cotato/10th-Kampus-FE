import Prev from '@/assets/imgs/previous.svg?react';
import { SkipButton } from '@/components/join/skipButtonShadow';
import { path } from '@/routes/path';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const SchoolEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verified, setVerified] = useState(false);

  const university = location.state;

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
    </div>
  );
};
