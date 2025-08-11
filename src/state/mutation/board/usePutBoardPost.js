import { putBoardPost } from '@/apis/board/putBoardPost';
import { QUERY_KEYS } from '@/constants/api';
import { PATH } from '@/routes/path';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

export const usePutBoardPost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { boardId, postId } = useParams();

  const mutate = useMutation({
    mutationFn: ({ postId, data }) => putBoardPost({ postId, data }),
    onSuccess: () => {
      // 글 수정 후 post refetch
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_DETAIL, postId],
      });
      navigate(`${PATH.BOARD.BASE}/${boardId}/${postId}`, {
        replace: true,
      });
    },
    onError: (error) => {
      const message =
        error.response.data.message ||
        error.message ||
        'An error occured while posting.\nPlease try again.';
      alert(message);
    },
  });
  return mutate;
};
