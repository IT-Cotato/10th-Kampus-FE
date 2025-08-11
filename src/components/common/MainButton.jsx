import { cn } from '@/utils/cn';

/**
 * @param {'primary' | 'white'} [variant='primary'] - 버튼의 스타일 종류
 * @param {boolean} [disabled=false] - 버튼의 비활성화 여부
 * @param {function} onClick - 버튼 클릭 시 실행될 함수
 * @param {React.ReactNode} children - 버튼 내부에 표시될 내용
 */

const VARIANT_MAP = {
  primary: {
    enabled: 'bg-primary-base text-white',
    disabled: 'border-0 bg-neutral-border-50 text-white',
  },
  white: {
    enabled: 'border border-primary-base bg-white text-primary-base',
    disabled: 'border border-neutral-border-40 bg-white text-neutral-border-40',
  },
};

export const MainButton = ({
  variant = 'primary',
  disabled = false,
  onClick,
  children,
}) => {
  const state = disabled ? 'disabled' : 'enabled';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'box-border h-[3.6875rem] w-full rounded-[.625rem] px-[1.125rem] !text-title-bold-16 transition-colors',
        VARIANT_MAP[variant][state],
        {
          'cursor-pointer': !disabled,
          'cursor-default': disabled,
        },
      )}
    >
      {children}
    </button>
  );
};
