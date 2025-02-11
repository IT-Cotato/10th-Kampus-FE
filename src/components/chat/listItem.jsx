import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { NewMsgCnt } from '@/components/chat/newMsgCnt';
import DefaultProfile from '@/assets/imgs/defaultProfile.svg';
import blockIcon from '@/assets/imgs/blockIcon.svg';
import leaveIcon from '@/assets/imgs/leaveIcon.svg';
import { touchDrag } from '@/utils/touchDrag';

export const ListItem = ({ data, isSlide, setActiveSlide }) => {
  const [startX, setStartX] = useState(0);
  const itemRef = useRef(null);
  const navigate = useNavigate();

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    touchDrag(startX, currentX, setActiveSlide, data);
  };

  return (
    <div className="mb-[1.25rem] flex h-[3.875rem]">
      <div
        ref={itemRef}
        className={cn(
          'flex h-full w-full justify-between gap-[1.25rem] transition-transform duration-300',
          {
            '-translate-x-[110px]': isSlide,
            'transliate-x-0': !isSlide,
          },
        )}
        onClick={() => navigate(`./${data.id}`)}
        onTouchStart={(e) => setStartX(e.touches[0].clientX)}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => {
          if (!isSlide) {
            setActiveSlide(null);
          }
        }}
      >
        <img src={data.profile || DefaultProfile} alt="user profile" />
        <div className="flex w-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="w-[14.375rem] text-subTitle text-neutral-title">
              {data.name}
            </p>
            <p className="text-small text-neutral-border-50">{data.time}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="w-[14.375rem] text-base text-neutral-base">
              {data.lastMessage}
            </p>
            {data.cnt > 0 && <NewMsgCnt cnt={data.cnt.toString()} />}
          </div>
        </div>
      </div>
      <div
        className={cn(
          'absolute right-0 flex items-center justify-center text-white transition-transform duration-300',
          {
            'translate-x-0': isSlide,
            'translate-x-full': !isSlide,
          },
        )}
      >
        {/* 각 요소 클릭 시 모달 오픈 */}
        <div className="flex h-[3.875rem] w-[55px] flex-col items-center justify-center bg-primary-yellow py-4">
          <img src={blockIcon} alt="block" />
          Block
        </div>
        <div className="flex h-[3.875rem] w-[55px] flex-col items-center justify-center bg-primary-red p-4">
          <img src={leaveIcon} alt="leave" />
          Leave
        </div>
      </div>
    </div>
  );
};
