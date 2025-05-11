import AlertExclamationMark from '@/assets/imgs/AlertExclamationMark.svg?react';

export const InputWarningText = ({
  children = 'Please fill in the blank.',
}) => {
  return (
    <div className="flex items-center gap-1 text-small text-primary-red">
      <AlertExclamationMark className="text-primary-red" /> {children}
    </div>
  );
};
