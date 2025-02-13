import { ButtonRound } from '@/components/common/ButtonRound';
import { Modal } from '@/components/common/Modal';

export const BlockModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  //   block query api 요청 추가 예정

  return (
    <Modal title="Block this chat room?" onClose={onClose}>
      <div className="flex flex-col items-center justify-center gap-8">
        <p className="text-center">
          All receiving and sending
          <br />
          messages will be blocked.
          <br />
          You can unblock them on My page.
        </p>
        <div className="flex gap-4">
          <ButtonRound text={'Cancel'} theme="border" onClick={onClose} />
          <ButtonRound text={'Block'} />
        </div>
      </div>
    </Modal>
  );
};
