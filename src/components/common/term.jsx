import Check from '@/assets/imgs/check.svg?react';

export const Term = (props) => {
  return (
    <div className="w-[100%] h-[38px] text-neutral-base text-base flex justify-center items-center space-x-3">
      <div onClick={ props.onClick } className='cursor-pointer px-'>
        <Check className={ props.isChecked ? "text-primary-base" : "text-neutral-border-40" } />
      </div>
      <div className="w-[100%] flex justify-between space-x-3">
        <span className="inline-block">
          <span className={props.required ? "text-primary-red" : ""}>
            {props.required ? "[Required]" : "[Optional]"}
          </span>
          &nbsp;
          {props.children}
        </span>
        <button className="items-center justify-center text-small">view</button>
      </div>
    </div>
  );
}