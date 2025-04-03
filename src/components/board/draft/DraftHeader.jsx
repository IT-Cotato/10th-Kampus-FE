import X from '@/assets/imgs/x.svg?react';
import { useNavigate } from 'react-router-dom';

export const DraftHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="grid h-fit w-full grid-cols-3 items-center px-4 pb-3 pt-4">
      <button type="button">
        <X
          className="h-6 w-6 p-1 text-neutral-title"
          onClick={() => navigate(-1)}
        />
      </button>
      <span className="flex justify-center text-pageTitle text-neutral-title">
        Draft
      </span>
      <button
        type="button"
        className="flex cursor-pointer justify-end text-neutral-border-50"
      >
        Edit
      </button>
    </header>
  );
};
