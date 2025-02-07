import PreviousIcon from "@/assets/imgs/previous.svg?react";
import SearchIcon from "@/assets/imgs/search.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = ({ value, setValue, isSearch, setIsSearch, startSearch }) => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center w-full gap-4">
            <PreviousIcon className="text-neutral-title w-5 h-5"
                onClick={() => navigate(-1)} />
            <div className="flex flex-1 items-center relative">
                <input type="text" className="flex flex-1 bg-primary-10 py-[0.6875rem] rounded-[0.625rem] text-base
                placeholder-neutral-border-50 text-neutral-title pl-[3.375rem]" placeholder="Search"
                    value={value} onChange={(e) => setValue(e.target.value)}
                    onFocus={() => {
                        if (isSearch === false) setIsSearch(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.nativeEvent.isComposing) { // 한글 조합 시, 중복 방지
                            e.target.blur();    // 포커스 해제
                            startSearch(value);
                        }
                    }} />
                <SearchIcon className="absolute left-4 w-6 h-6 text-neutral-border-50" />
            </div>
        </div>
    )
}