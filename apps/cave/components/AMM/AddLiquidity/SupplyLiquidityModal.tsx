import { Percent, ROUTER_ADDRESS } from '@concave/core'
import { Box, Button, Flex, HStack, Modal, Text } from '@concave/ui'
import { LiquidityPool } from 'components/AMM/AddLiquidity/AddLiquidity'
import { ApproveButton } from 'components/ApproveButton/ApproveButton'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { useTotalSupply } from 'hooks/useTotalSupply'
import React, { useState } from 'react'

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
}: {
  lp: LiquidityPool
  onConfirm: () => void
}) => {
  const [amount0, amount1] =
    lp.pair.token0.address === lp.amount0.currency.wrapped.address
      ? [lp.amount0, lp.amount1]
      : [lp.amount1, lp.amount0]
  const [approve0, setApprove0] = useState(false)
  const [approve1, setApprove1] = useState(false)

  const token0 = amount0.currency
  const token1 = amount1.currency
  const pair = lp.pair

  const totalSupply = useTotalSupply(pair.liquidityToken)

  if (!totalSupply.data) return null // TODO loading states (probably not in here)

  const poolShare = pair.getLiquidityMinted(totalSupply.data, amount0.wrapped, amount1.wrapped) // this can throw
  console.log(totalSupply.data.toSignificant(6))
  const percentShare = new Percent(poolShare.numerator, totalSupply.data.add(poolShare).numerator)

  return (
    <>
      <Text fontSize="2xl">You will receive</Text>
      <HStack>
        <Text fontWeight={'bold'} lineHeight={'48px'} fontSize={32}>
          {poolShare?.toSignificant(6)}
        </Text>
        <CurrencyIcon h={10} w={10} currency={amount0.currency} />
        <CurrencyIcon h={10} w={10} currency={amount1.currency} />
      </HStack>
      <HStack>
        <Text fontSize="2xl">{`${amount0.currency.symbol}/${amount1.currency.symbol} Pool Tokens`}</Text>
      </HStack>
      <Text
        fontStyle={'italic'}
        fontSize={14}
        textColor={'#5F7A99'}
      >{`Output is estimated. You will receive approximately ${poolShare?.toSignificant(6)} ${
        pair.liquidityToken.symbol
      } or the transaction will revert.`}</Text>
      <Box borderRadius={'2xl'} p={6} shadow={'down'}>
        <PositionInfoItem
          label="Rates"
          value={`1  ${token0.symbol} = ${pair.token0Price.toSignificant(6)} ${token1.symbol}`}
        />
        <PositionInfoItem
          value={`1  ${token1.symbol} = ${pair.token1Price.toSignificant(6)}  ${token0.symbol}`}
        />
        <PositionInfoItem
          mt={8}
          color={'text.low'}
          label={`${token0.symbol} Deposited`}
          value={`${amount0.toSignificant(8)} ${token0.symbol}`}
        />
        <PositionInfoItem
          color={'text.low'}
          label={`${token1.symbol} Deposited`}
          value={`${amount1.toSignificant(8)} ${token1.symbol}`}
        />
        <PositionInfoItem
          color={'text.low'}
          label="Share Pool"
          value={`${percentShare?.toSignificant(4)}%`}
        />
      </Box>

      <ApproveButton
        size="large"
        w="full"
        variant={'primary'}
        autoHide
        approveArgs={{
          currency: amount0.currency,
          spender: ROUTER_ADDRESS[amount0.currency.chainId],
          onSuccess: () => setApprove0(true),
        }}
      />
      <ApproveButton
        size="large"
        w="full"
        variant={'primary'}
        autoHide
        approveArgs={{
          currency: amount1.currency,
          spender: ROUTER_ADDRESS[amount0.currency.chainId],
          onSuccess: () => setApprove1(true),
        }}
      />
      {approve0 && approve1 && (
        <Button size="large" w="full" fontSize="2xl" variant={'primary'} onClick={onConfirm}>
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
  lp,
}: {
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
      bodyProps={{ gap: 6, borderWidth: 2 }}
    >
      <SupplyLiquidityContent lp={lp} onConfirm={onConfirm} />
    </Modal>
  )
}
