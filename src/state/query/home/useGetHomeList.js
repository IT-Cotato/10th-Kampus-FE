import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getUniversity } from '@/apis/home/getUniversity.api';
import { getFavorite } from '@/apis/home/getFavorite.api';
import { getTrend } from '@/apis/home/getTrend.api';

// 내 대학 게시판
export const useGetHomeUniversityList = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_HOME_UNIVERISTY],
    queryFn: getUniversity,
    throwOnError: true,
  });
};

// 즐겨찾기
export const useGetHomeFavoriteList = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_HOME_FAVORITE],
    queryFn: getFavorite,
  });
};

// 트렌딩
export const useGetHomeTrendingList = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_HOME_TRENDING],
    queryFn: getTrend,
  });
};
