import { addPostLike, deletePostLike } from '@/apis/board/togglePostLike.api';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const useHandlePostLike = () => {
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const mutate = useMutation({
    //  true -> 좋아요 추가 , false -> 좋아요 삭제
    mutationFn: ({ type }) =>
      !type
        ? addPostLike({ postId: postId })
        : deletePostLike({ postId: postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_DETAIL, postId],
      });
    },
  });
  return mutate;
};
