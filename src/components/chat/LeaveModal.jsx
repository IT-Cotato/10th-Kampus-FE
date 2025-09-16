import { Modal } from '@/components/common/Modal';

export const LeaveModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <Modal
      title="Would you like to leave the chat room?"
      onClose={onClose}
      leftButton="Cancel"
      onClickLeft={onClose}
      rightButton="Leave"
      onClickRight={onConfirm}
    ></Modal>
  );
};
