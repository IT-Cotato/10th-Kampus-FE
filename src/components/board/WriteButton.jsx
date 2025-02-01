import { useNavigate } from 'react-router-dom';
import Pencil from '@/assets/imgs/pencil.svg'

export const WriteButton = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="fixed flex items-center py-2 px-[1.875rem] bg-primary-base rounded-full text-white shadow-[.1875rem_.1875rem_.25rem_0rem_rgba(0,0,0,0.2)] cursor-pointer bottom-9 left-1/2 -translate-x-1/2 gap-[.375rem]"
      onClick={() => navigate('./write')}
    >
      <span>Write</span>
      <img src={Pencil} alt="" className='w-4 h-4'/>
    </button>
  );
};
