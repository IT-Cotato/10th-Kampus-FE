import ActiveScrap from '@/assets/imgs/icon/active-scrap.svg?react';
import Scrap from '@/assets/imgs/icon/scrap.svg?react';
import { useEffect, useState } from 'react';
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
import { useSnackbarStore } from '@/stores/useSnackbarStore';

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
  const { showSnackbar } = useSnackbarStore();

  // 낙관적 업데이트를 위한 로컬 상태
  const [optimisticState, setOptimisticState] = useState(state);

  // 실제 상태가 변경되면 낙관적 상태도 동기화
  useEffect(() => {
    setOptimisticState(state);
  }, [state]);

  const actualId = postId || id || productId;

  // Market과 Post에 따른 설정 분리
  const scrapConfig =
    postType === 'MARKET'
      ? {
          addFn: addProductScrap,
          deleteFn: deleteProductScrap,
          detailQueryKey: QUERY_KEYS.GET_MARKET_PRODUCT,
          listQueryKeys: [
            QUERY_KEYS.GET_MARKET_PRODUCT_LIST,
            QUERY_KEYS.MY_SCRAPED_PRODUCT_LIST,
          ],
          idKey: 'productId',
          dataField: 'products',
        }
      : {
          addFn: addPostScrap,
          deleteFn: deletePostScrap,
          detailQueryKey: QUERY_KEYS.GET_POST_DETAIL,
          listQueryKeys: [QUERY_KEYS.GET_POST_LIST],
          idKey: 'postId',
          dataField: 'posts',
        };

  const updateDetailQuery = (queryKey, newState) => {
    queryClient.setQueryData(queryKey, (old) =>
      old ? { ...old, isScrapped: newState } : old,
    );
  };

  const updateListQuery = (queryKey, targetId, newState) => {
    queryClient.setQueryData(queryKey, (old) => {
      if (!old) return old;

      const dataArray = old[scrapConfig.dataField];
      if (!dataArray) return old;

      const idField = postType === 'MARKET' ? 'productId' : 'postId';
      const updatedArray = dataArray.map((item) =>
        item[idField] === targetId ? { ...item, isScrapped: newState } : item,
      );

      return {
        ...old,
        [scrapConfig.dataField]: updatedArray,
      };
    });
  };

  // 쿼리 키 생성 함수
  const getQueryKeys = () => {
    const detailKey = [scrapConfig.detailQueryKey, actualId];

    const listKeys = scrapConfig.listQueryKeys.map((key) =>
      postType === 'MARKET' || postType === 'CARDNEWS' ? [key] : [key, boardId],
    );

    return { detailKey, listKeys };
  };

  // 낙관적 업데이트를 적용하는 함수
  const applyOptimisticUpdate = (newState) => {
    const { detailKey, listKeys } = getQueryKeys();

    // 상세 페이지 쿼리 낙관적 업데이트
    updateDetailQuery(detailKey, newState);

    // 리스트 쿼리들 낙관적 업데이트
    listKeys.forEach((listKey) => {
      updateListQuery(listKey, actualId, newState);
    });
  };

  // 낙관적 업데이트를 롤백하는 함수
  const rollbackOptimisticUpdate = (originalState) => {
    const { detailKey, listKeys } = getQueryKeys();

    // 상세 페이지 쿼리 롤백
    updateDetailQuery(detailKey, originalState);

    // 리스트 쿼리들 롤백
    listKeys.forEach((listKey) => {
      updateListQuery(listKey, actualId, originalState);
    });
  };

  const { mutate: handleScrapToggle, isPending } = useMutation({
    mutationFn: async () => {
      const params = { [scrapConfig.idKey]: actualId };
      return state ? scrapConfig.deleteFn(params) : scrapConfig.addFn(params);
    },

    // 낙관적 업데이트
    onMutate: async () => {
      const newState = !state;
      const originalState = state;

      setOptimisticState(newState); // 낙관적 상태 업데이트
      applyOptimisticUpdate(newState); // 쿼리 캐시 낙관적 업데이트

      // 스낵바 미리 표시
      const text = newState
        ? ANIMATION_MESSAGES.SAVED
        : ANIMATION_MESSAGES.REMOVED;
      showSnackbar(text);

      // 롤백을 위한 컨텍스트 반환
      return { originalState };
    },

    onSuccess: () => {
      // 서버 응답을 기반으로 쿼리 무효화하여 최신 상태 동기화
      const { detailKey, listKeys } = getQueryKeys();

      queryClient.invalidateQueries({ queryKey: detailKey });
      listKeys.forEach((listKey) => {
        queryClient.invalidateQueries({ queryKey: listKey });
      });
    },

    onError: (error, _, context) => {
      console.error('Scrap mutation error:', error);

      // 에러 발생 시 낙관적 업데이트 롤백
      if (context?.originalState !== undefined) {
        setOptimisticState(context.originalState);
        rollbackOptimisticUpdate(context.originalState);
      }

      showSnackbar('작업 중 오류가 발생했습니다.', { type: 'error' });
    },
  });

  const handleScrapClick = (e) => {
    e.stopPropagation();

    // 이미 처리 중이면 중복 클릭 방지
    if (isPending) return;

    handleScrapToggle();
  };

  // 렌더링에는 낙관적 상태 사용
  const Component = optimisticState ? ActiveScrap : Scrap;
  const ariaLabel = optimisticState ? ARIA_LABELS.UNSCRAP : ARIA_LABELS.SCRAP;

  return (
    <Component
      className={cn('cursor-pointer transition-opacity', className, {
        'text-neutral-border-40': optimisticState,
      })}
      onClick={handleScrapClick}
      role="button"
      aria-label={ariaLabel}
      aria-disabled={isPending}
      {...props}
    />
  );
};
