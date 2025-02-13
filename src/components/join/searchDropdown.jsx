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
        className="pointer-events-none text-base text-neutral-base"
      >
        {name}
        <span className="text-primary-red">*</span>
      </label>
      <div
        className="relative mt-1 flex flex-col"
        onBlur={handleOnBlur}
        tabIndex={0}
        ref={dropdownRef}
      >
        <input
          id={name}
          type="text"
          className={`flex w-full border-b py-1 align-middle text-base ${!warning ? (selected ? 'border-primary-base' : 'border-neutral-base') : 'border-primary-red'} placeholder-neutral-border-50`}
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
              className="z-10 flex max-h-28 flex-col overflow-auto border"
              tabIndex={-1}
            >
              {filteredList.map((d) => (
                <div
                  onClick={() => handleSelectItem(d.name)}
                  key={d.name}
                  className="flex h-full cursor-pointer bg-white px-[.375rem] hover:bg-neutral-bg-5"
                >
                  <div className="flex h-full w-full items-center border-b py-[.125rem] text-center align-middle">
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
