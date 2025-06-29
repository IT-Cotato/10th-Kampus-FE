import { BoardName } from '../BoardName';
import { formatISO } from '@/utils/formatTime';
import Check from '@/assets/imgs/check.svg?react';
import { useNavigate } from 'react-router-dom';
import { path } from '@/routes/path';
import { cn } from '@/utils/cn';

export const DraftBox = ({
  draft,
  isEditMode,
  selectedDrafts,
  setSelectedDrafts,
}) => {
  const [date, time] = formatISO(draft?.createdTime);
  const navigate = useNavigate();

  const handleSelectDraft = () => {
    if (selectedDrafts.includes(draft.tempPostId)) {
      setSelectedDrafts((prev) =>
        prev.filter((draftId) => draftId !== draft.tempPostId),
      );
    } else {
      setSelectedDrafts((prev) => [...prev, draft.tempPostId]);
    }
  };

  const handleOnChange = (e) => {
    e.stopPropagation();
    handleSelectDraft(e);
  };

  const handleClickDraft = () => {
    if (isEditMode) {
      return;
    }
    navigate(
      `../${draft.boardId}/${path.board.specific.write}?draftId=${draft.tempPostId}`,
    );
  };

  const checked = selectedDrafts.includes(draft.tempPostId);

  return (
    <li className="flex w-full gap-4 py-4" onClick={handleSelectDraft}>
      {isEditMode && (
        <div className="flex items-center">
          <div htmlFor={draft.tempPostId} className="cursor-pointer">
            <div
              className={cn(
                'flex aspect-square h-[1.625rem] w-[1.625rem] items-center justify-center rounded-full',
                {
                  'bg-primary-base': checked,
                  'border border-neutral-border-40': !checked,
                },
              )}
            >
              {checked && <Check className="h-3.5 w-3.5 text-white" />}
            </div>
          </div>
          <input
            type="checkbox"
            id={draft.tempPostId}
            className="hidden"
            onChange={handleOnChange}
            checked={checked}
          />
        </div>
      )}
      <div
        className="flex w-full cursor-pointer flex-col gap-2"
        onClick={handleClickDraft}
      >
        {/* 게시판명 */}
        <BoardName>{draft?.boardName}</BoardName>
        <span className="flex w-full justify-between gap-20">
          <span className="flex w-full flex-col gap-5 truncate">
            <div className="flex w-full flex-col">
              {/* 제목 */}
              <h1 className="text-subTitle text-neutral-title">
                {draft?.title}
              </h1>
              {/* 본문 */}
              <div className="min-w-0 truncate text-base text-neutral-base">
                {draft?.content}
              </div>
            </div>
            {/* 임시저장 시각 */}
            <div className="flex gap-[10px] text-small text-neutral-border-50">
              <span>{date}</span>
              <span>{time}</span>
            </div>
          </span>
          {/* 사진 */}
          {draft?.thumbnailUrl && (
            <img
              className="flex h-20 w-20 flex-shrink-0 object-cover"
              src={draft?.thumbnailUrl}
            />
          )}
        </span>
      </div>
    </li>
  );
};
