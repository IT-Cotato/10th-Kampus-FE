import Send from '@/assets/imgs/icon/send.svg?react';
import { cn } from '@/utils/cn';
import { useEffect, useRef, memo } from 'react';
import { createPortal } from 'react-dom';

const BaseInput = ({
  placeholder = 'Write something.',
  input,
  setInput,
  handleSend,
  inputFocus = false,
  children, // 미리보기 등 상단에 표시될 컴포넌트들
  leftSlot, // 좌측에 표시될 컴포넌트 (카메라 아이콘 등)
  isInputDisabled = false, // 텍스트 입력 비활성화
  isButtonDisabled = false, // 전송 가능 여부 (이미지와 텍스트가 모두 없을 때, 전송 중일 때)
}) => {
  const textareaRef = useRef(null);
  const containerRef = useRef(null);
  const inputRoot = document.getElementById('input-root');
  const maxHeight = 4 * 26;

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
    if (textareaRef.current && inputFocus) {
      textareaRef.current.focus();
    }
  }, [inputFocus]);

  if (!inputRoot) return null;

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (!isButtonDisabled) {
      handleSend();
    }
  };

  return createPortal(
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-white px-4 py-4 width-fixed">
      {/* Children (이미지 미리보기 등) */}
      {children}
      <div
        ref={containerRef}
        className="flex h-auto items-start overflow-y-auto rounded-[1.25rem] bg-neutral-bg-5 px-2 py-2"
      >
        {leftSlot}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => {
            if (!isInputDisabled) {
              setInput(e.target.value);
              handleInput();
            }
          }}
          rows={1}
          className={cn(
            'flex-grow resize-none bg-neutral-bg-5 px-2 pt-1 text-base text-neutral-title',
            {
              'cursor-not-allowed opacity-50': isInputDisabled,
            },
          )}
          placeholder={placeholder}
          disabled={isInputDisabled}
        />
        <button
          type="button"
          onClick={handleButtonClick}
          aria-label="Send Message"
          disabled={isButtonDisabled}
          className={cn('right-6 h-8 w-8', {
            'text-primary-30': !isButtonDisabled,
            'text-neutral-border-30': isButtonDisabled,
          })}
        >
          <Send className="h-full w-full" aria-label="hidden" />
        </button>
      </div>
    </div>,
    inputRoot,
  );
};

export default memo(BaseInput);
