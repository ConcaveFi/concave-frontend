import { Button, Card, useDisclosure } from '@concave/ui'
import { useApprovalWhenNeeded } from 'hooks/useAllowance'
import React, { useEffect, useState } from 'react'
import { useBondState } from './BondState'
import { BOND_ADDRESS } from '../../contracts/Bond/BondingAddress'
import { DownwardIcon } from './DownwardIcon'
import { BondOutput } from './BondOutput'
import { BondInput } from './BondInput'
import { ConfirmBondModal } from './ConfirmBond'
import { Currency } from 'gemswap-sdk'
import { useBondGetAmountOut } from './BondState'

export function BondBuyCard() {
  
  const { currencyIn, currencyOut, userAddress, isConnected, balance } = useBondState()
  const [userBalance, setBalance] = useState<string>()
  const [amountIn, setAmountIn] = useState<string>()
  const [amountOut, setAmountOut] = useState<string>()
  const [currenctCurrencyIn, setCurrencyIn] = useState<Currency>()
  const confirmModal = useDisclosure()
  const receiptModal = useDisclosure()

  const [needsApproval, approve, isApproving] = useApprovalWhenNeeded(
    currencyIn,
    BOND_ADDRESS[1],
    userAddress,
    amountIn,
  )

  useEffect(() => {
    if (balance[0].data) {
      setBalance(balance[0].data.formatted)
    }
    if(amountIn) {
    useBondGetAmountOut(currencyOut.address, currencyOut.decimals, 3, amountIn).then((amountOut) => {
      setAmountOut(amountOut)
      })
    }
  }, [balance, setAmountIn])

  return (
    <Card p={6} gap={2} variant="primary" h="fit-content" shadow="Block Up" w="100%" maxW="420px">
      <BondInput
        value={amountIn}
        currency={currencyIn}
        balance={userBalance}
        onChangeValue={(v) => {
          const numberValue = v.replace('-', '')
          numberValue && setAmountIn(+v)
        }}
        onChangeCurrency={() => {setCurrencyIn(currencyIn)}}
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
