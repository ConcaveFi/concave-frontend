import { ROUTER_ADDRESS } from '@concave/gemswap-sdk'
import { Box, Button, Flex, HStack, Modal, Text } from '@concave/ui'
import { ApproveButton } from 'components/ApproveButton/ApproveButton'
import { CurrencyIcon } from 'components/CurrencyIcon'
import React from 'react'
import { UseLiquidityData } from './useLiquidityData'

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
  lpData,
}: {
  lpData: UseLiquidityData
  onConfirm: () => void
}) => {
  return (
    <>
      <Text fontSize="2xl"> You will receive</Text>
      <HStack>
        <Text fontWeight={'bold'} lineHeight={'48px'} fontSize={32}>
          {lpData.poolShare?.amount.toSignificant(6, { groupSeparator: ',' })}
        </Text>
        <CurrencyIcon h={10} w={10} currency={lpData.amount0.currency} />
        <CurrencyIcon h={10} w={10} currency={lpData.amount1.currency} />
      </HStack>
      <HStack>
        <Text fontSize="2xl">{`${lpData.amount0.currency.symbol}/${lpData.amount1.currency.symbol} Pool Tokens`}</Text>
      </HStack>
      <Text
        fontStyle={'italic'}
        fontSize={14}
        textColor={'#5F7A99'}
      >{`Output is estimated. You will receive approximately ${lpData.poolShare?.amount.toSignificant(
        6,
        {
          groupSeparator: ',',
        },
      )} ${lpData.pair.liquidityToken.symbol} or the transaction will revert.`}</Text>
      <Box borderRadius={'2xl'} p={6} shadow={'down'}>
        <PositionInfoItem
          label="Rates"
          value={`1  ${lpData.token0.symbol} = ${lpData.pair.token0Price.toSignificant(6, {
            groupSeparator: ',',
          })} ${lpData.token1.symbol}`}
        />
        <PositionInfoItem
          value={`1  ${lpData.token1.symbol} = ${lpData.pair.token1Price.toSignificant(6, {
            groupSeparator: ',',
          })}  ${lpData.token0.symbol}`}
        />
        <PositionInfoItem
          mt={8}
          color={'text.low'}
          label={`${lpData.token0.symbol} Deposited`}
          value={`${lpData.amount0.toSignificant(8, { groupSeparator: ',' })} ${
            lpData.token0.symbol
          }`}
        />
        <PositionInfoItem
          color={'text.low'}
          label={`${lpData.token1.symbol} Deposited`}
          value={`${lpData.amount1.toSignificant(8, { groupSeparator: ',' })} ${
            lpData.token1.symbol
          }`}
        />
        <PositionInfoItem
          color={'text.low'}
          label="Share Pool"
          value={`${lpData.poolShare?.percent?.toSignificant(4)}%`}
        />
      </Box>

      <ApproveButton
        size="large"
        w="full"
        variant={'primary'}
        autoHide
        approveArgs={{
          currency: lpData.amount0.currency,
          amount: lpData.amount0.numerator,
          spender: ROUTER_ADDRESS[lpData.amount0.currency.chainId],
          onSuccess: () => lpData.setApprove0(true),
        }}
      />

      <ApproveButton
        size="large"
        w="full"
        variant={'primary'}
        autoHide
        approveArgs={{
          currency: lpData.amount1.currency,
          spender: ROUTER_ADDRESS[lpData.amount0.currency.chainId],
          amount: lpData.amount1.numerator,
          onSuccess: () => lpData.setApprove1(true),
        }}
      />
      {lpData.approve0 && lpData.approve1 && (
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
  lpData,
}: {
  lpData: any
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
      <SupplyLiquidityContent lpData={lpData} onConfirm={onConfirm} />
    </Modal>
  )
}
