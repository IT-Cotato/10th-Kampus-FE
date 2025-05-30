import { FilterBox } from '@/components/board/FilterBox';
import { PostHeader } from '@/components/board/PostHeader';
import { WriteButton } from '@/components/board/write/WriteButton';
import { Loading } from '@/components/common/Loading';
import { MarketList } from '@/components/market/MarketList';
import { useGetMarketCategory } from '@/state/query/market/useGetMarketGategory';
import { useState } from 'react';

export const Market = () => {
  const sortOptions = ['All', 'Newest', 'Registered', 'Popularity']; // 정렬 기준은 고정
  const [sortOrder, setSortOrder] = useState('All'); // 선택된 정렬 기준 값
  const [category, setCategory] = useState('All'); // 선택된 카테고리 값
  const postList = {
    posts: [
      {
        postId: 1,
        title: '인형',
        price: 30000,
        likes: 10,
        chats: 0,
        state: 'RESERVED',
        thumbnailUrl: 'src/assets/imgs/bg1.png',
        isScrapped: true,
        createdTime: '2025-04-27 02:56:52',
      },
      {
        postId: 2,
        title: '인형',
        price: 20000,
        likes: 10,
        chats: 0,
        state: 'ACTIVE',
        thumbnailUrl: 'src/assets/imgs/bg2.png',
        isScrapped: false,
        createdTime: '2025-04-27 02:56:52',
      },
    ],
  };

  const { data: categoryData } = useGetMarketCategory();

  const isPostLoading = false;
  const isPostError = false;

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
          {isPostError && <p>Error Data Loading</p>}
          {!isPostLoading &&
            !isPostError &&
            (postList.posts?.length > 0 ? (
              postList.posts.map((item) => (
                <MarketList key={item.postId} data={item} />
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
