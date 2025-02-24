import TranslateImg from '@/assets/imgs/translate.svg?react';
import { cn } from '@/utils/cn';
/** 번역 컴포넌트
 * @param {Object} props - 컴포넌트의 props
 * @param {function} props.handleTranslate
 * @param {boolean} props.state - 해당 함수로 번역된 텍스트 전달
 * @param {function} props.setState - 해당 함수로 번역된 텍스트 전달
 * @param {'small' | 'large'} props.size - 크기
 * @param {'title' | 'base'} props.color - 색상
 */
export const TranslateButton = ({ handleTranslate, state, setState, size, color }) => {
  return (
    <button type="button"
      onClick={(e) => {
        e.stopPropagation();
        state ? setState(false) : handleTranslate();
      }}>
      <TranslateImg alt="Translate"
        className={cn({
          "w-[1.125rem] h-[1.125rem]": size === "small",
          "w-6 h-6": size === "large",
          "text-neutral-base": color === "base",
          "text-neutral-title": color === "title"
        })} />
    </button>
  );
};
