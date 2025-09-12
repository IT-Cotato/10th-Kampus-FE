import { useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { NewMsgCnt } from '@/components/chat/NewMsgCnt';
import DefaultProfile from '@/assets/imgs/icon/default-profile.svg';
import blockIcon from '@/assets/imgs/icon/block.svg';
import leaveIcon from '@/assets/imgs/icon/leave.svg';
import { touchDrag } from '@/utils/touchDrag';
import { parseToDate, formatChatTime } from '@/utils/utcToKst';
import { useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { deleteChatroom } from '@/apis/chat/chatRoom.api';

export const ListItem = ({
  data,
  isSlide,
  setActiveSlide,
  onClick,
  onChatRoomLeave,
}) => {
  const [startX, setStartX] = useState(0);
  const itemRef = useRef(null);

  const { mutate: deleteChatroomId } = useMutation({
    mutationKey: [QUERY_KEYS.CHAT_LIST],
    mutationFn: (chatroomId) => deleteChatroom({ chatroomId }),
    onSuccess: () => {
      onChatRoomLeave(data.chatroomId);
    },
  });

  const time = parseToDate(data.lastChatTime);
  const lastChatDate = new Date(data.lastChatTime);
  const formatTime = formatChatTime(lastChatDate, time);

  return (
    <div className="mb-[1.25rem] flex h-[3.875rem]">
      <div
        ref={itemRef}
        className={cn(
          'flex h-full w-full justify-between gap-4 transition-transform duration-300',
          {
            '-translate-x-[110px]': isSlide,
            'translate-x-0': !isSlide,
          },
        )}
        onClick={onClick}
        onTouchStart={(e) => {
          setStartX(e.touches[0].clientX);
        }}
        onTouchMove={(e) => {
          const currentX = e.touches[0].clientX;
          touchDrag(startX, currentX, setActiveSlide, data);
          setActiveSlide(data.chatroomId);
        }}
        onTouchEnd={() => {
          if (!isSlide) {
            setActiveSlide(null);
          }
        }}
      >
        <img src={data.profile || DefaultProfile} alt="user profile" />
        <div className="flex w-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="w-[14.375rem] overflow-hidden text-ellipsis whitespace-nowrap pr-2 text-subTitle text-neutral-title">
              {data.title}
            </p>
            <p className="text-small text-neutral-border-50">{formatTime}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="w-[14.375rem] overflow-hidden text-ellipsis whitespace-nowrap text-base text-neutral-base">
              {data.lastMessageContent}
            </p>
            {data.unreadCount > 0 && <NewMsgCnt cnt={data.unreadCount} />}
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
        <div
          className="flex h-[3.875rem] w-[55px] flex-col items-center justify-center bg-primary-red p-4"
          onClick={() => {
            deleteChatroomId(data.chatroomId);
          }}
        >
          <img src={leaveIcon} alt="leave" />
          Leave
        </div>
      </div>
    </div>
  );
};
