import InputRadio from '@/components/common/inputRadio';
import MainButton from '@/components/common/MainButton';
import { TitleHeader } from '@/components/common/titleHeader';
import { useState } from 'react';

export const DeleteAccount = () => {
  const Reasons = [
    { id: 0, text: 'Studying abroad in Korea is over'},
    { id: 1, text: 'Too much advertising' },
    { id: 2, text: 'Too many errors' },
    { id: 3, text: 'Hard to use' },
    { id: 4, text: 'Other' },
  ];

  const [selected, setSelected] = useState('');
  const [additionalText, setAdditionalText] = useState('');

  const handleDeleteAccountClick = () => {
    // 추후 백엔드와 연동
    if (selected === 'Other') {
      console.log(selected + ': ' + additionalText);
    } else {
      console.log(selected);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <TitleHeader text="Delete Account"></TitleHeader>
      <div className="flex flex-col w-full h-full px-4 py-[1.875rem]">
        <div className="text-subTitle">Why are you leaving Kampus?</div>
        <div className="text-neutral-base mt-[1.875rem]">
          We’re sorry to see you go! We’d love to know why you want to delete
          your account, so we can improve the app and support our community.
        </div>
        <div className="flex flex-col text-subTitle mb-[1.875rem]">
          {Reasons.map((item) => (
            <InputRadio
              item={item}
              name="reasonLeaving"
              selected={selected}
              setSelected={setSelected}
              placeholder="Please let us know why you're leaving Kampus. Your feedback helps us improve."
              key={item.id}
              setAdditionalText={setAdditionalText}
            />
          ))}
        </div>
        <MainButton
          disabled={
            !selected ||
            !(
              (selected === 'Other' && additionalText !== '') ||
              selected !== 'Other'
            )
          }
          onClick={handleDeleteAccountClick}
        >
          Delete Account
        </MainButton>
      </div>
    </div>
  );
};
