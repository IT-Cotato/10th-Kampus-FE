import { useState } from 'react';
import { TitleHeader } from '@/components/common/titleHeader';
import { Toggle } from '@/components/common/toggle';

export const Notification = () => {
  const [isToggled1, setIsToggled1] = useState(false); // 고정값 수정해야함
  const [isToggled2, setIsToggled2] = useState(false); // 고정값 수정해야함
  const [isToggled3, setIsToggled3] = useState(false); // 고정값 수정해야함
  const [isToggled4, setIsToggled4] = useState(false); // 고정값 수정해야함
  const [isToggled5, setIsToggled5] = useState(false); // 고정값 수정해야함

  const handleClickMessageNotificationToggle = (e) => {
    setIsToggled1(e.target.checked);
    console.log(!isToggled1);
  };

  const handleClickCommentNotificationToggle = (e) => {
    setIsToggled2(e.target.checked);
    console.log(!isToggled2);
  };

  const handleClickRelyNotificationToggle = (e) => {
    setIsToggled3(e.target.checked);
    console.log(!isToggled3);
  };

  const handleClickPopularNotificationToggle = (e) => {
    setIsToggled4(e.target.checked);
    console.log(!isToggled4);
  };
  const handleClickAdvertisingNotificationToggle = (e) => {
    setIsToggled5(e.target.checked);
    console.log(!isToggled5);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <TitleHeader text="Notification & Information Agreements"></TitleHeader>
      <div className="flex h-full w-full flex-col gap-12 px-4 py-[.625rem]">
        <div className="flex text-neutral-base">
          Turn on the notification, you can check the popularity right away!
        </div>
        <div className="flex flex-col gap-[1.875rem]">
          <div className="flex flex-col gap-[1.25rem]">
            <div className="text-subTitle">Notification</div>
            <div className="flex flex-col gap-7">
              <div className="flex h-full w-full flex-row items-center justify-between gap-10">
                <div>Message notification</div>
                <Toggle
                  id="message"
                  checked={isToggled1}
                  onChange={handleClickMessageNotificationToggle}
                />
              </div>
              <div className="flex h-full w-full flex-row items-center justify-between gap-10">
                <div>Comment notification</div>
                <Toggle
                  id="comment"
                  checked={isToggled2}
                  onChange={handleClickCommentNotificationToggle}
                />
              </div>
              <div className="flex h-full w-full flex-row items-center justify-between gap-10">
                <div>Comment reply notification</div>
                <Toggle
                  id="reply"
                  checked={isToggled3}
                  onChange={handleClickRelyNotificationToggle}
                />
              </div>
              <div className="flex h-full w-full flex-row items-center justify-between gap-10">
                <div>Popular article notification</div>
                <Toggle
                  id="popular"
                  checked={isToggled4}
                  onChange={handleClickPopularNotificationToggle}
                />
              </div>
            </div>
            <div className="text-subTitle">Privacy & Consent</div>
            <div className="flex flex-col gap-7">
              <div className="flex h-full w-full flex-row items-center justify-between gap-10">
                <div>Consent to receive and use advertising information</div>
                <Toggle
                  id="advertising"
                  checked={isToggled5}
                  onChange={handleClickAdvertisingNotificationToggle}
                />
              </div>
              <button type="button" className="flex">
                Terms of use
              </button>
              <button type="button" className="flex">
                Privacy Policy
              </button>
              <div>v 0.0.0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
