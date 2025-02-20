import { getMyArticlesList } from '@/apis/mypage/getMyArticle.api';
import Logo from '@/assets/imgs/kampusLogo.svg?react';
import { PostList } from "@/components/board/PostList";
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const MyArticles = () => {
  const {
    data: postList,
    isLoading: isPostLoading,
    error: isPostError,
  } = useQuery({
    queryKey: [QUERY_KEYS.MY_POST_LIST],
    queryFn: () => getMyArticlesList({ page: 1 }),
  });

  return (
    <div className="flex flex-col w-full h-full">
      {!postList ? (
        <div className="flex flex-col items-center justify-center w-full h-full gap-2 -translate-y-10">
          <Logo className="w-32 text-neutral-disabled" />
          <span className='text-neutral-border-40'>You haven't written anything yet! Share your story:)</span>
        </div>
      ) : (
        <div className="flex flex-col flex-1 w-full bg-white divide-y">
          {postList.posts.map((item, index) => (
            <PostList key={index} data={item} isActive={true} />
          ))}
        </div>
      )}
    </div>
  );
};
