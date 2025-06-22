import { getPostDetail } from '@/apis/board/handlePost.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const useGetBoardPost = () => {
  const { postId } = useParams();

  const query = useQuery({
    queryFn: () => getPostDetail({ postId }),
    queryKey: [QUERY_KEYS.GET_POST_DETAIL, postId],
    select: (res) => res.postDetails,
    enabled: !!postId,
  });
  return query;
};
