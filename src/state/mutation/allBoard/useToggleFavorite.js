import {
  addBoardFavorite,
  deleteBoardFavorite,
} from '@/apis/board/toggleBoardFavorite.api';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleFavorite = ({
  showPinSuccessSnackbar,
  showUnpinSuccessSnackbar,
}) => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: ({ boardId, isPinned }) =>
      isPinned
        ? deleteBoardFavorite({ boardId })
        : addBoardFavorite({ boardId }),

    onSuccess: (_, variables) => {
      if (variables.isPinned) {
        showUnpinSuccessSnackbar();
      } else {
        showPinSuccessSnackbar();
      }
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PUBLIC_BOARD_LIST],
      });
    },
  });
  return mutate;
};
