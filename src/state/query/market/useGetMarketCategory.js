import { getMarketCategories } from '@/apis/market/getMarketCagtegories.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetMarketCategory = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.GET_MARKET_CATEGORIES],
    queryFn: () => getMarketCategories(),
    select: (res) => [
      ...(res.categoryInfos?.map((category) => category.categoryName) ?? []),
    ],
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
  return query;
};
