import { ArticleInfo } from '@/components/chat/articleInfo';
import { NoticeBox } from '@/components/common/noticeBox';
import { TitleHeader } from '@/components/common/titleHeader';
import { UserInput } from '@/components/common/userInput';
import { cn } from '@/utils/cn';
import { useState } from 'react';

export const ChatId = () => {
  const dummyData = {
    boardName: 'boardname',
    postName: 'postname',
    postID: '1',
  };

  const [input, setInput] = useState('');

  //message, sender 등 조건은 websoket 연결시 제거할 것
  const [messages, setMessages] = useState([]);

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
      />
    </div>
  );
};
