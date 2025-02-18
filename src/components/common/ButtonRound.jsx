import { cn } from '@/utils/cn';

export const ButtonRound = ({
  theme = 'primary',
  text,
  width = 'base',
  height = 'small',
  ...props
}) => {
  return (
    <button
      className={cn(
        'flex items-center justify-center rounded-[1.25rem] text-base text-white',
        {
          'bg-primary-base': theme === 'primary',
          'bg-neutral-base': theme === 'base',
          'bg-neutral-disabled': theme === 'disabled',
          'border border-neutral-border-40 bg-white text-neutral-title':
            theme === 'border',
          'w-full': width === 'long',
          'w-[7.625rem] p-4': width === 'base',
          'w-fit p-2': width === 'short',
          'py-2': height === 'small',
        },
      )}
      {...props}
    >
      {text}
    </button>
  );
};
