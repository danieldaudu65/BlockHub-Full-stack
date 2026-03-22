// components/ModalWrapper.tsx
import React from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ModalWrapperProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  slideFrom?: 'up' | 'down' | 'left' | 'right';
};

const getSlideInitial = (direction: ModalWrapperProps['slideFrom']) => {
  switch (direction) {
    case 'up':
      return { y: -50, opacity: 0 };
    case 'down':
      return { y: 50, opacity: 0 };
    case 'left':
      return { x: -50, opacity: 0 };
    case 'right':
      return { x: 50, opacity: 0 };
    default:
      return { scale: 0.9, opacity: 0 };
  }
};

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  children,
  slideFrom,
}) => {
  const slideInitial = getSlideInitial(slideFrom);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
            initial={slideInitial}
            animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            exit={slideInitial}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalWrapper;
