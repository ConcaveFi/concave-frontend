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
  lp: { amount0, amount1, pair },
  poolShare,
}: {
  lp: LiquidityPool
  poolShare: PoolShare
  onConfirm: () => void
}) => {
  const [needsApprove0, approve0, label0] = useApproval(amount0.wrapped)
  const [needsApprove1, approve1, label1] = useApproval(amount1.wrapped)

  return (
    <>
      <Text fontSize="3xl">
        {poolShare.amount.toSignificant(6, { groupSeparator: ',' })} {pair.token0.symbol}/
        {pair.token1.symbol} Pool Tokens
      </Text>
      <HStack justifyContent={'center'}>
        <CurrencyIcon currency={pair.token0} />
        <CurrencyIcon currency={pair.token1} />
      </HStack>
      <Box borderRadius={'2xl'} p={6} shadow={'down'}>
        <PositionInfoItem
          label="Rates"
          value={`1  ${pair.token0.symbol} = ${pair.token0Price.toSignificant(6, {
            groupSeparator: ',',
          })} ${pair.token1.symbol}`}
        />
        <PositionInfoItem
          value={`1  ${pair.token1.symbol} = ${pair.token1Price.toSignificant(6, {
            groupSeparator: ',',
          })}  ${pair.token0.symbol}`}
        />
        <PositionInfoItem
          mt={8}
          color={'text.low'}
          label={`${pair.token0.symbol} Deposited`}
          value={`${amount0.toSignificant(8, { groupSeparator: ',' })} ${pair.token0.symbol}`}
        />
        <PositionInfoItem
          color={'text.low'}
          label={`${pair.token1.symbol} Deposited`}
          value={`${amount1.toSignificant(8, { groupSeparator: ',' })} ${pair.token1.symbol}`}
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
