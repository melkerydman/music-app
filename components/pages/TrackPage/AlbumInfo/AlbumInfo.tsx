import Link from 'next/link';
import { handleClassName } from '../../../../utilities/helpers';
import { Paragraph } from '../../../Typography/Typography';
import styles from './AlbumInfo.module.scss';

type Props = {
  album: SpotifyApi.AlbumObjectFull;
};

const AlbumInfo = ({ album }: Props) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { type, id, name, release_date } = album;
  const releaseDate = new Date(release_date);
  // TODO: Look through all of this, break out to classes as well as create global classes to use

  return (
    <div>
      <div className={handleClassName([styles.info])}>
        <div className={handleClassName([styles['info--left']])}>
          <Paragraph small sans weight="bold" as="div">
            [ Album ]
          </Paragraph>
          <Paragraph small sans weight="thin" as="div">
            <Link href={`/${type}/${id}`}>
              <a>{name}</a>
            </Link>
          </Paragraph>
        </div>
        <div className={handleClassName([styles['info--right']])}>
          <Paragraph small sans weight="bold" as="div">
            [ Year ]
          </Paragraph>
          <Paragraph small sans weight="thin" as="div">
            {releaseDate.getFullYear()}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};
export default AlbumInfo;
