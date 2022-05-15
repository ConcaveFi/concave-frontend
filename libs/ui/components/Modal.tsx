import {
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
  bodyProps?: CardProps
  hideClose?: boolean
}

export function Modal({
  children,
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
        <HStack>
          <VStack position="absolute" top="10" left="-80">
            <Card variant="secondary" py="6" px="4" w={300}>
              <Text fontWeight="bold">Total vAPR</Text>
              <Text fontSize="sm">
                Total vAPR aggregates rewards associated with each staking position including
                rewards from bonding activity, base emissions and the quarterly dividend.
              </Text>
            </Card>
            <Text>Base Emissions</Text>
            <Text>Quarterly dividends</Text>
          </VStack>
          <Card variant="primary" p="6" shadow="Up for Blocks" {...bodyProps}>
            {/* <HStack>
            <Text>Henlo</Text> */}
            {children}
            {/* </HStack> */}
          </Card>
        </HStack>
      </ModalContent>
    </ChakraModal>
  )
}

export const RawModal = ChakraModal
