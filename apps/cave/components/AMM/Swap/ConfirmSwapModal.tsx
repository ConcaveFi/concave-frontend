import { Currency, CurrencyAmount, Percent, Trade, TradeType } from '@concave/gemswap-sdk'
import { ExpandArrowIcon } from '@concave/icons'
import { Box, Button, Flex, Heading, HStack, Modal, Stack, StackDivider, Text } from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import React from 'react'
import { useFiatValue } from '../hooks/useFiatPrice'
import { usePrice } from '../hooks/usePrice'
import { SwapSettings } from '../Settings'
import { computeFiatValuePriceImpact } from './computeFiatValuePriceImpact'
import { ExpectedOutput, MinExpectedOutput } from './ExpectedOutput'

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

const PricesUpdated = ({
  prevTrade,
  currentTrade,
}: {
  prevTrade: Trade<Currency, Currency, TradeType>
  currentTrade: Trade<Currency, Currency, TradeType>
}) => {
  return (
    <Flex
      py={3}
      px={4}
      mb={6}
      shadow="up"
      apply="background.metalBrighter"
      rounded="xl"
      align="center"
      justify="space-between"
    >
      <Stack fontWeight="medium" spacing={0}>
        <Text fontWeight="bold" fontSize="md" textColor="text.high">
          Prices Updated
        </Text>
        <Text fontSize="sm" textColor="text.low">
          Expected Output
        </Text>
        <Text fontSize="sm" textColor="text.low">
          {currentTrade.outputAmount.toSignificant(6, { groupSeparator: ',' })}
        </Text>
      </Stack>
      <Button variant="secondary" px={4} py={2} alignSelf="start">
        Accept new prices
      </Button>
    </Flex>
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
        <ExpectedOutput outputAmount={trade.outputAmount} priceImpact={trade.priceImpact} />
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
