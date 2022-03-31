import { ExpandArrowIcon, GasIcon } from '@concave/icons'
import { Button, Card, Flex, HStack, Text, useDisclosure, Spinner } from '@concave/ui'
import React, { useState } from 'react'
import { ConfirmSwap } from './ConfirmSwap'
import { defaultSettings, Settings } from './Settings'
import { TokenInput } from './TokenInput'
import { TransactionStatusModal } from './TransactionStatus'
import { TransactionSubmitted } from './TransactionSubmitted'
import { useSwap } from './useSwap2'
import { useFeeData } from 'wagmi'

export const twoDecimals = (s: string) => (s.indexOf('.') > -1 ? s.slice(0, s.indexOf('.') + 3) : s)

const GasPrice = () => {
  const [{ data }] = useFeeData({ formatUnits: 'gwei', watch: true })
  return (
    <>
      <GasIcon viewBox="0 0 16 16" />
      {data ? (
        <Text fontSize="xs" color="text.low" fontWeight="medium">
          {twoDecimals(data?.formatted.gasPrice)} gwei
        </Text>
      ) : (
        <Spinner size="xs" color="text.low" />
      )}
    </>
  )
}

const LoadingBestTradeIndicator = () => {
  return (
    <Flex mr="auto" gap={2} align="center" color="text.low">
      <Spinner size="xs" />
      <Text fontSize="xs">Searching for best trade route</Text>
    </Flex>
  )
}

export function SwapCard() {
  const [settings, setSettings] = useState(defaultSettings)
  const {
    setAmountIn,
    setAmountOut,
    setCurrencyIn,
    setCurrencyOut,
    switchCurrencies,
    isLoadingBestTrade,
    swapingIn,
    swapingOut,
  } = useSwap(settings)

  const confirm = useDisclosure()
  return (
    <>
      <Card p={6} gap={2} variant="primary" h="fit-content" shadow="Block Up" w="100%" maxW="420px">
        <TokenInput
          value={swapingIn.amount}
          currency={swapingIn.currency}
          stableValue={+swapingIn.stable * +swapingIn.amount}
          balance={swapingIn.balance}
          onChangeValue={setAmountIn}
          onChangeCurrency={setCurrencyIn}
        />
        <SwitchCurrencies onClick={switchCurrencies} />
        <TokenInput
          value={swapingOut.amount}
          currency={swapingOut.currency}
          stableValue={+swapingOut.stable * +swapingOut.amount}
          balance={swapingOut.balance}
          onChangeValue={setAmountOut}
          onChangeCurrency={setCurrencyOut}
        />
        <HStack align="center" justify="end" py={5}>
          {isLoadingBestTrade ? (
            <LoadingBestTradeIndicator />
          ) : (
            swapingOut.relativePrice && (
              <Flex flexWrap="wrap" fontSize="xs" fontWeight="medium" mr="auto">
                <Text>
                  1 {swapingOut.currency.symbol} = {swapingOut.relativePrice}
                  {swapingIn.currency.symbol}
                </Text>
                <Text ml={1} textColor="text.low">
                  (${swapingOut.stable})
                </Text>
              </Flex>
            )
          )}
          <GasPrice />
          <Settings onClose={setSettings} />
        </HStack>

        <Button variant="primary" size="large" isFullWidth onClick={confirm.onOpen}>
          Swap
        </Button>
      </Card>

      <ConfirmSwap isOpen={false} onClose={() => null} />

      <TransactionStatusModal isOpen={false} onClose={() => null} />

      <TransactionSubmitted isOpen={false} onClose={() => null} />
    </>
  )
}

const SwitchCurrencies = ({ onClick }) => {
  return (
    <Flex align="center" justify="center">
      <Button
        shadow="Up Small"
        _focus={{ shadow: 'Up Small' }}
        _hover={{ shadow: 'Up Big' }}
        px={3.5}
        py={2}
        bgColor="blackAlpha.100"
        rounded="3xl"
        onClick={onClick}
      >
        <ExpandArrowIcon />
      </Button>
    </Flex>
  )
}
