import { Modal } from '@/components/common/Modal';

export const ReloadModal = ({ onClose, handleReload }) => {
  return (
    <Modal
      title="Would you like to reload the draft?"
      children={`If you reload the draft,\nthe text you wrote will disappear.`}
      onClose={onClose}
      leftButton="Cancel"
      onClickLeft={onClose}
      rightButton="Reload"
      onClickRight={handleReload}
    ></Modal>
  );
};
