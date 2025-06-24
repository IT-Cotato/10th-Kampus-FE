import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';
import { getComment } from '@/apis/comment/getComment.api';
import { useParams } from 'react-router-dom';

export const useGetComment = () => {
  const { postId } = useParams();
  const query = useQuery({
    queryFn: () => getComment({ postId: postId }),
    queryKey: [QUERY_KEYS.GET_COMMENT_LIST, postId],
  });
  return query;
};
