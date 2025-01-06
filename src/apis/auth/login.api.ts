import axios from 'axios';

export const postLogin = async () => {
  const { data } = await axios.post('dummy');
  return data;
};
