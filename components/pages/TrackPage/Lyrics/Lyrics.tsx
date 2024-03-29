// TODO! Rework and incorporate the Toolbar component which is currently completely commented out

// import { useEffect, useState } from 'react';
// import getLyrics from '../../../../utilities/services/musixmatch/getLyrics';
import { Paragraph } from '../../../Typography/Typography';

import styles from './Lyrics.module.scss';
// import { handleClassName } from '../../../../utilities/helpers';

type Props = {
  // isrc: string;
  lyrics: any;
  isFetching: boolean;
};

// function splitArrayInMiddle(arr: Array<string>) {
//   const middle = Math.floor(arr.length / 2);
//   const firstHalf = arr.slice(0, middle);
//   const secondHalf = arr.slice(middle);

//   return { firstHalf, secondHalf };
// }

const Lyrics = ({ lyrics, isFetching }: Props): JSX.Element => {
  // const [columns, setColumns] = useState<1 | 2>(1);

  const DisplayLyrics = () => {
    if (isFetching) return <div>Looking for lyrics.</div>;

    if (lyrics?.length > 1) {
      // if (columns === 2) {
      //   const result = splitArrayInMiddle(fetchedLyrics);
      //   return (
      //     <div style={{ display: 'flex' }}>
      //       <div className={styles.lyrics} style={{ width: '50%' }}>
      //         {result.firstHalf.map((lyric, index) => (
      //           <Paragraph key={index} as="div">
      //             {lyric}
      //           </Paragraph>
      //         ))}
      //       </div>
      //       <div className={styles.lyrics} style={{ width: '50%' }}>
      //         {result.secondHalf.map((lyric, index) => (
      //           <Paragraph key={index} as="div">
      //             {lyric}
      //           </Paragraph>
      //         ))}
      //       </div>
      //     </div>
      //   );
      // }
      return (
        <div className={styles.lyrics}>
          {lyrics.map((lyric, index) => (
            <Paragraph key={index} as="div">
              {lyric}
            </Paragraph>
          ))}
        </div>
      );
    }
    return (
      <Paragraph sans className={styles.lyrics} as="div">
        {lyrics}
      </Paragraph>
    );
  };

  // const Toolbar = () => (
  //   <div className={styles.toolbar}>
  //     <button className={styles.button} onClick={() => setColumns(1)}>
  //       Single column
  //     </button>
  //     <button className={styles.button} onClick={() => setColumns(2)}>
  //       Two columns
  //     </button>
  //   </div>
  // );
  return (
    <div className={styles.lyrics__outer}>
      {/* <Heading
        className={handleClassName([styles.lyrics__heading, 'p'])}
        as="h3"
        weight="normal"
      >
        Lyrics
      </Heading> */}
      {/* <Toolbar /> */}
      <DisplayLyrics />
    </div>
  );
};

export default Lyrics;
