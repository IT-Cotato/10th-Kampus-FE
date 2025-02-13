import { useNavigate } from 'react-router-dom';
import Pencil from '@/assets/imgs/pencil.svg';

export const WriteButton = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="fixed bottom-9 left-1/2 flex -translate-x-1/2 cursor-pointer items-center gap-[.375rem] rounded-full bg-primary-base px-[1.875rem] py-2 text-white shadow-[.1875rem_.1875rem_.25rem_0rem_rgba(0,0,0,0.2)]"
      onClick={() => navigate('./write')}
    >
      <span>Write</span>
      <img src={Pencil} alt="" className="h-4 w-4" />
    </button>
  );
};
