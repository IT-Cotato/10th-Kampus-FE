import { patchSaveDraft } from '@/apis/board/handleSaveDraft.api';
import { postWriteDraft } from '@/apis/board/postWritePost.api';
import { QUERY_KEYS } from '@/constants/api';
import { PATH } from '@/routes/path';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const usePatchDraft = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (draft, { postDraftId }) =>
      patchSaveDraft({ data: draft, postDraftId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_DRAFT_ID],
      });
    },
  });

  return mutate;
};

export const usePostDraft = ({ boardId, postDraftId }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutate = useMutation({
    mutationFn: (newPost) => postWriteDraft({ postDraftId, data: newPost }),
    onSuccess: (response) => {
      const createdPostId = response.postId;
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_LIST, { postId: createdPostId }],
      });
      navigate(`${PATH.BOARD.BASE}/${boardId}/${createdPostId}`, {
        replace: true,
      });
    },
  });

  return mutate;
};
