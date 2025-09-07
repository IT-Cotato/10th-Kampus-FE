import React, { memo } from 'react';
import { cn } from '@/utils/cn';

const MessageBubble = ({ message, onMessageClick }) => {
  const handleClick = () => {
    onMessageClick(message.senderId);
  };

  return (
    <div
      className={cn('mb-4 flex', {
        'justify-end': message.isMine,
        'justify-start': !message.isMine,
      })}
    >
      <div
        onClick={handleClick}
        className={cn('max-w-[70%] cursor-pointer rounded-lg p-3', {
          'bg-primary-30 text-white': message.isMine,
          'bg-neutral-bg-5': !message.isMine,
        })}
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
  );
};

export default memo(MessageBubble);
