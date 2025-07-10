import { path } from '@/routes/path';
import { useNavigate } from 'react-router-dom';
import notification from '@/assets/imgs/notification.svg';
import notification_true from '@/assets/imgs/notification_true.svg';

export const NotificationButton = ({ isNotification }) => {
  const navigate = useNavigate();
  return (
    <button
      className="cursor-pointer"
      onClick={() => navigate(path.notificationList)}
    >
      <img
        src={isNotification ? notification_true : notification}
        alt="notification button"
        className="h-6 w-5"
      />
    </button>
  );
};
