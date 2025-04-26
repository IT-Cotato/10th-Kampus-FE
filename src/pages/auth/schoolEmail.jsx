import { postSchoolEmailCodeSend } from '@/apis/auth/postSchoolEmailCode.api';
import { MainButton } from '@/components/common/MainButton';
import { SkipHeader } from '@/components/join/SkipHeader';
import { VerificationCodeModal } from '@/components/join/VerificationCodeModal';
import { QUERY_KEYS } from '@/constants/api';
import { useCheckSchoolStatus } from '@/hooks/useCheckSchoolStatus';
import { path } from '@/routes/path';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';

export const SchoolEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const university = location.state;

  const handleVerify = () => {
    setShowModal(true);
    sendVerificationCode();
  };

  const { mutate: sendSchoolEmailCode } = useMutation({
    mutationFn: (data) => postSchoolEmailCodeSend({ data: data }),
    mutationKey: [QUERY_KEYS.GET_SCHOOL_EMAIL_CODE_SEND],
    onSuccess: (response) => {
      setShowModal(true);
    },
  });

  const sendVerificationCode = () => {
    const data = {
      email: email,
      universityCode: university,
    };
    sendSchoolEmailCode(data);
  };

  const handleClickValidate = (code) => {
    const data = {
      email: email,
      universityCode: university,
      code: code,
    };
    return data;
  };

  const { data: status } = useCheckSchoolStatus();

  useEffect(() => {
    if (status === 'APPROVED' || status === 'PENDING') {
      navigate(`../../${path.home}`);
    }
    if (university === undefined) {
      navigate(`../${path.signup.school}`);
    }
  }, [status, university]);

  return (
    <div className="flex h-full w-full flex-col">
      <SkipHeader />
      <div className="flex flex-1 flex-col gap-10 px-4 py-5">
        <div className="flex flex-col gap-6">
          <div className="flex w-full justify-center text-pageTitle">
            How will you verify your school?
          </div>
          <div className="flex justify-center text-center text-neutral-base">
            Write down your school email adress
          </div>
          <input
            type="email"
            className="w-full border-b border-neutral-base placeholder-neutral-border-50"
            placeholder="School email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <MainButton onClick={handleVerify} disabled={!email}>
            Send Verification Code
          </MainButton>
          {showModal &&
            createPortal(
              <VerificationCodeModal
                title="Verifiy your Email"
                text={`We just sent a code to ${email}. Please enter the code we sent to your email.`}
                warningText={`That's not a valid verification code. Please try again.`}
                leftButton="Cancel"
                rightButton="Validate"
                onClickLeft={() => setShowModal(false)}
                onClickRight={handleClickValidate}
                resend={sendVerificationCode}
              />,
              document.getElementById('modal-root'),
            )}
        </div>
      </div>
    </div>
  );
};
