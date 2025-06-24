import { addComment } from '@/apis/comment/addComment.api';
import { deleteComment } from '@/apis/comment/deleteComment.api';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const useHandleComment = ({ setInput }) => {
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const mutate = useMutation({
    //  true -> 댓글 추가 , false -> 댓글 삭제
    mutationFn: ({ type, param, data = null }) =>
      type
        ? addComment({ postId: param, data: data })
        : deleteComment({ commentId: param }),
    onSuccess: (_, { type }) => {
      if (type) {
        setInput('');
      }
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_COMMENT_LIST, postId],
      });
    },
  });
  return mutate;
};
