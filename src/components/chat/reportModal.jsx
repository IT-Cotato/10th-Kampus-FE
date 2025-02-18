import { Modal } from '@/components/common/Modal';

export const reportModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return <Modal title="Successfully report" onClose={onClose}></Modal>;
};
