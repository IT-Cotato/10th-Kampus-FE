import TranslateImg from '@/assets/imgs/icon/translate.svg?react';
import { cn } from '@/utils/cn';
/** 번역 컴포넌트
 * @param {Object} props - 컴포넌트의 props
 * @param {function} props.handleTranslate
 * @param {boolean} props.state - 해당 함수로 번역된 텍스트 전달
 * @param {function} props.setState - 해당 함수로 번역된 텍스트 전달
 * @param {undefined | 'small'} props.size - 크기
 */
export const TranslateButton = ({ handleTranslate, state, setState, size }) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        state ? setState(false) : handleTranslate();
      }}
      className={cn(size === 'small' ? 'h-[1.125rem] w-[1.125rem]' : 'h-6 w-6')}
    >
      <TranslateImg
        className={cn(state ? 'text-neutral-title' : 'text-neutral-border-50')}
      />
    </button>
  );
};
