import { Currency } from '@concave/core'
import { ExpandArrowIcon } from '@concave/icons'
import { Box, Button, Flex, HStack, Modal, NumericInput, StackDivider, Text } from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { UseTransaction } from 'hooks/TransactionsRegistry/useTransaction'

const TokenInfo = ({
  currency,
  amount,
}: {
  address: string
  symbol: string
  price: string | number
  currency: Currency
  amount: string | number
  loss?: number
}) => {
  return (
    <Flex
      borderRadius={'3xl'}
      justifyContent={'space-between'}
      boxShadow={'Down Medium'}
      px={5}
      p={4}
    >
      <Box w={200}>
        <NumericInput disabled fontSize={'32px'} decimalScale={5} value={amount} />
        <Text fontWeight={700} fontSize={14} textColor="text.low"></Text>
      </Box>
      <HStack>
        <CurrencyIcon width={'32px'} currency={currency} />
        <Text fontSize={24} fontWeight={700}>
          {currency.symbol.toUpperCase()}
        </Text>
      </HStack>
    </Flex>
  )
}

const InOutArrow = () => {
  return (
    <Flex align="center" justify="center" mt={-3}>
      <Box
        shadow="Up Small"
        px={3}
        py={1}
        bgGradient="linear(to-tr, blackAlpha.500 1%, transparent 90%)"
        rounded="3xl"
      >
        <ExpandArrowIcon w="18px" h="18px" />
      </Box>
    </Flex>
  )
}

export const ConfirmBondModal = ({
  currencyIn,
  currencyOut,
  amountIn,
  amountOut,
  isOpen,
  onClose,
  bondPrice,
  minimumAmountOut,
  slippage,
  transaction,
}: {
  transaction: UseTransaction
  currencyIn: Currency
  currencyOut: Currency
  amountIn: string | number
  amountOut: string
  tokenInUsdPrice: string
  tokenInRelativePriceToTokenOut: string
  isOpen: boolean
  onClose: () => void
  bondPrice: string
  minimumAmountOut: string
  slippage: string
}) => {
  return (
    <Modal bluryOverlay={true} title="Confirm Bond" isOpen={isOpen} onClose={onClose}>
      <div>
        <TokenInfo
          currency={currencyIn}
          address={currencyIn.isToken ? currencyIn.address : currencyIn.symbol}
          symbol={currencyIn.symbol}
          amount={amountIn}
          price={amountIn}
        />
        <InOutArrow />
        <TokenInfo
          currency={currencyOut}
          address={currencyOut.isToken ? currencyOut.address : currencyOut.symbol}
          symbol={currencyOut.symbol}
          amount={amountOut}
          price={amountOut}
        />
      </div>

      <Flex fontSize="sm" fontWeight="bold" my={6} justify="center" flexWrap="wrap">
        <Text>Bond Price CNV: ${parseFloat(bondPrice).toFixed(2)}</Text>
      </Flex>

      <Flex direction="column" borderRadius="3xl" mb={8} p={6} shadow="Down Medium">
        <Text align="center" fontSize="sm" fontWeight="bold">
          Min CNV Out: {minimumAmountOut}
        </Text>
        <StackDivider borderRadius="full" mx={-4} my={4} h={0.5} bg="stroke.secondary" />
        <Text align="center" fontSize="sm" fontWeight="bold">
          Slippage: {slippage}%
        </Text>
      </Flex>

      <Button
        variant="primary"
        size="large"
        onClick={transaction.sendTx}
        disabled={transaction.isWaitingForConfirmation}
        w="full"
      >
        {transaction.isWaitingForConfirmation ? 'Confirm in wallet' : 'Confirm bond'}
      </Button>
    </Modal>
  )
}
