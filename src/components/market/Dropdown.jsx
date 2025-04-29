// @ts-nocheck

import { cn } from '@/utils/cn';
import DropdownArrow from '@/assets/imgs/dropdown.svg?react';
import { useEffect, useRef } from 'react';

/**
 * 드롭다운 컴포넌트
 *
 * @param {Object} props 컴포넌트 Props
 * @param {string} selectedDropdown 현재 선택된 드롭다운 항목(useState 상태값)
 * @param {string[]} dropdownOptions 드롭다운에서 선택할 수 있는 항목(배열)
 * @param {boolean} isDropdownOpen 드롭다운이 열려 있는지 여부를 나타내는 상태값
 * @param {(open: boolean) => void} setIsDropdownOpen 드롭다운 열림/닫힘 상태를 변경하는 함수 (useState 상태 업데이트 함수)
 * @param {function} handleDropdownClick 드롭다운 항목 클릭 시 실행되는 콜백 함수
 */
export const Dropdown = ({
  selectedDropdown,
  dropdownOptions,
  isDropdownOpen,
  setIsDropdownOpen,
  handleDropdownClick,
}) => {
  const dropdownRef = useRef(null); // 드롭다운 외부 클릭 시 드롭다운을 닫기 위해

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // 컴포넌트 언마운트/useEffect 실행 전 listener clean(메모리 누수 방지와 리스너 중복 등록 방지를 위해)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div
      className="relative inline-block w-fit text-neutral-title"
      ref={dropdownRef}
    >
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="inline-flex h-fit w-fit items-center gap-2 rounded-[.3125rem] border border-primary-20 px-4 py-2 text-center text-title-bold-16 hover:bg-primary-5 focus:bg-primary-5"
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span>{selectedDropdown}</span>{' '}
        <DropdownArrow
          className={cn('h-3 w-3 text-neutral-title', {
            'rotate-180 text-neutral-border-50': !isDropdownOpen,
          })}
        />
      </button>
      <div
        id="dropdown"
        className={cn(
          'absolute bottom-0 left-full z-10 w-fit min-w-28 translate-x-2 gap-2 rounded-[.625rem] bg-white py-2 pl-4 pr-14 shadow-navbar',
          {
            hidden: !isDropdownOpen,
          },
        )}
      >
        <ul aria-labelledby="dropdownDefaultButton">
          {dropdownOptions.map((state) => (
            <li key={state} onClick={() => handleDropdownClick(state)}>
              <button type="button" className="flex w-full">
                {state}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
