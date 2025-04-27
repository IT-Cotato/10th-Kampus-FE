import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FilterBox } from '@/components/board/FilterBox';
import { PostHeader } from '@/components/board/PostHeader';
import { path } from '@/routes/path';
import { WriteButton } from '@/components/board/write/WriteButton';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { Loading } from '@/components/common/Loading';
import { MarketList } from '@/components/board/MarketList';

export const Market = () => {
  const postList = {
    posts: [
      //   {
      //     postId: 1,
      //     title: '인형',
      //     price: 30000,
      //     likes: 10,
      //     comments: 0,
      //     thumbnailUrl: 'src/assets/imgs/bg1.png',
      //     isScrapped: true,
      //     createdTime: '2025-04-27 02:56:52',
      //   },
      //   {
      //     postId: 2,
      //     title: '인형',
      //     price: 20000,
      //     likes: 10,
      //     comments: 0,
      //     thumbnailUrl: 'src/assets/imgs/bg2.png',
      //     isScrapped: false,
      //     createdTime: '2025-04-27 02:56:52',
      //   },
    ],
  };

  const boardDetail = {
    boardName: 'Market',
    filter: true,
  };

  const isPostLoading = false;
  const isPostError = false;

  return (
    <div className="flex flex-1">
      {/* <PostHeader path={path} /> */}
      <div className="relative flex flex-1 flex-col pt-14">
        <div className="flex w-full flex-col gap-[0.875rem] bg-white px-4 pb-1 pt-5">
          {boardDetail.filter && <FilterBox />}
          {/** 추후, 백엔드와 필터 작업 시 props 넘겨줘야 함 */}
        </div>
        <div className="flex w-full flex-1 flex-col divide-y bg-white px-4">
          {isPostLoading && <Loading />}
          {isPostError && <p>Error Data Loading</p>}
          {!isPostLoading &&
            !isPostError &&
            (postList.posts?.length > 0 ? (
              postList.posts.map((item) => (
                <MarketList key={item.postId} data={item} />
              ))
            ) : (
              <p className="flex flex-1 items-center justify-center text-small text-neutral-disabled">
                An empty page, waiting for your words!
              </p>
            ))}
        </div>
        {boardDetail && <WriteButton boardName={boardDetail.boardName} />}
      </div>
    </div>
  );
};
