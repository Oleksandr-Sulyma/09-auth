// 'use client';

// import css from './Modal.module.css';
// import { createPortal } from 'react-dom';
// import React, { useEffect, useCallback, useMemo } from 'react';
// import { useRouter } from 'next/navigation';

// interface ModalProps<T extends object = Record<string, never>> {
//   children: React.ReactElement<T>;
//   onClose?: () => void;
// }

// export default function Modal<T extends object = Record<string, never>>({
//   children,
//   onClose,
// }: ModalProps<T>) {
//   const router = useRouter();

//   const finalCloseHandler = useMemo(
//     () => (onClose ? onClose : () => router.back()),
//     [onClose, router]
//   );

//   const handleCloseAttempt = useCallback(() => {
//     const isSure = confirm('Are you sure?');
//     if (isSure) {
//       finalCloseHandler();
//     }
//   }, [finalCloseHandler]);

//   const handleEsc = useCallback(
//     (e: KeyboardEvent) => {
//       if (e.key === 'Escape') {
//         handleCloseAttempt();
//       }
//     },
//     [handleCloseAttempt]
//   );

//   const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.target === e.currentTarget) {
//       handleCloseAttempt();
//     }
//   };

//   const childWithCloseProp = React.cloneElement(children, {
//     onClose: handleCloseAttempt,
//   } as T);

//   useEffect(() => {
//     document.addEventListener('keydown', handleEsc);
//     return () => {
//       document.removeEventListener('keydown', handleEsc);
//     };
//   }, [handleEsc]);

//   useEffect(() => {
//     const originalOverflow = document.body.style.overflow;
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.body.style.overflow = originalOverflow;
//     };
//   }, []);

//   const modalRoot = document.getElementById('modal-root');
//   if (!modalRoot) return null;

//   return createPortal(
//     <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
//       <div className={css.modal} onClick={e => e.stopPropagation()}>
//         {childWithCloseProp}
//       </div>
//     </div>,
//     modalRoot
//   );
// }

'use client';

import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import React, { useEffect, useCallback } from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [handleEsc]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) onClose();
  };

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}
