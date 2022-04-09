
import { TokenInput } from "components/Swap/TokenInput";
import { ExpandArrowIcon, GasIcon } from '@concave/icons'
import { Button, Card, Flex, HStack, Spinner, Text, useDisclosure } from '@concave/ui'
import { CandleStickCard } from 'components/CandleStickCard'
import { useAuth } from 'contexts/AuthContext'
import { useApprovalWhenNeeded } from 'hooks/useAllowance'
import React, { useEffect, useState } from 'react'
import { useFeeData, useWaitForTransaction } from 'wagmi'
import { ROUTER_CONTRACT, useNativeCurrency, useSwap } from "components/Swap/useSwap2";
import { CNV } from "constants/tokens";

export function BondBuyCard() {
    const {
      setAmountIn,
      setAmountOut,
      setCurrencyIn,
      setCurrencyOut,
      switchCurrencies,
      setSettings,
      confirmSwap,
      swapTransaction,
      tradeInfo,
      isTradeReady,
      isErrored,
      isFetchingPairs,
      swapingIn,
      swapingOut,
    } = useSwap()
  
    const nativeCurrency = useNativeCurrency()
  
    const { user, isConnected, connectWithModal } = useAuth()
  
    const confirmModal = useDisclosure()
    const transactionStatusModal = useDisclosure()
    const receiptModal = useDisclosure()
    const [swapReceipt] = useWaitForTransaction({
      hash: swapTransaction.data?.hash,
      skip: !swapTransaction.data?.hash,
    })
    const [inOrOut, setInOrOut] = useState(Boolean)
    const [needsApproval, approve, isApproving] = useApprovalWhenNeeded(
      swapingIn.currency.wrapped,
      ROUTER_CONTRACT[1],
      user.address,
      // MaxUint256.toString(),
      swapingIn.amount,
    )
    useEffect(() => {
      if (swapReceipt.loading) {
        receiptModal.onOpen()
        transactionStatusModal.onClose()
      }
      // antipattern??
    }, [swapReceipt.loading])

    // const { user, isConnected } = useAuth()

 return (
    <Card
    p={6}
    gap={2}
    variant="primary"
    h="fit-content"
    shadow="Block Up"
    w="100%"
    maxW="420px"
  >
    <TokenInput
      value={swapingIn.amount}
      currency={swapingIn.currency}
      stable={swapingIn.stable}
      balance={swapingIn.balance}
      onChangeValue={(v) => {
        setInOrOut(true)
        const numberValue = v.replace('-', '')
        numberValue && setAmountIn(v)
      }}
      onChangeCurrency={setCurrencyIn}
      // bug: fails to execute tx when clicked before hitting swap
      // onClickMaxBalance={() => {
      //   if (swapingIn.currency.equals(nativeCurrency)) setAmountIn(+swapingIn.balance * 0.8)
      //   else setAmountIn(swapingIn.balance)
      // }}
    />
    {/* <SwitchCurrencies onClick={switchCurrencies} /> */}
    <TokenInput
      disabled={true}
      value={swapingOut.amount}
      currency={swapingOut.currency}
      stable={swapingOut.stable}
      balance={swapingOut.balance}
      onChangeValue={(v) => {
        setInOrOut(false)
        !isNaN(+v) && setAmountOut(v)
      }}
      onChangeCurrency={setCurrencyOut}
    />

    {/* <HStack align="center" justify="end" py={5}>
      {isFetchingPairs ? (
        // <LoadingBestTradeIndicator />
      ) : isErrored ? (
        <PairsError />
      ) : (
        swapingOut.relativePrice && (
          <Flex flexWrap="wrap" fontSize="xs" fontWeight="medium" mr="auto">
            <Text>
              1 {swapingOut.currency.symbol} = {swapingOut.relativePrice}
              {swapingIn.currency.symbol}
            </Text>
            {swapingOut.stable && (
              <Text ml={1} textColor="text.low">
                (${swapingOut.stable})
              </Text>
            )}
          </Flex>
        )
      )}
      <GasPrice />
      <Settings onClose={setSettings} />
    </HStack> */}

    {needsApproval && (
      <Button
        isLoading={isApproving}
        variant="primary"
        size="large"
        isFullWidth
        onClick={() => approve()}
      >
        Approve {swapingIn.currency.symbol}
      </Button>
    )}

    {!isConnected && false ? (
      // <Button variant="primary" size="large" disabled onClick={connectWithModal}>
      //   Connect Wallet
      // </Button>
      <></>
    ) : (
      <Button
        isDisabled={
          !isTradeReady ||
          needsApproval ||
          !isConnected ||
          +swapingIn.balance < +swapingIn.amount
        }
        variant="primary"
        size="large"
        isFullWidth
        onClick={confirmModal.onOpen}
      >
        {+swapingIn.balance < +swapingIn.amount ? 'Insufficient Funds' : 'Buy with 5 days vesting'}
      </Button>
    )}
  </Card>




)
}

