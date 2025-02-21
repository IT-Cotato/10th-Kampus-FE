import Logo from "@/assets/imgs/kampusLogo.svg?react"
import notification from "@/assets/imgs/notification.svg"
import notification_true from "@/assets/imgs/notification_true.svg"
import search from "@/assets/imgs/search.svg"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { path } from "@/routes/path";
import { BoardBox, CardPostBox } from "@/components/home/BoardBox.jsx";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/api";
import { getFavorite } from "@/apis/home/getFavorite.api";
import { getTrend } from "@/apis/home/getTrend.api";
import { getUser } from "@/apis/user/userDetail.api";
import { getCardNewsList } from "@/apis/board/getPostList.api";

export const Home = () => {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }); // "May 5, 2025" 형식
  const { data: favoriteList, isLoading: favoriteLoading, error: favoriteError } = useQuery({
    queryKey: [QUERY_KEYS.GET_HOME_FAVORITE],
    queryFn: getFavorite,
  })
  const { data: trendingList, isLoading: trendingLoading, error: trendingError } = useQuery({
    queryKey: [QUERY_KEYS.GET_HOME_TRENDING],
    queryFn: getTrend,
  })
  const { data: cardNewsList, isLoading: cardNewsLoading, error: cardNewsError } = useQuery({
    queryKey: [QUERY_KEYS.GET_HOME_CARDNEWS],
    queryFn: () => getCardNewsList({ page: 1 }),
  })
  const { data: userDetail, isLoading: userLoading, error: userError } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_ME],
    queryFn: getUser,
  })
  const [isNotification, setIsNotification] = useState(true);
  const [homeBoard, setHomeBoard] = useState({
    // board + postID로 navigate 만들기
    userUnivState: true,
    univ: [
      {
        board: 'Free Talk',
        title: 'Title',
        postID: 1,
      },
      {
        board: 'Free Talk',
        title: 'Title',
        postID: 1,
      },
    ],
    favorites: [
      {
        board: 'Free Talk',
        title: 'TitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitle',
        postID: 1,
      },
      {
        board: 'Free Talk',
        title: 'Title',
        postID: 1,
      },
    ],
    trending: [
      {
        board: 'Free Talk',
        title: 'Title',
        postID: 1,
      },
      {
        board: 'Free Talk',
        title: 'Title',
        postID: 1,
      },
    ],
    howtoliveinKorea: [
      {
        board: 'Tips for living in Korea',
        title: 'Title',
        postID: 1,
      },
      {
        board: 'Tips for living in Korea',
        title: 'Title TitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitle',
        postID: 2,
      },
      {
        board: 'Tips for living in Korea',
        title: 'Title',
        postID: 3,
      },
      {
        board: 'Tips for living in Korea',
        title: 'Title',
        postID: 4,
      },
      {
        board: 'Tips for living in Korea',
        title: 'Title',
        postID: 5,
      },
    ],
  });
  return (
    <div className="flex w-full flex-col px-4 py-3 gap-[.625rem]">
      <div className="flex items-start justify-between pb-[.625rem]">
        <Logo className="w-[6rem] h-auto text-primary-base" />
        <div className="flex gap-[0.875rem]">
          <button
            className="cursor-pointer"
            onClick={() => navigate(path.notificationList)}>
            <img
              src={isNotification ? notification_true : notification}
              alt="notification button"
              className="w-5 h-6"
            />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => navigate(path.search)}
          >
            <img src={search} alt="search button" className="w-6 h-6" />
          </button>
        </div>
      </div>
      {userDetail?.universityId !== -1 && (
        <h1 className="text-pageTitle text-neutral-title">{userDetail?.universityName}</h1>
      )}
      <div className="flex flex-col gap-[1.625rem]">
        <div className="flex justify-center w-fit h-28 flex-col gap-[.625rem] rounded-[.625rem] border-[0.03125rem] border-primary-30 px-[.875rem] py-8">
          <h1 className="text-center text-subTitle text-neutral-base">
            {today}
          </h1>
          {/*  <h2 className="text-base text-primary-red">Holiday-KR</h2> */}
        </div>
        {userDetail?.universityId !== -1 && (
          <BoardBox data={homeBoard.univ} boardTitle="My univ" path={path} />
        )}
        <BoardBox
          data={favoriteList?.previewList}
          boardTitle="Favorites"
          path={path}
        />
        <BoardBox data={trendingList?.previewList} boardTitle="Trending" path={path} />
        <CardPostBox data={cardNewsList?.posts} path={path} />
      </div>
    </div>
  );
};
