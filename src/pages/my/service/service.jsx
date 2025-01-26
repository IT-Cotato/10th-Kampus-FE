import { ButtonRound } from '@/components/common/ButtonRound';
import { TitleHeader } from '@/components/common/titleHeader';
import { FAQ } from '@/components/service/faq/faq';
import { InquiryList } from '@/components/service/inquiry/inquiryList';
import { Notice } from '@/components/service/notice';
import { useState } from 'react';

export const Service = () => {
  const [menuActive, setMenuActive] = useState(0);
  const menu = [
    { id: 0, text: 'FAQ' },
    { id: 1, text: '1:1 inquiry' },
    { id: 2, text: 'Notice' },
  ];
  return (
    <div>
      <TitleHeader text="Contact Us" />
      <div className=" mt-[3.125rem] gap-[0.625rem] flex justify-center mb-[1.875rem]">
        {menu.map((item) => (
          <ButtonRound
            key={item.id}
            theme={`${menuActive === item.id ? 'color' : 'base'}`}
            text={item.text}
            size="base"
            onClick={() => setMenuActive(item.id)}
          />
        ))}
      </div>
      {menuActive === 0 && <FAQ />}
      {menuActive === 1 && <InquiryList />}
      {menuActive === 2 && <Notice />}
    </div>
  );
};
