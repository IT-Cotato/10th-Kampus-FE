import UserInput from '@/components/common/UserInput';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { RoomHeader } from '@/components/chat/RoomHeader';
import { MessageModal } from '@/components/chat/MessageModal';
import { useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { postReadMessage, postChatImage } from '@/apis/chat/messages.api';
import { INPUT_TYPE } from '@/constants/inputType';
import MessageBubble from './MessageBubble';
import { ErrorWrapper } from '../common/error/SuspenseFallback';
import { ApiFallback } from '@/components/common/error/ApiErrorBoundary'; // <-- New import
import { getErrorPayload } from '@/utils/errorHandler';
import BackButton from '../common/BackButton';

export const ChatRoom = ({
  chatroomId,
  setChatroomId,
  sendMessage,
  messages,
  setMessages,
}) => {
  const [input, setInput] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(false);
  const [files, setFiles] = useState([]);
  const scrollContainerRef = useRef(null);

  const chatRoomSpecificFallback = ({ error, resetErrorBoundary }) => {
    const { code = 'UNKNOWN_ERROR' } = getErrorPayload(error);

    if (code === 'PRODUCT-001' || code === 'POST-001') {
      return (
        <div>
          <div className="flex h-14 flex-row items-center justify-between border-b-[.0313rem] border-neutral-border-30 p-4">
            <BackButton
              onClick={() => {
                setChatroomId(null);
                setMessages([]);
              }}
            />
          </div>
          <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl mb-3 font-extrabold text-primary-red">
              게시글을 찾을 수 없습니다.
            </h2>
            <p className="mb-4 text-base text-neutral-80">
              삭제되었거나 존재하지 않는 게시글입니다.
            </p>
          </div>
        </div>
      );
    }
    return <ApiFallback resetErrorBoundary={resetErrorBoundary} />;
  };

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

  //채팅 메시지 읽음 처리
  useEffect(() => {
    if (messages.length) {
      chatsRead();
    }
  }, [chatroomId, chatsRead, messages.length]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  // 메시지 useMemo로 정렬 관리
  const sortedMessages = useMemo(() => {
    return messages.slice().sort((a, b) => a.id - b.id);
  }, [messages]);

  // 파일 데이터 변경 핸들러
  const handleImagesChange = useCallback((newFiles) => {
    setFiles(newFiles);
  }, []);

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

  const handleClickMessage = useCallback((senderId) => {
    setSelectedMessage(senderId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMessage(false);
  }, []);

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <div className="flex-shrink-0">
          <ErrorWrapper fallbackRender={chatRoomSpecificFallback}>
            <RoomHeader
              chatroomId={chatroomId}
              setChatroomId={setChatroomId}
              setMessages={setMessages}
            />
          </ErrorWrapper>
        </div>
        <div
          className="min-h-0 flex-1 overflow-y-auto p-4 pb-20"
          ref={scrollContainerRef}
        >
          <div className="flex flex-col">
            {sortedMessages.length > 0 ? (
              sortedMessages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  onMessageClick={handleClickMessage}
                />
              ))
            ) : (
              <p className="mx-auto text-neutral-border-40">Empty</p>
            )}
          </div>
        </div>
      </div>
      <UserInput
        type={INPUT_TYPE.CHAT}
        placeholder="메시지를 입력하세요"
        input={input}
        setInput={setInput}
        handleSend={handleSendMessage}
        onImagesChange={handleImagesChange}
      />
      {selectedMessage && <MessageModal onClose={handleCloseModal} />}
    </>
  );
};
