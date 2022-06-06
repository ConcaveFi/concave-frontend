import { Currency, CurrencyAmount, Percent, Rounding } from '@concave/core'
import { Trade, TradeType } from '@concave/gemswap-sdk'
import { Box, Flex, Stack, Text } from '@concave/ui'

export const MinExpectedOutput = ({
  trade,
  slippageTolerance,
}: {
  trade: Trade<Currency, Currency, TradeType>
  slippageTolerance: { value: number; percent: Percent }
}) => {
  const isExactInput = trade.tradeType === TradeType.EXACT_INPUT
  const amount = isExactInput
    ? trade.minimumAmountOut(slippageTolerance.percent)
    : trade.maximumAmountIn(slippageTolerance.percent)
  return (
    <Box>
      <Flex fontSize="sm" w="100%" mb={3} justify="space-between" align="center">
        <Text maxW="200px" fontWeight="bold" textColor="text.low" mr={4}>
          {isExactInput ? `Minimum received` : `Maximum sent`} after slippage (
          {slippageTolerance.value}%)
        </Text>
        <Text fontWeight="bold" textColor="text.low">
          {amount.toFixed(3, { groupSeparator: ',' })} {amount.currency.symbol}
        </Text>
      </Flex>
      {/* <Flex fontSize="sm" w="100%" justify="space-between">
          <Text fontWeight="bold" textColor="text.low">
            Network Fee
          </Text>
          <Text fontWeight={700} textColor="text.low">
            {estimatedFee && `~ ${estimatedFee} wei`}
          </Text>
        </Flex> */}
    </Box>
  )
}

export const ExpectedOutput = ({
  outputAmount,
  priceImpact,
}: {
  outputAmount: CurrencyAmount<Currency>
  priceImpact: Percent
}) => {
  return (
    <Stack fontWeight="bold" fontSize="md" w="100%">
      <Flex justify="space-between">
        <Text whiteSpace={'pre-wrap'} mr={4}>
          Expected Output
        </Text>
        <Text>
          {outputAmount.toSignificant(6, { groupSeparator: ',' }, Rounding.ROUND_HALF_UP)}{' '}
          {outputAmount.currency.symbol}
        </Text>
      </Flex>
      <Flex justify="space-between">
        <Text>Price Impact</Text>
        <Text>{priceImpact.toFixed(2, { groupSeparator: ',' }, Rounding.ROUND_UP)}%</Text>
      </Flex>
    </Stack>
  )
}
