import { getBoardCategories } from '@/apis/board/getBoardCategories.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const useGetBoardCategory = (state) => {
  const { boardId } = useParams();
  const query = useQuery({
    queryKey: [QUERY_KEYS.GET_BOARD_CATEGORIES, boardId],
    queryFn: () => getBoardCategories({ boardId }),
    select: (res) => [
      'All',
      ...res.categories.map((category) => category.categoryName),
    ],
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    enabled: state,
  });
  return query;
};

export const useGetBoardVanillaCategory = () => {
  const { boardId } = useParams();
  const query = useQuery({
    queryKey: [QUERY_KEYS.GET_BOARD_CATEGORIES, boardId],
    queryFn: () => getBoardCategories({ boardId }),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    enabled: !!boardId,
  });
  return query;
};
