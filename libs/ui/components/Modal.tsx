import {
  CSSObject,
  Modal as ChakraModal,
  ModalBody,
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
  sx?: CSSObject
}

export function Modal({
  children,
  title,
  bluryOverlay = false,
  titleAlign = 'left',
  closeButton,
  sx,
  ...props
}: ModalProps) {
  return (
    <ChakraModal {...props}>
      <ModalOverlay backdropBlur={bluryOverlay ? '16px' : '0px'} />
      <ModalContent>
        <ModalHeader textAlign={titleAlign}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={Card} variant="primary" p="6" sx={sx}>
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}

export const RawModal = ChakraModal
