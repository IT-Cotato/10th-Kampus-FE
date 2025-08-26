import { getMyScrapedPosts } from '@/apis/mypage/getMyScraps.api';
import Logo from '@/assets/imgs/icon/kampus-logo.svg?react';
import { PostList } from '@/components/board/PostList';
import { Loading } from '@/components/common/Loading';
import { QUERY_KEYS } from '@/constants/api';
import { PATH } from '@/routes/path';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const CommunityScrap = () => {
  const navigate = useNavigate();
  const { data: postList, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.MY_SCRAPED_POST_LIST],
    queryFn: () => getMyScrapedPosts({ page: 1 }),
  });

  const handleNavigate = (data) => {
    navigate(`../../../${PATH.BOARD.BASE}/${data.boardId}/${data.postId}`);
  };

  return (
    <div className="flex h-full w-full flex-col">
      {isLoading ? (
        <Loading />
      ) : postList?.items?.length === 0 ? (
        <div className="flex h-full w-full -translate-y-10 flex-col items-center justify-center gap-2">
          <Logo className="w-32 text-neutral-disabled" />
          <span className="text-center text-neutral-border-40">
            There&apos;s nothing you&apos;ve scraped!
            <br />
            Try saving your interest:)
          </span>
        </div>
      ) : (
        <div className="flex w-full flex-1 flex-col divide-y bg-white">
          {postList.items.map((item, index) => (
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
