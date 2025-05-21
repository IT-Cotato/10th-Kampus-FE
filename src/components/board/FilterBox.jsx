import { cn } from '@/utils/cn';
import Dropdown from '../../assets/imgs/dropdown.svg?react';
import { useState } from 'react';
export const FilterBox = ({ content, dropList, select, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isSelected = selected === 'All' && !isOpen;
  const isSelectedOther = selected !== 'All' || isOpen;
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        'relative flex cursor-pointer items-center justify-center gap-3 rounded-full border px-[1.125rem] py-[0.375rem] leading-tight',
        {
          'border-primary-30': isSelectedOther,
          'shadow-md': isSelected,
        },
      )}
    >
      <p
        className={cn('text-base font-normal', {
          'text-neutral-title': isSelectedOther,
          'text-neutral-border-50': isSelected,
        })}
      >
        {selected !== 'All' ? selected : content}
      </p>
      <Dropdown
        className={cn('h-3 w-3', {
          'text-neutral-title': isSelectedOther,
          'rotate-180 text-neutral-border-50': isSelected,
        })}
      />
      {isOpen && (
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
