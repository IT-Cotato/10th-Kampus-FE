import { useNavigate } from 'react-router-dom';
import { generateBoardTitle } from '@/utils/boardTitleUtils';
import more from '@/assets/imgs/more.svg';
export const BoardHeader = ({ title, path }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-pageTitle text-neutral-title">{title}</h1>
      <button
        className="flex items-center gap-[0.125rem] text-small text-neutral-base"
        onClick={() => {
          console.log(generateBoardTitle(title));
          if (generateBoardTitle(title) === '') {
            navigate(path.board.base);
          } else {
            navigate(path.board.base + '/' + generateBoardTitle(title));
          }
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
