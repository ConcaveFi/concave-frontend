import { Currency, CurrencyAmount, Pair } from '@concave/gemswap-sdk'
import { PlusIcon } from '@concave/icons'
import { Button, ButtonProps, Card, CardProps, Flex, Modal, useDisclosure, Text } from '@concave/ui'
import { CurrencyInputField } from 'components/AMM'
import { SupplyLiquidityModal } from 'components/AMM/AddLiquidity/SupplyLiquidityModal'
import { useAddLiquidityButtonProps } from 'components/AMM/AddLiquidity/useAddLiquidityButtonProps'
import { useAddLiquidityState } from 'components/AMM/AddLiquidity/useAddLiquidityState'
import { useAddLiquidityTransaction } from 'components/AMM/AddLiquidity/useAddLiquidityTransaction'
import { ConnectWallet } from 'components/ConnectWallet'
import { SelectAMMCurrency } from 'components/CurrencySelector/SelectAMMCurrency'
import { Loading } from 'components/Loading'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import { precision } from 'hooks/usePrecision'
import React from 'react'
import { toAmount } from 'utils/toAmount'
import { useAccount } from 'wagmi'
import useLiquidityData from './useLiquidityData'

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
  pair: Pair
  amount0: CurrencyAmount<Currency>
  amount1: CurrencyAmount<Currency>
}

// export const getServerSideProps = async (ctx) => {
//   const [token0, token1] = await fetchCurrenciesFromQuery(ctx.query)
//   return { props: { token0, token1 } }
// }

function AddLiquidityContent({
  currency0,
  currency1,
  liquidityModalClose,
}: {
  currency0?: Currency
  currency1?: Currency
  liquidityModalClose?: VoidFunction
} = {}) {
  // const initialTokens = [currencyFromJson(token0), currencyFromJson(token1)]
  const { pair, firstFieldAmount, secondFieldAmount, onChangeFirstField, onChangeSecondField } =
    useAddLiquidityState({
      first: toAmount('0', currency0),
      second: toAmount('0', currency1),
    })
  // useSyncCurrenciesToUrl(firstFieldAmount?.currency, secondFieldAmount?.currency)

  const addLPTx = useAddLiquidityTransaction(firstFieldAmount, secondFieldAmount)

  const addLiquidityButtonProps = useAddLiquidityButtonProps(
    pair,
    firstFieldAmount,
    secondFieldAmount,
    () => supplyLiquidityDisclosure.onOpen(),
  )
  const fixedPair = pair.data ?? Pair.createVirtualPair(firstFieldAmount, secondFieldAmount)
  const supplyLiquidityDisclosure = useDisclosure()

  const lpData = useLiquidityData({
    pair: fixedPair,
    amount0: firstFieldAmount,
    amount1: secondFieldAmount,
  })

  return (
    <>
      <Flex direction="column" p={4} gap={2}>
        <CurrencyInputField
          currencyAmountIn={firstFieldAmount}
          onChangeAmount={onChangeFirstField}
          CurrencySelector={SelectAMMCurrency}
        />
        <AddSymbol />
        <CurrencyInputField
          currencyAmountIn={secondFieldAmount}
          onChangeAmount={onChangeSecondField}
          CurrencySelector={SelectAMMCurrency}
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

      <SupplyLiquidityModal
        lpData={lpData}
        isOpen={supplyLiquidityDisclosure.isOpen}
        onClose={liquidityModalClose || supplyLiquidityDisclosure.onClose}
        onConfirm={addLPTx.submit}
      />

      <WaitingConfirmationDialog
        isOpen={addLPTx.isWaitingForConfirmation}
        title={'Confirm Liquidity'}
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
        tx={addLPTx.data}
        isOpen={addLPTx.isTransactionSent}
        closeParentComponent={liquidityModalClose || supplyLiquidityDisclosure.onClose}
      />
      <TransactionErrorDialog error={addLPTx.error?.message} isOpen={addLPTx.isError} />
    </>
  )
}

export const AddLiquidityModalButton = ({
  pair,
  label = 'Add liquidity',
  ...buttonProps
}: { label?: string; pair?: Pair } & ButtonProps) => {
  const [{ data: account }] = useAccount()
  const addLiquidityDisclosure = useDisclosure()
  if (!account?.address) {
    return <ConnectWallet />
  }
  return (
    <>
      <Button
        onClick={addLiquidityDisclosure.onOpen}
        variant="primary"
        size="medium"
        fontFamily="heading"
        w="100%"
        {...buttonProps}
      >
        {label}
      </Button>

      <Modal
        bluryOverlay={true}
        title="Add Liquidity"
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
          currency0={pair?.token0}
          currency1={pair?.token1}
          liquidityModalClose={addLiquidityDisclosure.onClose}
        />
      </Modal>
    </>
  )
}

export const AddLiquidityCard = (
  props: CardProps & { currency0?: Currency; currency1?: Currency; isLoading?: boolean },
) => {
  if (props.isLoading) return <Loading size="md" />
  return (
    <Card {...props}>
      <AddLiquidityContent currency0={props.currency0} currency1={props.currency1} />
    </Card>
  )
}
