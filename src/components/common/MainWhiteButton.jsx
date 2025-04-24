import { cn } from '@/utils/cn';

export const MainWhiteButton = (props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn(
        'box-border h-[3.6875rem] w-full cursor-pointer rounded-[.625rem] border border-primary-base bg-white px-[1.125rem] text-primary-base',
        {
          'cursor-default border-neutral-border-40 text-neutral-border-40':
            props.disabled,
        },
      )}
    >
      {props.children}
    </button>
  );
};
