import { BoardName } from '../BoardName';
import { formatISO } from '@/utils/formatTime';
import Checkbox from '@/assets/imgs/Checkbox_checked.svg?react';
import CheckboxUnchecked from '@/assets/imgs/Checkbox_unchecked.svg?react';
import { useState } from 'react';

export const DraftBox = ({
  id,
  title,
  content,
  thumbnailUrl,
  createdTime,
  isEditMode,
  selectedDrafts,
  setSelectedDrafts,
}) => {
  const [date, time] = formatISO(createdTime);

  const handleSelectDraft = () => {
    if (selectedDrafts.includes(id)) {
      setSelectedDrafts((prev) => prev.filter((draft) => draft !== id));
    } else {
      setSelectedDrafts((prev) => [...prev, id]);
    }
  };

  const checked = selectedDrafts.includes(id);

  return (
    <li className="flex w-full gap-4 py-4">
      {isEditMode && (
        <div className="flex items-center">
          <label htmlFor={id} className="cursor-pointer">
            {checked ? (
              <Checkbox className="text-primary-base" aria-label="checked" />
            ) : (
              <CheckboxUnchecked aria-label="unchecked" />
            )}
          </label>
          <input
            type="checkbox"
            id={id}
            className="hidden"
            onChange={handleSelectDraft}
            checked={checked}
          />
        </div>
      )}
      <div className="flex w-full flex-col gap-2">
        {/* 게시판명 */}
        <BoardName>Board Name</BoardName>
        <span className="flex w-full justify-between gap-20">
          <span className="flex w-full flex-col gap-5 truncate">
            <div className="flex w-full flex-col">
              {/* 제목 */}
              <h1 className="text-subTitle text-neutral-title">{title}</h1>
              {/* 본문 */}
              <div className="min-w-0 truncate text-base text-neutral-base">
                {content}
              </div>
            </div>
            {/* 임시저장 시각 */}
            <div className="flex gap-[10px] text-small text-neutral-border-50">
              <span>{date}</span>
              <span>{time}</span>
            </div>
          </span>
          {/* 사진 */}
          {thumbnailUrl && (
            <img
              className="flex h-20 w-20 flex-shrink-0 object-cover"
              src={thumbnailUrl}
            />
          )}
        </span>
      </div>
    </li>
  );
};
