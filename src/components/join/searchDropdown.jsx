import React, { useState, useRef, useMemo } from 'react';

export const SearchDropdown = ({
  keyword,
  onChange,
  setIsSelected,
  selected,
  list,
  name,
  placeholder,
  warn,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [warning, setWarning] = useState(false);
  const dropdownRef = useRef(null);

  /** 입력한 값을 포함하는 항목 반환 */
  const filteredList = useMemo(() => {
    if (!keyword) {
      return list;
    } else {
      return list.filter(
        (d) =>
          d.name.toLowerCase().includes(keyword.toLowerCase()) ||
          d.code.toLowerCase().includes(keyword.toLowerCase()),
      );
    }
  }, [keyword]);

  /** 드롭다운 항목 클릭 시 */
  const handleSelectItem = (value) => {
    onChange(value);
    setIsActive(false);
    setIsSelected(true);
    setWarning(false);
  };

  const handleOnChange = (value) => {
    onChange(value || '');
    setIsSelected(false);
    console.log('change');
  };

  /** 화면 클릭 시 드롭다운 닫힘, 드롭다운 선택 안하고 화면 클릭 시 글씨 삭제 */
  const handleOnBlur = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
      setIsActive(false);

      if (!selected) {
        setWarning(true);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="text-base pointer-events-none text-neutral-base"
      >
        {name}
        <span className="text-primary-red">*</span>
      </label>
      <div
        className="relative flex flex-col mt-1"
        onBlur={handleOnBlur}
        tabIndex={0}
        ref={dropdownRef}
      >
        <input
          id={name}
          type="text"
          className={`flex w-full py-1 text-base align-middle border-b ${!warning ? (selected ? 'border-primary-base' : 'border-neutral-base') : 'border-primary-red'} placeholder-neutral-border-50`}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(e) => handleOnChange(e.target.value)}
          value={keyword}
          onFocus={() => setIsActive(true)}
          aria-expanded={isActive ? 'true' : 'false'}
        />

        <div className="flex flex-col">
          {isActive && (
            <div
              className="z-10 flex flex-col overflow-auto border max-h-28"
              tabIndex={-1}
            >
              {filteredList.map((d) => (
                <div
                  onClick={() => handleSelectItem(d.name)}
                  key={d.name}
                  className="flex px-[.375rem] h-full cursor-pointer bg-white hover:bg-neutral-bg-5"
                >
                  <div className="flex py-[.125rem] items-center w-full h-full text-center align-middle border-b">
                    {d.name}
                  </div>
                </div>
              ))}
            </div>
          )}
          {warning && (
            <div className="absolute z-0 mt-1 text-small text-primary-red">
              {warn}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDropdown;
