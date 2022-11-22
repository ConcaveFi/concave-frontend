import { Currency, CurrencyAmount, Percent, Rounding } from '@concave/core'
import { Trade, TradeType } from '@concave/gemswap-sdk'
import { ExpandArrowIcon, TriangleDownIcon, TriangleUpIcon, WarningTwoIcon } from '@concave/icons'
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Modal,
  SlideFade,
  Stack,
  StackDivider,
  Text,
} from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { useCallback, useRef, useState } from 'react'
import { useFirstMountState } from 'react-use'
import { percentDifference } from 'utils/percentDifference'
import { toPercent } from 'utils/toPercent'
import { useFiatValue } from '../hooks/useFiatPrice'
import { ExpectedOutput, MinExpectedOutput } from './ExpectedOutput'
import { RelativePrice } from './RelativePrice'
import { useSwapSettings } from './Settings'

type TradeCurrencyInfoProps = {
  currencyAmount: CurrencyAmount<Currency>
  fiatValue: CurrencyAmount<Currency>
  priceImpact?: Percent
}

const TradeCurrencyInfo = ({ currencyAmount, fiatValue, priceImpact }: TradeCurrencyInfoProps) => {
  return (
    <Flex
      rounded="2xl"
      justify="space-between"
      shadow="Down Medium"
      px={5}
      py={4}
      bg="blackAlpha.100"
    >
      <Stack spacing={1} direction="column" h="100%">
        <Heading noOfLines={1} maxW="200px" fontSize="2xl">
          {currencyAmount.toSignificant(8, { groupSeparator: ',' }, Rounding.ROUND_HALF_UP)}
        </Heading>
        <Flex fontWeight="bold" color="text.low" align="center">
          <Text fontSize="sm" mr={1}>
            $ {fiatValue?.toFixed(2, { groupSeparator: ',' })}
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
      <Box shadow="Up Small" px={3} py={1} apply="background.metal" opacity={0.9} rounded="3xl">
        <ExpandArrowIcon w="18px" h="18px" />
      </Box>
    </Flex>
  )
}

const PricesUpdated = ({
  prevTrade,
  currentTrade,
  onAccept,
}: {
  prevTrade: Trade<Currency, Currency, TradeType>
  currentTrade: Trade<Currency, Currency, TradeType>
  onAccept: () => void
}) => {
  if (!prevTrade) return null
  const difference = percentDifference(prevTrade.outputAmount, currentTrade.outputAmount)
  const StatArrow = difference?.greaterThan(0) ? (
    <TriangleUpIcon w="10px" color="#4bffb5" />
  ) : (
    <TriangleDownIcon w="10px" color="#ff4976" />
  )
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
      <Stack fontWeight="bold" spacing={0} w="full">
        <Flex align="start">
          <Flex alignItems="center">
            <WarningTwoIcon h="14px" w="14px" verticalAlign="baseline" color="#d8a760" mr={1} />
            <Text fontSize="lg" textColor="text.high">
              Prices changed
            </Text>
          </Flex>
        </Flex>

        <Text fontSize="sm" textColor="text.low">
          Accept new expected output
        </Text>
        <HStack fontSize="sm" textColor="text.low" alignItems="center" spacing={1}>
          <Text fontWeight="bold" color="text.medium" opacity={0.6} textDecor="line-through">
            {prevTrade.outputAmount.toSignificant(4, { groupSeparator: ',' })}
          </Text>
          <Text fontWeight="black" color="text.high">
            {currentTrade.outputAmount.toSignificant(4, { groupSeparator: ',' })}
          </Text>
          {StatArrow}
          <Text fontWeight="black" fontSize="xs">
            {difference && `${difference?.toFixed(2)}%`}
          </Text>
        </HStack>
      </Stack>
      <Button onClick={onAccept} variant="secondary" px={4} py={2} alignSelf="start">
        Accept
      </Button>
    </Flex>
  )
}

function useAcceptNewTrades(trade: Trade<Currency, Currency, TradeType>) {
  const [isAccepted, setIsAccepted] = useState(true)

  const previousTrade = useRef<typeof trade>()
  const currentTrade = useRef(trade)
  const isFirstMount = useFirstMountState()

  const userSlippageTolerance = useSwapSettings((s) => s.settings.slippageTolerance)
  const diff = percentDifference(trade.outputAmount, currentTrade.current?.outputAmount)

  // if original trade, and new updated prices one, difference is more than users allowed slippage,
  // asks to review before confirmation
  if (!isFirstMount && diff?.greaterThan(toPercent(userSlippageTolerance))) {
    previousTrade.current = currentTrade.current
    currentTrade.current = trade
    setIsAccepted(false)
  }

  const onAccept = useCallback(() => {
    previousTrade.current = undefined
    setIsAccepted(true)
  }, [])

  return { previousTrade: previousTrade.current, onAccept, isAccepted }
}

const ConfirmSwap = ({
  trade,
  onConfirm,
}: {
  trade: Trade<Currency, Currency, TradeType>
  onConfirm: () => void
}) => {
  const inputFiat = useFiatValue(trade.inputAmount)
  const outputFiat = useFiatValue(trade.outputAmount)

  const fiatPriceImpact = percentDifference(inputFiat.value, outputFiat.value)

  const { slippageTolerance } = useSwapSettings((s) => ({
    slippageTolerance: s.settings.slippageTolerance,
  }))

  const { previousTrade, onAccept, isAccepted } = useAcceptNewTrades(trade)

  return (
    <>
      <TradeCurrencyInfo currencyAmount={trade.inputAmount} fiatValue={inputFiat.value} />
      <InOutArrow />
      <TradeCurrencyInfo
        currencyAmount={trade.outputAmount}
        fiatValue={outputFiat.value}
        priceImpact={fiatPriceImpact}
      />

      <RelativePrice
        currency0={trade.inputAmount.currency}
        currency1={trade.outputAmount.currency}
        indicators="minimal"
        justify="center"
        p={3}
      />

      <Flex direction="column" rounded="2xl" mb={6} p={6} shadow="Down Medium" bg="blackAlpha.100">
        <ExpectedOutput outputAmount={trade.outputAmount} priceImpact={trade.priceImpact} />
        <StackDivider borderRadius="full" mx={-4} my={4} h={0.5} bg="stroke.secondary" />
        <MinExpectedOutput trade={trade} slippageTolerance={slippageTolerance} />
      </Flex>

      <SlideFade in={!isAccepted} offsetY={-20} unmountOnExit>
        <PricesUpdated prevTrade={previousTrade} currentTrade={trade} onAccept={onAccept} />
      </SlideFade>

      <Button isDisabled={!isAccepted} variant="primary" size="large" onClick={onConfirm} w="full">
        {isAccepted ? 'Confirm swap' : 'Accept new prices first'}
      </Button>
    </>
  )
}

export const ConfirmSwapModal = ({
  trade,
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean
  onClose: () => void
  trade: Trade<Currency, Currency, TradeType>
  onConfirm: () => void
}) => {
  return (
    <Modal
      bluryOverlay={true}
      title="Confirm swap"
      isOpen={isOpen}
      onClose={onClose}
      bodyProps={{ maxW: '400px' }}
    >
      <ConfirmSwap trade={trade} onConfirm={onConfirm} />
    </Modal>
  )
}
