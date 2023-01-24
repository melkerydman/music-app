import axios from 'axios';

const dev = process.env.NEXT_PUBLIC_NODE_ENV !== 'production';

const getLyrics = (isrc: string) =>
  axios
    .get(`${dev ? 'http://localhost:3000' : ''}/api/lyrics/${isrc}`)
    .then((res) => res.data.lyrics)
    .catch((error) => {
      throw new Error(`Failed to get lyrics: ${error.message}`);
    });

export default getLyrics;
