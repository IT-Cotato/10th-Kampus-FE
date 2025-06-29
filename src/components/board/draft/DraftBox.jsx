import { BoardName } from '../BoardName';
import { formatISO } from '@/utils/formatTime';
import Checkbox from '@/assets/imgs/Checkbox_checked.svg?react';
import CheckboxUnchecked from '@/assets/imgs/Checkbox_unchecked.svg?react';
import { useNavigate } from 'react-router-dom';
import { path } from '@/routes/path';

export const DraftBox = ({
  tempPostId,
  boardId,
  title,
  content,
  thumbnailUrl,
  createdTime,
  isEditMode,
  selectedDrafts,
  setSelectedDrafts,
}) => {
  const [date, time] = formatISO(createdTime);
  const navigate = useNavigate();

  const handleSelectDraft = () => {
    if (selectedDrafts.includes(tempPostId)) {
      setSelectedDrafts((prev) => prev.filter((draft) => draft !== tempPostId));
    } else {
      setSelectedDrafts((prev) => [...prev, tempPostId]);
    }
  };

  const handleClickDraft = () => {
    if (isEditMode) {
      return;
    }
    navigate(`../${boardId}/${path.board.specific.write}`, {
      state: tempPostId,
    });
  };

  const checked = selectedDrafts.includes(tempPostId);

  return (
    <li className="flex w-full gap-4 py-4" onClick={handleSelectDraft}>
      {isEditMode && (
        <div className="flex items-center">
          <label htmlFor={tempPostId} className="cursor-pointer">
            {checked ? (
              <Checkbox className="text-primary-base" aria-label="checked" />
            ) : (
              <CheckboxUnchecked aria-label="unchecked" />
            )}
          </label>
          <input
            type="checkbox"
            id={tempPostId}
            className="hidden"
            onChange={() => {}}
            checked={checked}
          />
        </div>
      )}
      <div
        className="flex w-full cursor-pointer flex-col gap-2"
        onClick={handleClickDraft}
      >
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
