import { NoticeBox } from '@/components/common/noticeBox';
import { ListItem } from '@/components/chat/listItem';
import { useState } from 'react';
import { Loading } from '@/components/common/Loading';
import { useMutation } from '@tanstack/react-query';
import { postReadMessage } from '@/apis/chat/chatList.api';
import { QUERY_KEYS } from '@/constants/api';

export const ChatList = ({ onChatRoomSelect, chatList }) => {
  const [activeSlide, setActiveSlide] = useState(null);

  const handleClickOutside = () => {
    setActiveSlide(null);
  };

  const { mutate: chatsRead } = useMutation({
    mutationKey: [QUERY_KEYS.POST_CHAT_READ],
    mutationFn: (chatroomId) => postReadMessage({ chatroomId }),
  });

  return (
    <div
      className="relative flex h-full w-full flex-col gap-4 p-4"
      onClick={handleClickOutside}
    >
      <div className="text-title text-neutral-title">Chats</div>
      <NoticeBox />
      {chatList.length === 0 ? (
        <p className="mx-auto text-neutral-border-40">Empty</p>
      ) : (
        chatList.map((data) => (
          <ListItem
            key={data.chatroomId}
            data={data}
            isSlide={activeSlide === data.chatroomId}
            setActiveSlide={setActiveSlide}
            onClick={() => {
              onChatRoomSelect(data.chatroomId);
              chatsRead(data.chatroomId);
            }}
          />
        ))
      )}
    </div>
  );
};
