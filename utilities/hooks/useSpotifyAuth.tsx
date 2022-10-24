import axios from 'axios';

// TODO: Replace with .env url
const url = 'http://localhost:3000/api/auth';

const useSpotifyAuth = () => {
  return axios
    .get(url)
    .then((res) => {
      return res.data.body;
    })
    .catch((error) => error);
};

export default useSpotifyAuth;
