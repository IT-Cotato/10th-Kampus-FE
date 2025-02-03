import Camera from '@/assets/imgs/camera.svg';
import ImgX from '@/assets/imgs/ImgX.svg';
import { useState } from 'react';

export const UploadPics = ({ onChange }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [files, setFiles] = useState([]);

  const getImageFiles = async (e) => {
    const newFiles = Array.from(e.target.files);

    if (newFiles.length + files.length > 10) {
      alert('이미지는 최대 10장까지 업로드가 가능합니다.');
      return;
    }

    const validFiles = newFiles.filter((file) => file.type.match('image/.*'));
    if (validFiles.length !== newFiles.length) {
      alert('이미지 파일만 업로드가 가능합니다.');
    }

    // Promise로 모든 미리보기 URL 생성
    const newPreviews = await Promise.all(
      validFiles.map((file) => URL.createObjectURL(file))
    );

    // 모든 파일과 미리보기가 준비된 후 상태 업데이트
    if (validFiles.length > 0 && newPreviews.length === validFiles.length) {
      const updatedFiles = [...files, ...validFiles];
      const updatedPreviews = [...previewImages, ...newPreviews];

      setFiles(updatedFiles);
      setPreviewImages(updatedPreviews);
      onChange(updatedFiles); // 부모 컴포넌트에 전달
    }
  };

  const removeImage = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setPreviewImages(updatedPreviews);
    onChange(updatedFiles); // 부모 컴포넌트에 전달
  };

  return (
    <div className="flex flex-row items-end gap-2">
      <label
        htmlFor="selectImages"
        className="flex flex-col flex-shrink-0 items-center justify-center w-20 h-20 bg-neutral-border-30 rounded-[.3125rem] mt-[.5625rem]"
      >
        <img src={Camera} alt="" className="w-[2.375rem] h-[2.375rem]" />
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
      <div className="grid grid-flow-col gap-[.875rem] overflow-x-scroll scrollbar-hide pr-[.5625rem] pt-[.5625rem]">
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
              <img src={ImgX} alt="" className="w-[1.125rem] h-[1.125rem]" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
