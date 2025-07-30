import Logo from '@/assets/imgs/kampusLogo.svg?react';

export const SecondhandScrap = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-full w-full -translate-y-10 flex-col items-center justify-center gap-2">
        <Logo className="w-32 text-neutral-disabled" />
        <span className="text-center text-neutral-border-40">
          There&apos;s nothing you&apos;ve scraped!
          <br />
          Try saving your interest:)
        </span>
      </div>
    </div>
  );
};
