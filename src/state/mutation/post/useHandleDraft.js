import { patchSaveDraft } from '@/apis/board/handleSaveDraft.api';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchDraft = ({ draftId }) => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (draft) =>
      patchSaveDraft({ data: draft, postDraftId: draftId }),
    onSuccess: (response) => {
      setPostDraftId(response?.postDraftId);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_DRAFT_ID],
      });
    },
  });

  return mutate;
};

export const usePostDraft = ({ postDraftId }) => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (newPost) =>
      postWriteDraft({ postDraftId: postDraftId, data: newPost }),
    onSuccess: (response) => {
      const createdPostId = response.postId;
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_LIST] });
      navigate(`${path.board.base}/${boardId}/${createdPostId}`, {
        replace: true,
      });
    },
  });

  return mutate;
};
