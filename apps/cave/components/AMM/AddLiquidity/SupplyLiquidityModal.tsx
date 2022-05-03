import { Box, Button, Flex, HStack, Modal, Text } from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { ApproveButton, useApproval } from 'hooks/useAllowance'
import { LiquidityPool } from 'pages/addliquidity'
import React from 'react'
import { PoolShare } from './usePoolShare'

const PositionInfoItem = ({ color = '', label = '', value, mt = 0, children = <></> }) => (
  <Flex justify="space-between" align={'center'} mt={mt}>
    <Text color={color}>{label}</Text>
    <HStack gap={2} align={'center'} alignContent={'center'}>
      <Text>{value}</Text>
      {children}
    </HStack>
  </Flex>
)

const SupplyLiquidityContent = ({
  onConfirm = () => {},
  lp,
  poolShare,
}: {
  lp: LiquidityPool
  poolShare: PoolShare
  onConfirm: () => void
}) => {
  const [amount0, amount1] =
    lp.pair.token0.address === lp.amount0.currency.wrapped.address
      ? [lp.amount0, lp.amount1]
      : [lp.amount1, lp.amount0]
  const [needsApprove0, approve0, label0] = useApproval(amount0.wrapped)
  const [needsApprove1, approve1, label1] = useApproval(amount1.wrapped)
  const token0 = amount0.currency
  const token1 = amount1.currency
  const pair = lp.pair

  return (
    <>
      <Text fontSize="3xl">
        {poolShare && poolShare.amount.toSignificant(6, { groupSeparator: ',' })}{' '}
        {amount0.currency.symbol}/{amount1.currency.symbol} Pool Tokens
      </Text>
      <HStack justifyContent={'center'}>
        <CurrencyIcon currency={amount0.currency} />
        <CurrencyIcon currency={amount1.currency} />
      </HStack>
      <Box borderRadius={'2xl'} p={6} shadow={'down'}>
        <PositionInfoItem
          label="Rates"
          value={`1  ${token0.symbol} = ${pair.token0Price.toSignificant(6, {
            groupSeparator: ',',
          })} ${token1.symbol}`}
        />
        <PositionInfoItem
          value={`1  ${token1.symbol} = ${pair.token1Price.toSignificant(6, {
            groupSeparator: ',',
          })}  ${token0.symbol}`}
        />
        <PositionInfoItem
          mt={8}
          color={'text.low'}
          label={`${token0.symbol} Deposited`}
          value={`${amount0.toSignificant(8, { groupSeparator: ',' })} ${token0.symbol}`}
        />
        <PositionInfoItem
          color={'text.low'}
          label={`${token1.symbol} Deposited`}
          value={`${amount1.toSignificant(8, { groupSeparator: ',' })} ${token1.symbol}`}
        />
        <PositionInfoItem
          color={'text.low'}
          label="Share Pool"
          value={`${poolShare.percent.toSignificant(4)}%`}
        />
      </Box>
      <ApproveButton useApproveInfo={[needsApprove0, approve0, label0]} />
      <ApproveButton useApproveInfo={[needsApprove1, approve1, label1]} />
      {!needsApprove0 && !needsApprove1 && (
        <Button mt={2} p={6} fontSize={'2xl'} variant={'primary'} onClick={onConfirm}>
          Confirm Supply
        </Button>
      )}
    </>
  )
}

export const SupplyLiquidityModal = ({
  onConfirm = () => {},
  isOpen,
  onClose,
  poolShare,
  lp,
}: {
  poolShare: PoolShare
  lp: LiquidityPool
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}) => {
  return (
    <Modal
      bluryOverlay={true}
      title="Supply"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="xl"
      bodyProps={{ gap: 6 }}
    >
      <SupplyLiquidityContent lp={lp} poolShare={poolShare} onConfirm={onConfirm} />
    </Modal>
  )
}
