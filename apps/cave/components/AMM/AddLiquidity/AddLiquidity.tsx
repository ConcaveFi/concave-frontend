import { CHAIN_NAME, CNV, Currency, CurrencyAmount, DAI } from '@concave/core'
import { Pair } from '@concave/gemswap-sdk'
import { PlusIcon } from '@concave/icons'
import { Button, ButtonProps, Card, Flex, Modal, Text, useDisclosure } from '@concave/ui'
import { CurrencyInputField } from 'components/AMM'
import { useAddLiquidityButtonProps } from 'components/AMM/AddLiquidity/hooks/useAddLiquidityButtonProps'
import { SupplyLiquidityModal } from 'components/AMM/AddLiquidity/SupplyLiquidityModal'
import { SelectAMMCurrency } from 'components/CurrencySelector/SelectAMMCurrency'
import { TransactionSubmittedDialog } from 'components/TransactionDialog/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/TransactionDialog/TransactionWaitingConfirmationDialog'
import { ConnectButton } from 'components/UserWallet/ConnectButton'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { useQueryParams } from 'hooks/useQueryParams'
import Router, { useRouter } from 'next/router'
import { toAmount } from 'utils/toAmount'
import { useAccount, useNetwork } from 'wagmi'
import { useQueryCurrencies } from '../hooks/useQueryCurrencies'
import { NetworkMismatch } from '../NetworkMismatch'
import { useAddLiquidityState } from './hooks/useAddLiquidityState'
import { useAddLiquidityTransaction } from './hooks/useAddLiquidityTransaction'
import { useLiquidityData } from './hooks/useLiquidityData'

const AddSymbol = () => (
  <Flex align="center" justify="center">
    <Flex
      shadow="Up Small"
      borderRadius="full"
      apply="background.metal"
      h={30}
      w={34}
      bgColor="blackAlpha.100"
      align="center"
      justify="center"
    >
      <PlusIcon />
    </Flex>
  </Flex>
)

export type LiquidityPool = {
  pair?: Pair
  amount0: CurrencyAmount<Currency>
  amount1: CurrencyAmount<Currency>
}

export type AddLiquidityContentProps = {
  currencies: [Currency, Currency]
  onChangeCurrencies?: (currencies: [Currency, Currency]) => void
  liquidityModalClose?: VoidFunction
}
function AddLiquidityContent({
  currencies,
  onChangeCurrencies,
  liquidityModalClose,
}: AddLiquidityContentProps) {
  const {
    pair,
    firstFieldAmount,
    secondFieldAmount,
    onChangeFirstField,
    onChangeSecondField,
    onReset,
  } = useAddLiquidityState(currencies, onChangeCurrencies)

  const addLiquidityTransaction = useAddLiquidityTransaction(firstFieldAmount, secondFieldAmount)

  const supplyLiquidityDisclosure = useDisclosure()
  const addLiquidityButtonProps = useAddLiquidityButtonProps(
    pair,
    firstFieldAmount,
    secondFieldAmount,
    supplyLiquidityDisclosure.onOpen,
  )

  const lpData = useLiquidityData({
    pair: pair.data,
    amount0: firstFieldAmount,
    amount1: secondFieldAmount,
  })

  return (
    <>
      <Flex direction="column" gap={2}>
        <CurrencyInputField
          currencyAmountIn={firstFieldAmount}
          onChangeAmount={onChangeFirstField}
          CurrencySelector={onChangeCurrencies ? SelectAMMCurrency : undefined}
        />
        <AddSymbol />
        <CurrencyInputField
          currencyAmountIn={secondFieldAmount}
          onChangeAmount={onChangeSecondField}
          CurrencySelector={onChangeCurrencies ? SelectAMMCurrency : undefined}
        />
      </Flex>

      <Button
        h="50px"
        p={4}
        shadow="Up Small"
        size="large"
        variant="primary"
        {...addLiquidityButtonProps}
      />

      <NetworkMismatch onReset={onReset}>
        {({ queryChainId, activeChainId }) => (
          <Text color="text.low">
            Do you wanna drop this {CHAIN_NAME[queryChainId]} LP <br />
            and restart on {CHAIN_NAME[activeChainId]}?
          </Text>
        )}
      </NetworkMismatch>

      <SupplyLiquidityModal
        lpData={lpData}
        isOpen={supplyLiquidityDisclosure.isOpen}
        onClose={liquidityModalClose || supplyLiquidityDisclosure.onClose}
        onConfirm={addLiquidityTransaction.sendTx}
      />

      <WaitingConfirmationDialog
        isOpen={addLiquidityTransaction.isWaitingForConfirmation}
        title={'Confirm liquidity'}
      >
        <Flex
          width={'220px'}
          height="200px"
          rounded={'2xl'}
          mt={4}
          shadow={'Down Medium'}
          align={'center'}
          direction={'column'}
          textAlign={'center'}
        >
          <Text textColor={'text.low'} fontWeight="700" fontSize={18} mt={4}>
            You will lock
          </Text>
          <Text width={'90%'} fontWeight={'700'} textColor="text.accent">
            {`${lpData.amount0?.toSignificant(6, { groupSeparator: ',' })} ${
              lpData.token0?.symbol
            }`}
          </Text>
          <Text width={'90%'} fontWeight={'700'} textColor="text.accent">
            {`${lpData.amount1?.toSignificant(6, { groupSeparator: ',' })} ${
              lpData.token1?.symbol
            }`}
          </Text>
          <Text textColor={'text.low'} fontWeight="700" fontSize={18} mt={4}>
            You will receive
          </Text>
          <Text width={'90%'} fontWeight={'700'} textColor="text.accent">
            {`${lpData.poolShare?.amount.toSignificant(6, { groupSeparator: ',' })} ${
              lpData?.pair?.liquidityToken?.symbol
            } ${
              +lpData.poolShare?.amount.toSignificant(6, { groupSeparator: ',' }) > 1
                ? 'Tokens'
                : 'Token'
            }`}
          </Text>
        </Flex>
      </WaitingConfirmationDialog>
      <TransactionSubmittedDialog
        txHash={addLiquidityTransaction.tx?.hash}
        isOpen={addLiquidityTransaction.isWaitingTransactionReceipt}
        closeParentComponent={() => {
          onChangeFirstField(toAmount(0, firstFieldAmount.currency))
          if (liquidityModalClose) {
            liquidityModalClose()
          } else {
            supplyLiquidityDisclosure.onClose()
          }
        }}
      />
    </>
  )
}

const useQueryModalControl = <T extends Record<string, string | number>>(defaultParams: T) => {
  const params = useQueryParams<T>()
  const isOpen = Object.keys(defaultParams).every((key) => params?.data?.[key])
  const currentQueryParams = Router.query

  const onClose = () => {
    const cleanQueryParams = Object.entries(currentQueryParams)
      .filter(([key]) => defaultParams[key] === undefined)
      .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {})
    Router.push({ query: cleanQueryParams }, undefined, { shallow: true })
  }

  const onOpen = () => {
    Router.push({ query: { ...currentQueryParams, ...defaultParams } }, undefined, {
      shallow: true,
    })
  }

  return useDisclosure({
    isOpen,
    onClose,
    onOpen,
  })
}

export const AddLiquidityModalButton = ({
  pair,
  label = 'Add liquidity',
  ...buttonProps
}: { label?: string; pair?: Pair } & ButtonProps) => {
  const { isDisconnected } = useAccount()
  if (isDisconnected) return <ConnectButton />
  return (
    <AddLiquidityModal>
      {({ onOpen }) => {
        return (
          <Button
            onClick={onOpen}
            variant="primary"
            size="medium"
            fontFamily="heading"
            w="100%"
            {...buttonProps}
          >
            Add liquidity
          </Button>
        )
      }}
    </AddLiquidityModal>
  )
}

export const AddLiquidityModal = ({
  pair,
  children,
}: { pair?: Pair } & { children: ({ onOpen }) => JSX.Element }) => {
  const chainId = useCurrentSupportedNetworkId()
  const { isDisconnected } = useAccount()
  const addLiquidityDisclosure = useQueryModalControl({
    currency0: CNV[chainId].address,
    currency1: DAI[chainId].address,
    chainId,
  })

  const queryCurrencies = useQueryCurrencies()
  const currencies: [Currency, Currency] = pair
    ? [pair?.token0, pair?.token1]
    : queryCurrencies.currencies

  if (isDisconnected) return <ConnectButton />
  return (
    <>
      {children({ onOpen: addLiquidityDisclosure.onOpen })}
      <Modal
        bluryOverlay={true}
        title="Add liquidity"
        isOpen={addLiquidityDisclosure.isOpen}
        onClose={addLiquidityDisclosure.onClose}
        isCentered
        size={'lg'}
        bodyProps={{
          variant: 'primary',
          borderRadius: '3xl',
          borderWidth: 2,
          p: 6,
          shadow: 'Up for Blocks',
          fontWeight: 'bold',
          fontSize: 'lg',
          gap: 6,
        }}
      >
        <AddLiquidityContent
          currencies={currencies}
          onChangeCurrencies={!pair ? queryCurrencies.onChangeCurrencies : undefined}
          liquidityModalClose={addLiquidityDisclosure.onClose}
        />
      </Modal>
    </>
  )
}

export const AddLiquidityCard = () => {
  const { currencies, onChangeCurrencies } = useQueryCurrencies()
  return (
    <Card
      borderWidth={2}
      variant="primary"
      p={4}
      w={{ base: '340px', md: '500px' }}
      gap={4}
      shadow="Up for Blocks"
    >
      <AddLiquidityContent currencies={currencies} onChangeCurrencies={onChangeCurrencies} />
    </Card>
  )
}
