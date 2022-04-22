import { Button, Card, HStack, Spinner, Text, useDisclosure } from '@concave/ui'
import { useApprovalWhenNeeded } from 'hooks/useAllowance'
import React, { useEffect, useState } from 'react'
import { BOND_ADDRESS } from '../../contracts/Bond/BondingAddress'
import { DownwardIcon } from './DownwardIcon'
import { BondOutput } from './BondOutput'
import { BondInput } from './BondInput'
import { ConfirmBondModal } from './ConfirmBond'
import { getBondAmountOut, useBondState, purchaseBond, getBondSpotPrice } from './BondState'
import { BondReceiptModal } from './BondReceipt'
import { useFeeData, useWaitForTransaction } from 'wagmi'
import { GasIcon } from '@concave/icons'
import { Settings, BondSettings, defaultSettings } from './Settings'

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
  const { currencyIn, currencyOut, userAddress, balance, signer } = useBondState()
  const [settings, setSettings] = useState<BondSettings>(defaultSettings)
  const userBalance = balance.data?.formatted
  const [amountIn, setAmountIn] = useState<string>('0')
  const [amountOut, setAmountOut] = useState<string>()
  const [bondReceipt] = useState<any>()
  const [bondTransaction] = useState({})
  const [bondSpotPrice, setBondSpotPrice] = useState<string>()
  const confirmModal = useDisclosure()
  const receiptModal = useDisclosure()
  const [needsApproval, approve, isApproving] = useApprovalWhenNeeded(
    currencyIn,
    BOND_ADDRESS[1],
    userAddress,
    amountIn,
  )

  useEffect(() => {
    getBondSpotPrice(3, '0xb9ae584F5A775B2F43C79053A7887ACb2F648dD4').then((bondSpotPrice) => {
      setBondSpotPrice(bondSpotPrice)
    })
  }, [])

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
          getBondAmountOut(currencyOut.address, currencyOut.decimals, 3, v).then((amountOut) => {
            setAmountOut(amountOut)
          })
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
        <HStack align="center" justify="end" py={5}>
          <Settings onClose={setSettings} />
        </HStack>
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
      <Button
        isDisabled={needsApproval || +userBalance < +amountIn}
        variant="primary"
        size="large"
        isFullWidth
        onClick={confirmModal.onOpen}
      >
        {+userBalance < +amountIn ? 'Insufficient Funds' : 'Buy'}
      </Button>
      )
      <ConfirmBondModal
        currencyIn={currencyIn}
        currencyOut={currencyOut}
        amountIn={amountIn}
        amountOut={amountOut}
        tokenInUsdPrice={'currencyIn'}
        tokenInRelativePriceToTokenOut={''}
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.onClose}
        onConfirm={() => {
          purchaseBond(3, amountIn, userAddress, signer, settings, amountOut).then((tx) => {
            receiptModal.onOpen()
          })
        }}
        bondPrice={bondSpotPrice}
        minimumAmountOut={(
          +amountOut -
          (+settings.slippageTolerance.value / 100) * +amountOut
        ).toFixed(3)}
        slippage={settings.slippageTolerance.value}
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
