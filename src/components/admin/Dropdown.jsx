import { cn } from '@/utils/cn';

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
  return (
    <>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="inline-flex w-fit items-center rounded-lg border border-primary-base px-5 py-2.5 text-center text-base focus:outline-none focus:ring-4 focus:ring-primary-20"
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedDropdown}{' '}
        <svg
          className="ms-3 h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
            className={cn('text-primary-base', {
              'translate-x-full translate-y-full rotate-180': isDropdownOpen,
            })}
          />
        </svg>
      </button>
      <div
        id="dropdown"
        className={cn(
          'z-10 hidden w-fit min-w-28 rounded-lg border border-primary-base bg-white',
          {
            block: isDropdownOpen,
          },
        )}
      >
        <ul
          className="divide-y divide-primary-20 py-2 text-neutral-80"
          aria-labelledby="dropdownDefaultButton"
        >
          {dropdownOptions.map((state, index) => (
            <li key={index} onClick={() => handleDropdownClick(state)}>
              <button
                type="button"
                className="flex w-full px-4 py-2 hover:bg-primary-10"
              >
                {state}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
