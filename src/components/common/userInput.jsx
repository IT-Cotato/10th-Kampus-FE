// @ts-ignore
import Send from '@/assets/imgs/send.svg?react';
import { cn } from '@/utils/cn';

export const UserInput = ({ placeholder, input, setInput, handleSend }) => {
  return (
    <div className="bottom-0 flex h-[3.125rem] items-center justify-end bg-neutral-bg-5 px-4 py-1">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="h-full w-full rounded-[1.25rem] border border-gray-300 bg-transparent px-2 text-small text-neutral-title"
        placeholder={placeholder}
      />
      <Send
        onClick={handleSend}
        className={cn('absolute mr-2 h-8 w-8', {
          'text-primary-30': input,
          'text-neutral-border-30': !input,
        })}
      />
    </div>
  );
};
