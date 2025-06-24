import { cn } from '@/utils/cn';
import DropdownArrow from '@/assets/imgs/dropdown.svg?react';
import { useEffect, useRef, useState } from 'react';
export const FilterBox = ({ content, dropList, select, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const nothingSelected = selected === 'All'; // 기본 상태는 아무것도 선택되지 않은 상태
  const dropdownRef = useRef(null);

  const handleSelectDropdown = (category) => {
    setIsOpen(false);
    select(category);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-fit cursor-pointer items-center justify-center gap-3 rounded-full border border-white px-[1.125rem] py-[0.375rem] text-neutral-80',
          {
            'border-primary-20 bg-primary-5 text-title-bold-16':
              !nothingSelected || isOpen,
            'text-base text-neutral-border-50 shadow-navbar':
              nothingSelected && !isOpen,
          },
        )}
      >
        <p>{selected !== 'All' ? selected : content}</p>
        <DropdownArrow
          className={cn('h-3 w-3', {
            'text-neutral-80': isOpen,
            'rotate-180': !isOpen,
          })}
        />
      </button>
      {isOpen && (
        <div className="relative">
          <div className="absolute top-2 flex w-fit min-w-32 flex-col rounded-[0.625rem] bg-white px-1 py-1 shadow-navbar">
            {dropList.map((category) => (
              <p
                key={category}
                onClick={() => handleSelectDropdown(category)}
                className="flex w-full cursor-pointer px-3 py-1 text-base text-neutral-title hover:bg-primary-5"
              >
                {category}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
