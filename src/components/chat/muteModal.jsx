import { Modal } from '@/components/common/Modal';

export const MuteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return <Modal title="Successfully muted" onClose={onClose}></Modal>;
};
