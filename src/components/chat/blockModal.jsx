import { Modal } from '@/components/common/Modal';

export const BlockModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  //   block query api 요청 추가 예정

  return (
    <Modal
      title="Block this chat room?"
      onClose={onClose}
      leftButton="Cancel"
      onClickLeft={onClose}
      rightButton="Block"
      onClickRight={onClose}
    >
      All receiving and sending messages will be blocked. You can unblock them
      on My Page.
    </Modal>
  );
};
