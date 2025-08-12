import Logo from '@/assets/imgs/icon/kampus-logo.svg?react';
import SearchIcon from '@/assets/imgs/icon/search.svg?react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { BoardBox } from '@/components/home/BoardBox.jsx';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getFavorite } from '@/apis/home/getFavorite.api';
import { getTrend } from '@/apis/home/getTrend.api';
import { useGetUserData } from '@/state/query/common/useGetUserData';
import Calendar from '@/components/home/Calendar';
import { getUniversity } from '@/apis/home/getUniversity.api';

export const Home = () => {
  const navigate = useNavigate();
  const { data: univeristyList, error: universityError } = useQuery({
    queryKey: [QUERY_KEYS.GET_HOME_UNIVERISTY],
    queryFn: getUniversity,
    throwOnError: true,
  });

  const { data: favoriteList } = useQuery({
    queryKey: [QUERY_KEYS.GET_HOME_FAVORITE],
    queryFn: getFavorite,
  });

  const { data: trendingList } = useQuery({
    queryKey: [QUERY_KEYS.GET_HOME_TRENDING],
    queryFn: getTrend,
  });

  const { data: userDetail, isLoading: _userLoading } = useGetUserData();

  return (
    <>
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
        {userDetail?.universityId !== -1 && (
          <h1 className="text-pageTitle text-neutral-title">
            {userDetail?.universityCode}
          </h1>
        )}
        <Calendar />
        {userDetail?.universityId !== -1 && !universityError && (
          <BoardBox
            data={univeristyList}
            boardTitle="My univ"
            university={true}
            boardId={univeristyList?.boardId}
          />
        )}
        {favoriteList?.homePostThumbnailList.length > 0 && (
          <BoardBox
            data={favoriteList?.homePostThumbnailList}
            boardTitle="Favorites"
          />
        )}
        {trendingList?.homePostThumbnailList.length > 0 && (
          <BoardBox
            data={trendingList?.homePostThumbnailList}
            boardTitle="Trending"
            boardId={trendingList.homePostThumbnailList.boardId}
          />
        )}
        {/* <CardPostBox data={cardNewsList?.posts} /> */}
      </div>
    </>
  );
};
