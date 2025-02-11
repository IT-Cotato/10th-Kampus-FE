import { TitleHeader } from '@/components/common/titleHeader';

export const MyArticle = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <TitleHeader text="My Article"></TitleHeader>
      <div className="flex h-full w-full flex-col p-4"></div>
    </div>
  );
};
