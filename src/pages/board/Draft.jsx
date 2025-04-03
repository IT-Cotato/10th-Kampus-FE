import { DraftBox } from '@/components/board/draft/DraftBox';
import { DraftHeader } from '@/components/board/draft/DraftHeader';

export const Draft = () => {
  return (
    <main className="flex flex-1 flex-col">
      <DraftHeader />
      <section className="flex h-full w-full flex-col gap-6 px-4 py-6">
        <span className="flex text-neutral-border-50">Total 00</span>
        <ul>
          <DraftBox />
          <DraftBox />
          <DraftBox />
        </ul>
      </section>
    </main>
  );
};
