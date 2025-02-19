import { NoticeBox } from '@/components/common/noticeBox';
import { ListItem } from '@/components/chat/listItem';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getChatList } from '@/apis/chat/chatList.api';

export const ChatList = ({ onChatRoomSelect }) => {
  const [activeSlide, setActiveSlide] = useState(null);
  const [chatList, setChatList] = useState([]);

  const {
    data: chatListData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_CHAT_LIST],
    queryFn: () => getChatList(1),
  });

  //채팅리스트 데이터
  useEffect(() => {
    if (chatListData) {
      setChatList(chatListData.chatRoomPreviewList || []);
    }
  }, [chatListData]);

  const handleClickOutside = () => {
    setActiveSlide(null);
  };

  return (
    <div
      className="relative flex flex-col w-full h-full gap-4 p-4"
      onClick={handleClickOutside}
    >
      <div className="text-title text-neutral-title">Chats</div>
      <NoticeBox />
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : chatList.length === 0 ? (
        <p className="mx-auto text-neutral-border-40">Empty</p>
      ) : (
        chatList.map((data) => (
          <ListItem
            key={data.chatroomId}
            data={data}
            isSlide={activeSlide === data.chatroomId}
            setActiveSlide={setActiveSlide}
            onClick={() => onChatRoomSelect(data.chatroomId)}
          />
        ))
      )}
    </div>
  );
};
