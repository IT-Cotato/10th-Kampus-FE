import { ArticleInfo } from '@/components/chat/articleInfo';
import { NoticeBox } from '@/components/common/noticeBox';
import { UserInput } from '@/components/common/userInput';
import { cn } from '@/utils/cn';
import { useEffect, useState } from 'react';
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
  const [page, setPage] = useState(1);
  const [dataDelete, setDataDelete] = useState(false);

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
      <div className="mt-4 px-4">
        <NoticeBox />
        <div className="flex flex-1 flex-col">
          {messages.length > 0 ? (
            messages
              .slice()
              .sort((a, b) => a.id - b.id)
              .map((message, index) => (
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
                  {message.content}
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
