import Pin from '@/assets/imgs/pin.svg?react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { generateBoardTitle } from '@/utils/boardTitleUtils';
export const BoardList = ({ data, listKey, index, togglePin }) => {
  const navigate = useNavigate();
  // title에서 URL 뽑기
  // 예시: Tips for living in Korea -> Tips-for-living-in-Korea
  const navURL = generateBoardTitle(data.title);
  return (
    <div className="flex items-center gap-4 px-4 py-4">
      <Pin
        className={cn('h-5 w-5 cursor-pointer', {
          'text-neutral-80': data.pin,
          'text-neutral-icon': !data.pin,
        })}
        onClick={() => togglePin(listKey, index)}
      />
      <p
        className="w-full cursor-pointer text-base text-neutral-80"
        onClick={() => navigate(`${navURL}`)}
      >
        {data.title}
      </p>
    </div>
  );
};
