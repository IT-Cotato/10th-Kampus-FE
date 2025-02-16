import { InputRadio } from '@/components/common/inputRadio';
import { MainButton } from '@/components/common/MainButton';
import { TitleHeader } from '@/components/common/titleHeader';
import { path } from '@/routes/path';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ChatReport = () => {
  const Reasons = [
    { id: 0, text: 'Bullying or unwanted contact' },
    { id: 1, text: 'Violence, hate or exploitation' },
    { id: 2, text: 'Self-harm or suicide' },
    { id: 3, text: 'Distribution of porn or sexual activities' },
    { id: 4, text: 'Pretending to be me or someone else' },
    { id: 5, text: 'Selling or promoting restricted items' },
    { id: 6, text: 'False information, Scam or spam' },
    { id: 7, text: 'Post that do not match the board' },
    { id: 8, text: 'Other' },
  ];

  const navigate = useNavigate();
  const [selected, setSelected] = useState('');
  const [additionalText, setAdditionalText] = useState('');
  // Report 버튼 누르면 api 호출, 성공 시 reportModal open

  return (
    <div className="w-full h-full">
      <TitleHeader text={'Report'} />
      <div className="mx-4">
        <div className="my-[1.875rem]">
          <h2 className="mb-[1.875rem] text-subTitle text-neutral-title">
            Why are you reporting this chat room?
          </h2>
          <p>
            Help us understand the problem.
            <br />
            Your report is anonymous.
          </p>
        </div>
        <div className="text-neutral-title">
          {Reasons.map((item) => (
            <InputRadio
              item={item}
              name="reasonChatReport"
              selected={selected}
              setSelected={setSelected}
              placeholder="Please leave the reason why you are reporting this chat room."
              key={item.id}
              setAdditionalText={setAdditionalText}
            />
          ))}
        </div>
        <div className="my-[1.875rem]">
          <MainButton
            onClick={() => {
              navigate(path.chatList.base);
            }}
          >
            Report
          </MainButton>
        </div>
      </div>
    </div>
  );
};
