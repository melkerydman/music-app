import { handleClassName } from '../../utilities/helpers';
import Grid from '../NewGrid/NewGrid';
import { Paragraph } from '../Typography/Typography';
import styles from './Footer.module.scss';

// eslint-disable-next-line arrow-body-style
const Footer = () => {
  return (
    <footer className={handleClassName([])}>
      <Grid
        container
        className={handleClassName(['container', styles.wrapper])}
      >
        <Grid item span={9}>
          <Paragraph weight="normal" small as="div">
            Data provided by Spotify.
          </Paragraph>
          <Paragraph weight="normal" small as="div">
            Lyrics provided by Musixmatch.
          </Paragraph>
        </Grid>
        <Grid item span={3}>
          <Paragraph weight="normal" small as="div">
            Made by Melker Rydman, 2023.
          </Paragraph>
        </Grid>
      </Grid>
    </footer>
  );
};
export default Footer;
