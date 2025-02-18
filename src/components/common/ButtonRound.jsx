import { cn } from '@/utils/cn';

export const ButtonRound = ({
  theme = 'primary',
  text,
  size = 'base',
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center justify-center rounded-[1.25rem] text-base text-white',
        {
          'bg-primary-base': theme === 'primary',
          'bg-neutral-base': theme === 'base',
          'bg-neutral-disabled': theme === 'disabled',
          'border border-neutral-border-40 bg-white text-neutral-title':
            theme === 'border',
          'w-full py-1': size === 'long',
          'w-fit min-w-[7.625rem] px-5 py-3 rounded-full': size === 'modal',
          'w-fit px-4 py-2': size === 'base',
          'w-fit px-4 py-1': size === 'short',
        },
      )}
      {...props}
    >
      {text}
    </button>
  );
};
