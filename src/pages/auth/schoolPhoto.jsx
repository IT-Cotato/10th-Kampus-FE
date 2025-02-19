import ImgIcon from '@/assets/imgs/imgIcon.svg';
import XIcon from '@/assets/imgs/x.svg?react';
import { MainButton } from '@/components/common/MainButton';
import { path } from '@/routes/path';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { SkipHeader } from '@/components/join/SkipHeader';
import { Modal } from '@/components/common/Modal';

export const SchoolPhoto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const university = location.state;

  const getImageFile = (e) => {
    const newFiles = Array.from(e.target.files);
    const validFiles = newFiles.filter((file) => file.type.match('image/.*'));
    if (validFiles.length !== newFiles.length) {
      setShowErrorModal(true);
    } else {
      setFile(e.target.files[0]);
    }
  }

  const handleClickUpload = (file) => {
    // 백 연동
    setShowModal(true);
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
              onChange={getImageFile}
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
          <MainButton onClick={handleClickUpload} disabled={!file}>
            Upload
          </MainButton>
          {showErrorModal && (
            <Modal
              title="You can only upload a image file"
              leftButton="Close"
              onClickLeft={() => setShowErrorModal(false)}
              onClose={() => setShowErrorModal(false)}
            />
          )}
          {showModal && (
            <Modal
              title="School verification may take 3-5 business days"
              rightButton="Save"
              onClickRight={() => navigate(`../../../${path.home}`)}
            ></Modal>
          )}
        </div>
      </div>
    </div>
  );
};
