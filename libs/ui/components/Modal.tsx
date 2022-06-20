import {
  Box,
  HStack,
  Modal as ChakraModal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps as ChakraModalProps,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Card, CardProps } from './Card'

export interface ModalProps extends ChakraModalProps {
  title: string
  bluryOverlay?: boolean
  titleAlign?: 'left' | 'center' | 'right'
  children: ReactNode
  childrenLeftNeighbor?: ReactNode
  showchildrenLeftNeighbor?: boolean
  bodyProps?: CardProps
  hideClose?: boolean
}

export function Modal({
  children,
  childrenLeftNeighbor,
  showchildrenLeftNeighbor,
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
      <ModalContent w="auto">
        <ModalHeader textAlign={titleAlign}>{title}</ModalHeader>
        {!hideClose && <ModalCloseButton />}
        <HStack spacing={showchildrenLeftNeighbor ? 2 : 0}>
          <Box>{showchildrenLeftNeighbor && childrenLeftNeighbor}</Box>
          <Card variant="primary" p="6" shadow="Up for Blocks" {...bodyProps}>
            {children}
          </Card>
        </HStack>
      </ModalContent>
    </ChakraModal>
  )
}

export const RawModal = ChakraModal
