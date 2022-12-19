import { useEffect, useState } from 'react';
import { getTokenClient } from '../services/spotify';

const useAuthToken = () => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const token = await getTokenClient();
      setAccessToken(token);
    };
    getToken();
  }, []);

  return accessToken;
};

export default useAuthToken;
