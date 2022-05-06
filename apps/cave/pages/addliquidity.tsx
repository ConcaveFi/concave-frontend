import { Currency, CurrencyAmount, Pair } from '@concave/gemswap-sdk'
import { PlusIcon } from '@concave/icons'
import { Button, Card, Flex, Heading, Text, useDisclosure } from '@concave/ui'
import { CurrencyInputField } from 'components/AMM'
import { SupplyLiquidityModal } from 'components/AMM/AddLiquidity/SupplyLiquidityModal'
import { useAddLiquidityButtonProps } from 'components/AMM/AddLiquidity/useAddLiquidityButtonProps'
import { useAddLiquidityState } from 'components/AMM/AddLiquidity/useAddLiquidityState'
import { useAddLiquidityTransaction } from 'components/AMM/AddLiquidity/useAddLiquidityTransaction'
import { usePoolShare } from 'components/AMM/AddLiquidity/usePoolShare'
import { SelectAMMCurrency } from 'components/CurrencySelector/SelectAMMCurrency'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import React from 'react'

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

// export const getServerSideProps = async (ctx) => {
//   const [token0, token1] = await fetchCurrenciesFromQuery(ctx.query)
//   return { props: { token0, token1 } }
// }

export default function AddLiquidity() {
  // const initialTokens = [currencyFromJson(token0), currencyFromJson(token1)]

  const { pair, firstFieldAmount, secondFieldAmount, onChangeFirstField, onChangeSecondField } =
    useAddLiquidityState()

  // useSyncCurrenciesToUrl(firstFieldAmount?.currency, secondFieldAmount?.currency)

  const addLPTx = useAddLiquidityTransaction(firstFieldAmount, secondFieldAmount)

  const addLiquidityButtonProps = useAddLiquidityButtonProps(
    pair,
    firstFieldAmount,
    secondFieldAmount,
    () => supplyLiquidityDisclosure.onOpen(),
  )
  const fixedPair = pair.data ?? Pair.createVirtualPair(firstFieldAmount, secondFieldAmount)
  const poolShare = usePoolShare(fixedPair, firstFieldAmount, secondFieldAmount)
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
        </Card>
      </Flex>

      <SupplyLiquidityModal
        lp={{ pair: fixedPair, amount0: firstFieldAmount, amount1: secondFieldAmount }}
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
