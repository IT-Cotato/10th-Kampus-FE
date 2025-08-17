import Logo from '@/assets/imgs/icon/kampus-logo.svg?react';
import SearchIcon from '@/assets/imgs/icon/search.svg?react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { BoardBox, CardPostBox } from '@/components/home/BoardBox.jsx';
import { useGetUserData } from '@/state/query/common/useGetUserData';
import Calendar from '@/components/home/Calendar';
import { useGetSimpleBoardPostList } from '@/state/query/board/useGetBoardPostList';
import {
  useGetHomeFavoriteList,
  useGetHomeTrendingList,
  useGetHomeUniversityList,
} from '@/state/query/home/useGetHomeList';

export const Home = () => {
  const navigate = useNavigate();

  const { data: userDetail } = useGetUserData();
  const { data: univeristyList, error: universityBoardError } =
    useGetHomeUniversityList();
  const { data: favoriteList } = useGetHomeFavoriteList();
  const { data: trendingList } = useGetHomeTrendingList();
  const { data: cardNewsData } = useGetSimpleBoardPostList({ boardId: 1 });

  const cardNewsList = cardNewsData?.pages?.flatMap((p) => p.items) || [];

  return (
    <>
      {/* 홈화면 헤더 */}
      <header className="fixed top-0 flex h-fit w-full justify-between bg-[#FCFCFC] px-4 py-4 width-fixed">
        <Logo
          aria-label="Kampus Logo"
          className="h-auto w-[6rem] text-primary-base"
        />
        <SearchIcon
          role="button"
          aria-label="search button"
          className="h-6 w-6 cursor-pointer"
          onClick={() => navigate(PATH.SEARCH)}
        />
      </header>
      <div className="flex w-full flex-col gap-6 bg-[#FCFCFC] px-4 pb-3 pt-20">
        {/* 대학 정보 */}
        {userDetail?.userId !== -1 && (
          <h1 className="text-pageTitle text-neutral-title">
            {userDetail?.universityCode}
          </h1>
        )}
        {/* 오늘 날짜 */}
        <Calendar />
        {/* 대학 게시판 */}
        {!universityBoardError && (
          <BoardBox
            data={univeristyList?.homePostThumbnailList}
            boardTitle="My univ"
            university={true}
            boardId={univeristyList?.boardId}
          />
        )}
        {/* 즐겨찾기한 게시판 */}
        {favoriteList?.homePostThumbnailList.length > 0 && (
          <BoardBox
            data={favoriteList?.homePostThumbnailList}
            boardTitle="Favorites"
          />
        )}
        {/* 인기 게시판 */}
        {trendingList?.homePostThumbnailList.length > 0 && (
          <BoardBox
            data={trendingList?.homePostThumbnailList}
            boardTitle="Trending"
            isTrending={true}
          />
        )}
        {/* 카드 뉴스 */}
        <CardPostBox data={cardNewsList} />
      </div>
    </>
  );
};
