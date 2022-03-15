import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/react'
import { CardProps } from 'dist'
import { ReactNode } from 'react'
import { Card } from './Card'

export interface ModalProps extends ChakraModalProps {
  title: string
  bluryOverlay?: boolean
  titleAlign?: 'left' | 'center' | 'right'
  cardProps?: CardProps
  children: ReactNode
}

export function Modal({
  children,
  title,
  bluryOverlay = false,
  titleAlign = 'left',
  cardProps,
  ...props
}: ModalProps) {
  return (
    <ChakraModal {...props}>
      <ModalOverlay backdropBlur={bluryOverlay ? '16px' : '0px'} />
      <ModalContent>
        <ModalHeader textAlign={titleAlign}>{title}</ModalHeader>
        <ModalCloseButton />
        <Card {...cardProps}>
          <ModalBody>{children}</ModalBody>
        </Card>
      </ModalContent>
    </ChakraModal>
  )
}

export const RawModal = ChakraModal
