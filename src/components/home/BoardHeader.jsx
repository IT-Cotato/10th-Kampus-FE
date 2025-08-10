import { useNavigate } from 'react-router-dom';
import More from '@/assets/imgs/icon-more.svg?react';
import { path } from '@/routes/path';
export const BoardHeader = ({ title, boardId }) => {
  const navigate = useNavigate();
  const handleMoreClick = () => {
    if (boardId === undefined) {
      navigate(path.board.base);
    } else {
      navigate(path.board.base + '/' + boardId);
    }
  };
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-pageTitle text-neutral-title">{title}</h1>
      <button
        type="button"
        aria-label="See more"
        className="flex shrink-0 items-center justify-center gap-1 px-[.125rem] text-neutral-border-40"
        onClick={handleMoreClick}
      >
        <p className="text-small">more</p>
        <More className="w-[.875rem] text-neutral-border-40" />
      </button>
    </div>
  );
};
