import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import translatingAnimation from '@/assets/lottie/translating.json'; // 로컬 JSON 파일 가져오기

export const Translating = ({ width, height }) => {
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
