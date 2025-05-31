import Camera from '@/assets/imgs/camera.svg';
import ImgX from '@/assets/imgs/ImgX.svg?react';
import { InputWarningText } from '@/components/common/InputWarningText';
import { Modal } from '@/components/common/Modal';
import { useState } from 'react';

export const UploadPics = ({
  onChange,
  imageRef = null,
  invalid = false,
  setInvalid = null,
}) => {
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
        if (setInvalid) setInvalid(false);
        e.target.value = '';
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
    <div className="flex flex-col gap-2">
      <div className="flex items-end gap-2">
        <label
          htmlFor="selectImages"
          className="mt-[.625rem] flex h-20 w-20 flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-[.3125rem] bg-neutral-border-30"
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
        <div
          ref={imageRef}
          className="grid grid-flow-col gap-[.875rem] overflow-x-scroll pr-[.625rem] pt-[.625rem] scrollbar-hide"
        >
          {previewImages.map((src, index) => (
            <div className="relative h-20 w-20" key={index}>
              <img
                src={src}
                alt={`Preview ${index + 1}`}
                className="h-20 w-20 object-cover"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute right-0 top-0 z-10 -translate-y-1/2 translate-x-1/2"
              >
                <ImgX className="h-[1.125rem] w-[1.125rem] text-neutral-border-50" />
              </button>
            </div>
          ))}
        </div>
      </div>
      {invalid && (
        <InputWarningText>
          Please select at least one image to continue.
        </InputWarningText>
      )}
      {showErrorModal !== '' && (
        <Modal
          type={MODAL_TYPES.WARNING}
          title={showErrorModal}
          leftButton="Close"
          onClickLeft={() => setShowErrorModal('')}
          onClose={() => setShowErrorModal('')}
        />
      )}
    </div>
  );
};
