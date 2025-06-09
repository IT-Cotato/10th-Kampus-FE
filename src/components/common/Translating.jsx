import { Player } from '@lottiefiles/react-lottie-player';
import translatingAnimation from '@/assets/lottie/translateLoading.json'; // 로컬 JSON 파일 가져오기

export const Translating = ({ size }) => {
  let width = '1.5rem';
  let height = '1.5rem';
  if (size === 'small') {
    width = '1.125rem';
    height = '1.125rem';
  }
  return (
    <Player
      src={translatingAnimation}
      loop
      autoplay
      speed={0.8}
      style={{ width: `${width}`, height: `${height}` }}
    />
  );
};
