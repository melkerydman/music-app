import { useCallback, useEffect, useRef } from 'react';
import { handleClassName } from '../../utilities/helpers';
import styles from './Modal.module.scss';

// TODO: potentially memoize component to avoid re-renders

type ModalType = {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  children: React.ReactNode;
};

const Modal = ({
  isOpen,
  onClose,
  className,
  children,
}: ModalType): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null);
  const addClassToBody = () => document.body.classList.add('modal-active');
  const removeClassFromBody = () =>
    document.body.classList.remove('modal-active');

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current && modalRef.current === event.target) {
        onClose();
      }
    },
    [modalRef, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      addClassToBody();
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      removeClassFromBody();
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      removeClassFromBody();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return (
    <div
      ref={modalRef}
      className={handleClassName([className || '', styles.modal])}
    >
      {children}
    </div>
  );
};

export default Modal;
