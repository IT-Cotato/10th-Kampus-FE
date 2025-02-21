import { postApproveStudentVerifications, postRejectStudentVerifications } from '@/apis/admin/postStudentVerifications.api';
import bg1 from '@/assets/imgs/bg1.png';
import { ButtonRound } from '@/components/common/ButtonRound';
import { QUERY_KEYS } from '@/constants/api';
import { cn } from '@/utils/cn';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const StudentVerifications = () => {
  const navigate = useNavigate();
  const { verificationRecordId } = useParams();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [reason, setReason] = useState('');

  const { mutate: rejectVerification } = useMutation({
    mutationFn: (id) => postRejectStudentVerifications({ verificationRecordId : id }),
    onSuccess: () => {
      navigate(-1);
    },
    onError: (error) => {
      alert('저장 실패');
    },
  });

  const { mutate: approveVerification } = useMutation({
      mutationFn: (id) => postApproveStudentVerifications({ verificationRecordId : id }),
      onSuccess: () => {
        navigate(-1);
      },
      onError: (error) => {
        alert('저장 실패');
      },
    });

  const handleClickSave = (verificationRecordId) => {
    if (selectedStatus === 'approve') {
      approveVerification(verificationRecordId);
    } else {
      rejectVerification(verificationRecordId);
    }
  }

  const disabled =
    !selectedStatus || (selectedStatus === 'reject' && reason === '');

  return (
    <div className="flex flex-col flex-1 gap-5 px-5">
      <div className="grid items-center w-full h-full grid-cols-2 gap-5 p-8 bg-white rounded-2xl">
        <img src={bg1} className="w-full h-auto" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-subTitle text-neutral-title">학교: {}</h1>
          <div className="flex justify-center gap-6">
            <ButtonRound
              text="승인"
              theme={selectedStatus === 'approve' ? 'APPROVED' : 'border'}
              onClick={() => setSelectedStatus('approve')}
            />
            <ButtonRound
              text="반려"
              theme={selectedStatus === 'reject' ? 'REJECTED' : 'border'}
              onClick={() => setSelectedStatus('reject')}
            />
          </div>
          <textarea
            cols={3}
            rows={10}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className={cn('h-full w-full resize-none rounded-xl border p-4', {
              'text-neutral-disabled': selectedStatus !== 'reject',
            })}
            disabled={selectedStatus !== 'reject'}
          />
          <ButtonRound
            text="저장"
            theme={disabled ? 'disabled' : 'primary'}
            disabled={disabled}
            onClick={() => {
              handleClickSave(verificationRecordId);
            }}
          />
        </div>
      </div>
    </div>
  );
};
