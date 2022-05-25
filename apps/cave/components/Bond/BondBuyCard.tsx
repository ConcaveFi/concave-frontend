import { Currency, CurrencyAmount, DAI } from '@concave/gemswap-sdk'
import { GasIcon } from '@concave/icons'
import { Card, Flex, HStack, keyframes, Spinner, Text, useDisclosure, VStack } from '@concave/ui'
import { ApproveButton } from 'components/ApproveButton/ApproveButton'
import { CurrencyInputField as BondInput } from 'components/CurrencyAmountField'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { BOND_ADDRESS } from 'contracts/Bond/BondingAddress'
import { useGet_Amm_Cnv_PriceQuery } from 'graphql/generated/graphql'
import { useRecentTransactions } from 'hooks/useRecentTransactions'
import React, { useEffect, useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { useFeeData } from 'wagmi'
import { BondOutput } from './BondOutput'
import { getBondAmountOut, getBondSpotPrice, purchaseBond, useBondState } from './BondState'
import { ConfirmBondModal } from './ConfirmBond'
import { DownwardIcon } from './DownwardIcon'
import { Settings, useBondSettings } from './Settings'
import { truncateNumber } from 'utils/truncateNumber'

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

export function BondBuyCard(props: {
  bondTransaction?: any
  setBondTransaction?: any
  setAmountInAndOut?: any
  updateBondPositions?: any
  setRedeemButtonDisabled?: any
}) {
  const { currencyIn, currencyOut, userAddress, balance, signer, networkId } = useBondState()
  const [bondTransaction, setBondTransaction] = useState()

  const [settings, setSetting] = useBondSettings()
  const userBalance = balance.data?.toFixed()
  const [amountIn, setAmountIn] = useState<CurrencyAmount<Currency>>(toAmount('0', DAI[networkId]))
  // const [amountIn, setAmountIn] = useState<number>(0)

  useEffect(() => {
    setAmountIn(toAmount(0, DAI[networkId]))
  }, [networkId])

  const [amountOut, setAmountOut] = useState<string>()
  const [bondSpotPrice, setBondSpotPrice] = useState<string>()

  const confirmModal = useDisclosure()
  // const receiptModal = useDisclosure()
  const [hasClickedConfirm, setHasClickedConfirm] = useState(false)
  const AMMData = useGet_Amm_Cnv_PriceQuery()

  const currentPrice = AMMData?.data?.cnvData?.data?.last.toFixed(3)

  const [txError, setTxError] = useState('')
  const {
    isOpen: isOpenRejected,
    onClose: onCloseRejected,
    onOpen: onOpenRejected,
  } = useDisclosure()

  useEffect(() => {
    getBondSpotPrice(networkId, BOND_ADDRESS[networkId])
      .then((bondSpotPrice) => {
        setBondSpotPrice(bondSpotPrice)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [networkId, userAddress])

  const { addRecentTransaction } = useRecentTransactions()

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
      <Flex
        ml={{ base: 0, md: 4 }}
        align="center"
        justify="space-around"
        direction={{ base: 'column', md: 'row', lg: 'column', xl: 'row' }}
        flex={1}
      >
        <VStack spacing={0} fontSize="13px" justify={'end'} fontWeight="500">
          <HStack alignSelf={'start'}>
            <Text textColor={'text.low'}>Current Price:</Text>
            <Text textColor={'text.low'} opacity="0.7">
              {currentPrice
                ? '$' + truncateNumber(+currentPrice * 10 ** 18, 3) + ' CNV'
                : 'Loading . . .'}
            </Text>
          </HStack>
          <HStack alignSelf={'start'}>
            <Text ml={4} textColor={'text.low'}>
              Bond Price:
            </Text>
            <Text textColor={'text.low'} opacity="0.7">
              {bondSpotPrice
                ? '$' + truncateNumber(+bondSpotPrice * 10 ** 18, 3) + ' CNV'
                : 'Loading . . .'}
            </Text>
          </HStack>
        </VStack>
        <Flex flex={1} align={'center'} justify="end" minWidth={100} gap={2}>
          <GasPrice />
          <HStack align="center" justify="end" py={{ base: 0, md: 5, lg: 0, xl: 5 }}>
            <Settings settings={settings} setSetting={setSetting} />
          </HStack>
        </Flex>
      </Flex>

      <ApproveButton
        variant="primary"
        size="large"
        w="full"
        approveArgs={{
          currency: currencyIn,
          spender: BOND_ADDRESS[networkId],
        }}
        isDisabled={+amountIn.numerator.toString() === 0 || +userBalance < +amountIn}
        onClick={confirmModal.onOpen}
      >
        {+userBalance < +amountIn ? 'Insufficient Funds' : 'Bond'}
      </ApproveButton>

      <ConfirmBondModal
        currencyIn={currencyIn}
        currencyOut={currencyOut}
        amountIn={amountIn.toFixed()}
        amountOut={amountOut}
        tokenInUsdPrice={'currencyIn'}
        tokenInRelativePriceToTokenOut={''}
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.onClose}
        hasClickedConfirm={hasClickedConfirm}
        setHasClickedConfirm={setHasClickedConfirm}
        onConfirm={() => {
          confirmModal.onClose()
          const amountInTemp = amountIn.toFixed()
          const amountOutTemp = amountOut
          purchaseBond(networkId, amountInTemp, userAddress, signer, settings, amountOutTemp)
            .then(async (tx) => {
              setBondTransaction(tx)
              addRecentTransaction({
                amount: +amountIn.toSignificant(3),
                amountTokenName: amountIn.currency.symbol,
                purchaseTokenName: 'CNV',
                purchase: +amountOut,
                transaction: tx,
                type: 'Bond',
                loading: true,
              })
              props.setBondTransaction?.(tx)
              props.setAmountInAndOut?.({
                in: parseFloat(String(amountIn.toFixed())).toFixed(2),
                out: parseFloat(amountOut).toFixed(2),
              })
              setHasClickedConfirm(false)
              setAmountIn(toAmount('0', DAI[networkId]))
              setAmountOut('')
              await tx.wait(1)
              props.setRedeemButtonDisabled(true)
              props.updateBondPositions()
            })
            .catch((e) => {
              setTxError(e.message)
              onOpenRejected()
              setHasClickedConfirm(false)
            })
        }}
        bondPrice={bondSpotPrice}
        minimumAmountOut={(
          +amountOut -
          (+settings.slippageTolerance.value / 100) * +amountOut
        ).toFixed(3)}
        slippage={settings.slippageTolerance.value}
      />
      <WaitingConfirmationDialog isOpen={hasClickedConfirm} title={'Confirm Bond'}>
        <Text fontSize="lg" color="text.accent">
          Bonding {truncateNumber(+amountIn, 4)} {currencyIn.symbol} for{' '}
          {truncateNumber(+amountOut, 4)}CNV.
        </Text>
      </WaitingConfirmationDialog>
      <TransactionSubmittedDialog
        tx={bondTransaction}
        isOpen={bondTransaction}
        tokenSymbol={currencyOut.symbol}
        tokenOutAddress={currencyOut.address}
      />
      <TransactionErrorDialog error={txError} isOpen={isOpenRejected} />
    </Card>
  )
}

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})
