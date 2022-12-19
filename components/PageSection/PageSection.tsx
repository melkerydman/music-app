import { handleClassName } from '../../utilities/helpers';

type Props = {
  children: React.ReactNode;
  className?: string;
  // style?: React.CSSProperties;
  withoutContainer?: boolean;
  containerClassName?: string;
};

const PageSection = ({
  children,
  className,
  withoutContainer,
  containerClassName,
  ...rest
}: Props) => (
  <section className={handleClassName([className || ''])} {...rest}>
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
