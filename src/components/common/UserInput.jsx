import Send from '@/assets/imgs/icon/send.svg?react';
import Camera from '@/assets/imgs/icon/camera.svg?react';
import XIcon from '@/assets/imgs/icon/circle-x.svg?react';
import { cn } from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';
import { INPUT_TYPE } from '@/constants/inputType';

export const UserInput = ({
  placeholder,
  input,
  setInput,
  handleSend,
  type,
  inputFocus = false,
  onImagesChange,
}) => {
  const textareaRef = useRef(null);
  const containerRef = useRef(null);
  const maxHeight = 4 * 26;
  const [previewImages, setPreviewImages] = useState([]);
  const [showImagePreview, setShowImagePreview] = useState(false);

  // textarea 높이 조절
  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;

      if (containerRef.current) {
        containerRef.current.style.height = `${Math.min(scrollHeight, maxHeight) + 20}px`;
      }
    }
  };

  useEffect(() => {
    handleInput();
  }, [handleSend]);

  useEffect(() => {
    if (textareaRef.current && inputFocus && INPUT_TYPE.POST === type) {
      textareaRef.current.focus();
    }
  }, [inputFocus, type]);

  // 언마운트 시 미리보기 URL 모두 해제
  useEffect(() => {
    return () => {
      previewImages.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [previewImages]);

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

        onImagesChange?.(validFiles); // 부모 컴포넌트에 파일 데이터 전달
        e.target.value = ''; // input 초기화
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

    // 부모 컴포넌트에 업데이트된 파일 데이터 전달
    onImagesChange?.([]); // 파일 삭제 시 빈 배열 전달

    URL.revokeObjectURL(urlToRevoke);

    if (updatedPreviews.length === 0) {
      setShowImagePreview(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-lg bg-white px-4 py-4">
      {/* 이미지파일 미리보기 */}
      {showImagePreview && (
        <div className="mb-2 flex flex-row gap-2 overflow-x-auto pb-2">
          {previewImages.map((src, index) => (
            <div className="relative h-16 w-16 flex-shrink-0" key={index}>
              <img
                src={src}
                alt={`Preview ${index + 1}`}
                className="h-full w-full rounded-md object-cover"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -right-1 -top-1 z-10 rounded-full bg-white p-1 shadow-md"
              >
                <XIcon className="h-3 w-3 text-neutral-border-50" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div
        ref={containerRef}
        className="flex h-auto items-start overflow-y-auto rounded-[1.25rem] bg-neutral-bg-5 px-2 py-2"
      >
        {type === INPUT_TYPE.CHAT && (
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
        )}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => {
            if (previewImages.length === 0) {
              setInput(e.target.value);
              handleInput();
            }
          }}
          rows={1}
          className={cn(
            'flex-grow resize-none bg-neutral-bg-5 px-2 pt-1 text-base text-neutral-title',
            {
              'cursor-not-allowed opacity-50': previewImages.length > 0,
            },
          )}
          placeholder={
            previewImages.length > 0
              ? '이미지가 첨부되어 있습니다'
              : placeholder
          }
          autoFocus={type === INPUT_TYPE.CHAT}
          disabled={previewImages.length > 0}
        />
        <button
          onClick={handleSend}
          aria-label="Send Message"
          className={cn('right-6 h-8 w-8', {
            'text-primary-30': input.trim() || previewImages.length > 0,
            'text-neutral-border-30':
              !input.trim() && previewImages.length === 0,
          })}
        >
          <Send className="h-full w-full" />
        </button>
      </div>
    </div>
  );
};
