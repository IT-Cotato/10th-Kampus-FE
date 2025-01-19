// @ts-nocheck

import React, { useEffect, useState } from "react";
import googleLoginImg from '@/assets/imgs/loginGoogle.svg';
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import axios from "axios";

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
        } catch(error){
          alert('google login failed', error);
        }
    };

  return (
    <img
      src={googleLoginImg}
      alt="Google Login"
      onClick={handleGoogleLogin}
      className="w-4/5 mx-auto mt-6 cursor-pointer"
    />
  );
};