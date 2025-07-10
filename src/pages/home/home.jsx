import Logo from '@/assets/imgs/kampusLogo.svg?react';
import search from '@/assets/imgs/search.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { path } from '@/routes/path';
import { BoardBox } from '@/components/home/BoardBox.jsx';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getFavorite } from '@/apis/home/getFavorite.api';
import { getTrend } from '@/apis/home/getTrend.api';
import { getUser } from '@/apis/user/userDetail.api';
import { NotificationButton } from '@/components/common/NotificationButton';

export const Home = () => {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }); // "May 5, 2025" 형식
  // 현재 백엔드에서 학교 게시판을 자동적으로 못 만들어서 세종대학교 인증하고 오류 떠서 막아 놨습니다
  /*const { data: univeristyList, isLoading: universityLoading, error: universityError } = useQuery({
    queryKey: [QUERY_KEYS.GET_HOME_UNIVERISTY],
    queryFn: getUniversity,
    throwOnError: true,
  })*/

  const { data: favoriteList } = useQuery({
    queryKey: [QUERY_KEYS.GET_HOME_FAVORITE],
    queryFn: getFavorite,
  });

  const { data: trendingList } = useQuery({
    queryKey: [QUERY_KEYS.GET_HOME_TRENDING],
    queryFn: getTrend,
  });

  {
    /* const {
    data: cardNewsList,
    isLoading: cardNewsLoading,
    error: cardNewsError,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_HOME_CARDNEWS],
    queryFn: () => getCardNewsList({ page: 1 }),
  });*/
  }

  const { data: userDetail } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_ME],
    queryFn: getUser,
  });

  const [isNotification, _setIsNotification] = useState(false);

  return (
    <div className="flex w-full flex-col gap-[.625rem] px-4 py-3">
      <div className="flex items-start justify-between pb-[.625rem]">
        <Logo className="h-auto w-[6rem] text-primary-base" />
        <div className="flex gap-[0.875rem]">
          <NotificationButton isNotification={isNotification} />
          <button
            className="cursor-pointer"
            onClick={() => navigate(path.search)}
          >
            <img src={search} alt="search button" className="h-6 w-6" />
          </button>
        </div>
      </div>
      {userDetail?.universityId !== -1 && (
        <h1 className="text-pageTitle text-neutral-title">
          {userDetail?.universityCode}
        </h1>
      )}
      <div className="flex flex-col gap-[1.625rem]">
        <div className="flex h-28 w-fit flex-col justify-center gap-[.625rem] rounded-[.625rem] border-[0.03125rem] border-primary-30 px-[.875rem] py-8">
          <h1 className="text-center text-subTitle text-neutral-base">
            {today}
          </h1>
          {/*  <h2 className="text-base text-primary-red">Holiday-KR</h2> */}
        </div>
        {/*{userDetail?.universityId !== -1 && !universityError && (
          <BoardBox data={univeristyList} boardTitle="My univ" university={true} />
        )}*/}
        <BoardBox
          data={favoriteList?.homePostThumbnailList}
          boardTitle="Favorites"
        />
        {trendingList?.homePostThumbnailList.length !== 0 && (
          <BoardBox
            data={trendingList?.homePostThumbnailList}
            boardTitle="Trending"
          />
        )}
        {/* 추후 홈과 보드 관련으로 리팩토링 예정 <CardPostBox data={cardNewsList?.posts} />*/}
      </div>
    </div>
  );
};
