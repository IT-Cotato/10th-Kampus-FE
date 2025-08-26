import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';
import { getMyScrapedProducts } from '@/apis/mypage/getMyScraps.api';

export const useGetMarketScrapList = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.MY_SCRAPED_PRODUCT_LIST],
    queryFn: () => getMyScrapedProducts({ page: 1, size: 10 }),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
  return query;
};
