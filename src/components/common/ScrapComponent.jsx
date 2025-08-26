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
import {
  addProductScrap,
  deleteProductScrap,
} from '@/apis/market/toggleMarketScrap.api';

const ANIMATION_MESSAGES = {
  SAVED: 'Saved',
  REMOVED: 'Removed from Saved',
};

const ARIA_LABELS = {
  SCRAP: 'Save',
  UNSCRAP: 'Remove from saved',
};

export const ScrapComponent = ({
  state,
  id,
  boardId,
  postType = undefined,
  className,
  ...props
}) => {
  const queryClient = useQueryClient();
  const { postId, productId } = useParams();
  const [scrapAni, setScrapAni] = useState(false);

  const actualId = postId || id || productId; // 게시글: postId, 카드뉴스, 마켓: 전달받은 id 혹은 productId

  // Market과 Post에 따른 설정 분리
  const scrapConfig =
    postType === 'MARKET'
      ? {
          addFn: addProductScrap,
          deleteFn: deleteProductScrap,
          detailQueryKey: QUERY_KEYS.GET_MARKET_PRODUCT,
          listQueryKey: [
            QUERY_KEYS.GET_MARKET_PRODUCT_LIST,
            QUERY_KEYS.MY_SCRAPED_PRODUCT_LIST,
          ],
          idKey: 'productId',
        }
      : {
          addFn: addPostScrap,
          deleteFn: deletePostScrap,
          detailQueryKey: QUERY_KEYS.GET_POST_DETAIL,
          listQueryKey: QUERY_KEYS.GET_POST_LIST,
          idKey: 'postId',
        };

  const updateDetailQuery = (queryKey, newState) => {
    queryClient.setQueryData(queryKey, (old) =>
      old ? { ...old, isScrapped: newState } : old,
    );
  };

  const updateListQuery = (queryKey, targetId, newState) => {
    queryClient.setQueryData(queryKey, (old) => {
      if (!old?.posts) return old;
      return {
        ...old,
        posts: old.posts.map((post) =>
          post.postId === targetId ? { ...post, isScrapped: newState } : post,
        ),
      };
    });
  };

  // 쿼리 키 생성 함수
  const getQueryKeys = () => {
    const detailKey = [scrapConfig.detailQueryKey, actualId];
    const listKey =
      postType === 'MARKET' || postType === 'CARDNEWS'
        ? [...scrapConfig.listQueryKey]
        : [...scrapConfig.listQueryKey, boardId];

    return { detailKey, listKey };
  };

  // 통합된 스크랩 mutation
  const { mutate: handleScrapToggle } = useMutation({
    mutationFn: async () => {
      const params = { [scrapConfig.idKey]: actualId };
      return state ? scrapConfig.deleteFn(params) : scrapConfig.addFn(params);
    },

    onMutate: async () => {
      const newScrapState = !state;
      const { detailKey, listKey } = getQueryKeys();
      const previousData = {};

      if (postType === 'MARKET' || postType === 'CARDNEWS') {
        // Market, Cardnews: 항상 detail과 list 모두 업데이트
        await queryClient.cancelQueries({ queryKey: detailKey });
        await queryClient.cancelQueries({ queryKey: listKey });

        previousData.detail = queryClient.getQueryData(detailKey);
        previousData.list = queryClient.getQueryData(listKey);

        updateDetailQuery(detailKey, newScrapState);
        updateListQuery(listKey, actualId, newScrapState);
      } else {
        // 게시글 상세 뷰
        await queryClient.cancelQueries({ queryKey: detailKey });
        previousData.detail = queryClient.getQueryData(detailKey);
        updateDetailQuery(detailKey, newScrapState);
      }

      return previousData;
    },

    onError: (_, __, context) => {
      const { detailKey, listKey } = getQueryKeys();

      // 이전 상태로 롤백
      if (context?.detail) {
        queryClient.setQueryData(detailKey, context.detail);
      }
      if (context?.list) {
        queryClient.setQueryData(listKey, context.list);
      }
    },

    onSuccess: () => {
      startAnimation(setScrapAni);
    },

    onSettled: () => {
      const { detailKey, listKey } = getQueryKeys();

      // 쿼리 무효화
      if (postType === 'MARKET' || postType === 'CARDNEWS') {
        queryClient.invalidateQueries({ queryKey: detailKey });
        queryClient.invalidateQueries({ queryKey: listKey });
      } else {
        queryClient.invalidateQueries({ queryKey: detailKey });
      }
    },
  });

  const handleScrapClick = (e) => {
    console.log(state);
    e.stopPropagation();
    handleScrapToggle();
  };

  // 렌더링 관련 변수들
  const isActive = state;
  const Component = isActive ? ActiveScrap : Scrap;
  const ariaLabel = isActive ? ARIA_LABELS.UNSCRAP : ARIA_LABELS.SCRAP;

  return (
    <>
      {scrapAni && (
        <StateChangeAnimate
          state={!state}
          changeToTrueText={ANIMATION_MESSAGES.SAVED}
          changeToFalseText={ANIMATION_MESSAGES.REMOVED}
        />
      )}
      <Component
        className={cn('cursor-pointer', className, {
          'text-neutral-border-40': isActive,
        })}
        onClick={handleScrapClick}
        role="button"
        aria-label={ariaLabel}
        {...props}
      />
    </>
  );
};
