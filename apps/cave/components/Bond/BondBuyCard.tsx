import { GasIcon } from '@concave/icons'
import { Button, Card, HStack, Spinner, Text, useDisclosure } from '@concave/ui'
import { useApprove } from 'hooks/useApprove'
import React, { useEffect, useState } from 'react'
import { useFeeData } from 'wagmi'
import { CurrencyInputField as BondInput } from 'components/CurrencyAmountField'
import { SelectBondCurrency } from 'components/CurrencySelector/SelectBondCurrency'
import { Currency, CurrencyAmount } from 'gemswap-sdk'
import { BondOutput } from './BondOutput'
import { BondReceiptModal } from './BondReceipt'
import { BOND_ADDRESS } from 'contracts/Bond/BondingAddress'
import { getBondAmountOut, getBondSpotPrice, purchaseBond, useBondState } from './BondState'
import { ConfirmBondModal } from './ConfirmBond'
import { DownwardIcon } from './DownwardIcon'
import { BondSettings, defaultSettings, Settings } from './Settings'
import { DAI } from 'gemswap-sdk'
import { toAmount } from 'utils/toAmount'

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
  const { currencyIn, currencyOut, userAddress, balance, signer, networkId } = useBondState()
  const [settings, setSettings] = useState<BondSettings>(defaultSettings)
  const userBalance = balance.data?.toFixed()
  const [amountIn, setAmountIn] = useState<CurrencyAmount<Currency>>(toAmount('0', DAI[networkId]))
  // const [amountIn, setAmountIn] = useState<number>(0)

  const [amountOut, setAmountOut] = useState<string>()
  const [bondSpotPrice, setBondSpotPrice] = useState<string>()
  const confirmModal = useDisclosure()
  const receiptModal = useDisclosure()
  const { allowance, sendApproveTx } = useApprove(currencyIn, BOND_ADDRESS[networkId])
  const allowanceIsNotEnough = !!allowance.value?.lt(amountIn.toExact())

  useEffect(() => {
    getBondSpotPrice(networkId, BOND_ADDRESS[networkId])
      .then((bondSpotPrice) => {
        setBondSpotPrice(bondSpotPrice)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [userAddress])

  return (
    <Card p={6} gap={2} variant="primary" h="fit-content" shadow="Block Up" w="100%" maxW="420px">
      <BondInput
        currencyAmountIn={amountIn}
        onChangeAmount={(v) => {
          setAmountIn(v)
          getBondAmountOut(currencyOut.address, currencyOut.decimals, networkId, v.toExact()).then(
            (amountOut) => {
              console.log(amountOut)
              setAmountOut(amountOut)
            },
          )
        }}
        CurrencySelector={SelectBondCurrency}
      />
      <BondOutput disabled={true} currency={currencyOut} value={amountOut} />
      <HStack align="center" justify="end" py={1}>
        <GasPrice />
        <HStack align="center" justify="end" py={5}>
          <Settings onClose={setSettings} />
        </HStack>
      </HStack>
      {allowanceIsNotEnough && (
        <Button
          isLoading={false}
          variant="primary"
          size="large"
          isFullWidth
          onClick={() => sendApproveTx()}
        >
          Approve
        </Button>
      )}
      <Button
        isDisabled={allowanceIsNotEnough || +userBalance < +amountIn}
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
        //amountIn.numerator.toString
        amountIn={amountIn.toFixed()}
        amountOut={amountOut}
        tokenInUsdPrice={'currencyIn'}
        tokenInRelativePriceToTokenOut={''}
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.onClose}
        onConfirm={() => {
          purchaseBond(networkId, amountIn.toFixed(), userAddress, signer, settings, amountOut)
            .then((x) => {
              console.log(x)
              receiptModal.onOpen()
            })
            .catch((e) => {
              console.log('get position info failed', e)
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
