import { ArticleInfo } from '@/components/chat/articleInfo';
import { NoticeBox } from '@/components/common/noticeBox';
import { UserInput, InputTypes } from '@/components/common/userInput';
import { cn } from '@/utils/cn';
import { useEffect, useState, useRef } from 'react';
import { RoomHeader } from '@/components/chat/roomHeader';
import { MessageModal, PRESS_TYPE } from '@/components/chat/messageModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getChatRoom } from '@/apis/chat/chatRoom.api';
import { Loading } from '@/components/common/Loading';
import { postReadMessage } from '@/apis/chat/messages.api';

export const ChatRoom = ({
  chatroomId,
  setChatroomId,
  sendMessage,
  messages,
  setMessages,
}) => {
  const [input, setInput] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(false);
  const [dataDelete, setDataDelete] = useState(false);
  const [files, setFiles] = useState([]);
  const messagesEndRef = useRef(null);

  //방 정보
  const { data: roomData, isLoading: isRoomLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_CHAT_ROOM, chatroomId],
    queryFn: () => getChatRoom({ chatroomId }),
    enabled: !!chatroomId,
  });

  //읽음처리
  const { mutate: chatsRead } = useMutation({
    mutationKey: [QUERY_KEYS.POST_CHAT_READ],
    mutationFn: () => postReadMessage({ chatroomId }),
    onSuccess: () => {
      console.log('🚨✨ 읽음처리 전송');
    },
  });

  //채팅메시지 데이터
  useEffect(() => {
    if (roomData) {
      //게시글 삭제된 경우
      if (roomData.postId === -1) {
        setDataDelete(true);
      } else {
        setDataDelete(false);
      }
    }
    //채팅 읽음 처리
    chatsRead();
  }, [chatroomId, roomData, setMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 파일 데이터 변경 핸들러
  const handleImagesChange = (newFiles) => {
    setFiles(newFiles);
  };

  //메시지 전송
  const handleSendMessage = (text) => {
    if (!text && files.length === 0) return;

    //웹소켓 사용 - 이미지 : 서버 반영 후 구현
    if (input && input.trim()) {
      // sendMessage(chatroomId, input.trim());
      // files 데이터 전송
      sendMessage(chatroomId, text, files);
      setFiles([]);
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
    <div className="flex flex-col h-screen">
      <RoomHeader
        text={!dataDelete ? roomData.postTitle : '삭제된 게시글입니다.'}
        setChatroomId={setChatroomId}
        setMessages={setMessages}
      />
      <ArticleInfo
        boardName={!dataDelete ? roomData.boardName : '삭제된 게시글입니다.'}
        postName={!dataDelete ? roomData.postTitle : '삭제된 게시글입니다.'}
        postId={!dataDelete ? roomData.postId : '삭제된 게시글입니다.'}
        boardId={!dataDelete ? roomData.boardId : '삭제된 게시글입니다.'}
        dataDelete={dataDelete}
      />
      <div className="flex-1 p-4 overflow-y-auto">
        <NoticeBox />
        <div className="flex flex-col flex-1">
          {messages.length > 0 ? (
            messages
              .slice()
              .sort((a, b) => a.id - b.id)
              .map((message, index) => (
                <div
                  key={index}
                  className={cn('mb-4 flex', {
                    'justify-end': message.isMine,
                    'justify-start': !message.isMine,
                  })}
                >
                  <div
                    className={cn('max-w-[70%] rounded-lg p-3', {
                      'bg-primary-30 text-white': message.isMine,
                      'bg-neutral-bg-5': !message.isMine,
                    })}
                    onClick={() => handleClickMessage(message.senderId)}
                  >
                    {message.content}
                    {/* 시간 필요함 */}
                  </div>
                </div>
              ))
          ) : (
            <p className="mx-auto text-neutral-border-40">Empty</p>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>
      <UserInput
        type={InputTypes.CHAT}
        placeholder="메시지를 입력하세요"
        input={input}
        setInput={setInput}
        handleSend={handleSendMessage}
        onImagesChange={handleImagesChange}
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
