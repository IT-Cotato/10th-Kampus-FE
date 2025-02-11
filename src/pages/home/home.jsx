import kampusLogo from '@/assets/imgs/kampusLogo.svg';
import notifiaction from '@/assets/imgs/notification.svg';
import notification_true from '@/assets/imgs/notification_true.svg';
import search from '@/assets/imgs/search.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { path } from '@/routes/path';
import { BoardBox, CardPostBox } from '@/components/home/BoardBox.jsx';

export const Home = () => {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }); // "May 5, 2025" 형식
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
        title: 'Title',
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
        title: 'Title',
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
    <div className="flex w-full flex-col gap-[.625rem] px-4 py-3">
      <div className="flex items-start justify-between">
        <img src={kampusLogo} alt="Kampus Logo" className="h-20 w-[5.5rem]" />
        <div className="flex gap-[0.875rem]">
          <img
            src={isNotification ? notification_true : notifiaction}
            alt="notification button"
            className="h-6 w-5"
          />
          <button
            className="cursor-pointer"
            onClick={() => navigate(path.search)}
          >
            <img src={search} alt="search button" className="h-6 w-6" />
          </button>
        </div>
      </div>
      {homeBoard.userUnivState && (
        <h1 className="text-pageTitle text-neutral-title">OO University</h1>
      )}
      <div className="flex flex-col gap-[1.625rem]">
        <div className="flex w-fit flex-col gap-[.625rem] rounded-[.625rem] border-[0.03125rem] border-primary-30 px-[.875rem] py-8">
          <h1 className="text-center text-subTitle text-neutral-base">
            {today}
          </h1>
          <h2 className="text-base text-primary-red">Holiday-KR</h2>
        </div>
        {homeBoard.userUnivState && (
          <BoardBox data={homeBoard.univ} boardTitle="My univ" path={path} />
        )}
        <BoardBox
          data={homeBoard.favorites}
          boardTitle="Favorites"
          path={path}
        />
        <BoardBox data={homeBoard.trending} boardTitle="Trending" path={path} />
        <CardPostBox data={homeBoard.howtoliveinKorea} path={path} />
      </div>
    </div>
  );
};
