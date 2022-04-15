import { Button, Card, HStack, Spinner, Text, useDisclosure } from '@concave/ui'
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
import { BondReceiptModal } from './BondReceipt'
import { ethers } from 'ethers'
import { useFeeData, useWaitForTransaction } from 'wagmi'
import { GasIcon } from '@concave/icons'

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

export function BondBuyCard() {
  const { currencyIn, currencyOut, userAddress, balance } = useBondState()
  const [userBalance, setBalance] = useState<string>()
  const [amountIn, setAmountIn] = useState<string>('0')
  const [amountOut, setAmountOut] = useState<string>()
  const [bondReceipt] = useState<any>()
  const [bondTransaction] = useState({})

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
  }, [balance])

  return (
    <Card p={6} gap={2} variant="primary" h="fit-content" shadow="Block Up" w="100%" maxW="420px">
      <BondInput
        value={amountIn}
        currency={currencyIn}
        balance={userBalance}
        onChangeValue={(v) => {
          const numberValue = v.replace('-', '')
          if (!numberValue) return setAmountIn('')
          numberValue && setAmountIn(v)
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useBondGetAmountOut(currencyOut.address, currencyOut.decimals, 3, v).then((amountOut) => {
            setAmountOut(amountOut)
          })
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

      <BondOutput disabled={true} currency={currencyOut} value={amountOut} />
      <HStack align="center" justify="end" py={1}>
        <GasPrice />
      </HStack>
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
      {/* pass state as props to display */}
      <ConfirmBondModal
        currencyIn={currencyIn}
        currencyOut={currencyOut}
        amountIn={amountIn}
        amountOut={amountOut}
        tokenInUsdPrice={'currencyIn'}
        tokenOutUsdPrice={''}
        tokenInRelativePriceToTokenOut={''}
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.onClose}
        onConfirm={() => {
          receiptModal.onOpen()
        }}
      />

      <BondReceiptModal
        // receipt={bondTransaction}
        isOpen={receiptModal.isOpen}
        onClose={() => {
          receiptModal.onClose()
        }}
      />
    </Card>
  )
}
