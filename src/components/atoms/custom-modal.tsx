'use client';

import type { HTMLMotionProps } from 'framer-motion';

import {
  ModalContent,
  ModalHeader,
  type ModalProps as ModalUIProps,
  Modal as ModalUi,
} from '@heroui/modal';

export type CustomModalProps = {
  title: string;
  children: React.ReactNode | ((onClose: () => void) => React.ReactNode);
} & Omit<
  ModalUIProps,
  'children' | 'backdrop' | 'classNames' | 'motionProps' | 'shouldBlockScroll'
>;

export const variantsModal: HTMLMotionProps<'section'> = {
  variants: {
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  },
};

export function CustomModal({ title, children, isOpen, ...props }: CustomModalProps) {
  return (
    <ModalUi
      backdrop="blur"
      classNames={{ backdrop: 'backdrop-blur-xs' }}
      motionProps={variantsModal}
      shouldBlockScroll={false}
      {...props}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="text2xl font-semibold">{title}</ModalHeader>
            {typeof children === 'function' ? children(onClose) : children}
          </>
        )}
      </ModalContent>
    </ModalUi>
  );
}
