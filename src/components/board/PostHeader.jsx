import Prev from '@/assets/imgs/previous.svg?react';
import Search from '@/assets/imgs/search.svg?react';
import { BoardMenuBar } from '../common/MenuBar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { path } from '@/routes/path';
import { Loading } from '../common/Loading';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getBoardDetail } from '@/apis/board/getBoardDetail.api';

export const PostHeader = ({ isAuthor = false }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { boardId } = useParams();
  const { postId } = useParams();

  const MARKET = path.market.base;
  const isMarket = pathname.startsWith(MARKET);

  const {
    data: boardDetail,
    isLoading: isBoardLoading,
    error: isBoardError,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_BOARD_DETAIL, boardId],
    queryFn: () => getBoardDetail({ boardId: boardId }),
    enabled: !isMarket,
  });

  const handleSearch = () => {
    if (isMarket) {
      navigate('');
    } else {
      navigate(`${path.board.base}/${boardId}/${path.board.specific.search}`);
    }
  };

  return (
    <div className="fixed z-10 flex h-14 w-full max-w-[512px] items-center justify-between border-b-[0.5px] border-[#D8D8D8] bg-white px-4 py-4">
      {/* 중고거래 메인페이지는 뒤로가기 없음 */}
      {!isMarket || postId ? (
        <Prev className="h-5 w-5 cursor-pointer" onClick={() => navigate(-1)} />
      ) : (
        <span></span>
      )}
      {isBoardLoading && <Loading />}
      {isBoardError && <p>Error Data Loading</p>}
      {!isBoardLoading && !isBoardError && (
        <h1
          className={`absolute left-1/2 -translate-x-1/2 transform whitespace-nowrap text-pageTitle font-semibold text-neutral-title ${boardDetail?.boardName?.length < 12 ? 'text-pageTitle' : 'text-subTitle'}`}
        >
          {isMarket ? 'Market' : boardDetail?.boardName}
        </h1>
      )}
      <div className="flex items-center gap-2">
        {/* 게시글 내에는 검색 기능 없음 */}
        {postId === undefined && (
          <button onClick={handleSearch}>
            <Search className="h-6 w-6 cursor-pointer text-neutral-title" />
          </button>
        )}
        <BoardMenuBar
          isAuthor={isAuthor}
          data={boardDetail}
          isMarket={isMarket}
        />
      </div>
    </div>
  );
};
