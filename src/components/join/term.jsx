import Check from '@/assets/imgs/check.svg?react';
import { TermsModal } from '../join/TermsModal';

export const Term = (props) => {
  return (
    <div className="flex h-[2.375rem] w-full items-center justify-center space-x-3 text-base text-neutral-base">
      <div onClick={props.onClick} className="cursor-pointer">
        <Check
          className={
            props.isChecked ? 'text-primary-base' : 'text-neutral-border-40'
          }
        />
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
