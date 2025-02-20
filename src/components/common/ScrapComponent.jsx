import activeScrap from '@/assets/imgs/activeScrap.svg';
import scrap from '@/assets/imgs/scrap.svg';
import { useEffect, useState } from 'react';
import { StateChangeAnimate, startAnimation } from './StateChangeAnimate';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPostScrap, deletePostScrap } from '@/apis/board/togglePostScrap.api';
import { QUERY_KEYS } from '@/constants/api';
export const ScrapComponent = ({
  state,
  width,
  height,
  id = undefined,
  boardId = undefined
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
        await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.GET_POST_DETAIL, postId] });
        previousPostDetail = queryClient.getQueryData([QUERY_KEYS.GET_POST_DETAIL, postId]);
        queryClient.setQueryData([QUERY_KEYS.GET_POST_DETAIL, postId], (old) =>
          old ? { ...old, isScrapped: !state } : old
        );
      } else {
        // 카드뉴스 뷰
        await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.GET_POST_LIST, boardId] });
        previousPostList = queryClient.getQueryData([QUERY_KEYS.GET_POST_LIST, boardId]);
        queryClient.setQueryData([QUERY_KEYS.GET_POST_LIST, boardId], (old) => {
          if (!old?.posts) return old;
          return {
            ...old,
            posts: old.posts.map((post) =>
              post.postId === postId ? { ...post, isScrapped: !state } : post
            ),
          };
        });
      }

      return { previousPostDetail, previousPostList };
    },
    onError: (err, { postId }, context) => {
      if (postId !== id) {
        queryClient.setQueryData([QUERY_KEYS.GET_POST_DETAIL, postId], context.previousPostDetail);
      } else {
        queryClient.setQueryData([QUERY_KEYS.GET_POST_LIST, boardId], context.previousPostList);
      }
    },
    onSuccess: () => startAnimation(setScrapAni)
    ,
    onSettled: (_, __, { postId }) => {
      if (postId !== id) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_DETAIL, postId] });
      } else {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_LIST, boardId] });
      }
    }
  });

  const handleScrapClick = () => {
    handleScrap({ postId: actualId });
  };
  return (
    <div>
      {scrapAni && (
        <StateChangeAnimate
          state={!state}
          changeToTrueText={'Add to scrap'}
          changeToFalseText={'Remove from Scrap'}
        />
      )}
      {state ? ( // currentColor로 색이 안바뀜
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleScrapClick();
          }}
        >
          <img
            src={activeScrap}
            alt="Bookmarked"
            className="cursor-pointer"
            style={{ width: `${width}`, height: `${height}` }}
          />
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleScrapClick();
          }}
        >
          <img
            src={scrap}
            alt="Bookmark"
            className="cursor-pointer"
            style={{ width: `${width}`, height: `${height}` }}
          />
        </button>
      )}
    </div>
  );
};
