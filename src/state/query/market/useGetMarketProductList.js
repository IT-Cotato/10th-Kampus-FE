import { getMarketProductList } from '@/apis/market/getMarketProductList.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetMarketProductList = ({
  pageParam = 1,
  sortKey,
  category,
}) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.GET_MARKET_PRODUCT_LIST, sortKey, category],
    queryFn: () =>
      getMarketProductList({
        page: pageParam,
        sort: sortKey,
        categoryName: category === 'All' ? '' : category,
      }),
  });
  return query;
};
