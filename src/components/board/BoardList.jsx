import Pin from '@/assets/imgs/icon/pin.svg?react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
export const BoardList = ({
  data,
  listKey,
  index,
  togglePin,
  isPinnable = false,
}) => {
  const navigate = useNavigate();
  const handlePinClick = () => {
    if (!isPinnable) return; // 핀 고정이 불가능한 경우 클릭 이벤트 무시
    togglePin(listKey, index, data.order);
  };
  return (
    <div className="flex w-full items-start gap-4 p-4">
      <Pin
        className={cn('h-6 w-6 shrink-0 cursor-pointer', {
          'text-primary-base': data.pin,
          'text-primary-10': !data.pin,
        })}
        onClick={handlePinClick}
      />
      <div className="flex h-fit w-full flex-col gap-1 leading-tight">
        <p
          className="text-neutral-90 line-clamp-1 w-full cursor-pointer text-base"
          onClick={() => navigate(`${data.order}`)}
        >
          {data.title}
        </p>
        <p className="line-clamp-1 text-small text-neutral-border-50">
          {data.description}
        </p>
      </div>
    </div>
  );
};
