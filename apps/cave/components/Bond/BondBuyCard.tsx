import { Button, Card, useDisclosure } from '@concave/ui'
import { useApprovalWhenNeeded } from 'hooks/useAllowance'
import React, { useEffect, useState } from 'react'
import { useBondState } from './BondState'
import { BOND_ADDRESS } from '../../contracts/BondingAddress'
import { DownwardIcon } from './DownwardIcon'
import { BondOutput } from './BondOutput'
import { BondInput } from './BondInput'
import { ConfirmBondModal } from './ConfirmBond'
import { Currency } from 'gemswap-sdk'

export function BondBuyCard() {
  const { currencyIn, currencyOut, exactValue, userAddress, isConnected, balance } = useBondState()

  const [amountIn, setAmountIn] = useState<string>('0')
  const [amountOut, setAmountOut] = useState<string>('0')
  const [currenctCurrencyIn, setCurrencyIn] = useState<Currency>()

  const [userBalance, setBalance] = useState<string>('0')
  const confirmModal = useDisclosure()
  const transactionStatusModal = useDisclosure()
  const receiptModal = useDisclosure()

  const [needsApproval, approve, isApproving] = useApprovalWhenNeeded(
    currencyIn,
    BOND_ADDRESS[1],
    userAddress,
    exactValue,
  )
  useEffect(() => {
    if (balance[0].data) {
      setBalance(balance[0].data.formatted)
    }
  }, [balance])

  return (
    <Card p={6} gap={2} variant="primary" h="fit-content" shadow="Block Up" w="100%" maxW="420px">
      <BondInput
        value={amountIn}
        currency={currencyIn}
        balance={userBalance}
        onChangeValue={(v) => {
          const numberValue = v.replace('-', '')
          numberValue && setAmountIn(v)
        }}
        onChangeCurrency={() => {
          setCurrencyIn(currencyIn)
        }}
        // bug: fails to execute tx when clicked before hitting swap
        // onClickMaxBalance={() => {
        //   if (swapingIn.currency.equals(nativeCurrency)) setAmountIn(+swapingIn.balance * 0.8)
        //   else setAmountIn(swapingIn.balance)
        // }}
      />
      <DownwardIcon />
      <BondOutput
        disabled={true}
        currency={currencyOut}
        value={amountOut}
        // onChangeValue={(v) => {
        //   !isNaN(+v) && setAmountOut(v)
        // }}
      />

      {needsApproval && (
        <Button
          isLoading={isApproving}
          variant="primary"
          size="large"
          isFullWidth
          onClick={() => approve()}
        >
          Approve {currencyIn.symbol}
        </Button>
      )}

      {!isConnected && false ? (
        // <Button variant="primary" size="large" disabled onClick={connectWithModal}>
        //   Connect Wallet
        // </Button>
        <></>
      ) : (
        <Button
          isDisabled={needsApproval || +userBalance < +amountIn}
          variant="primary"
          size="large"
          isFullWidth
          onClick={confirmModal.onOpen}
        >
          {+userBalance < +amountIn ? 'Insufficient Funds' : 'Buy'}
        </Button>
      )}
      <ConfirmBondModal
        currencyIn={currencyIn}
        currencyOut={currencyOut}
        tokenInUsdPrice={'currencyIn'}
        tokenOutUsdPrice={''}
        tokenInRelativePriceToTokenOut={''}
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.onClose}
        onConfirm={() => {}}
      />

      {/* <TransactionStatusModal
        inAmount={swapingIn?.amount}
        outAmount={tradeInfo?.meta.expectedOutput}
        inSymbol={swapingIn?.currency?.symbol}
        outSymbol={swapingOut?.currency?.symbol}
        status={swapTransaction}
        isOpen={transactionStatusModal.isOpen}
        onClose={() => {
          transactionStatusModal.onClose()
        }}
      /> */}

      {/* <TransactionSubmittedModal
        receipt={swapTransaction}
        isOpen={receiptModal.isOpen}
        onClose={() => {
          receiptModal.onClose()
        }}
      /> */}
    </Card>
  )
}
