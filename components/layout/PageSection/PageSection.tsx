import { handleClassName } from '../../../utilities/helpers';

import styles from './PageSection.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
  // style?: React.CSSProperties;
  withoutContainer?: boolean;
  containerClassName?: string;
  border?: boolean;
};

const PageSection = ({
  children,
  className,
  withoutContainer,
  containerClassName,
  border,
  ...rest
}: Props) => (
  <section
    className={handleClassName([className || '', border ? styles.border : ''])}
    {...rest}
  >
    {!withoutContainer ? (
      <div className={handleClassName(['container', containerClassName || ''])}>
        {children}
      </div>
    ) : (
      children
    )}
  </section>
);
export default PageSection;
