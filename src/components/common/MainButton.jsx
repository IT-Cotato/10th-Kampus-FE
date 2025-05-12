import { cn } from '@/utils/cn';

export const MainButton = ({
  onClick,
  disabled = false,
  color = 'base', // 'base', 'white'
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'box-border h-[3.6875rem] w-full cursor-pointer rounded-[.625rem] bg-primary-base px-[1.125rem] !text-title-bold-16 text-white',
        {
          'border border-primary-base bg-white text-primary-base':
            !disabled && color === 'white',
          'cursor-default border-0 bg-neutral-border-50': disabled,
        },
      )}
    >
      {children}
    </button>
  );
};
