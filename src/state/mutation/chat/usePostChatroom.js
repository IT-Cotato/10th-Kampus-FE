import { postChatroom } from '@/apis/chat/chatRoom.api';
import { QUERY_KEYS } from '@/constants/api';
import { path } from '@/routes/path';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const usePostChatroom = ({ type, referenceId }) => {
  const navigate = useNavigate();

  const mutate = useMutation({
    mutationKey: [QUERY_KEYS.POST_CHAT_ROOM],
    mutationFn: () => postChatroom({ type, referenceId }),
    onSuccess: () => {
      navigate(path.chatList.base);
    },
    onError: (error) => {
      if (error.response.data.code === 'CHAT-002') {
        navigate(path.chatList.base);
      }
    },
  });
  return mutate;
};
