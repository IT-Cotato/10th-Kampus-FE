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
    <div className="flex flex-col w-full h-full">
      <TitleHeader text="Notice" />
      <div className="flex flex-col items-center w-full gap-5 px-4 pt-10 pb-7">
        <div className="flex flex-col w-full border-b border-primary-20 gap-[.625rem] pb-5">
          <span className="text-subTitle text-neutral-title">
            {Notice.title}
          </span>
          <span className="inline-block text-neutral-border-50 text-small">{Notice.date}</span>
        </div>
        <div className='text-neutral-base'>{Notice.content}</div>
      </div>
    </div>
  );
};
