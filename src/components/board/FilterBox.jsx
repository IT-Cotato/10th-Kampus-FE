import { cn } from '@/utils/cn';
import Dropdown from '../../assets/imgs/dropdown.svg?react';
import { useState } from 'react';
export const FilterBox = ({ content, dropList, select, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        'relative flex cursor-pointer items-center justify-center gap-3 rounded-full border px-[1.125rem] py-[0.375rem] leading-tight',
        {
          'border-primary-30': selected !== 'All' || isOpen,
          'shadow-md': selected === 'All' && !isOpen,
        },
      )}
    >
      <p
        className={cn('text-base font-normal', {
          'text-neutral-title': selected !== 'All' || isOpen,
          'text-neutral-border-50': selected === 'All' && !isOpen,
        })}
      >
        {selected !== 'All' ? selected : content}
      </p>
      <Dropdown
        className={cn('h-3 w-3', {
          'text-neutral-title': selected !== 'All' || isOpen,
          'rotate-180 text-neutral-border-50': selected === 'All' && !isOpen,
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
