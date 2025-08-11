import Pin from '@/assets/imgs/pin.svg?react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
export const BoardList = ({ data, listKey, index, togglePin }) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full items-start gap-4 p-4">
      <Pin
        className={cn('h-6 w-6 shrink-0 cursor-pointer', {
          'text-primary-base': data.pin,
          'text-primary-10': !data.pin,
        })}
        onClick={() => togglePin(listKey, index, data.order)}
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
