import { keyframes } from '@chakra-ui/system'
import { SpinIcon } from '@concave/icons'
import { Modal, Text, Button, Flex, Heading } from '@concave/ui'
import { Currency, CurrencyAmount } from 'gemswap-sdk'
import { useState, useEffect } from 'react'

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const spinnerStyles = { animation: `${spin} 2s linear infinite` }

const WaitingConfirmation = ({
  amountIn,
  amountOut,
  onClose,
}: {
  amountIn: CurrencyAmount<Currency>
  amountOut: CurrencyAmount<Currency>
  onClose: () => void
}) => (
  <>
    <SpinIcon __css={spinnerStyles} w={10} my={6} />
    <Heading fontSize="xl" fontWeight="bold">
      Waiting For Confirmation
    </Heading>
    <Text fontSize="lg" color="text.accent">
      Swaping {amountIn.toSignificant(6, { groupSeparator: ',' })} {amountIn.currency.symbol} for{' '}
      {amountOut.toSignificant(6, { groupSeparator: ',' })} {amountOut.currency.symbol}
    </Text>
    <Text my={5} fontWeight="medium" color="text.low" fontSize="md">
      Confirm this transaction in your wallet
    </Text>
    <Flex>
      <Button onClick={onClose} variant="secondary" size="large" w="180px">
        Close
      </Button>
    </Flex>
  </>
)

export const WaitingConfirmationDialog = ({
  amountIn,
  amountOut,
  isOpen: isOpenProp,
}: {
  amountIn: CurrencyAmount<Currency>
  amountOut: CurrencyAmount<Currency>
  isOpen: boolean
}) => {
  const [isOpen, setIsOpen] = useState(isOpenProp)
  useEffect(() => {
    setIsOpen(isOpenProp)
  }, [isOpenProp])
  const onClose = () => setIsOpen(false)
  return (
    <Modal
      bluryOverlay={true}
      title="Confirm Swap"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ align: 'center', gap: 1, w: '400px' }}
    >
      <WaitingConfirmation amountIn={amountIn} amountOut={amountOut} onClose={onClose} />
    </Modal>
  )
}
