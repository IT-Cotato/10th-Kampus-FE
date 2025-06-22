import Check from '@/assets/imgs/check.svg?react';
import { TermsModal } from '../join/TermsModal';
import { cn } from '@/utils/cn';

export const Term = (props) => {
  return (
    <div className="flex h-[2.375rem] w-full items-center justify-center space-x-3 text-base text-neutral-base">
      <div
        onClick={props.onClick}
        className={cn(
          'flex aspect-square h-[1.625rem] w-[1.625rem] cursor-pointer items-center justify-center rounded-full',
          {
            'bg-primary-base': props.isChecked,
            'border border-neutral-border-40': !props.isChecked,
          },
        )}
      >
        {props.isChecked && <Check className="h-3.5 w-3.5 text-white" />}
      </div>
      <div className="flex w-full justify-between gap-x-3">
        <span className="inline-block">
          <span
            className={props.detailedTerm.required ? 'text-primary-red' : ''}
          >
            {props.detailedTerm.required ? '[Required]' : '[Optional]'}
          </span>
          &nbsp;
          {props.children}
        </span>
        <TermsModal
          onClick={props.onClick}
          isChecked={props.isChecked}
          detailedTerm={props.detailedTerm}
        />
      </div>
    </div>
  );
};
