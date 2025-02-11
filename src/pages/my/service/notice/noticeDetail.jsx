import { TitleHeader } from '@/components/common/titleHeader';
import { useNavigate, useParams } from 'react-router-dom';

export const NoticeDetail = () => {
  const { noticeId } = useParams();

  const Notice = {
    id: 0,
    title: 'Very very very very very very long title of notice',
    date: '2025.02.05',
    content:
      'Lorem ipsum dolor sit amet consectetur. Tortor dictumst nam tortor diam semper lorem ut. Facilisis ultrices diam amet cursus. Malesuada sed feugiat ridiculus nunc ultrices pellentesque tellus et velit. Nisi id consectetur elementum malesuada scelerisque ut auctor lacus quis. Quam mattis magna ut nullam. Aliquam facilisis nulla convallis a varius eget velit mattis dui. Arcu curabitur faucibus montes donec. At elit quisque ipsum luctus nunc. Cursus vestibulum id fringilla egestas commodo. Lorem ipsum dolor sit amet consectetur. Tortor dictumst nam tortor diam semper lorem ut. Facilisis ultrices diam amet cursus. Malesuada sed feugiat ridiculus nunc ultrices pellentesque tellus et velit. Nisi id consectetur elementum malesuada scelerisque ut auctor lacus quis. Quam mattis magna ut nullam. Aliquam facilisis nulla convallis a varius eget velit mattis dui. Arcu curabitur faucibus montes donec. At elit quisque ipsum luctus nunc. Cursus vestibulum id fringilla egestas commodo.',
  };

  return (
    <div className="flex h-full w-full flex-col">
      <TitleHeader text="Notice" />
      <div className="flex w-full flex-col items-center gap-5 px-4 pb-7 pt-10">
        <div className="flex w-full flex-col gap-[.625rem] border-b border-primary-20 pb-5">
          <span className="text-subTitle text-neutral-title">
            {Notice.title}
          </span>
          <span className="inline-block text-small text-neutral-border-50">
            {Notice.date}
          </span>
        </div>
        <div className="text-neutral-base">{Notice.content}</div>
      </div>
    </div>
  );
};
