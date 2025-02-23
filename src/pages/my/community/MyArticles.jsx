import { getMyArticlesList } from '@/apis/mypage/getMyArticle.api';
import Logo from '@/assets/imgs/kampusLogo.svg?react';
import { PostList } from '@/components/board/PostList';
import { Loading } from '@/components/common/Loading';
import { QUERY_KEYS } from '@/constants/api';
import { path } from '@/routes/path';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const MyArticles = () => {
  const navigate = useNavigate();
  const {
    data: postList,
    isLoading,
    error: isPostError,
  } = useQuery({
    queryKey: [QUERY_KEYS.MY_POST_LIST],
    queryFn: () => getMyArticlesList({ page: 1 }),
  });

  const handleNavigate = (data) => {
    navigate(`../../../${path.board.base}/${data.boardId}/${data.id}`);
  };

  return (
    <div className="flex flex-col w-full h-full">
      {isLoading ? (
        <Loading />
      ) : !postList.post ? (
        <div className="flex flex-col items-center justify-center w-full h-full gap-2 -translate-y-10">
          <Logo className="w-32 text-neutral-disabled" />
          <span className="text-neutral-border-40">
            You haven't written anything yet! Share your story:)
          </span>
        </div>
      ) : (
        <div className="flex flex-col flex-1 w-full bg-white divide-y">
          {postList.posts.map((item, index) => (
            <PostList
              key={index}
              data={item}
              isActive={true}
              onClick={handleNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};
