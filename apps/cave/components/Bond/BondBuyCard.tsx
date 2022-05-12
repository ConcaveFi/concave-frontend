import { Currency, CurrencyAmount, DAI } from '@concave/gemswap-sdk'
import { GasIcon } from '@concave/icons'
import { Button, Card, HStack, Spinner, Stack, Text, useDisclosure, useToast } from '@concave/ui'
import { CurrencyInputField as BondInput } from 'components/CurrencyAmountField'
import { BOND_ADDRESS } from 'contracts/Bond/BondingAddress'
import { ApproveButton, useApprovalWhenNeeded } from 'hooks/useAllowance'
import React, { useEffect, useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { useFeeData, useWaitForTransaction } from 'wagmi'
import { BondOutput } from './BondOutput'
import { getBondAmountOut, getBondSpotPrice, purchaseBond, useBondState } from './BondState'
import { ConfirmBondModal } from './ConfirmBond'
import { DownwardIcon } from './DownwardIcon'
import { BondSettings, defaultSettings, Settings } from './Settings'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'

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

export function BondBuyCard({ bondTransaction, setBondTransaction, setAmountInAndOut }: any) {
  const { currencyIn, currencyOut, userAddress, balance, signer, networkId } = useBondState()
  // const [bondTransaction, setBondTransaction] = useState()
  const [settings, setSettings] = useState<BondSettings>(defaultSettings)
  const userBalance = balance.data?.toFixed()
  const [amountIn, setAmountIn] = useState<CurrencyAmount<Currency>>(toAmount('0', DAI[networkId]))
  // const [amountIn, setAmountIn] = useState<number>(0)

  const [amountOut, setAmountOut] = useState<string>()
  const [bondSpotPrice, setBondSpotPrice] = useState<string>()

  const confirmModal = useDisclosure()
  // const receiptModal = useDisclosure()

  const approveInfo = useApprovalWhenNeeded(
    currencyIn,
    BOND_ADDRESS[networkId],
    amountIn.denominator,
  )
  const [needsApprove] = approveInfo

  useEffect(() => {
    getBondSpotPrice(networkId, BOND_ADDRESS[networkId])
      .then((bondSpotPrice) => {
        setBondSpotPrice(bondSpotPrice)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [networkId, userAddress])

  return (
    <Card
      p={5}
      gap={2}
      variant="primary"
      h="fit-content"
      shadow="Block Up"
      w="100%"
      maxW="430px"
      height="386px"
    >
      <BondInput
        currencyAmountIn={amountIn}
        onChangeAmount={(v) => {
          setAmountIn(v)
          getBondAmountOut(currencyOut.address, currencyOut.decimals, networkId, v.toExact()).then(
            (amountOut) => {
              setAmountOut(amountOut)
            },
          )
        }}
      />
      <DownwardIcon />
      <BondOutput disabled={true} currency={currencyOut} value={amountOut} />
      <HStack align="center" justify="end" py={1}>
        <GasPrice />
        <HStack align="center" justify="end" py={5}>
          <Settings onClose={setSettings} />
        </HStack>
      </HStack>

      <ApproveButton variant="primary" size="large" isFullWidth useApproveInfo={approveInfo} />
      {!needsApprove && (
        <Button
          isDisabled={needsApprove || +userBalance < +amountIn}
          variant="primary"
          size="large"
          isFullWidth
          onClick={confirmModal.onOpen}
        >
          {+userBalance < +amountIn ? 'Insufficient Funds' : 'Bond'}
        </Button>
      )}

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
            .then((tx) => {
              setBondTransaction(tx)
              confirmModal.onClose()
              setAmountInAndOut({
                in: parseFloat(String(amountIn.toFixed())).toFixed(2),
                out: parseFloat(amountOut).toFixed(2),
              })
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
      <TransactionSubmittedDialog tx={bondTransaction} isOpen={bondTransaction} />
    </Card>
  )
}
