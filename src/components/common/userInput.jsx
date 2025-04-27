import Send from '@/assets/imgs/send.svg?react';
import Camera from '@/assets/imgs/camera.svg?react';
import XIcon from '@/assets/imgs/imgX.svg?react';
import { cn } from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';

export const InputTypes = {
  CHAT: 'chat',
  POST: 'post',
};

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

  const handleInput = () => {
    // textarea 높이 조절
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;

      //div
      if (containerRef.current) {
        containerRef.current.style.height = `${Math.min(scrollHeight, maxHeight) + 20}px'`;
      }
    }
  };

  useEffect(() => {
    handleInput();
  }, [handleSend]);

  useEffect(() => {
    if (textareaRef.current && inputFocus && InputTypes.POST === type) {
      textareaRef.current.focus();
    }
  });

  const handlePhoto = (e) => {
    const newFiles = Array.from(e.target.files);

    if (newFiles.length > 10) {
      alert('최대 10개의 이미지만 업로드할 수 있습니다.');
      return;
    }

    const validFiles = newFiles.filter((file) => file.type.match('image/.*'));
    if (validFiles.length !== newFiles.length) {
      alert('이미지 파일만 업로드 가능합니다.');
    }

    try {
      const newPreviews = validFiles.map((file) => URL.createObjectURL(file));

      if (validFiles.length > 0) {
        setPreviewImages(newPreviews);
        setShowImagePreview(true);

        // 부모 컴포넌트에 파일 데이터 전달
        onImagesChange?.(validFiles);

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

  const handleSend = () => {
    if (input.trim() || previewImages.length > 0) {
      handleSend(input.trim());
      setInput('');
      setPreviewImages([]);
      setShowImagePreview(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-lg px-4 py-4 mx-auto bg-white">
      {/* 이미지파일 미리보기 */}
      {showImagePreview && (
        <div className="flex flex-row gap-2 pb-2 mb-2 overflow-x-auto">
          {previewImages.map((src, index) => (
            <div className="relative flex-shrink-0 w-16 h-16" key={index}>
              <img
                src={src}
                alt={`Preview ${index + 1}`}
                className="object-cover w-full h-full rounded-md"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute z-10 p-1 bg-white rounded-full shadow-md -right-1 -top-1"
              >
                <XIcon className="w-3 h-3 text-neutral-border-50" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div
        ref={containerRef}
        className="flex h-auto items-start overflow-y-auto rounded-[1.25rem] bg-neutral-bg-5 px-2 py-2"
      >
        {type === InputTypes.CHAT && (
          <label
            htmlFor="imageUpload"
            aria-label="Upload Image"
            className={cn('left-6 h-8 w-8 cursor-pointer', {
              'text-primary-30': input || previewImages.length > 0,
              'text-neutral-border-30': !input && previewImages.length === 0,
            })}
          >
            <Camera className="w-full h-full text-neutral-icon" />
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
            setInput(e.target.value);
            handleInput();
          }}
          rows={1}
          className="flex-grow px-2 pt-1 text-base resize-none bg-neutral-bg-5 text-neutral-title"
          placeholder={placeholder}
          autoFocus={type === InputTypes.CHAT}
        />
        <button
          onClick={handleSend}
          aria-label="Send Message"
          className={cn('right-6 h-8 w-8', {
            'text-primary-30': input || previewImages.length > 0,
            'text-neutral-border-30': !input && previewImages.length === 0,
          })}
        >
          <Send className="w-full h-full" />
        </button>
      </div>
    </div>
  );
};
