import { keyframes } from '@chakra-ui/system'
import { SpinIcon } from '@concave/icons'
import { Heading, Modal, Text } from '@concave/ui'
import { ReactNode } from 'react'

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const spinnerStyles = { animation: `${spin} 2s linear infinite` }

export const WaitingConfirmationDialog = ({
  children,
  isOpen,
  title,
  disableCloseButton = false,
  ...props
}: {
  children?: ReactNode
  isOpen: boolean
  title?: string
  disableCloseButton?: boolean
  onClose?: VoidFunction
}) => {
  return (
    <Modal
      bluryOverlay={true}
      title={title || 'Confirm Swap'}
      isOpen={isOpen}
      hideClose
      onClose={() => {}}
      bodyProps={{ align: 'center', gap: 1, w: '400px' }}
      preserveScrollBarGap
    >
      <SpinIcon __css={spinnerStyles} w={10} my={6} />
      <Heading fontSize="xl" fontWeight="bold">
        Waiting For Confirmation
      </Heading>
      {children}
      <Text my={5} fontWeight="medium" color="text.low" fontSize="md">
        Confirm this transaction in your wallet
      </Text>
      {/* {!disableCloseButton && (
        <Flex>
          <Button onClick={onClose} variant="secondary" size="large" w="180px">
            Close
          </Button>
        </Flex>
      )} */}
    </Modal>
  )
}
