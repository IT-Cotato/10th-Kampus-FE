import ImgIcon from '@/assets/imgs/imgIcon.svg';
import { MainButton } from '@/components/common/MainButton';
import { SkipButton } from '@/components/join/skipButtonShadow';
import { path } from '@/routes/path';
import { cn } from '@/utils/cn';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const SchoolVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [verified, setVerified] = useState(false);

  const school = location.state;

  useEffect(() => {
    if (school === undefined) {
      navigate(`../${path.signup.school}`);
    }
  }, [school]);

  const disabled = !verified && !file;

  const clearFile = () => setFile(null);

  return (
    <div className="flex flex-col flex-1 gap-10 px-4 py-5">
      <div className="flex justify-end">
        <SkipButton navigateTo={`../../${path.home}`} />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center w-full text-pageTitle">
            Verify your school
          </div>
          <div className="flex justify-center text-center text-neutral-base">
            Upload your school ID card or
            <br />
            Write down your school email adress
          </div>
          <div className="flex gap-4">
            <input
              type="email"
              className="w-full border-b"
              placeholder="School email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className={cn(
                'flex items-center justify-center px-4 py-1 text-white align-middle w-fit rounded-3xl whitespace-nowrap',
                {
                  'bg-primary-base': email && !verified,
                  'bg-neutral-border-50': !email || verified,
                },
              )}
            >
              Send Code
            </button>
          </div>
          <div className="flex flex-col items-center justify-center text-center gap-[.625rem]">
            <label
              htmlFor="selectFile"
              className={cn(
                'flex items-center justify-center px-4 py-1 text-white align-middle w-fit rounded-3xl whitespace-nowrap',
                {
                  'bg-primary-base': file,
                  'bg-neutral-border-50': !file,
                },
              )}
            >
              Select file
            </label>
            <input
              type="file"
              className="hidden"
              id="selectFile"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file ? (
              <span className="flex w-fit px-3 py-[.375rem] rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] gap-3">
                <img src={ImgIcon} />
                <span>{file.name}</span>
              </span>
            ) : (
              <span>No file selected</span>
            )}
          </div>
          <MainButton onClick={() => navigate(path.home)} disabled={disabled}>
            Done
          </MainButton>
        </div>
      </div>
    </div>
  );
};
