import { cn } from '@/utils/cn';

export const MainWhiteButton = ({ onClick, disabled = false, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'box-border h-[3.6875rem] w-full cursor-pointer rounded-[.625rem] border border-primary-base bg-white px-[1.125rem] !text-title-bold-16 text-primary-base',
        {
          'cursor-default border-neutral-border-40 text-neutral-border-40':
            disabled,
        },
      )}
    >
      {children}
    </button>
  );
};
