import type { Album as AlbumType } from '../../../../types';
import { handleClassName } from '../../../../utilities/helpers';
import { Paragraph } from '../../../Typography/Typography';
import styles from './AlbumInfo.module.scss';

type Props = {
  album: AlbumType;
};

const AlbumInfo = ({ album }: Props) => {
  // TODO: Look through all of this, break out to classes as well as create global classes to use
  return (
    <div>
      <div className={handleClassName([styles['info']])}>
        <div className={handleClassName([styles['info--left']])}>
          <Paragraph small sans weight="bold" as="div">
            [ Album ]
          </Paragraph>
          <Paragraph small sans weight="thin" as="div">
            {album.name}
          </Paragraph>
        </div>
        <div className={handleClassName([styles['info--right']])}>
          <Paragraph small sans weight="bold" as="div">
            [ Year ]
          </Paragraph>
          <Paragraph small sans weight="thin" as="div">
            2004
          </Paragraph>
        </div>
      </div>
    </div>
  );
};
export default AlbumInfo;