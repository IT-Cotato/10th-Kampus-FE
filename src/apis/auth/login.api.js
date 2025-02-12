import axios from 'axios';
import { authApi } from '../axios-instance';

export const postLogin = async () => {
  const { data } = await axios.post('dummy');
  return data;
};

export const getUserDetail = async () => {
  try {
    const response = await authApi.get('/v1/api/users/details');
    return { success: true, data: response.data.data }
  }
  catch (error) {
    console.log('Error : ', error);
    return { success: false, error: error }
  }
}
export const patchSignup = async (signupData) => {
  try {
    const response = await authApi.patch('/v1/api/users/details', {
      ...signupData,
      nationality: signupData.nationality.toUpperCase(),  // 대문자만 보내야 함 
      preferredLanguage: signupData.preferredLanguage.toUpperCase() // 대문자만 보내야 함
    });
    return { success: true, data: response.data.data }
  }
  catch (error) {
    console.log('Error : ', error);
    return { success: false, error: error }
  }
}