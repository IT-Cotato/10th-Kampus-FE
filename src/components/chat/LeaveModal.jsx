import { Modal } from '@/components/common/Modal';
import { PATH } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

export const LeaveModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;
  // Leave query api 요청 추가 예정

  return (
    <Modal
      title="Would you like to leave the chat room?"
      onClose={onClose}
      leftButton="Cancel"
      onClickLeft={onClose}
      rightButton="Leave"
      onClickRight={() => navigate(PATH.CHAT_LIST.BASE)}
    ></Modal>
  );
};
