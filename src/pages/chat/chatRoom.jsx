import { ArticleInfo } from '@/components/chat/articleInfo';
import { NoticeBox } from '@/components/common/noticeBox';
import { UserInput } from '@/components/common/userInput';
import { cn } from '@/utils/cn';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RoomHeader } from '@/components/chat/roomHeader';
import { MessageModal, PRESS_TYPE } from '@/components/chat/messageModal';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getChatMessages } from '@/apis/chat/messages.api';
import { getChatRoom } from '@/apis/chat/chatRoom.api';
import { getUserDetail } from '@/apis/auth/login.api';
import { useWebsocket } from '@/hooks/use-websocket.jsx';

export const ChatRoom = () => {
  const [input, setInput] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(false);
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const chatRoomId = useParams();

  const { subscribeToChatRoom, sendMessage, disconnect } = useWebsocket();

  // 초기메시지 GET
  const { data: messageData } = useQuery({
    queryKey: [QUERY_KEYS.GET_CHAT_LIST],
    queryFn: () => getChatMessages({ chatRoomId, page }),
  });

  //방 정보
  const { data: roomData } = useQuery({
    queryKey: [QUERY_KEYS.GET_CHAT_LIST],
    queryFn: () => getChatRoom({ chatRoomId }),
  });

  //userId
  const { data: userId } = useQuery({
    queryKey: [QUERY_KEYS.GET_CHAT_LIST],
    queryFn: () => getUserDetail(),
  });

  useEffect(() => {
    if (messageData) {
      setMessages(messageData.messages);
    }
    //구독
    subscribeToChatRoom(chatRoomId, userId?.data.id, setMessages);

    return () => {
      disconnect();
    };
  }, [messageData, chatRoomId, userId]);

  //메시지 전송
  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage({ chatRoomId, input });
      setInput('');
    }
  };

  const handleClickMessage = (senderId) => {
    setSelectedMessage(senderId);
  };

  return (
    <div className="w-full h-full">
      <RoomHeader text={roomData.data.postTitle} />
      <ArticleInfo
        boardName={roomData.data.boardName}
        postName={roomData.data.postTitle}
        postId={roomData.data.postId}
      />
      <div className="px-4">
        <NoticeBox />
        <div className="flex flex-col flex-1">
          {messages.map((message, index) => (
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
          ))}
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
