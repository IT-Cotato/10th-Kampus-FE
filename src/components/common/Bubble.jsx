import { cn } from '@/utils/cn';
import React from 'react';

/**
 * 말풍선 타입 정의
 * @type {Object} BUBBLE_TYPE
 * @property {string} KAKAO - 카카오톡 스타일 말풍선
 * @property {string} HELP - 도움/강조 스타일 말풍선
 */
export const BUBBLE_TYPE = {
  KAKAO: 'kakao',
  HELP: 'help',
};

/**
 * 말풍선 꼬리 방향 정의
 * @type {Object} BUBBLE_DIR
 * @property {string} TOP - 위쪽 꼬리
 * @property {string} BOTTOM - 아래쪽 꼬리
 */
export const BUBBLE_DIR = {
  TOP: 'top',
  BOTTOM: 'bottom',
};

/**
 * 타입별 스타일 매핑
 * @type {Object}
 */
const typeStyles = {
  [BUBBLE_TYPE.KAKAO]: 'bg-white text-neutral-title',
  [BUBBLE_TYPE.HELP]: 'bg-primary-base text-white',
};

/**
 * Bubble 컴포넌트
 * @param {Object} props
 * @param {'kakao'|'help'} props.type - 말풍선 타입
 * @param {'top'|'bottom'} [props.dir] - 꼬리 방향
 * @param {string|React.ReactNode} props.text - 말풍선 내용
 * @param {string} [props.className] - 추가 클래스
 * @returns {JSX.Element}
 */
export const Bubble = ({ type, dir, text, className, ...props }) => {
  const baseStyle =
    'relative flex w-fit items-center justify-center rounded-2xl px-4 py-3 text-center align-middle text-base shadow-base';

  const typeStyle = type ? typeStyles[type] : 'bg-primary-base text-white';

  const tailStyle = dir
    ? {
        [BUBBLE_DIR.TOP]:
          'absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45',
        [BUBBLE_DIR.BOTTOM]:
          'absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45',
      }[dir]
    : null;

  const tailBgColor =
    type === BUBBLE_TYPE.KAKAO ? 'bg-white' : 'bg-primary-base';

  return (
    <div className={cn(baseStyle, typeStyle, className)} {...props}>
      {text}
      {dir && tailStyle && <div className={cn(tailStyle, tailBgColor)} />}
    </div>
  );
};
