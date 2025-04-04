import { DraftBox } from '@/components/board/draft/DraftBox';
import { DraftHeader } from '@/components/board/draft/DraftHeader';

export const Draft = () => {
  return (
    <main className="flex w-full flex-1 flex-col">
      <DraftHeader />
      <section className="flex h-full w-full flex-col gap-6 px-4 py-2">
        <span className="flex text-neutral-border-50">Total 00</span>
        <ul className="flex flex-col divide-y-[0.5px]">
          <DraftBox />
          <DraftBox />
          <DraftBox />
        </ul>
      </section>
    </main>
  );
};
