import { Modal } from '@/components/common/Modal';

export const ReloadModal = ({ onClose, handleReload }) => {
  return (
    <Modal
      title="Would you like to reload the draft?"
      onClose={onClose}
      leftButton="Cancel"
      onClickLeft={onClose}
      rightButton="Reload"
      onClickRight={handleReload}
    >
      {`If you reload the draft,\nthe text you wrote will disappear.`}
    </Modal>
  );
};
