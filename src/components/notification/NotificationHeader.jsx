import prev from '@/assets/imgs/previous.svg';
import notificationDelete from '@/assets/imgs/notificationDelete.svg';
import menuBar from '@/assets/imgs/menubar.svg';
import { useNavigate } from 'react-router-dom';

export const NotificationHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed z-10 flex w-full max-w-[512px] items-center justify-between bg-white px-4 py-4">
      <button onClick={() => navigate(-1)}>
        <img src={prev} className="h-5 w-5 cursor-pointer" />
      </button>
      <p className="absolute left-1/2 -translate-x-1/2 transform whitespace-nowrap text-subTitle font-medium text-neutral-title">
        Notification
      </p>
      <div className="flex items-center justify-between gap-4">
        <button onClick={() => {}}>
          <img
            src={notificationDelete}
            className="h-[1.375rem] w-5 cursor-pointer"
          />
        </button>
        <button onClick={() => {}}>
          <img src={menuBar} className="h-5 w-4 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};
