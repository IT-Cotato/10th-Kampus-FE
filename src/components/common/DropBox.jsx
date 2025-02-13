import { cn } from '@/utils/cn';
import Dropdown from '../../assets/imgs/dropdown.svg?react';
export const DropBox = ({
  state,
  content,
  dropList,
  toggle,
  select,
  selected,
}) => {
  return (
    <div
      onClick={toggle}
      className={cn(
        'relative flex cursor-pointer items-center justify-center gap-3 rounded-full border px-[1.125rem] py-[0.375rem]',
        {
          'border-primary-30': selected !== 'All' || state,
          'shadow-md': selected === 'All' && !state,
        },
      )}
    >
      <p
        className={cn('text-base font-normal', {
          'text-neutral-title': selected !== 'All' || state,
          'text-neutral-border-50': selected === 'All' && !state,
        })}
      >
        {selected !== 'All' ? selected : content}
      </p>
      <Dropdown
        className={cn('h-3 w-3', {
          'text-neutral-title': selected !== 'All' || state,
          'rotate-180 text-neutral-border-50': selected === 'All' && !state,
        })}
      />
      {state && (
        <div className="absolute top-[3.125rem] w-full gap-[0.625rem] rounded-[0.625rem] border bg-white px-4 shadow-md">
          {dropList.map((category) => (
            <p
              key={category}
              onClick={() => select(category)}
              className="w-full cursor-pointer py-1 text-base text-neutral-title"
            >
              {category}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
