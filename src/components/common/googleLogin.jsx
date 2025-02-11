// @ts-nocheck

import React, { useEffect, useState } from 'react';
import GoogleLogo from '@/assets/imgs/GoogleLogo.svg';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import axios from 'axios';

const ANDROID_CLIENT_ID = import.meta.env.VITE_GOOGLE_ANDROID_CLIENT_ID;

export const initializeGoogleAuth = () => {
  GoogleAuth.initialize({
    clientId: `${ANDROID_CLIENT_ID}`,
    scopes: ['email'],
    grantOfflineAccess: true,
  });
};

export const GoogleLogin = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      initializeGoogleAuth();
    }
    GoogleAuth.initialize();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const userData = await GoogleAuth.signIn();
      setUser(userData);
      console.log(userData);
      alert('google login success');
    } catch (error) {
      alert('google login failed', error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex h-[52px] w-full items-center justify-center gap-[16px] rounded-[12px] bg-white px-[12px] text-center align-middle shadow-navbar"
    >
      <img src={GoogleLogo} className="h-[20px] w-[20px]" />
      <span className="text-[16px] leading-[20px] text-black font-roboto">
        Sign in with Google
      </span>
    </button>
  );
};
