import { cn } from '@/utils/cn';
import React from 'react';

// 말풍선 타입
export const BUBBLE_TYPE = {
  KAKAO: 'kakao',
  HELP: 'help',
};

// 말풍선 방향
export const BUBBLE_DIR = {
  TOP: 'top',
  BOTTOM: 'bottom',
};

// 타입별 스타일 매핑
const typeStyles = {
  [BUBBLE_TYPE.KAKAO]: 'bg-white text-neutral-title',
  [BUBBLE_TYPE.HELP]: 'bg-primary-base text-white',
};

export const Bubble = ({ type, dir, text, className, ...props }) => {
  // 기본
  const baseStyle =
    'relative flex w-fit items-center justify-center rounded-2xl px-4 py-3 text-center align-middle text-base shadow-base';

  // 타입별 스타일
  const typeStyle = type ? typeStyles[type] : 'bg-primary-base text-white';

  // 꼬리 스타일
  const tailStyle = dir
    ? {
        [BUBBLE_DIR.TOP]:
          'absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45',
        [BUBBLE_DIR.BOTTOM]:
          'absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45',
      }[dir]
    : null;

  // 꼬리 배경색
  const tailBgColor =
    type === BUBBLE_TYPE.KAKAO ? 'bg-white' : 'bg-primary-base';

  return (
    <div className={cn(baseStyle, typeStyle, className)} {...props}>
      {text}
      {dir && tailStyle && <div className={cn(tailStyle, tailBgColor)} />}
    </div>
  );
};
