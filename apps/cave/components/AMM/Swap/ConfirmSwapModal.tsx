import { ExpandArrowIcon } from '@concave/icons'
import { Box, Button, Flex, Heading, HStack, Modal, Stack, StackDivider, Text } from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { Currency, CurrencyAmount, Percent, Trade, TradeType } from 'gemswap-sdk'
import React from 'react'
import { useFiatValue } from '../hooks/useFiatPrice'
import { usePrice } from '../hooks/usePrice'
import { SwapSettings } from '../Settings'
import { computeFiatValuePriceImpact } from '../utils/computeFiatValuePriceImpact'

type TradeCurrencyInfoProps = {
  currencyAmount: CurrencyAmount<Currency>
  fiatValue: CurrencyAmount<Currency>
  priceImpact?: Percent
}

const TradeCurrencyInfo = ({ currencyAmount, fiatValue, priceImpact }: TradeCurrencyInfoProps) => {
  return (
    <Flex rounded="2xl" justify="space-between" shadow="Down Medium" px={5} py={4}>
      <Stack spacing={1} direction="column" h="100%">
        <Heading fontSize="2xl">{currencyAmount.toSignificant(2, { groupSeparator: ',' })}</Heading>
        <Flex fontWeight="bold" color="text.low" align="center">
          <Text fontSize="sm" mr={1}>
            $ {fiatValue.toFixed(2, { groupSeparator: ',' })}
          </Text>
          <Text fontSize="xs" opacity={0.7}>
            {priceImpact && `(${priceImpact?.toFixed(2)}%)`}
          </Text>
        </Flex>
      </Stack>
      <HStack>
        <CurrencyIcon size="sm" currency={currencyAmount.currency} />
        <Text fontSize={24} fontWeight={700} casing="uppercase">
          {currencyAmount.currency.symbol}
        </Text>
      </HStack>
    </Flex>
  )
}

const InOutArrow = () => {
  return (
    <Flex align="center" justify="center" mt={-3} mb={-1}>
      <Box shadow="Up Small" px={3} py={1} apply="background.metal" opacity={0.8} rounded="3xl">
        <ExpandArrowIcon w="18px" h="18px" />
      </Box>
    </Flex>
  )
}

const MinExpectedOutput = ({
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
const ExpectedOutput = ({ value, symbol, priceImpact }) => {
  return (
    <Stack fontWeight="bold" fontSize="md" w="100%">
      <Flex justify="space-between">
        <Text whiteSpace={'pre-wrap'} mr={4}>
          Expected Output
        </Text>
        <Text>
          {value} {symbol}
        </Text>
      </Flex>
      <Flex justify="space-between">
        <Text>Price Impact</Text>
        <Text>{priceImpact}%</Text>
      </Flex>
    </Stack>
  )
}

const ConfirmSwap = ({
  trade,
  settings,
  onConfirm,
}: {
  trade: Trade<Currency, Currency, TradeType>
  settings: SwapSettings
  onConfirm: () => void
}) => {
  const currencyIn = trade.inputAmount.currency
  const currencyOut = trade.outputAmount.currency

  const inputFiat = useFiatValue(trade.inputAmount)
  const outputFiat = useFiatValue(trade.outputAmount)

  const relativePrice = usePrice(currencyIn.wrapped, currencyOut.wrapped)

  const fiatPriceImpact = computeFiatValuePriceImpact(inputFiat.value, outputFiat.value)

  return (
    <>
      <TradeCurrencyInfo currencyAmount={trade.inputAmount} fiatValue={inputFiat.value} />
      <InOutArrow />
      <TradeCurrencyInfo
        currencyAmount={trade.outputAmount}
        fiatValue={outputFiat.value}
        priceImpact={fiatPriceImpact}
      />

      <Flex fontSize="sm" fontWeight="bold" align="center" justify="center" py={4}>
        <Text>
          1 {relativePrice.price?.quoteCurrency.symbol} ={' '}
          {relativePrice.price?.invert().toSignificant(3)}{' '}
          {relativePrice.price?.baseCurrency.symbol}
        </Text>
        {outputFiat.price && (
          <Text ml={1} textColor="text.low">
            (${outputFiat.price.toFixed(2, { groupSeparator: ',' })})
          </Text>
        )}
      </Flex>

      <Flex direction="column" rounded="2xl" mb={6} p={6} shadow="Down Medium">
        <ExpectedOutput
          value={trade.outputAmount.toSignificant(4)}
          symbol={currencyOut.symbol}
          priceImpact={trade.priceImpact.toSignificant(3)}
        />
        <StackDivider borderRadius="full" mx={-4} my={4} h={0.5} bg="stroke.secondary" />
        <MinExpectedOutput trade={trade} slippageTolerance={settings.slippageTolerance} />
      </Flex>

      <Button variant="primary" size="large" onClick={onConfirm} isFullWidth>
        Confirm Swap
      </Button>
    </>
  )
}

export const ConfirmSwapModal = ({
  trade,
  settings,
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean
  onClose: () => void
  trade: Trade<Currency, Currency, TradeType>
  settings: SwapSettings
  onConfirm: () => void
}) => {
  return (
    <Modal
      bluryOverlay={true}
      title="Confirm Swap"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ w: '400px' }}
    >
      <ConfirmSwap trade={trade} settings={settings} onConfirm={onConfirm} />
    </Modal>
  )
}
