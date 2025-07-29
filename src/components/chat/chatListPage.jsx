import { NoticeBox } from '@/components/common/noticeBox';
import { ListItem } from '@/components/chat/listItem';
import { useState } from 'react';
import { ChatType } from '@/components/chat/ChatType';

export const ChatList = ({
  onChatRoomSelect,
  chatList,
  onChatRoomLeave,
  onTypeChange,
}) => {
  const [activeSlide, setActiveSlide] = useState(null);

  const handleClickOutside = () => {
    setActiveSlide(null);
  };

  return (
    <div
      className="relative flex h-full w-full flex-col gap-4 p-4"
      onClick={handleClickOutside}
    >
      <div className="text-title text-neutral-title">Chats</div>
      <NoticeBox />
      <ChatType onTypeChange={onTypeChange} />
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
            }}
            onChatRoomLeave={onChatRoomLeave}
          />
        ))
      )}
    </div>
  );
};
