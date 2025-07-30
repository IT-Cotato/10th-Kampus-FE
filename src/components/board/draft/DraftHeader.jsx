import X from '@/assets/imgs/x.svg?react';
import { useNavigate } from 'react-router-dom';

export const DraftHeader = ({ isEditMode, setIsEditMode }) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 z-10 grid h-fit w-full max-w-[512px] grid-cols-3 items-center bg-white px-4 pb-3 pt-4">
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
        onClick={() => setIsEditMode((prev) => !prev)}
      >
        {isEditMode ? 'Done' : 'Edit'}
      </button>
    </header>
  );
};
