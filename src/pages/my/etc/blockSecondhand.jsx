import Logo from '@/assets/imgs/kampusLogo.svg?react';

export const BlockSecondhand = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-full w-full -translate-y-10 flex-col items-center justify-center gap-2">
        <Logo className="w-32 text-neutral-disabled" />
        <span className="text-center text-neutral-border-40">
          You don&apos;t have blocked any users yet.
        </span>
      </div>
    </div>
  );
};
