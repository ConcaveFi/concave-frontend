import { Currency, CurrencyAmount, NATIVE, Percent, ROUTER_ADDRESS, Token } from '@concave/core'
import { Pair, PermitSignature } from '@concave/gemswap-sdk'
import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  NumericInput,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@concave/ui'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { useCurrencyApprove } from 'components/CurrencyAmountButton/CurrencyAmountButton'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { PositionInfoItem } from 'components/LiquidityPoolPositions/MyPositions'
import { TransactionErrorDialog } from 'components/TransactionDialog/TransactionErrorDialog'
import { TransactionSubmittedDialog } from 'components/TransactionDialog/TransactionSubmittedDialog'
import { useErrorModal } from 'contexts/ErrorModal'

import { WaitingConfirmationDialog } from 'components/TransactionDialog/TransactionWaitingConfirmationDialog'
import { useTransaction } from 'hooks/TransactionsRegistry/useTransaction'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { RemoveLiquidityState, useRemoveLiquidity } from 'hooks/useRemoveLiquidity'
import { Router } from 'lib/Router'
import { useAccount, useSigner } from 'wagmi'

export const RemoveLiquidityModalButton = ({
  liquidityInfo,
  label = 'Withdraw',
  ...buttonProps
}: {
  label?: string
  liquidityInfo: {
    pair: Pair
    userPoolShare: Percent
    userBalance: CurrencyAmount<Currency>
  }
}) => {
  const removeLiquidityDisclosure = useDisclosure()
  const removeLiquidityState = useRemoveLiquidity(liquidityInfo)
  if (!liquidityInfo.userBalance.greaterThan(0)) {
    return <></>
  }
  return (
    <>
      <Button
        onClick={removeLiquidityDisclosure.onOpen}
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
        title="Remove liquidity"
        {...removeLiquidityDisclosure}
        isCentered
        bodyProps={{
          variant: 'primary',
          borderRadius: '3xl',
          borderWidth: 2,
          p: { base: 4, md: 6 },
          maxW: '400px',
          w: { base: `auto`, sm: `500px` },
          shadow: 'Up for Blocks',
          fontWeight: 'bold',
          fontSize: 'lg',
          gap: 4,
        }}
      >
        <AmountToRemove onChange={removeLiquidityState.setPercentToRemove} />
        <YouWillReceive {...removeLiquidityState} />
        <RemoveLiquidityActions
          removeLiquidityState={removeLiquidityState}
          closeParentComponent={removeLiquidityDisclosure.onClose}
        />
        <YourPosition {...removeLiquidityState} {...liquidityInfo} />
      </Modal>
    </>
  )
}

const AmountToRemove = ({ onChange }: { onChange: (n: number) => void }) => {
  return (
    <Flex shadow="Up Big" p={2} gap={2} borderRadius="2xl" justify="space-between" align="center">
      <Text px={2}>Amount to remove</Text>
      <NumericInput
        autoFocus={true}
        shadow="down"
        onValueChange={({ floatValue }, eventSrc) =>
          eventSrc.source === 'event' && onChange(floatValue)
        }
        borderRadius="2xl"
        isAllowed={({ floatValue }) => !floatValue || (floatValue <= 100 && floatValue >= 0)}
        py={2}
        px={4}
        w="180px"
        textAlign="right"
        suffix=" %"
        placeholder="0.0 %"
      />
    </Flex>
  )
}
const YouWillReceive = ({
  pair,
  amountAMin,
  amountBMin,
  hasNativeToken,
  receiveInNativeToken,
  tokenAIsNativeWrapper,
  tokenBIsNativeWrapper,
  handleNativeToken,
}: RemoveLiquidityState) => {
  return (
    <HStack gap={2} shadow="Up Big" p={2} borderRadius="2xl" align="center">
      <Box px={2} w={'full'}>
        <Text fontSize={{ base: '12px', md: 'md' }}>You will receive:</Text>
        {hasNativeToken && (
          <Button onClick={handleNativeToken}>
            <Text fontWeight={400} fontStyle={'md'} color={'#2E97E2'} fontSize={'14px'}>
              Receive {receiveInNativeToken ? 'WETH' : 'ETH'} instead
            </Text>
          </Button>
        )}
      </Box>
      <ReceiveBox
        receiveInNative={tokenAIsNativeWrapper && receiveInNativeToken}
        amount={amountAMin}
        token={pair.token0}
      />
      <ReceiveBox
        receiveInNative={tokenBIsNativeWrapper && receiveInNativeToken}
        amount={amountBMin}
        token={pair.token1}
      />
    </HStack>
  )
}

const ReceiveBox = ({
  amount,
  token,
  receiveInNative,
}: {
  amount: CurrencyAmount<Currency>
  token: Token
  receiveInNative?: boolean
}) => {
  const isMobile = useBreakpointValue({ base: true, sm: false })
  const currency = receiveInNative ? NATIVE[token.chainId] : token
  return (
    <HStack w={'full'} shadow="down" borderRadius="2xl" p={2}>
      <CurrencyIcon link size="sm" currency={currency} />
      <Box w={'full'} minW={'45px'}>
        <Text fontSize={{ base: '12px', md: 'md' }} fontFamily={'heading'} fontWeight={600}>
          {amount ? amount.toSignificant(isMobile ? 3 : 5, { groupSeparator: ',' }) : 0}
        </Text>
        <Text
          fontSize={{ base: '12px', md: 'sm' }}
          title={currency?.name}
          fontWeight={700}
          color={'text.low'}
        >
          {currency?.symbol}
        </Text>
      </Box>
    </HStack>
  )
}
const RemoveLiquidityActions = ({
  removeLiquidityState,
  closeParentComponent,
}: {
  removeLiquidityState: { pair: Pair } & RemoveLiquidityState
  closeParentComponent: VoidFunction
}) => {
  const networkId = useCurrentSupportedNetworkId()
  const { address } = useAccount()
  const currencyAmount = CurrencyAmount.fromRawAmount(
    removeLiquidityState.pair.liquidityToken,
    removeLiquidityState.amountToRemove.toString(),
  )
  const currencyApprove = useCurrencyApprove(currencyAmount, ROUTER_ADDRESS[networkId])
  const { data: signer } = useSigner()

  const { amountAMin, amountBMin, amountToRemove } = removeLiquidityState
  const meta = {
    type: `remove liquidity`,
    amount0: amountAMin.toString(),
    amount1: amountBMin.toString(),
    pairSymbol: `${amountAMin.currency.symbol}-${amountBMin.currency.symbol}`,
  } as const
  const errorModal = useErrorModal()
  const removeTransaction = useTransaction(
    () => {
      const router = new Router(networkId, signer)
      return router.removeLiquidity(
        amountAMin,
        amountBMin,
        amountToRemove,
        address,
        currencyApprove.permit.signedPermit as PermitSignature,
      )
    },
    {
      meta,
      onError: errorModal.onOpen
    },
  )

  return (
    <Flex gap={4} h={45} justifyContent={'center'}>
      <Button
        disabled={!removeLiquidityState.percentToRemove}
        {...currencyApprove.buttonProps}
        onClick={() => currencyApprove.permit.signPermit()}
        w={`full`}
        variant={'primary'}
      />

      <Button
        disabled={!currencyApprove.approved || !removeLiquidityState.percentToRemove}
        w={`full`}
        variant={'primary'}
        onClick={removeTransaction.sendTx}
      >
        Confirm withdrawal
      </Button>

      <WaitingConfirmationDialog
        isOpen={removeTransaction.isWaitingForConfirmation}
        title={'Confirm withdrawal'}
      >
        <Flex
          w={'full'}
          height="107px"
          rounded={'2xl'}
          mt={4}
          shadow={'Down Medium'}
          align={'center'}
          fontWeight="700"
          direction={'column'}
        >
          <Text textColor={'text.low'} fontSize={18} mt={4}>
            You will receive
          </Text>
          <Text textColor="text.accent">{`${removeLiquidityState.amountAMin.toString()}`}</Text>
          <Text textColor="text.accent">{`${removeLiquidityState.amountBMin.toString()}`}</Text>
        </Flex>
      </WaitingConfirmationDialog>

      <TransactionSubmittedDialog
        title="Withdraw"
        subtitle="Withdraw"
        tx={{ hash: removeTransaction.tx?.hash } as TransactionResponse}
        isOpen={removeTransaction.isWaitingTransactionReceipt}
        closeParentComponent={closeParentComponent}
      />
    </Flex>
  )
}

const YourPosition = ({ pair, userPoolShare }: { pair: Pair; userPoolShare: Percent }) => {
  return (
    <Flex gap={7} direction={'column'} shadow="Up Big" px={4} py={4} borderRadius="2xl">
      <Text fontSize={'lg'}>Your position</Text>
      <Flex gap={2} align={'center'}>
        <CurrencyIcon size="sm" currency={pair.token0} />
        <CurrencyIcon size="sm" currency={pair.token1} />
        <Text px={4}>
          {pair.token0.symbol}/{pair.token1.symbol}
        </Text>
      </Flex>
      <Stack
        fontWeight="bold"
        fontSize="lg"
        color="text.medium"
        borderRadius="2xl"
        shadow="inset 0px -5px 10px rgba(134, 175, 255, 0.05), inset -9px 12px 24px rgba(13, 17, 23, 0.4)"
        p={4}
        spacing={3}
      >
        <PositionInfoItem label="Your pool share:" value={`${userPoolShare.toFixed(4)}%`} />
        <PositionInfoItem
          label={pair.token0.symbol}
          value={pair.reserve0.multiply(userPoolShare).toFixed(2)}
        >
          <CurrencyIcon link size="sm" currency={pair.token0} />
        </PositionInfoItem>
        <PositionInfoItem
          label={pair.token1.symbol}
          value={pair.reserve1.multiply(userPoolShare).toFixed(2)}
        >
          <CurrencyIcon link size="sm" currency={pair.token1} />
        </PositionInfoItem>
      </Stack>
    </Flex>
  )
}
