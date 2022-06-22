import { BOND_ADDRESS, CNV, Currency, CurrencyAmount, DAI } from '@concave/core'
import { Button, Card, Flex, HStack, Text, useDisclosure, VStack } from '@concave/ui'
import { GasPrice } from 'components/AMM'
import { useCurrencyButtonState } from 'components/CurrencyAmountButton/CurrencyAmountButton'
import { CurrencyInputField as BondInput } from 'components/CurrencyAmountField'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { useTransactionRegistry } from 'hooks/TransactionsRegistry'
import { useCNVPrice } from 'hooks/useCNVPrice'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { toAmount } from 'utils/toAmount'
import { BondOutput } from './BondOutput'
import { getBondAmountOut, getBondSpotPrice, purchaseBond, useBondState } from './BondState'
import { ConfirmBondModal } from './ConfirmBond'
import { DownwardIcon } from './DownwardIcon'
import { Settings, useBondSettings } from './Settings'

import { numberMask } from 'utils/numberMask'

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

  const { registerTransaction } = useTransactionRegistry()
  const useCurrencyState = useCurrencyButtonState(amountIn, BOND_ADDRESS[networkId])
  const bondButtonState = useCurrencyState.approved
    ? {
        onClick: confirmModal.onOpen,
        children: 'Bond',
      }
    : useCurrencyState.state

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
              {cnvPrice.price ? '$' + cnvPrice.price?.toFixed(3) + ' CNV' : 'Loading . . .'}
            </Text>
          </HStack>
          <HStack alignSelf={'start'}>
            <Text ml={4} textColor={'text.low'}>
              Bond Price:
            </Text>
            <Text textColor={'text.low'} opacity="0.7">
              {bondSpotPrice ? '$' + numberMask(+bondSpotPrice, 3) + ' CNV' : 'Loading . . .'}
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

      <Button variant="primary" size="large" w="full" {...bondButtonState} />

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
              registerTransaction(tx, {
                type: 'bond',
                amountIn: amountIn.toString(),
                amountOut: toAmount(amountOut, CNV[networkId]).toString(),
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
          Bonding {amountIn.toString()} for {amountOut} CNV.
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
