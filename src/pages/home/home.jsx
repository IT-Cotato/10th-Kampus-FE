import Logo from '@/assets/imgs/kampusLogo.svg?react';
import search from '@/assets/imgs/search.svg';
import { useNavigate } from 'react-router-dom';
import { path } from '@/routes/path';
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
    <div className="flex w-full flex-col gap-6 bg-[#FCFCFC] px-4 py-3">
      <div className="flex items-start justify-between pb-[.625rem]">
        <Logo
          aria-label="Kampus Logo"
          className="h-auto w-[6rem] text-primary-base"
        />
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => navigate(path.search)}
        >
          <img src={search} alt="search button" className="h-6 w-6" />
        </button>
      </div>
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
          boardId={univeristyList.boardId}
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
  );
};
