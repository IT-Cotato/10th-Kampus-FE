import { postChatroom } from '@/apis/chat/chatRoom.api';
import { QUERY_KEYS } from '@/constants/api';
import { PATH } from '@/routes/path';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const usePostChatroom = ({ type, referenceId }) => {
  const navigate = useNavigate();

  const mutate = useMutation({
    mutationKey: [QUERY_KEYS.POST_CHAT_ROOM],
    mutationFn: () => postChatroom({ type, referenceId }),
    onSuccess: () => {
      navigate(PATH.CHAT_LIST.BASE);
    },
    onError: (error) => {
      if (error.response.data.code === 'CHAT-002') {
        navigate(PATH.CHAT_LIST.BASE);
      }
    },
  });
  return mutate;
};
