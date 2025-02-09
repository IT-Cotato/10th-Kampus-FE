import { cn } from '@/utils/cn';

export const ButtonRound = ({ theme, text, width, height, ...props }) => {
  return (
    <button
      className={cn(
        'text-base rounded-[1.25rem] text-white flex justify-center items-center ',
        {
          'bg-primary-base': theme === 'primary',
          'bg-neutral-base': theme === 'base',
          'bg-neutral-disabled': theme === 'disabled',
          'w-full': width === 'long',
          'w-fit p-4': width === 'base',
          'w-fit p-2': width === 'short',
          'py-1': height === 'small',
        },
      )}
      {...props}
    >
      {text}
    </button>
  );
};
