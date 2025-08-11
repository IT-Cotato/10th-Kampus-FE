import { useNavigate, useParams } from 'react-router-dom';
import Pencil from '@/assets/imgs/icon/pencil.svg?react';
import { cn } from '@/utils/cn';

export const WriteButton = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const handleClickWrite = (e) => {
    e.stopPropagation();
    navigate('./write');
  };
  return (
    <button
      type="button"
      className={cn(
        'fixed left-1/2 z-10 flex h-fit -translate-x-1/2 cursor-pointer items-center gap-[.375rem] rounded-full bg-primary-base px-[1.875rem] py-2 text-white shadow-[.1875rem_.1875rem_.25rem_0rem_rgba(0,0,0,0.2)]',
        {
          'bottom-9': boardId,
          'bottom-[6.25rem]': !boardId,
        },
      )}
      onClick={handleClickWrite}
    >
      <span>Write</span>
      <Pencil className="h-4 w-4 text-white" />
    </button>
  );
};
