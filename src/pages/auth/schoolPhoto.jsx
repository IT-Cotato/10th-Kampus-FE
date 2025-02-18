import ImgIcon from '@/assets/imgs/imgIcon.svg';
import XIcon from '@/assets/imgs/x.svg?react';
import { MainButton } from '@/components/common/MainButton';
import { path } from '@/routes/path';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { createPortal } from 'react-dom';
import { Alert } from '@/components/common/Alert';
import { SkipHeader } from '@/components/join/SkipHeader';

export const SchoolPhoto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const university = location.state;

  const handleUpload = (file) => {
    console.log(file);
    navigate(`../../../${path.home}`);
  };

  useEffect(() => {
    if (university === undefined) {
      navigate(`../${path.signup.school}`);
    }
    // 이미 인증 되었거나 인증 진행 중인지도 확인 필요
  }, [university]);

  return (
    <div className="flex flex-col w-full h-full">
      <SkipHeader />
      <div className="flex flex-col flex-1 gap-10 px-4 py-5">
        <div className="flex flex-col gap-[1.875rem]">
          <div className="flex flex-col gap-6">
            <div className="flex justify-center w-full text-pageTitle">
              Verify your school
            </div>
            <div className="flex justify-center text-center text-neutral-base">
              Upload your school ID card
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-[.625rem] text-center">
            <label
              htmlFor="selectFile"
              className={cn(
                'flex w-fit items-center justify-center whitespace-nowrap rounded-3xl px-4 py-1 align-middle text-white',
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
              <span className="flex w-fit items-center gap-3 rounded-[.625rem] px-3 py-[.375rem] shadow-navbar">
                <img src={ImgIcon} />
                <span>{file.name}</span>
                <XIcon
                  className="h-[.9375rem] w-[.9375rem] text-neutral-title"
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
    </div>
  );
};
