import { ExpandArrowIcon, GasIcon } from '@concave/icons'
import { Button, Card, Flex, HStack, Spinner, Text, useDisclosure } from '@concave/ui'
import React, { useState } from 'react'
import { useFeeData } from 'wagmi'
import { ConfirmSwap } from './ConfirmSwap'
import { defaultSettings, Settings } from './Settings'
import { TokenInput } from './TokenInput'
import { TransactionStatusModal } from './TransactionStatus'
import { TransactionSubmitted } from './TransactionSubmitted'
import { useSwap } from './useSwap2'

export const twoDecimals = (s: string | number) => {
  const a = s.toString()
  return a.indexOf('.') > -1 ? a.slice(0, a.indexOf('.') + 3) : a
}

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

const SwapInputField = ({ amount, currency, stable, balance, setAmount, setCurrency }) => {
  return (
    <TokenInput
      value={amount}
      currency={currency}
      onChangeValue={setAmount}
      onChangeCurrency={setCurrency}
    >
      <HStack justify="space-between" textColor="text.low">
        <Text isTruncated maxW="100px" fontWeight="bold" fontSize="sm">
          {!!-stable && `$${twoDecimals(+stable * +amount)}`}
        </Text>
        {balance && (
          <Button fontSize="xs" mr="auto" rightIcon={<Text textColor="#2E97E2">Max</Text>}>
            Balance:{' '}
            <Text isTruncated maxW="50px">
              {balance}
            </Text>
          </Button>
        )}
      </HStack>
    </TokenInput>
  )
}

const SwapOutputField = ({ amount, currency, stable, balance, setAmount, setCurrency }) => {
  return (
    <TokenInput
      value={amount}
      currency={currency}
      onChangeValue={setAmount}
      onChangeCurrency={setCurrency}
    >
      <HStack justify="space-between" color="text.low">
        <Text isTruncated maxW="100px" fontWeight="bold" fontSize="sm">
          {!!-stable && `$${twoDecimals(+stable * +amount)}`}
        </Text>
        {balance && (
          <Text fontSize="xs" mr="auto">
            Balance:{' '}
            <Text isTruncated maxW="50px">
              {balance}
            </Text>
          </Text>
        )}
      </HStack>
    </TokenInput>
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

export function SwapCard() {
  const [settings, setSettings] = useState(defaultSettings)
  const {
    setAmountIn,
    setAmountOut,
    setCurrencyIn,
    setCurrencyOut,
    switchCurrencies,
    isFetchingPairs,
    swapingIn,
    swapingOut,
  } = useSwap(settings)

  const confirm = useDisclosure()
  return (
    <>
      <Card p={6} gap={2} variant="primary" h="fit-content" shadow="Block Up" w="100%" maxW="420px">
        <SwapInputField {...swapingIn} setAmount={setAmountIn} setCurrency={setCurrencyIn} />
        <SwitchCurrencies onClick={switchCurrencies} />
        <SwapInputField {...swapingOut} setAmount={setAmountOut} setCurrency={setCurrencyOut} />

        <HStack align="center" justify="end" py={5}>
          {isFetchingPairs ? (
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
