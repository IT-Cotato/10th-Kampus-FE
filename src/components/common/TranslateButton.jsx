import TranslateImg from '@/assets/imgs/translate.svg';

/** 번역 컴포넌트
 * @param {Object} props - 컴포넌트의 props
 * @param {'post' | 'content' | 'text'} props.translateType - 번역 타입 (게시된 post, 작성 중인 content, 단순 text)
 * @param {number | string} props.value - post 번역 시 number, 작성 중인 글 본문이나 단순 text 번역 시 string
 * @param {function} props.setValue - 해당 함수로 번역된 텍스트 전달
 */
export const TranslateButton = ({ translateType, value, setValue }) => {
  const translate = () => {
    if (value || value === 0) {
      if (translateType === 'post') {
        // postId 전달 시 게시글 번역 - value는 number
        console.log(value);
      } else if (translateType === 'content') {
        // 작성 중인 게시글 본문 번역 - value는 string
        // 모달 구현해야함
        // 사용자가 선택한 언어 있으면 백에 알려주기
        setValue(value); // 현재는 번역 안된 상태로 전달
      } else if (translateType === 'text') {
        // 영어로 번역 - value는 string
        setValue(value); // 현재는 번역 안된 상태로 전달
      }
    }
  };

  return (
    <button type="button" onClick={translate}>
      <img src={TranslateImg} alt="" className="w-[1.375rem] h-[1.375rem]" />
    </button>
  );
};
