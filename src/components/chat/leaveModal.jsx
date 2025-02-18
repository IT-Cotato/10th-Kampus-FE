import { ButtonRound } from '@/components/common/ButtonRound';
import { Modal } from '@/components/common/Modal';
import { path } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

export const LeaveModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;
  // Leave query api 요청 추가 예정

  return (
    <Modal
      title="Would you like to leave 
the chat room?"
      onClose={onClose}
    >
      <div className="flex items-center justify-center gap-8">
        <ButtonRound text={'Cancel'} theme="border" onClick={onClose} />
        <ButtonRound
          text={'Leave'}
          onClick={() => {
            navigate(path.chatList.base);
          }}
        />
      </div>
    </Modal>
  );
};
