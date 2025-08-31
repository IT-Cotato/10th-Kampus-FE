import Logo from '@/assets/imgs/icon/kampus-logo.svg?react';
import { FilterBox } from '@/components/board/FilterBox';
import { PostHeader } from '@/components/board/PostHeader';
import { WriteButton } from '@/components/board/write/WriteButton';
import { Loading } from '@/components/common/Loading';
import { MarketList } from '@/components/market/MarketList';
import { useGetMarketCategory } from '@/state/query/market/useGetMarketCategory';
import { useGetMarketProductList } from '@/state/query/market/useGetMarketProductList';
import { useEffect, useState } from 'react';

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

  const { data: categoryData } = useGetMarketCategory();
  const { data: productList, isPending: isPostLoading } =
    useGetMarketProductList({ pageParam: 1, sortKey, category });

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
        {!isPostLoading && productList?.items.length === 0 && (
          <div className="flex h-full w-full -translate-y-10 flex-col items-center justify-center gap-2">
            <Logo className="w-32 text-neutral-disabled" />
            <span className="text-center text-neutral-border-40">
              Be the first to trade your stuffs!
            </span>
          </div>
        )}
        {!isPostLoading && (
          <div className="flex w-full flex-1 flex-col divide-y overflow-y-auto bg-white px-4 pt-[3.25rem]">
            {productList?.items?.length > 0 &&
              productList?.items.map((item) => (
                <MarketList key={item.productId} data={item} />
              ))}
          </div>
        )}
        <WriteButton />
      </div>
    </div>
  );
};
