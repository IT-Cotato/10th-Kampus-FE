import { cn } from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';

export const VerificationCodeModal = (props) => {
  const [code, setCode] = useState(Array(4).fill(''));
  const [verify, setVerify] = useState({
    verify: true,
    change: true,
  });
  const codeRefs = useRef([]);
  const validateButtonRef = useRef(null);

  const handleInputChange = (index, value) => {
    const regex = /^[0-9]$/;
    if (!regex.test(value)) return;

    const updatedCode = [...code];
    updatedCode[index] = value;
    setCode(updatedCode);

    setVerify((prev) => {
      return { ...prev, change: true };
    });

    if (value) {
      // 입력값이 있고 마지막 칸이 아니면 옆칸으로 이동
      if (index < codeRefs.current.length - 1) {
        codeRefs.current[index + 1].focus();
      } else if (index === codeRefs.current.length - 1) {
        validateButtonRef.current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (['e', 'E', '+', '-', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
    }

    if (e.key === 'Backspace') {
      const updatedCode = [...code];
      if (code[index] === '' && index > 0) {
        codeRefs.current[index - 1].focus();
        updatedCode[index - 1] = '';
      } else {
        updatedCode[index] = '';
      }

      setCode(updatedCode);
    } else if (
      e.key === 'Enter' &&
      code.every((input) => input.trim() !== '')
    ) {
      handleValidate();
    } else if (e.key == 69) {
      return false;
    }
  };

  const handlePaste = (e) => {
    e.preventDefault(); // 기본 동작 방지
    const pasteData = e.clipboardData.getData('text').trim().slice(0, 4); // 최대 4글자만 처리
    const updatedCode = [...code];

    let nextFocusIndex = 0;

    for (let i = 0; i < pasteData.length; i++, nextFocusIndex++) {
      if (/^[0-9]$/.test(pasteData[i])) {
        // 숫자인 경우만 처리
        updatedCode[nextFocusIndex] = pasteData[i];
        setCode(updatedCode);
      } else {
        nextFocusIndex--;
      }
    }

    codeRefs.current[nextFocusIndex - 1]?.focus();
  };

  const handleValidate = () => {
    console.log(code.join(''));
    setVerify({ verify: false, change: false });
  };

  const handleResend = () => {
    props.resend(); // 코드 재전송
    setCode(Array(4).fill(''));
    setVerify({ verify: true, change: true });
    codeRefs.current[0].focus();
  }

  useEffect(() => {
    codeRefs.current[0]?.focus(); // 첫 번째 input에 포커스 설정

    // 스크롤 막기
    document.body.style.overflow = 'hidden';

    return () => {
      // 컴포넌트가 언마운트될 때 원래 상태로 복구
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="max-w-lg mx-auto min-h-dvh w-full h-full overflow-x-hidden overflow-y-auto bg-[rgba(11,11,11,0.6)] fixed flex z-[100] justify-center items-center align-middle">
      <dialog className="relative z-[200] flex flex-col items-center justify-center bg-white border pt-[1.875rem] pb-4 gap-7 mx-4 rounded-[.625rem] px-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center w-full text-center align-middle text-subTitle">
            {props.title}
          </div>
          {verify.verify ? (
            <div className="text-center text-neutral-base">{props.text}</div>
          ) : (
            <div className="text-center text-primary-red">
              {props.warningText}
            </div>
          )}
        </div>
        {/* 코드 입력칸 */}
        <div className="flex flex-row items-center gap-5">
          {code.map((value, index) => (
            <input
              key={index}
              type="number"
              maxLength={1}
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              ref={(el) => (codeRefs.current[index] = el)}
              className={cn(
                'w-14 h-14 p-1 text-center border rounded-[.625rem] text-pageTitle',
                {
                  'border-primary-base': value,
                  'border-neutral-disabled': !value,
                  'border-primary-red': !verify.verify && !verify.change,
                },
              )}
            />
          ))}
        </div>
        {/* 버튼 */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4">
            <button
              type="button"
              onClick={props.onClickLeft}
              className="border rounded-[1.875rem] py-[.625rem] px-[1.375rem] min-w-[7.625rem]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleValidate}
              className={cn(
                'rounded-[1.875rem] text-white py-[.625rem] px-[1.375rem] min-w-[7.625rem]',
                {
                  'bg-primary-base': code.every((input) => input.trim() !== ''),
                  'bg-neutral-disabled': !code.every(
                    (input) => input.trim() !== '',
                  ),
                },
              )}
              ref={validateButtonRef}
            >
              Validate
            </button>
          </div>
          <div className="flex flex-row justify-center gap-1 text-small">
            <span className="text-neutral-base">Didn't get the code?</span>
            <button
              type="button"
              className="text-primary-40"
              onClick={handleResend}
            >
              Resend
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
