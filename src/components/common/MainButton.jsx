import { cn } from '@/utils/cn';

export const MainButton = (props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn(
        'h-[3.6875rem] w-full cursor-pointer rounded-[.625rem] bg-primary-base px-[1.125rem] !text-title-bold-16 text-white',
        {
          'cursor-default bg-neutral-disabled': props.disabled,
        },
      )}
    >
      {props.children}
    </button>
  );
};
