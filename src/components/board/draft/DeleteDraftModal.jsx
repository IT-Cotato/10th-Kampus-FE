import { Modal } from '@/components/common/Modal';

export const DeleteAllDraftModal = ({ total, onClose, deleteAll }) => {
  let POST = 'posts';
  if (total === 1) {
    POST = 'post';
  }
  return (
    <Modal
      title="Delete all draft posts"
      children={`Would you like to delete all ${total} draft ${POST}? Deleted ${POST} cannot be recovered.`}
      onClose={onClose}
      leftButton="Cancel"
      onClickLeft={onClose}
      rightButton="Delete all"
      onClickRight={deleteAll}
    ></Modal>
  );
};

export const DeleteSelectedDraftModal = ({
  total,
  onClose,
  deleteSelected,
}) => {
  let POST = 'posts';
  if (total === 1) {
    POST = 'post';
  }
  return (
    <Modal
      title="Delete selected draft posts"
      children={`Would you like to delete all ${total} draft ${POST}? Deleted ${POST} cannot be recovered.`}
      onClose={onClose}
      leftButton="Cancel"
      onClickLeft={onClose}
      rightButton="Delete"
      onClickRight={deleteSelected}
    ></Modal>
  );
};
