import { TitleHeader } from '@/components/common/titleHeader';
import { kampusGuide } from '@/constants/kampusGuide';

export const BoardGuide = () => {
  const emojiList = [
    '📝',
    '🗣️',
    '❓',
    'ℹ️',
    '🔥',
    '🇰🇷',
    '🏠',
    '💼',
    '💬',
    '🎉',
  ];

  return (
    <div className="flex h-full w-full flex-col">
      <TitleHeader text="Board guide" />
      <div className="h-full w-full px-4 pb-20 text-base leading-normal text-neutral-80">
        {kampusGuide.split('\n').map((line, index) => {
          const isEmojiLine = emojiList.some((emoji) => line.startsWith(emoji));
          if (line.trim() === '') return <br key={index} />;
          if (isEmojiLine) {
            return (
              <p key={index} className="mt-2">
                {line}
              </p>
            );
          }

          return (
            <p key={index} className="pl-4 before:mr-2 before:content-['•']">
              {line}
            </p>
          ); // 리스트 형식 적용
        })}
      </div>
    </div>
  );
};
