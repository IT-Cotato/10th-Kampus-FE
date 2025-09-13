import { getMarketProductList } from '@/apis/market/getMarketProductList.api';
import { QUERY_KEYS } from '@/constants/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetMarketProductList = ({ sortKey, category }) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_MARKET_PRODUCT_LIST, sortKey, category],
    queryFn: ({ pageParam = 1 }) =>
      getMarketProductList({
        page: pageParam,
        sort: sortKey,
        categoryName: category === 'All' ? '' : category,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length + 1 : undefined,
  });
};
