import { postWritePost } from '@/apis/board/postWritePost.api';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const usePostPost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutate = useMutation({
    mutationFn: (newPost) => postWritePost({ data: newPost }),
    onSuccess: (response) => {
      const createdPostId = response.postId;
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_LIST, { postId: createdPostId }],
      });
      navigate(`../${createdPostId}`, {
        replace: true,
      });
    },
  });

  return mutate;
};
