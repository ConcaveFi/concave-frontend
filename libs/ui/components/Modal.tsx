import {
  Flex,
  Text,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalProps as ChakraModalProps,
  SystemProps,
  Stack,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Card } from './Card'

export interface ModalProps extends ChakraModalProps {
  title: string
  blurOverlay?: boolean
  spacing?: SystemProps['margin']
  children: ReactNode
}

export function Modal({ children, title, blurOverlay = false, spacing, ...props }: ModalProps) {
  return (
    <ChakraModal {...props}>
      <ModalOverlay {...(blurOverlay && { backdropFilter: 'blur(16px)' })} />
      <ModalContent bg="transparent" shadow="none">
        <Flex align="center" justify="space-between" mb={4}>
          <Text p={0} fontWeight="bold" fontSize="3xl" fontFamily="heading">
            {title}
          </Text>
          <ModalCloseButton position="unset" />
        </Flex>
        <ModalBody as={Card} p={6} bgGradient="linear(to-tr, secondary.150, secondary.100)">
          <Stack spacing={spacing}>{children}</Stack>
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}
