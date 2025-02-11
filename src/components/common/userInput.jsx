// @ts-ignore
import Send from '@/assets/imgs/send.svg?react';
import { cn } from '@/utils/cn';

export const UserInput = ({ placeholder, input, setInput, handleSend }) => {
  return (
    <div className="fixed bottom-0 flex min-h-[3rem] w-full max-w-[512px] resize-none items-center justify-end bg-white px-4 pb-3 pt-2">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="h-full w-full rounded-[1.25rem] bg-neutral-bg-5 px-[.625rem] align-middle text-small text-neutral-title"
        placeholder={placeholder}
      />
      <button
        onClick={handleSend}
        aria-label="메시지 전송"
        className={cn(
          'absolute mr-2 flex h-8 w-8 items-center justify-center',
          {
            'text-primary-30': input,
            'text-neutral-border-30': !input,
          },
        )}
      >
        <Send className="h-full w-full" />
      </button>
    </div>
  );
};
