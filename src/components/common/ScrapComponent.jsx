import ActiveScrap from '@/assets/imgs/icon/active-scrap.svg?react';
import Scrap from '@/assets/imgs/icon/scrap.svg?react';
import { useState } from 'react';
import { StateChangeAnimate, startAnimation } from './StateChangeAnimate';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addPostScrap,
  deletePostScrap,
} from '@/apis/board/togglePostScrap.api';
import { QUERY_KEYS } from '@/constants/api';
import { cn } from '@/utils/cn';

export const ScrapComponent = ({
  state,
  id = undefined,
  boardId = undefined,
  _market = false, // market의 경우 스크랩 로직이 다름
  ...props
}) => {
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const actualId = postId || id; // 카드뉴스면 전달받은 id, 게시글이면 파라미터에 있는 postId
  const [scrapAni, setScrapAni] = useState(false); // 스크랩 애니메이션 상태

  const { mutate: handleScrap } = useMutation({
    mutationFn: async ({ postId }) => {
      return state ? deletePostScrap({ postId }) : addPostScrap({ postId });
    },
    onMutate: async ({ postId }) => {
      let previousPostDetail = null;
      let previousPostList = null;
      if (postId !== id) {
        // 게시글 뷰
        await queryClient.cancelQueries({
          queryKey: [QUERY_KEYS.GET_POST_DETAIL, postId],
        });
        previousPostDetail = queryClient.getQueryData([
          QUERY_KEYS.GET_POST_DETAIL,
          postId,
        ]);
        queryClient.setQueryData([QUERY_KEYS.GET_POST_DETAIL, postId], (old) =>
          old ? { ...old, isScrapped: !state } : old,
        );
      } else {
        // 카드뉴스 뷰
        await queryClient.cancelQueries({
          queryKey: [QUERY_KEYS.GET_POST_LIST, boardId],
        });
        previousPostList = queryClient.getQueryData([
          QUERY_KEYS.GET_POST_LIST,
          boardId,
        ]);
        queryClient.setQueryData([QUERY_KEYS.GET_POST_LIST, boardId], (old) => {
          if (!old?.posts) return old;
          return {
            ...old,
            posts: old.posts.map((post) =>
              post.postId === postId ? { ...post, isScrapped: !state } : post,
            ),
          };
        });
      }

      return { previousPostDetail, previousPostList };
    },
    onError: (err, { postId }, context) => {
      if (postId !== id) {
        queryClient.setQueryData(
          [QUERY_KEYS.GET_POST_DETAIL, postId],
          context.previousPostDetail,
        );
      } else {
        queryClient.setQueryData(
          [QUERY_KEYS.GET_POST_LIST, boardId],
          context.previousPostList,
        );
      }
    },
    onSuccess: () => startAnimation(setScrapAni),
    onSettled: (_, __, { postId }) => {
      if (postId !== id) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POST_DETAIL, postId],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POST_LIST, boardId],
        });
      }
    },
  });

  const handleScrapClick = () => {
    handleScrap({ postId: actualId });
  };

  const isActive = state;

  const Component = isActive ? ActiveScrap : Scrap;

  const ariaLabel = isActive ? 'Unscrap button' : 'Scrap button';

  return (
    <>
      {scrapAni && (
        <StateChangeAnimate
          state={!state}
          changeToTrueText={'Added to Scrap'}
          changeToFalseText={'Removed from Scrap'}
        />
      )}
      <Component
        className={cn('cursor-pointer', props.className, {
          'text-neutral-border-40': isActive,
        })}
        onClick={handleScrapClick}
        aria-label={ariaLabel}
      />
    </>
  );
};
