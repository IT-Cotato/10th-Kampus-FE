import { ArticleInfo } from '@/components/chat/articleInfo';
import { NoticeBox } from '@/components/common/noticeBox';
import { TitleHeader } from '@/components/common/titleHeader';
import { UserInput } from '@/components/common/userInput';
import { cn } from '@/utils/cn';
import { useState } from 'react';
// import { useParams } from 'react-router-dom';

export const ChatId = () => {
  const dummyData = {
    currentUserId: 1,
    messages: [
      {
        chatRoomId: 1,
        senderId: 1,
        content: 'ㅇㅇㅇ',
        isRead: false,
        isMine: true,
      },
      {
        chatRoomId: 1,
        senderId: 2,
        content: '안녕',
        isRead: false,
        isMine: false,
      },
      // ...생략,
    ],
    hasNext: true,
  };
  const [input, setInput] = useState('');

  // const chatRoomId = useParams();
  // 초기메시지 GET
  // const { data, error, isLoading } = useQuery({
  //   queryKey: [QUERY_KEYS.GET_CHAT_LIST],
  //   queryFn: () => getChatMessages(chatRoomId, 1),
  // });

  const [messages, setMessages] = useState([]);

  //메시지 전송
  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: input, sender: 'user' },
      ]);
      setInput('');
    }
  };

  return (
    <div className="h-full w-full">
      <TitleHeader text={dummyData.postName} />
      <ArticleInfo
        boardName={dummyData.boardName}
        postName={dummyData.postName}
        postId={dummyData.postID}
      />
      <div className="px-4">
        <NoticeBox />
        <div className="flex flex-1 flex-col">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn('mb-2 max-w-60 rounded-lg p-2', {
                'self-end rounded-tr-none bg-primary-base text-white':
                  message.sender === 'user',
                'self-start rounded-bl-none bg-neutral-bg-10 text-neutral-title':
                  message.sender !== 'user',
              })}
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
    </div>
  );
};
