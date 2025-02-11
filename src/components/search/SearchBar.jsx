import PreviousIcon from '@/assets/imgs/previous.svg?react';
import SearchIcon from '@/assets/imgs/search.svg?react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({
  value,
  setValue,
  isSearch,
  setIsSearch,
  startSearch,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full items-center justify-center gap-4">
      <PreviousIcon
        className="h-5 w-5 text-neutral-title"
        onClick={() => navigate(-1)}
      />
      <div className="relative flex flex-1 items-center">
        <input
          type="text"
          className="flex flex-1 rounded-[0.625rem] bg-primary-10 py-[0.6875rem] pl-[3.375rem] text-base text-neutral-title placeholder-neutral-border-50"
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => {
            if (isSearch === false) setIsSearch(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
              // 한글 조합 시, 중복 방지
              e.target.blur(); // 포커스 해제
              startSearch(value);
            }
          }}
        />
        <SearchIcon className="absolute left-4 h-6 w-6 text-neutral-border-50" />
      </div>
    </div>
  );
};
