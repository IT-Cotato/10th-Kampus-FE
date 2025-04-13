import Pin from '@/assets/imgs/pin.svg?react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
export const BoardList = ({ data, listKey, index, togglePin }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-start gap-4 px-4 py-4">
      <Pin
        className={cn('h-6 w-6 cursor-pointer', {
          'text-primary-base': data.pin,
          'text-primary-20': !data.pin,
        })}
        onClick={() => togglePin(listKey, index, data.order)}
      />
      <div className="flex h-fit w-full flex-col gap-2 leading-tight">
        <p
          className="line-clamp-1 w-full cursor-pointer text-base text-neutral-80"
          onClick={() => navigate(`${data.order}`)}
        >
          {data.title}
        </p>
        <p className="line-clamp-1 w-full text-small text-neutral-border-50">
          {data.description}
        </p>
      </div>
    </div>
  );
};
