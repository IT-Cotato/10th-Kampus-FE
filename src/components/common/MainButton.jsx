import { cn } from '@/utils/cn';

export const MainButton = (props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn(
        'h-[3.6875rem] w-full rounded-[.625rem] bg-primary-base text-white',
        {
          'bg-neutral-disabled cursor-default': props.disabled,
        },
      )}
    >
      {props.children}
    </button>
  );
};
