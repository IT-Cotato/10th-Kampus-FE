import Pin from '@/assets/imgs/icon/pin.svg?react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { BOARD_TYPE } from '@/constants/boardConstant';
import { PATH } from '@/routes/path';

export const BoardList = ({ data, listKey, index, togglePin, boardType }) => {
  const navigate = useNavigate();
  const handlePinClick = (e) => {
    e.stopPropagation();
    if (boardType !== BOARD_TYPE.NORMAL) return; // 핀 고정이 불가능한 경우 클릭 이벤트 무시
    togglePin(listKey, index, data.order);
  };

  const handleBoardClick = () => {
    if (boardType === BOARD_TYPE.TRENDING) {
      navigate(PATH.BOARD.SPECIFIC.TRENDING);
    } else {
      navigate(`${data.order}`);
    }
  };

  return (
    <div
      className="flex w-full cursor-pointer items-start gap-4 p-4"
      onClick={handleBoardClick}
    >
      <Pin
        className={cn('h-6 w-6 shrink-0 cursor-pointer', {
          'text-primary-base': data.pin,
          'text-primary-10': !data.pin,
        })}
        onClick={handlePinClick}
      />
      <div className="flex h-fit w-full flex-col gap-1 leading-tight">
        <p className="text-neutral-90 line-clamp-1 w-full cursor-pointer text-base">
          {data.title}
        </p>
        <p className="line-clamp-1 text-small text-neutral-border-50">
          {data.description}
        </p>
      </div>
    </div>
  );
};
