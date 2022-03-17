import {
  Modal as ChakraModal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Card, CardProps } from './Card'

export interface ModalProps extends ChakraModalProps {
  title: string
  bluryOverlay?: boolean
  titleAlign?: 'left' | 'center' | 'right'
  closeButton?: boolean
  cardProps?: CardProps
  children: ReactNode
}

export function Modal({
  children,
  title,
  bluryOverlay = false,
  titleAlign = 'left',
  cardProps,
  closeButton,
  ...props
}: ModalProps) {
  return (
    <ChakraModal {...props}>
      <ModalOverlay backdropBlur={bluryOverlay ? '16px' : '0px'} />
      <ModalContent>
        <ModalHeader textAlign={titleAlign}>{title}</ModalHeader>
        {closeButton !== false && <ModalCloseButton />}
        <Card {...cardProps}>{children}</Card>
      </ModalContent>
    </ChakraModal>
  )
}

export const RawModal = ChakraModal
