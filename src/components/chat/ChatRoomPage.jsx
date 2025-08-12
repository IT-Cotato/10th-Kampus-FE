import { ArticleInfo } from '@/components/chat/ArticleInfo';
import { NoticeBox } from '@/components/common/NoticeBox';
import { UserInput } from '@/components/common/UserInput';
import { cn } from '@/utils/cn';
import { useEffect, useState, useRef, useMemo } from 'react';
import { RoomHeader } from '@/components/chat/RoomHeader';
import { MessageModal } from '@/components/chat/MessageModal';
import { useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { Loading } from '@/components/common/Loading';
import { postReadMessage, postChatImage } from '@/apis/chat/messages.api';
import { useGetChatroom } from '@/state/query/chat/useGetChatroom';
import { INPUT_TYPE } from '@/constants/inputType';
import { DELETED_POST_ID } from '@/constants/boardConstant';

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
  const { data: roomData, isLoading: isRoomLoading } = useGetChatroom({
    chatroomId,
  });

  //읽음처리
  const { mutate: chatsRead } = useMutation({
    mutationKey: [QUERY_KEYS.POST_CHAT_READ],
    mutationFn: () => postReadMessage({ chatroomId }),
    onSuccess: () => {
      console.log('🚨✨ 읽음처리 전송');
    },
  });

  //이미지 전송
  const { mutate: sendImage } = useMutation({
    mutationKey: [QUERY_KEYS.POST_CHAT_IMAGE],
    mutationFn: (files) => postChatImage({ chatroomId, images: files }),
    onSuccess: () => {
      console.log('🚨✨ 이미지 전송 완료');
      setFiles([]);
    },
  });

  //게시글 삭제 여부 체크
  useEffect(() => {
    if (roomData) {
      if (roomData.postId === DELETED_POST_ID) {
        setDataDelete(true);
      } else {
        setDataDelete(false);
      }
    }
  }, [roomData]);

  //채팅 메시지 읽음 처리
  useEffect(() => {
    if (messages.length) {
      chatsRead();
    }
  }, [chatroomId, chatsRead, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 메시지 useMemo로 정렬 관리
  const sortedMessages = useMemo(() => {
    return messages.slice().sort((a, b) => a.id - b.id);
  }, [messages]);

  // 파일 데이터 변경 핸들러
  const handleImagesChange = (newFiles) => {
    setFiles(newFiles);
  };

  //메시지 전송
  const handleSendMessage = () => {
    if (!input.trim() && files.length === 0) return;

    if (files.length > 0) {
      sendImage(files);
    } else if (input.trim()) {
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
    <div className="flex h-screen w-full flex-col">
      <RoomHeader
        text={!dataDelete ? roomData.postTitle : '삭제된 게시글입니다.'}
        setChatroomId={setChatroomId}
        setMessages={setMessages}
      />
      <ArticleInfo
        boardName={!dataDelete ? roomData.boardName : '삭제된 게시글입니다.'}
        postName={!dataDelete ? roomData.title : '삭제된 게시글입니다.'}
        postId={!dataDelete ? roomData.referenceId : '삭제된 게시글입니다.'}
        boardId={!dataDelete ? roomData.boardId : '삭제된 게시글입니다.'}
        dataDelete={dataDelete}
      />
      <div className="flex-1 overflow-y-auto p-4">
        <NoticeBox />
        <div className="flex flex-1 flex-col">
          {sortedMessages.length > 0 ? (
            sortedMessages.map((message, index) => (
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
                  {message.isImage ? (
                    <img
                      src={message.content}
                      alt="채팅 이미지"
                      className="max-w-full rounded-lg"
                    />
                  ) : (
                    message.content
                  )}
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
        type={INPUT_TYPE.CHAT}
        placeholder="메시지를 입력하세요"
        input={input}
        setInput={setInput}
        handleSend={handleSendMessage}
        onImagesChange={handleImagesChange}
      />
      {selectedMessage && (
        <MessageModal onClose={() => setSelectedMessage(false)} />
      )}
    </div>
  );
};
