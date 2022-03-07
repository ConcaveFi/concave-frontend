import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalProps as ChakraModalProps,
  ModalHeader,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Card } from './Card'

export interface ModalProps extends ChakraModalProps {
  title: string
  bluryOverlay?: boolean
  titleAlign?: 'left' | 'center' | 'right'
  children: ReactNode
}

export function Modal({
  children,
  title,
  bluryOverlay = false,
  titleAlign = 'left',
  ...props
}: ModalProps) {
  return (
    <ChakraModal {...props}>
      <ModalOverlay backdropBlur={bluryOverlay ? '16px' : '0px'} />
      <ModalContent>
        <ModalHeader textAlign={titleAlign}>{title}</ModalHeader>
        <ModalCloseButton />
        <Card p={0}>
          <ModalBody p={6}>{children}</ModalBody>
        </Card>
      </ModalContent>
    </ChakraModal>
  )
}

export const RawModal = ChakraModal
