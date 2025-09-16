import { deleteChatroom } from '@/apis/chat/chatRoom.api';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteChatroom = ({ chatroomId, onSuccess }) => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: [QUERY_KEYS.DELETE_CHAT_ROOM, chatroomId],
    mutationFn: ({ chatroomId }) => deleteChatroom({ chatroomId }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHAT_LIST] });
      onSuccess?.(data, variables, context);
    },
    enabled: !!chatroomId,
  });

  return mutate;
};
