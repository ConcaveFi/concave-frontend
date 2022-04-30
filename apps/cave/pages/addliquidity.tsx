import React from 'react'

import { PlusIcon } from '@concave/icons'
import { Button, Card, Flex, Heading, Text, useDisclosure } from '@concave/ui'
import { Currency, CurrencyAmount, Pair } from 'gemswap-sdk'

import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'

import { InputField } from 'components/AMM'
import { useAddLiquidityTransaction } from 'components/AMM/AddLiquidity/useAddLiquidityTransaction'
import { useAddLiquidityState } from 'components/AMM/AddLiquidity/useAddLiquidityState'
import { usePoolShare } from 'components/AMM/AddLiquidity/usePoolShare'
import { SupplyLiquidityModal } from 'components/AMM/AddLiquidity/SupplyLiquidityModal'
import { useAddLiquidityButtonProps } from 'components/AMM/AddLiquidity/useAddLiquidityButtonProps'
import {
  currencyFromJson,
  fetchCurrenciesFromQuery,
  useCurrenciesFromUrl,
} from 'components/AMM/hooks/useCurrenciesFromUrl'

const LiquidityTip = () => (
  <Card variant="secondary" p={4} backgroundBlendMode={'screen'}>
    <Text fontSize="lg">
      Tip: When you add liquidity, you will receive pool tokens representing your position. These
      tokens automatically earn fees proportional to your share of the pool, and can be redeemed at
      any time.
    </Text>
  </Card>
)

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

export const getServerSideProps = async (ctx) => {
  const [token0, token1] = await fetchCurrenciesFromQuery(ctx.query)
  return { props: { token0, token1 } }
}

export default function AddLiquidity({ token0, token1 }) {
  const initialTokens = [currencyFromJson(token0), currencyFromJson(token1)]

  const { pair, firstFieldAmount, secondFieldAmount, onChangeFirstField, onChangeSecondField } =
    useAddLiquidityState(initialTokens)

  useCurrenciesFromUrl(firstFieldAmount?.currency, secondFieldAmount?.currency)

  const addLPTx = useAddLiquidityTransaction(firstFieldAmount, secondFieldAmount)

  const poolShare = usePoolShare(pair.data, firstFieldAmount, secondFieldAmount)

  const addLiquidityButtonProps = useAddLiquidityButtonProps(
    pair,
    firstFieldAmount,
    secondFieldAmount,
    () => supplyLiquidityDisclosure.onOpen(),
  )

  const supplyLiquidityDisclosure = useDisclosure()

  return (
    <>
      <Flex direction="column" justify="center" align="center" w="100%" h="full" gap={6}>
        <Heading fontSize="3xl" w="500px">
          Add liquidity
        </Heading>
        <Card variant="primary" p={4} w="500px" gap={4} shadow="Up for Blocks">
          <LiquidityTip />
          <Flex direction="column" p={4} gap={2}>
            <InputField currencyAmountIn={firstFieldAmount} onChangeAmount={onChangeFirstField} />
            <AddSymbol />
            <InputField currencyAmountIn={secondFieldAmount} onChangeAmount={onChangeSecondField} />
          </Flex>

          <Button
            h="50px"
            p={4}
            shadow="Up Small"
            size="large"
            variant="primary"
            {...addLiquidityButtonProps}
          />
        </Card>
      </Flex>

      <SupplyLiquidityModal
        lp={{ pair: pair.data, amount0: firstFieldAmount, amount1: secondFieldAmount }}
        poolShare={poolShare}
        isOpen={supplyLiquidityDisclosure.isOpen}
        onClose={supplyLiquidityDisclosure.onClose}
        onConfirm={addLPTx.submit}
      />

      <WaitingConfirmationDialog isOpen={addLPTx.isWaitingForConfirmation} />
      <TransactionSubmittedDialog tx={addLPTx.data} isOpen={addLPTx.isTransactionSent} />
      <TransactionErrorDialog error={addLPTx.error?.message} isOpen={addLPTx.isError} />
    </>
  )
}
