import { cn } from '@/utils/cn';

export const ButtonRound = ({ theme, text, size, ...props }) => {
  return (
    <button
      className={cn(
        'text-base rounded-[1.25rem] text-white h-[2.5rem] flex justify-center items-center ',
        {
          'bg-primary-base': theme === 'color',
          'bg-neutral-base': theme === 'base',
          'w-full': size === 'long',
          'w-[7.625rem]': size === 'base',
          'w-[3.5rem]': size === 'short',
        },
      )}
      {...props}
    >
      {text}
    </button>
  );
};
