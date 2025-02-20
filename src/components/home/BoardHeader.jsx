import { useNavigate } from 'react-router-dom';
import { generateBoardTitle } from '@/utils/boardTitleUtils';
import more from '@/assets/imgs/more.svg';
import { path } from '@/routes/path';
export const BoardHeader = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-pageTitle text-neutral-title">{title}</h1>
      <button
        className="flex items-center gap-[0.125rem] text-small text-neutral-base"
        onClick={() => {
          if (title === "Favorites") {
            navigate(path.board.base);
          }
          else if (title === "Trending") {
            navigate(path.board.base + '/' + '4');
          }
          else if (title === "How to live in Korea") {
            navigate(path.board.base + '/' + '5');
          }
          {/** 백엔드 타입 변경 전까지는 임시입니다*/ }
        }}
      >
        <p>more</p>
        <img
          src={more}
          alt="See More"
          className="w-[.875rem] text-neutral-base"
        />
      </button>
    </div>
  );
};
