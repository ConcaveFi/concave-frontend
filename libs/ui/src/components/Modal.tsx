import { HStack } from '@chakra-ui/layout'
import {
  Modal as ChakraModal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/modal'
import { ReactNode } from 'react'
import { Card, CardProps } from './Card'

export interface ModalProps extends ChakraModalProps {
  title: string
  bluryOverlay?: boolean
  titleAlign?: 'left' | 'center' | 'right'
  children: ReactNode
  left?: ReactNode
  right?: ReactNode
  bodyProps?: CardProps
  hideClose?: boolean
}

export function Modal({
  children,
  left,
  right,
  title,
  bluryOverlay = false,
  titleAlign = 'left',
  bodyProps = {},
  hideClose,
  ...props
}: ModalProps) {
  return (
    <ChakraModal {...props}>
      <ModalOverlay backdropBlur={bluryOverlay ? '16px' : '0px'} />
      <ModalContent w="auto" maxW="auto" h="auto" maxH="auto">
        <ModalHeader textAlign={titleAlign}>{title}</ModalHeader>
        {!hideClose && <ModalCloseButton />}
        <HStack spacing={2} align="start">
          {left}
          <Card variant="primary" p="6" shadow="Up for Blocks" {...bodyProps}>
            {children}
          </Card>
          {right}
        </HStack>
      </ModalContent>
    </ChakraModal>
  )
}

export const RawModal = ChakraModal
