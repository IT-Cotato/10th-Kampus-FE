import Logo from '@/assets/imgs/icon/kampus-logo.svg?react';
import { FilterBox } from '@/components/board/FilterBox';
import { PostHeader } from '@/components/board/PostHeader';
import { WriteButton } from '@/components/board/write/WriteButton';
import { Loading } from '@/components/common/Loading';
import { MarketList } from '@/components/market/MarketList';
import { useGetMarketCategory } from '@/state/query/market/useGetMarketCategory';
import { useGetMarketProductList } from '@/state/query/market/useGetMarketProductList';
import { useEffect, useState, useRef, useCallback } from 'react';

export const Market = () => {
  const sortOptions = ['All', 'Newest', 'Registered', 'Popularity']; // 정렬 기준은 고정
  const [sortOrder, setSortOrder] = useState('All'); // 선택된 정렬 기준 값
  const [category, setCategory] = useState('All'); // 선택된 카테고리 값
  const [sortKey, setSortKey] = useState('recent');

  // 프론트 -> 백 통신 전 변환
  const getSortKey = (option) => {
    switch (option) {
      case 'All':
      case 'Newest':
        return 'recent';
      case 'Registered':
        return 'old';
      case 'Popularity':
        return 'scrapCount';
      default:
        return 'recent';
    }
  };

  useEffect(() => {
    setSortKey(getSortKey(sortOrder));
  }, [sortOrder]);

  const observerRef = useRef();
  const isObserving = useRef(false); // 관찰 상태 추적

  const { data: categoryData } = useGetMarketCategory();
  const {
    data,
    isPending: isPostLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMarketProductList({ sortKey, category });

  const productList = data?.pages?.flatMap((page) => page.items) || [];

  // useCallback으로 함수 최적화 및 중복 호출 방지
  const lastProductRef = useCallback(
    (node) => {
      // 로딩 중이거나 이미 관찰 중이면 리턴
      if (isPostLoading || isFetchingNextPage || isObserving.current) return;

      // 기존 observer 정리
      if (observerRef.current) {
        observerRef.current.disconnect();
        isObserving.current = false;
      }

      // 노드가 존재할 때만 새 observer 생성
      if (node) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            // 교차 상태이고, 다음 페이지가 있고, 현재 로딩 중이 아닐 때만 실행
            if (
              entry.isIntersecting &&
              hasNextPage &&
              !isFetchingNextPage &&
              !isPostLoading
            ) {
              fetchNextPage();
            }
          },
          {
            threshold: 0.1,
            rootMargin: '100px', // rootMargin을 늘려서 조금 더 일찍 로드
          },
        );

        observerRef.current.observe(node);
        isObserving.current = true;
      }
    },
    [hasNextPage, isFetchingNextPage, isPostLoading, fetchNextPage],
  );

  // 컴포넌트 언마운트 시 observer 정리
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // 필터 변경 시 observer 리셋
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      isObserving.current = false;
    }
  }, [sortKey, category]);

  return (
    <div className="flex flex-1">
      <PostHeader />
      <div className="flex h-full w-full flex-1 flex-col pt-14">
        <div className="fixed z-10 flex w-full max-w-lg gap-[0.875rem] bg-white px-[1.125rem] pb-4 pt-[.875rem]">
          {categoryData && (
            <FilterBox
              content={'Category'}
              dropList={['All', ...categoryData]}
              select={(selected) => setCategory(selected)}
              selected={category}
            />
          )}
          <FilterBox
            content={'Sort by'}
            dropList={sortOptions}
            select={(selected) => setSortOrder(selected)}
            selected={sortOrder}
          />
        </div>
        {isPostLoading && (
          <div className="flex h-full w-full flex-1 items-center justify-center">
            <Loading />
          </div>
        )}
        {!isPostLoading && productList.length === 0 && (
          <div className="flex h-full w-full -translate-y-10 flex-col items-center justify-center gap-2">
            <Logo className="w-32 text-neutral-disabled" />
            <span className="text-center text-neutral-border-40">
              Be the first to trade your stuffs!
            </span>
          </div>
        )}
        {!isPostLoading && (
          <div className="flex w-full flex-1 flex-col divide-y overflow-y-auto bg-white px-4 pt-[3.25rem]">
            {productList.length > 0 &&
              productList.map((item, index) => {
                if (index === productList.length - 1) {
                  return (
                    <div key={item.productId} ref={lastProductRef}>
                      <MarketList data={item} />
                    </div>
                  );
                }
                return <MarketList key={item.productId} data={item} />;
              })}
            {isFetchingNextPage && (
              <div className="flex justify-center py-4">
                <Loading />
              </div>
            )}
          </div>
        )}
        <WriteButton />
      </div>
    </div>
  );
};
