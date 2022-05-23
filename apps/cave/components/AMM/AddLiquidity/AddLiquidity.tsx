import { CHAIN_NAME, Currency, CurrencyAmount } from '@concave/core'
import { Pair } from '@concave/gemswap-sdk'
import { PlusIcon } from '@concave/icons'
import { Button, ButtonProps, Card, Flex, Modal, Text, useDisclosure } from '@concave/ui'
import { CurrencyInputField } from 'components/AMM'
import { SupplyLiquidityModal } from 'components/AMM/AddLiquidity/SupplyLiquidityModal'
import { useAddLiquidityButtonProps } from 'components/AMM/AddLiquidity/useAddLiquidityButtonProps'
import { useAddLiquidityState } from 'components/AMM/AddLiquidity/useAddLiquidityState'
import { useAddLiquidityTransaction } from 'components/AMM/AddLiquidity/useAddLiquidityTransaction'
import { ConnectWallet } from 'components/ConnectWallet'
import { SelectAMMCurrency } from 'components/CurrencySelector/SelectAMMCurrency'
import { TransactionErrorDialog } from 'components/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { WaitingConfirmationDialog } from 'components/WaitingConfirmationDialog'
import React, { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useQueryCurrencies } from '../hooks/useQueryCurrencies'
import { NetworkMismatch } from '../NetworkMismatch'

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

function AddLiquidityContent({ currencies }: { currencies: Currency[] }) {
  const { onChangeCurrencies, isNetworkMismatch, queryHasCurrency, currentChainId, queryChainId } =
    useQueryCurrencies()

  const { pair, firstFieldAmount, secondFieldAmount, onChangeFirstField, onChangeSecondField } =
    useAddLiquidityState(currencies, onChangeCurrencies)

  const addLPTx = useAddLiquidityTransaction(firstFieldAmount, secondFieldAmount)

  const supplyLiquidityDisclosure = useDisclosure()
  const addLiquidityButtonProps = useAddLiquidityButtonProps(
    pair,
    firstFieldAmount,
    secondFieldAmount,
    supplyLiquidityDisclosure.onOpen,
  )
  const fixedPair = pair.data ?? Pair.createVirtualPair(firstFieldAmount, secondFieldAmount)

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

      <NetworkMismatch
        isOpen={isNetworkMismatch && queryHasCurrency}
        expectedChainId={queryChainId}
        currentChainId={currentChainId}
      >
        <Text color="text.low">
          Do you wanna drop this {CHAIN_NAME[queryChainId]} LP <br />
          and restart on {CHAIN_NAME[currentChainId]}?
        </Text>
      </NetworkMismatch>

      <SupplyLiquidityModal
        lp={{ pair: fixedPair, amount0: firstFieldAmount, amount1: secondFieldAmount }}
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

export const AddLiquidityModalButton = ({
  pair,
  label = 'Add liquidity',
  ...buttonProps
}: { label?: string; pair?: Pair } & ButtonProps) => {
  const [{ data: account }] = useAccount()
  const addLiquidityDisclosure = useDisclosure()
  const currencies = useMemo(() => [pair?.token0, pair?.token1], [pair?.token0, pair?.token1])
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
        <AddLiquidityContent currencies={currencies} />
      </Modal>
    </>
  )
}

export const AddLiquidityCard = ({ currencies }: { currencies: Currency[] }) => {
  return (
    <Card
      borderWidth={2}
      variant="primary"
      p={4}
      w={{ base: '340px', md: '500px' }}
      gap={6}
      shadow="Up for Blocks"
    >
      <AddLiquidityContent currencies={currencies} />
    </Card>
  )
}
