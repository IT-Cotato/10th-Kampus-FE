import { cn } from '@/utils/cn';

export const ButtonRound = ({ theme, text, width, height, ...props }) => {
  return (
    <button
      className={cn(
        'text-base rounded-[1.25rem] text-white flex justify-center items-center ',
        {
          'bg-primary-base': theme === 'primary',
          'bg-neutral-base': theme === 'base',
          'bg-neutral-border-30': theme === 'disabled',
          'w-full': width === 'long',
          'w-[7.625rem]': width === 'base',
          'w-[3.5rem]': width === 'short',
          'py-1': height === 'small',
        },
      )}
      {...props}
    >
      {text}
    </button>
  );
};
