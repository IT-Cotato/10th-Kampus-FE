import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';
import { getPostDetail } from '@/apis/board/handlePost.api';
import { useParams } from 'react-router-dom';

export const useGetPost = () => {
  const { postId } = useParams();
  const query = useQuery({
    queryFn: () => getPostDetail({ postId: postId }),
    queryKey: [QUERY_KEYS.GET_POST_DETAIL, postId],
    select: (res) => res.postDetails,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
  return query;
};
