import Prev from '@/assets/imgs/previous.svg?react';
import Search from '@/assets/imgs/search.svg?react';
import { BoardMenuBar } from '../common/MenuBar';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../common/Loading';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getBoardDetail } from '@/apis/board/getBoardDetail.api';

export const PostHeader = ({ path, isAuthor = false }) => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const {
    data: boardDetail,
    isLoading: isBoardLoading,
    error: isBoardError,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_BOARD_DETAIL, boardId],
    queryFn: () => getBoardDetail({ boardId: boardId }),
  });
  return (
    <div className="fixed z-10 flex w-full max-w-[512px] items-center justify-between border-b-[0.5px] border-[#D8D8D8] bg-white px-4 py-4">
      <Prev className="h-5 w-5 cursor-pointer" onClick={() => navigate(-1)} />
      {isBoardLoading && <Loading />}
      {isBoardError && <p>Error Data Loading</p>}
      {!isBoardLoading && !isBoardError && boardDetail.boardName && (
        <p
          className={`absolute left-1/2 top-1/2 line-clamp-1 w-full max-w-[65%] -translate-x-1/2 -translate-y-1/2 text-center font-semibold text-neutral-title ${boardDetail?.boardName?.length < 12 ? 'text-pageTitle' : 'text-subTitle'}`}
        >
          {boardDetail.boardName}
        </p>
      )}
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            navigate(
              `${path.board.base}/${boardId}/${path.board.specific.search}`,
            )
          }
        >
          <Search className="h-6 w-6 cursor-pointer text-neutral-title" />
        </button>
        <BoardMenuBar isAuthor={isAuthor} data={boardDetail} />
      </div>
    </div>
  );
};
