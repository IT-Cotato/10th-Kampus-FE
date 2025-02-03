import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '@/assets/lottie/loading.json'; // 로컬 JSON 파일 가져오기

export const Loading = () => {
  return (
    <Player
      src={loadingAnimation}
      loop
      autoplay
      speed={1.5}
      className="w-32 h-32"
    />
  );
};
