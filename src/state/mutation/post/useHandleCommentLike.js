import {
  addCommentLike,
  deleteCommentLike,
} from '@/apis/comment/toggleCommentLike.api';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const useHandleCommentLike = () => {
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const mutate = useMutation({
    //  true -> 댓글 좋아요 추가 , false -> 댓글 좋아요 삭제
    mutationFn: ({ type, commentId }) =>
      !type
        ? addCommentLike({ commentId: commentId })
        : deleteCommentLike({ commentId: commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_COMMENT_LIST, postId],
      });
    },
  });
  return mutate;
};
