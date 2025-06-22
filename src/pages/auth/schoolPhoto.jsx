import ImgIcon from '@/assets/imgs/imgIcon.svg';
import XIcon from '@/assets/imgs/x.svg?react';
import { MainButton } from '@/components/common/MainButton';
import { path } from '@/routes/path';
import { useEffect, useState } from 'react';
import { replace, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { SkipHeader } from '@/components/join/SkipHeader';
import { Modal } from '@/components/common/Modal';
import { useMutation } from '@tanstack/react-query';
import { postSchoolPhoto } from '@/apis/auth/postSchoolPhoto.api';
import { useCheckSchoolStatus } from '@/hooks/useCheckSchoolStatus';
import { UNIV_STATUS } from '@/constants/universityStatus';

export const SchoolPhoto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { university, isInitialAuthFlow } = location.state || {};

  const { data: status } = useCheckSchoolStatus();

  useEffect(() => {
    if (status === UNIV_STATUS.APPROVE || status === UNIV_STATUS.PENDING) {
      navigate(path.home, { replace: true });
    }
    if (university === undefined) {
      navigate(`${path.signup.base}/${path.signup.school}`, { replace: true });
    }
  }, [status, university]);

  const getImageFile = (e) => {
    const newFiles = Array.from(e.target.files);
    const validFiles = newFiles.filter((file) => file.type.match('image/.*'));
    if (validFiles.length !== newFiles.length) {
      setShowErrorModal(true);
    } else {
      setFile(e.target.files[0]);
    }
  };

  const { mutate: sendPhoto } = useMutation({
    mutationFn: (image) =>
      postSchoolPhoto({ data: image, universityCode: university }),
    onSuccess: (response) => {
      setShowModal(true);
    },
  });

  const handleClickUpload = (file) => {
    const formData = new FormData();
    formData.append('certImage', file);
    sendPhoto(formData);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <SkipHeader isInitialAuthFlow={isInitialAuthFlow} />
      <div className="flex flex-1 flex-col gap-10 px-4 py-5">
        <div className="flex flex-col gap-[1.875rem]">
          <div className="flex flex-col gap-6">
            <div className="flex w-full justify-center text-pageTitle">
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
          <MainButton onClick={() => handleClickUpload(file)} disabled={!file}>
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
