import Send from '@/assets/imgs/send.svg?react';
import Camera from '@/assets/imgs/camera.svg?react';
import { cn } from '@/utils/cn';
import { useEffect, useRef } from 'react';

const InputTypes = {
  CHAT: 'chat',
};

export const UserInput = ({
  placeholder,
  input,
  setInput,
  handleSend,
  type,
}) => {
  const textareaRef = useRef(null);
  const containerRef = useRef(null);
  const maxHeight = 4 * 26;

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

  return (
    <div
      ref={containerRef}
      className="fixed bottom-3 left-0 right-0 mx-4 flex h-auto items-start overflow-y-auto rounded-[1.25rem] bg-neutral-bg-5 px-2 py-2"
    >
      {type === InputTypes.CHAT && (
        <button
          // onClick={handlePhoto}
          aria-label="사진파일 전송"
          className={cn('left-6 h-8 w-8', {
            'text-primary-30': input,
            'text-neutral-border-30': !input,
          })}
        >
          <Camera className="h-full w-full text-neutral-icon" />
        </button>
      )}
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          handleInput();
        }}
        rows={1}
        className="flex-grow resize-none bg-neutral-bg-5 px-2 pt-1 text-base text-neutral-title"
        placeholder={placeholder}
      />
      <button
        onClick={() => {
          handleSend();
        }}
        aria-label="메시지 전송"
        className={cn('right-6 h-8 w-8', {
          'text-primary-30': input,
          'text-neutral-border-30': !input,
        })}
      >
        <Send className="h-full w-full" />
      </button>
    </div>
  );
};
