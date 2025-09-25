import Camera from '@/assets/imgs/icon/camera.svg?react';
import XIcon from '@/assets/imgs/icon/circle-x.svg?react';
import { cn } from '@/utils/cn';
import { useEffect, useState } from 'react';

const useImageUpload = ({ onImagesChange, onDisableInput, input = '' }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [showImagePreview, setShowImagePreview] = useState(false);

  // 언마운트 시 미리보기 URL 모두 해제
  useEffect(() => {
    return () => {
      previewImages.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [previewImages]);

  // 이미지 상태 변경 시 입력창 비활성화 상태 알림
  useEffect(() => {
    onDisableInput?.(previewImages.length > 0);
  }, [previewImages.length, onDisableInput]);

  const handlePhoto = async (e) => {
    const newFiles = Array.from(e.target.files);

    if (newFiles.length > 1) {
      alert('1개의 이미지만 업로드할 수 있습니다.');
      return;
    }

    const validFiles = newFiles.filter((file) => file.type.match('image/.*'));
    if (validFiles.length !== newFiles.length) {
      alert('이미지 파일만 업로드 가능합니다.');
    }

    try {
      const newPreviews = await Promise.all(
        validFiles.map((file) => {
          return new Promise((resolve, reject) => {
            try {
              resolve(URL.createObjectURL(file));
            } catch (error) {
              reject(error);
            }
          });
        }),
      );

      if (validFiles.length > 0 && newPreviews.length === validFiles.length) {
        setPreviewImages(newPreviews);
        setShowImagePreview(true);

        onImagesChange?.(validFiles);
        e.target.value = '';
      }
    } catch (error) {
      console.error('파일 처리 중 오류 발생:', error);
      alert('파일 처리 중 오류가 발생했습니다.');
    }
  };

  const removeImage = (index) => {
    const urlToRevoke = previewImages[index];
    const updatedPreviews = previewImages.filter((_, i) => i !== index);

    setPreviewImages(updatedPreviews);
    onImagesChange?.([]);

    URL.revokeObjectURL(urlToRevoke);

    if (updatedPreviews.length === 0) {
      setShowImagePreview(false);
    }
  };

  return {
    preview: showImagePreview && (
      <div className="mb-2 flex flex-row gap-2 overflow-x-auto pb-2">
        {previewImages.map((src, index) => (
          <div className="relative h-16 w-16 flex-shrink-0" key={index}>
            <img
              src={src}
              alt={`Preview ${index + 1}`}
              className="h-full w-full rounded-md object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -right-1 -top-1 z-10 rounded-full bg-white p-1 shadow-md"
            >
              <XIcon className="h-3 w-3 text-neutral-border-50" />
            </button>
          </div>
        ))}
      </div>
    ),
    cameraIcon: (
      <label
        htmlFor="imageUpload"
        aria-label="Upload Image"
        className={cn('left-6 h-8 w-8 cursor-pointer', {
          'text-primary-30': input || previewImages.length > 0,
          'text-neutral-border-30': !input && previewImages.length === 0,
        })}
      >
        <Camera className="h-full w-full text-neutral-icon" />
        <input
          type="file"
          id="imageUpload"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handlePhoto}
        />
      </label>
    ),
  };
};

export default useImageUpload;
