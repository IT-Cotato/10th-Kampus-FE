import { ArticleInfo } from '@/components/chat/articleInfo';
import { NoticeBox } from '@/components/common/noticeBox';
import { UserInput } from '@/components/common/userInput';
import { cn } from '@/utils/cn';
import { useEffect, useState } from 'react';
import { RoomHeader } from '@/components/chat/roomHeader';
import { MessageModal, PRESS_TYPE } from '@/components/chat/messageModal';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getChatRoom } from '@/apis/chat/chatRoom.api';
import { Loading } from '@/components/common/Loading';
import { useWebsocket } from '@/hooks/use-websocket';
import { getChatMessages } from '@/apis/chat/messages.api';

export const ChatRoom = ({ chatroomId, setChatroomId }) => {
  const [input, setInput] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(false);
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);

  const { sendMessage, subscribeToChatRoom } = useWebsocket(setMessages);

  //방 정보
  const { data: roomData, isLoading: isRoomLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_CHAT_ROOM, chatroomId],
    queryFn: () => getChatRoom({ chatroomId }),
    enabled: chatroomId,
  });

  //채팅방 메시지 초기내역
  const { data: messageData } = useQuery({
    queryKey: [QUERY_KEYS.GET_CHAT_LIST, chatroomId],
    queryFn: () => getChatMessages({ chatroomId, page }),
    enabled: !!chatroomId,
  });

  //채팅메시지 데이터
  useEffect(() => {
    if (chatroomId) {
      messageData();
      const allMessages = [...(messageData?.messages || []), ...messages];
      setMessages(allMessages);
    }
  }, [chatroomId, messageData]);

  //메시지 전송
  const handleSendMessage = () => {
    if (input && input.trim()) {
      sendMessage(chatroomId, input.trim());
      setInput('');
    }
  };

  const handleClickMessage = (senderId) => {
    setSelectedMessage(senderId);
  };

  if (isRoomLoading) {
    return <Loading />;
  }

  return (
    <div className="h-full w-full">
      <RoomHeader text={roomData.postTitle} setChatroomId={setChatroomId} />
      <ArticleInfo
        boardName={roomData.boardName}
        postName={roomData.postTitle}
        postId={roomData.postId}
        boardId={roomData.boardId}
      />
      <div className="mt-4 px-4">
        <NoticeBox />
        <div className="flex flex-1 flex-col">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={cn('mb-2 max-w-60 select-none rounded-lg p-2', {
                  'self-end rounded-tr-none bg-primary-base text-white':
                    message.isMine,
                  'self-start rounded-bl-none bg-neutral-bg-10 text-neutral-title':
                    !message.isMine,
                })}
                onClick={() => handleClickMessage(message.senderId)}
              >
                {message.text}
              </div>
            ))
          ) : (
            <p className="mx-auto text-neutral-border-40">Empty</p>
          )}
        </div>
      </div>
      <UserInput
        placeholder={'Type a message'}
        input={input}
        setInput={setInput}
        handleSend={handleSendMessage}
        type={'chat'}
      />
      {selectedMessage && (
        <MessageModal
          onClose={() => setSelectedMessage(false)}
          type={PRESS_TYPE.message}
        />
      )}
    </div>
  );
};
