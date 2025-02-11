import Prev from '@/assets/imgs/previous.svg?react';
import ImgIcon from '@/assets/imgs/imgIcon.svg';
import XIcon from '@/assets/imgs/x.svg?react';
import { MainButton } from '@/components/common/MainButton';
import { SkipButton } from '@/components/join/skipButtonShadow';
import { path } from '@/routes/path';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { createPortal } from 'react-dom';
import { Alert } from '@/components/common/Alert';

export const SchoolPhoto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const university = location.state;

  const handleUpload = (file) => {
    console.log(file);
    navigate(`../../../${path.home}`)
  };

  useEffect(() => {
    if (university === undefined) {
      navigate(`../${path.signup.school}`);
    }
    // 이미 인증 되었거나 인증 진행 중인지도 확인 필요
  }, [university]);

  return (
    <div className="flex flex-col flex-1 gap-10 px-4 py-5">
      <div className="flex items-center justify-between">
        <Prev className="w-5 h-5 cursor-pointer" onClick={() => navigate(-1)} />
        <SkipButton navigateTo={`../../${path.home}`} />
      </div>
      <div className="flex flex-col gap-[1.875rem]">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center w-full text-pageTitle">
            Verify your school
          </div>
          <div className="flex justify-center text-center text-neutral-base">
            Upload your school ID card
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center gap-[.625rem]">
          <label
            htmlFor="selectFile"
            className={cn(
              'flex items-center justify-center px-4 py-1 text-white align-middle w-fit rounded-3xl whitespace-nowrap',
              {
                'bg-neutral-disabled': file,
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
            disabled={file}
          />
          {file ? (
            <span className="flex w-fit px-3 py-[.375rem] rounded-[.625rem] shadow-navbar gap-3 items-center">
              <img src={ImgIcon} />
              <span>{file.name}</span>
              <XIcon
                className="w-[.9375rem] h-[.9375rem] text-neutral-title"
                onClick={() => setFile(null)}
              />
            </span>
          ) : (
            <span className="text-neutral-border-50">No file selected</span>
          )}
        </div>
        <MainButton onClick={() => setShowModal(true)} disabled={!file}>
          Upload
        </MainButton>
        {showModal &&
          createPortal(
            <Alert
              title="School verification time may take 3-5 business days"
              button="Save"
              onClick={() => handleUpload(file)}
            />,
            document.getElementById('modal-root'),
          )}
      </div>
    </div>
  );
};
