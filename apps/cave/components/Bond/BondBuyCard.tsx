import { BOND_ADDRESS, CNV, Currency, CurrencyAmount, DAI } from '@concave/core'
import { Button, Card, Flex, HStack, Text, useDisclosure, VStack } from '@concave/ui'
import { AddTokenToWalletButton } from 'components/AddTokenToWalletButton'
import { GasPrice } from 'components/AMM'
import { useCurrencyButtonState } from 'components/CurrencyAmountButton/CurrencyAmountButton'
import { CurrencyInputField as BondInput } from 'components/CurrencyAmountField'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { useCNVPrice } from 'hooks/useCNVPrice'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { toAmount } from 'utils/toAmount'
import { BondOutput } from './BondOutput'
import { getBondAmountOut, getBondSpotPrice, purchaseBond, useBondState } from './BondState'
import { ConfirmBondModal } from './ConfirmBond'
import { DownwardIcon } from './DownwardIcon'
import { Settings, useBondSettings } from './Settings'

import { useTransaction } from 'hooks/TransactionsRegistry/useTransaction'
import { numberMask } from 'utils/numberMask'

export function BondBuyCard(props: {
  updateBondPositions?: VoidFunction
  setRedeemButtonDisabled?: (b: boolean) => void
}) {
  const confirmModal = useDisclosure()
  const rejectDisclosure = useDisclosure()
  const cnvPrice = useCNVPrice()
  const { currencyIn, currencyOut, userAddress, balance, signer, networkId } = useBondState()
  const { settings, setSetting, isDefaultSettings, onClose } = useBondSettings()
  const [amountOut, setAmountOut] = useState<string>()
  const [amountIn, setAmountIn] = useState<CurrencyAmount<Currency>>(toAmount('0', DAI[networkId]))
  const useCurrencyState = useCurrencyButtonState(amountIn, BOND_ADDRESS[networkId])

  useEffect(() => {
    setAmountIn(toAmount(0, DAI[networkId]))
  }, [networkId])

  const { data: bondSpotPrice } = useQuery(
    ['bondSpotPrice', networkId],
    async () => await getBondSpotPrice(networkId),
    { enabled: !!networkId, refetchInterval: 17000 },
  )
  const bondButtonState = !useCurrencyState.approved
    ? useCurrencyState.buttonProps
    : { onClick: confirmModal.onOpen, children: 'Bond' }

  const bondTransaction = useTransaction(
    () => {
      confirmModal.onClose()
      return purchaseBond(networkId, amountIn.toFixed(), userAddress, signer, settings, amountOut)
    },
    {
      onSended: () => {
        setAmountIn(toAmount('0', DAI[networkId]))
        setAmountOut('')
      },
      onSuccess: () => {
        props.setRedeemButtonDisabled(true)
        props.updateBondPositions()
      },
      onError: rejectDisclosure.onOpen,
      meta: {
        type: 'bond',
        amountIn: amountIn.toString(),
        amountOut: toAmount(amountOut, CNV[networkId]).toString(),
      },
    },
  )

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
        onChangeAmount={async (v) => {
          setAmountIn(v)
          try {
            const amountOut = await getBondAmountOut(
              currencyOut.address,
              currencyOut.decimals,
              networkId,
              v.toExact(),
            )
            setAmountOut(amountOut)
          } catch (e) {
            console.log(e)
            setAmountOut('')
          }
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
        transaction={bondTransaction}
        bondPrice={bondSpotPrice}
        minimumAmountOut={(+amountOut - (+settings.slippageTolerance / 100) * +amountOut).toFixed(
          3,
        )}
        slippage={settings.slippageTolerance?.toString()}
      />
      <WaitingConfirmationDialog
        isOpen={bondTransaction.isWaitingForConfirmation}
        title={'Confirm Bond'}
      >
        <Text fontSize="lg" color="text.accent">
          Bonding {amountIn.toString()} for {amountOut} CNV.
        </Text>
      </WaitingConfirmationDialog>
      <TransactionSubmittedDialog
        title="Bond Submitted"
        tx={bondTransaction.tx}
        isOpen={bondTransaction.isWaitingTransactionReceipt}
      >
        <AddTokenToWalletButton token={currencyOut} />
      </TransactionSubmittedDialog>
      <TransactionErrorDialog error={bondTransaction.error} {...rejectDisclosure} />
    </Card>
  )
}
