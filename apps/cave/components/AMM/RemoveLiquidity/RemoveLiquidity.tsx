import { Currency, CurrencyAmount, NATIVE, Percent, ROUTER_ADDRESS } from '@concave/core'
import { Pair } from '@concave/gemswap-sdk'
import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  NumericInput,
  Stack,
  Text,
  useDisclosure,
} from '@concave/ui'
import { ApproveButton } from 'components/ApproveButton/ApproveButton'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { PositionInfoItem } from 'components/Positions/MyPositions'
import { TransactionSubmittedDialog } from 'components/TransactionSubmittedDialog'
import { Transaction } from 'ethers'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { RemoveLiquidityState, useRemoveLiquidity } from 'hooks/useRemoveLiquidity'
import React, { useState } from 'react'

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
        title="Remove Liquidity"
        isOpen={removeLiquidityDisclosure.isOpen}
        onClose={removeLiquidityDisclosure.onClose}
        isCentered
        size={'2xl'}
        bodyProps={{
          borderRadius: '3xl',
          fontWeight: 'bold',
          fontSize: 'lg',
          gap: 6,
        }}
      >
        <AmountToRemove onChange={removeLiquidityState.setPercentToRemove} />
        <YouWillReceive
          pair={removeLiquidityState.pair}
          amountAMin={removeLiquidityState.amountAMin}
          amountBMin={removeLiquidityState.amountBMin}
          hasNativeToken={removeLiquidityState.hasNativeToken}
          receiveInNativeToken={removeLiquidityState.receiveInNativeToken}
          handleNativeToken={removeLiquidityState.handleNativeToken}
        />
        <RemoveLiquidityActions removeLiquidityState={removeLiquidityState} />
        <YourPosition
          pair={removeLiquidityState.pair}
          userPoolShare={liquidityInfo.userPoolShare}
        />
      </Modal>
    </>
  )
}

const AmountToRemove = ({ onChange }: { onChange: (n: number) => void }) => {
  return (
    <Flex shadow="Up Big" px={6} py={3} borderRadius="2xl" justify="space-between" align="center">
      <Text>Amount to remove</Text>
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
  handleNativeToken,
}: Partial<RemoveLiquidityState>) => {
  return (
    <HStack gap={7} shadow="Up Big" px={6} py={3} borderRadius="2xl" align="center">
      <Box>
        <Text>You will receive:</Text>
        {hasNativeToken && (
          <Button onClick={handleNativeToken}>
            <Text fontWeight={400} fontStyle={'md'} color={'#2E97E2'} fontSize={'14px'}>
              Receive {receiveInNativeToken ? 'WETH' : 'ETH'} instead
            </Text>
          </Button>
        )}
      </Box>
      <ReceiveBox
        receiveInNative={pair.token0.isNative && receiveInNativeToken}
        amount={amountAMin}
      />
      <ReceiveBox
        receiveInNative={pair.token0.isNative && receiveInNativeToken}
        amount={amountBMin}
      />
    </HStack>
  )
}

const ReceiveBox = ({
  amount,
  receiveInNative,
}: {
  amount: CurrencyAmount<Currency>
  receiveInNative?: boolean
}) => {
  const currency = receiveInNative ? NATIVE[amount.currency.chainId] : amount.currency
  return (
    <HStack shadow="down" borderRadius="2xl" p={3}>
      <CurrencyIcon size="sm" currency={currency} />
      <Box>
        <Text fontFamily={'heading'} fontWeight={600}>
          {amount.toFixed(4)}
        </Text>
        <Text title={currency?.name} fontWeight={700} fontSize={'sm'} color={'text.low'}>
          {currency?.symbol}
        </Text>
      </Box>
    </HStack>
  )
}
const RemoveLiquidityActions = ({
  removeLiquidityState,
}: {
  removeLiquidityState: { pair: Pair } & RemoveLiquidityState
}) => {
  const networkId = useCurrentSupportedNetworkId()
  const transactionStatusDisclosure = useDisclosure()
  const [currencyApproved, setCurrencyApproved] = useState(false)
  const confirmedWithdrawal = async () => {
    try {
      transactionStatusDisclosure.onOpen()
      await removeLiquidityState.removeLiquidity()
    } catch (err) {
      transactionStatusDisclosure.onClose()
    }
  }

  return (
    <Flex gap={4} h={45} justifyContent={'center'}>
      <ApproveButton
        approveArgs={{
          currency: removeLiquidityState.pair.liquidityToken,
          spender: ROUTER_ADDRESS[networkId],
          onSuccess: () => setCurrencyApproved(true),
        }}
        disabled={!removeLiquidityState.percentToRemove}
        w={250}
        variant={'primary'}
      />

      <Button
        disabled={!currencyApproved || !removeLiquidityState.percentToRemove}
        w={250}
        variant={'primary'}
        onClick={confirmedWithdrawal}
      >
        Confirm Withdrawal
      </Button>

      <TransactionSubmittedDialog
        title="Withdraw"
        subtitle="Withdraw values"
        tx={{ hash: removeLiquidityState.hash } as Transaction}
        isOpen={!!removeLiquidityState.hash}
      />
    </Flex>
  )
}

const YourPosition = ({ pair, userPoolShare }: { pair: Pair; userPoolShare: Percent }) => {
  return (
    <Flex gap={7} direction={'column'} shadow="Up Big" px={4} py={4} borderRadius="2xl">
      <Text fontSize={'lg'}>Your Position</Text>
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
        <PositionInfoItem label="Your pool share:" value={`${userPoolShare.toFixed(2)}%`} />
        <PositionInfoItem
          label={pair.token0.symbol}
          value={pair.reserve0.multiply(userPoolShare).toFixed(4)}
        >
          <CurrencyIcon size="sm" currency={pair.token0} />
        </PositionInfoItem>
        <PositionInfoItem
          label={pair.token1.symbol}
          value={pair.reserve1.multiply(userPoolShare).toFixed(4)}
        >
          <CurrencyIcon size="sm" currency={pair.token1} />
        </PositionInfoItem>
      </Stack>
    </Flex>
  )
}
