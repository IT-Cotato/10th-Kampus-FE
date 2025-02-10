// @ts-ignore
import Send from '@/assets/imgs/send.svg?react';
import { cn } from '@/utils/cn';

export const UserInput = ({ placeholder, input, setInput, handleSend }) => {
  return (
    <div className="fixed max-w-[512px] bottom-0 flex w-full min-h-[3rem] resize-none items-center justify-end px-4 pt-2 pb-3 bg-white">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className=" align-middle h-full w-full rounded-[1.25rem]  bg-neutral-bg-5 px-[.625rem] text-small text-neutral-title"
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
