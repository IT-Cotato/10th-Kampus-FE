import { postChatroom } from '@/apis/chat/chatRoom.api';
import { QUERY_KEYS } from '@/constants/api';
import { PATH } from '@/routes/path';
import { useChatStore } from '@/stores/useChatStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const usePostChatroom = ({ type, referenceId }) => {
  const navigate = useNavigate();
  const setActiveChatId = useChatStore((state) => state.setActiveChatId);

  const mutate = useMutation({
    mutationKey: [QUERY_KEYS.POST_CHAT_ROOM],
    mutationFn: () => postChatroom({ type, referenceId }),
    onSuccess: (data) => {
      setActiveChatId(data.chatRoomId);
      navigate(PATH.CHAT_LIST.BASE);
    },
    onError: (error) => {
      const errorData = error.response.data;
      if (errorData.code === 'CHAT-002') {
        setActiveChatId(errorData.existingChatRoomId);
        navigate(PATH.CHAT_LIST.BASE);
      }
    },
  });
  return mutate;
};
