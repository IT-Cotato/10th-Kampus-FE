import { cn } from '@/utils/cn';

export const MainButton = (props) => {
  const disabled = props.disabled ?? false; // undefined일 경우 false
  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={disabled}
      className={cn(
        'h-[3.6875rem] w-full cursor-pointer rounded-[.625rem] bg-primary-base px-[1.125rem] !text-title-bold-16 text-white',
        {
          'cursor-default bg-neutral-disabled': disabled,
        },
      )}
    >
      {props.children}
    </button>
  );
};
