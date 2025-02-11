import Camera from '@/assets/imgs/camera.svg';
import ImgX from '@/assets/imgs/ImgX.svg?react';
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
      alert('파일 처리 중 오류가 발생했습니다.');
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
  );
};
