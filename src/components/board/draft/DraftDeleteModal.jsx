import { Modal } from '@/components/common/Modal';

export const DraftDeleteModal = ({
  total,
  onClose,
  onConfirm,
  type = 'all',
}) => {
  const POST = total === 1 ? 'post' : 'posts';
  const title =
    type === 'all' ? 'Delete all draft posts' : 'Delete selected draft posts';

  const rightButton = type === 'all' ? 'Delete all' : 'Delete';

  return (
    <Modal
      title={title}
      children={`Would you like to delete ${type === 'all' ? 'all' : 'the selected'} ${total} draft ${POST}? Deleted ${POST} cannot be recovered.`}
      onClose={onClose}
      leftButton="Cancel"
      onClickLeft={onClose}
      rightButton={rightButton}
      onClickRight={onConfirm}
    />
  );
};
