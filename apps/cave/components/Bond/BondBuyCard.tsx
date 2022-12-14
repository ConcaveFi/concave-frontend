import { BOND_ADDRESS, CNV, Currency, CurrencyAmount, DAI } from '@concave/core'
import { Button, Card, Flex, HStack, Text, useDisclosure } from '@concave/ui'
import { AddTokenToWalletButton } from 'components/AddTokenToWalletButton'
import { GasPrice } from 'components/AMM'
import { useCurrencyApprove } from 'components/CurrencyAmountButton/CurrencyAmountButton'
import { CurrencyInputField as BondInput } from 'components/CurrencyAmountField'
import { WaitingConfirmationDialog } from 'components/TransactionDialog/TransactionWaitingConfirmationDialog'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { toAmount } from 'utils/toAmount'
import { BondOutput } from './BondOutput'
import { getBondAmountOut, getBondSpotPrice, purchaseBond, useBondState } from './BondState'
import { ConfirmBondModal } from './ConfirmBond'
import { DownwardIcon } from './DownwardIcon'
import { Settings, useBondSettings } from './Settings'
import { TransactionSubmittedDialog } from 'components/TransactionDialog/TransactionSubmittedDialog'
import { useTransaction } from 'hooks/TransactionsRegistry/useTransaction'
import { useErrorModal } from 'contexts/ErrorModal'

export function BondBuyCard(props: { updateBondPositions?: VoidFunction }) {
  const confirmModal = useDisclosure()
  const { currencyIn, currencyOut, userAddress, balance, signer, networkId } = useBondState()
  const settings = useBondSettings((s) => s.settings)
  const [amountOut, setAmountOut] = useState<string>()
  const [amountIn, setAmountIn] = useState<CurrencyAmount<Currency>>(toAmount('0', DAI[networkId]))
  const currencyApprove = useCurrencyApprove(amountIn, BOND_ADDRESS[networkId])
  const errorModal = useErrorModal()

  useEffect(() => {
    setAmountIn(toAmount(0, DAI[networkId]))
  }, [networkId])

  const { data: bondSpotPrice } = useQuery(
    ['bondSpotPrice', networkId],
    async () => await getBondSpotPrice(networkId),
    { enabled: !!networkId, refetchInterval: 17000 },
  )
  const bondButtonState = !currencyApprove.approved
    ? currencyApprove.buttonProps
    : { onClick: confirmModal.onOpen, children: 'Bond' }

  const bondTransaction = useTransaction(
    () => {
      confirmModal.onClose()
      return purchaseBond(networkId, amountIn.toFixed(), userAddress, signer, settings, amountOut)
    },
    {
      onSend: () => {
        setAmountIn(toAmount('0', DAI[networkId]))
        setAmountOut('')
      },
      onSuccess: () => {
        props.updateBondPositions()
      },
      onError: errorModal.onOpen,
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
      <Flex direction={'column'} flex={1} justify={'space-between'} py={5}>
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
      </Flex>
      <Flex pb={5} align={'center'} justify="center" minWidth={100} gap={2}>
        <GasPrice />
        <HStack align="center" justify="end">
          <Settings />
        </HStack>
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
        title={'Confirm bond'}
      >
        <Text fontSize="lg" color="text.accent">
          Bonding {amountIn.toString()} for {amountOut} CNV.
        </Text>
      </WaitingConfirmationDialog>
      <TransactionSubmittedDialog
        title="Bond submitted"
        tx={bondTransaction.tx}
        isOpen={bondTransaction.isWaitingTransactionReceipt}
      >
        <AddTokenToWalletButton token={currencyOut} />
      </TransactionSubmittedDialog>
    </Card>
  )
}
