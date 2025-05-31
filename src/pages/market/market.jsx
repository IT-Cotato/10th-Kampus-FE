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
  const {
    data: productList,
    isPending: isPostLoading,
    isError: isPostError,
  } = useGetMarketProductList({ pageParam: 1, sortKey, category });

  return (
    <div className="flex flex-1">
      <PostHeader />
      <div className="flex flex-1 flex-col pt-14">
        <div className="z-10 flex w-full gap-[0.875rem] bg-white px-4 pt-5">
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
        <div className="flex w-full flex-1 flex-col divide-y bg-white px-4">
          {isPostLoading && <Loading />}
          {isPostError && <p>An error occured while loading</p>}
          {!isPostLoading &&
            !isPostError &&
            (productList?.items?.length > 0 ? (
              productList?.items.map((item) => (
                <MarketList key={item.productId} data={item} />
              ))
            ) : (
              <p className="flex flex-1 items-center justify-center text-small text-neutral-disabled">
                An empty page, waiting for your words!
              </p>
            ))}
        </div>
        <WriteButton />
      </div>
    </div>
  );
};
