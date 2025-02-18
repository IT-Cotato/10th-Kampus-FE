import Camera from '@/assets/imgs/camera.svg';
import ImgX from '@/assets/imgs/ImgX.svg?react';
import { Modal } from '@/components/common/Modal';
import { useState } from 'react';

export const UploadPics = ({ onChange }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState('');

  const getImageFiles = async (e) => {
    const newFiles = Array.from(e.target.files);

    if (newFiles.length + files.length > 10) {
      setShowErrorModal('You can upload up to 10 photos');
      return;
    }

    const validFiles = newFiles.filter((file) => file.type.match('image/.*'));
    if (validFiles.length !== newFiles.length) {
      setShowErrorModal('You can only upload image files');
    }

    try {
      // Promise로 모든 미리보기 URL 생성
      const newPreviews = await Promise.all(
        validFiles.map((file) => {
          // URL 생성 중 오류 가능성 대비
          return new Promise((resolve, reject) => {
            try {
              resolve(URL.createObjectURL(file));
            } catch (error) {
              reject(error);
            }
          });
        }),
      );

      // 모든 파일과 미리보기가 준비된 후 상태 업데이트
      if (validFiles.length > 0 && newPreviews.length === validFiles.length) {
        const updatedFiles = [...files, ...validFiles];
        const updatedPreviews = [...previewImages, ...newPreviews];

        setFiles(updatedFiles);
        setPreviewImages(updatedPreviews);
        onChange(updatedFiles); // 부모 컴포넌트에 전달
      }
    } catch (error) {
      setShowErrorModal('An error occurred while processing the file.');
      return null;
    }
  };

  const removeImage = (index) => {
    const urlToRevoke = previewImages[index];

    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setPreviewImages(updatedPreviews);
    onChange(updatedFiles); // 부모 컴포넌트에 전달

    URL.revokeObjectURL(urlToRevoke); // URL 해제
  };

  return (
    <div className="flex flex-row items-end gap-2">
      <label
        htmlFor="selectImages"
        className="mt-[.5625rem] flex h-20 w-20 flex-shrink-0 flex-col items-center justify-center rounded-[.3125rem] bg-neutral-border-30"
      >
        <img src={Camera} alt="" className="h-[2.375rem] w-[2.375rem]" />
        <span className="text-small text-neutral-border-50">
          {files.length}/10
        </span>
      </label>
      <input
        type="file"
        accept="image/*"
        id="selectImages"
        className="hidden"
        multiple
        onChange={getImageFiles}
      />
      <div className="grid grid-flow-col gap-[.875rem] overflow-x-scroll pr-[.5625rem] pt-[.5625rem] scrollbar-hide">
        {previewImages.map((src, index) => (
          <div className="relative w-20 h-20" key={index}>
            <img
              src={src}
              alt={`Preview ${index + 1}`}
              className="object-cover w-20 h-20"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 z-10 translate-x-1/2 -translate-y-1/2"
            >
              <ImgX className="h-[1.125rem] w-[1.125rem] text-neutral-border-50" />
            </button>
          </div>
        ))}
      </div>
      {showErrorModal !== '' && (
        <Modal
          title={showErrorModal}
          leftButton="Close"
          onClickLeft={() => setShowErrorModal('')}
          onClose={() => setShowErrorModal('')}
        />
      )}
    </div>
  );
};
