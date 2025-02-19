import Logo from '@/assets/imgs/kampusLogo.svg?react';

export const SecondhandScrap = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col items-center justify-center w-full h-full gap-2 -translate-y-10">
        <Logo className="w-32 text-neutral-disabled" />
        <span className="text-center text-neutral-border-40">
          There's nothing you've scraped!
          <br />
          Try saving your interest:)
        </span>
      </div>
    </div>
  );
};
