<<<<<<< HEAD
import { CNV, Currency, CurrencyAmount, DAI } from '@concave/core'
import { Card, Flex, HStack, keyframes, Spinner, Text, useDisclosure, VStack } from '@concave/ui'
=======
import { Currency, CurrencyAmount, DAI } from '@concave/core'
import { Card, Flex, HStack, keyframes, Text, useDisclosure, VStack } from '@concave/ui'
>>>>>>> ea3e96a8a7bbaa0481a1fa79002ea851cbd9f1da
import { ApproveButton } from 'components/ApproveButton/ApproveButton'
import { CurrencyInputField as BondInput } from 'components/CurrencyAmountField'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { BOND_ADDRESS } from '@concave/core'
import { useGet_Amm_Cnv_PriceQuery } from 'graphql/generated/graphql'
import { useRecentTransactions } from 'hooks/useRecentTransactions'
import React, { useEffect, useState } from 'react'
import { toAmount } from 'utils/toAmount'
import { truncateNumber } from 'utils/truncateNumber'
import { useFeeData } from 'wagmi'
import { BondOutput } from './BondOutput'
import { getBondAmountOut, getBondSpotPrice, purchaseBond, useBondState } from './BondState'
import { ConfirmBondModal } from './ConfirmBond'
import { DownwardIcon } from './DownwardIcon'
import { Settings, useBondSettings } from './Settings'
import { useQuery } from 'react-query'
import { GasPrice } from 'components/AMM'
import { useFiatPrice } from 'components/AMM/hooks/useFiatPrice'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { formatFixed } from 'utils/formatFixed'
import { useCNVPrice } from 'hooks/useCNVPrice'

export const twoDecimals = (s: string | number) => {
  const a = s.toString()
  return a.indexOf('.') > -1 ? a.slice(0, a.indexOf('.') + 3) : a
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

  const { settings, setSetting, isDefaultSettings, onClose } = useBondSettings()
  const [amountIn, setAmountIn] = useState<CurrencyAmount<Currency>>(toAmount('0', DAI[networkId]))

  useEffect(() => {
    setAmountIn(toAmount(0, DAI[networkId]))
  }, [networkId])

  const [amountOut, setAmountOut] = useState<string>()
  const confirmModal = useDisclosure()
  const [hasClickedConfirm, setHasClickedConfirm] = useState(false)

  const cnvPrice = useCNVPrice()

  const { data: bondSpotPrice } = useQuery(
    ['bondSpotPrice', networkId],
    async () => await getBondSpotPrice(networkId),
    { enabled: !!networkId, refetchInterval: 17000 },
  )

  const [txError, setTxError] = useState('')
  const {
    isOpen: isOpenRejected,
    onClose: onCloseRejected,
    onOpen: onOpenRejected,
  } = useDisclosure()

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
              {cnvPrice.price ? '$' + cnvPrice.price?.toFixed(2) + ' CNV' : 'Loading . . .'}
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
            <Settings
              settings={settings}
              setSetting={setSetting}
              isDefaultSettings={isDefaultSettings}
              onClose={onClose}
            />
          </HStack>
        </Flex>
      </Flex>

      <ApproveButton
        variant="primary"
        size="large"
        w="full"
        approveArgs={{
          currency: currencyIn,
          amount: amountIn.numerator,
          spender: BOND_ADDRESS[networkId],
        }}
        isDisabled={amountIn.equalTo(0) || balance.data?.lessThan(amountIn)}
        onClick={confirmModal.onOpen}
      >
        {balance.data?.lessThan(amountIn.numerator)
          ? `Insufficient ${amountIn.currency.symbol}`
          : 'Bond'}
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
        minimumAmountOut={(+amountOut - (+settings.slippageTolerance / 100) * +amountOut).toFixed(
          3,
        )}
        slippage={settings.slippageTolerance?.toString()}
      />
      <WaitingConfirmationDialog isOpen={hasClickedConfirm} title={'Confirm Bond'}>
        <Text fontSize="lg" color="text.accent">
          Bonding {truncateNumber(+amountIn.numerator.toString(), 4)} {currencyIn.symbol} for{' '}
          {truncateNumber(+amountOut * 10 ** 18, 4)}CNV.
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
