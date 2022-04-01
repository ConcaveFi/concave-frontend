import { ExpandArrowIcon, TokenIcon } from '@concave/icons'
import { Box, Button, Flex, HStack, Modal, NumericInput, StackDivider, Text } from '@concave/ui'
import { Percent } from '@uniswap/sdk-core'
import React from 'react'
import { TradeInfo } from './useSwap2'

const TokenInfo = ({
  price,
  address,
  symbol,
  amount,
  loss,
}: {
  price: string | number
  address: string
  symbol: string
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
        <Text fontWeight={700} fontSize={14} textColor="text.low">
          {price}
          {loss && ` (-${loss}%)`}
        </Text>
      </Box>
      <HStack>
        <TokenIcon size="sm" address={address} symbol={symbol} />
        <Text fontSize={24} fontWeight={700}>
          {symbol.toUpperCase()}
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

const MinExpectedOutput = ({ value, symbol, estimatedFee }) => {
  return (
    <Box>
      <Flex fontSize={'14px'} w={'100%'} mb={2} justifyContent={'space-between'}>
        <Text whiteSpace={'pre-wrap'} mr={8} fontWeight={700} textColor="text.low">
          Minimum received after slippage
        </Text>
        <Text whiteSpace={'nowrap'} fontWeight={700} textColor="text.low">
          {value} {symbol}
        </Text>
      </Flex>
      <Flex fontSize={'14px'} w={'100%'} justifyContent={'space-between'}>
        <Text fontWeight={700} textColor="text.low">
          Network Fee
        </Text>
        <Text fontWeight={700} textColor="text.low">
          ~ {estimatedFee}
        </Text>
      </Flex>
    </Box>
  )
}
const ExpectedOutput = ({ value, symbol, slippage }) => {
  return (
    <Box>
      <Flex fontSize={'18px'} w={'100%'} justifyContent={'space-between'}>
        <Text whiteSpace={'pre-wrap'} mr={4} fontWeight={600}>
          Expected Output
        </Text>
        <Text fontWeight={600}>
          {value} {symbol}
        </Text>
      </Flex>
      <Flex w={'100%'} justifyContent={'space-between'}>
        <Text fontWeight={600}>Price Impact</Text>
        <Text fontWeight={600}>-{slippage}%</Text>
      </Flex>
    </Box>
  )
}

export const ConfirmSwapModal = ({
  tradeInfo,
  swapingOut,
  swapingIn,
  isOpen,
  onClose,
}: {
  tradeInfo: TradeInfo
  swapingOut: { stable: number; relativePrice: number }
  swapingIn: { stable: number }
  isOpen: boolean
  onClose: () => void
}) => {
  if (!tradeInfo) return null
  const { trade, settings } = tradeInfo
  const currencyIn = trade.inputAmount.currency
  const currencyOut = trade.outputAmount.currency
  const expectedOutput = trade.executionPrice.toSignificant(6)
  const maxSlippagePercentage = new Percent(settings.slippageTolerance * 100, 100_000)
  const worstExecutionPrice = trade.worstExecutionPrice(maxSlippagePercentage).toSignificant(6)
  return (
    <Modal bluryOverlay={true} title="Confirm Swap" isOpen={isOpen} onClose={onClose}>
      <TokenInfo
        address={currencyIn.isToken ? currencyIn.address : currencyIn.symbol}
        symbol={currencyIn.symbol}
        amount={trade.inputAmount.toSignificant(3)}
        price={+trade.inputAmount.toSignificant(6) * swapingIn.stable}
      />
      <InOutArrow />
      <TokenInfo
        address={currencyOut.isToken ? currencyOut.address : currencyOut.symbol}
        symbol={currencyOut.symbol}
        amount={trade.outputAmount.toSignificant(3)}
        price={+trade.outputAmount.toSignificant(6) * swapingOut.stable}
      />

      <Flex fontSize="sm" fontWeight="bold" my={6} justify="center" flexWrap="wrap">
        <Text>
          1 {currencyOut.symbol} = {swapingOut.relativePrice}
          {currencyIn.symbol}
        </Text>
        <Text ml={1} textColor="text.low">
          (${swapingOut.stable})
        </Text>
      </Flex>

      <Flex direction="column" borderRadius="3xl" mb={8} p={6} shadow="Down Medium">
        <ExpectedOutput
          value={expectedOutput}
          symbol={currencyOut.symbol}
          slippage={maxSlippagePercentage.toSignificant(2)}
        />
        <StackDivider borderRadius="full" mx={-4} my={4} h={0.5} bg="stroke.secondary" />
        <MinExpectedOutput
          value={worstExecutionPrice}
          symbol={currencyOut.symbol}
          estimatedFee={'11'}
        />
      </Flex>

      <Button variant="primary" size="large" onClick={() => null} isFullWidth>
        Confirm Swap
      </Button>
    </Modal>
  )
}
