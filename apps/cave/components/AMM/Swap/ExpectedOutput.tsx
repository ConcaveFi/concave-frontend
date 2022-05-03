import { Box, Flex, Stack, Text } from '@concave/ui'
import { Currency, CurrencyAmount, Percent, Trade, TradeType } from 'gemswap-sdk'

export const MinExpectedOutput = ({
  trade,
  slippageTolerance,
}: {
  trade: Trade<Currency, Currency, TradeType>
  slippageTolerance: { value: string; percent: Percent }
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
          {amount.toSignificant(4, { groupSeparator: ',' })} {amount.currency.symbol}
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
          {outputAmount.toSignificant(6, { groupSeparator: ',' })} {outputAmount.currency.symbol}
        </Text>
      </Flex>
      <Flex justify="space-between">
        <Text>Price Impact</Text>
        <Text>{priceImpact.toSignificant(6, { groupSeparator: ',' })}%</Text>
      </Flex>
    </Stack>
  )
}
