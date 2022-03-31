import { ExpandArrowIcon, GasIcon } from '@concave/icons'
import { Button, Card, Flex, HStack, Spinner, Text, useDisclosure } from '@concave/ui'
import { ConnectWalletModal } from 'components/ConnectWallet'
import { useAuth } from 'contexts/AuthContext'
import React, { useState } from 'react'
import { useConnect, useFeeData } from 'wagmi'
import { ConfirmSwapModal } from './ConfirmSwap'
import { defaultSettings, Settings } from './Settings'
import { TokenInput } from './TokenInput'
import { TransactionStatusModal } from './TransactionStatus'
import { TransactionSubmittedModal } from './TransactionSubmitted'
import { useNativeCurrency, useSwap } from './useSwap2'

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

/**

  TODO
    - switch tokens
    - eth -> weth

 */

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

  const nativeCurrency = useNativeCurrency()

  const { isConnected, connectWithModal } = useAuth()

  const confirm = useDisclosure()
  return (
    <>
      <Card p={6} gap={2} variant="primary" h="fit-content" shadow="Block Up" w="100%" maxW="420px">
        <TokenInput
          value={swapingIn.amount}
          currency={swapingIn.currency}
          stable={swapingIn.stable}
          balance={swapingIn.balance}
          onChangeValue={setAmountIn}
          onChangeCurrency={setCurrencyIn}
          onClickMaxBalance={() => {
            if (swapingIn.currency.equals(nativeCurrency)) setAmountIn(+swapingIn.balance * 0.8)
            else setAmountIn(swapingIn.balance)
          }}
        />
        <SwitchCurrencies onClick={switchCurrencies} />
        <TokenInput
          value={swapingOut.amount}
          currency={swapingOut.currency}
          stable={swapingOut.stable}
          balance={swapingOut.balance}
          onChangeValue={setAmountOut}
          onChangeCurrency={setCurrencyOut}
        />

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

        {!isConnected ? (
          <Button variant="primary" size="large" onClick={connectWithModal}>
            Connect Wallet
          </Button>
        ) : (
          <Button variant="primary" size="large" isFullWidth onClick={confirm.onOpen}>
            Swap
          </Button>
        )}
      </Card>

      <ConfirmSwapModal isOpen={false} onClose={() => null} />

      <TransactionStatusModal isOpen={false} onClose={() => null} />

      <TransactionSubmittedModal isOpen={false} onClose={() => null} />
    </>
  )
}
