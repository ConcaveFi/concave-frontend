import { ROUTER_ADDRESS } from '@concave/core'
import { Box, Button, Flex, HStack, Modal, Text } from '@concave/ui'
import { useCurrencyApprove } from 'components/CurrencyAmountButton/CurrencyAmountButton'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { UseLiquidityData } from './hooks/useLiquidityData'

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
  const { amount0, amount1, token0, token1, poolShare, pair } = lpData
  const approve0 = useCurrencyApprove(amount0, ROUTER_ADDRESS[amount0.wrapped.currency.chainId])
  const approve1 = useCurrencyApprove(amount1, ROUTER_ADDRESS[amount0.wrapped.currency.chainId])
  if (!pair) {
    return
  }
  return (
    <>
      <Text fontSize="2xl"> You will receive</Text>
      <HStack>
        <Text fontWeight={'bold'} lineHeight={'48px'} fontSize={32}>
          {poolShare?.amount.toSignificant(6, { groupSeparator: ',' })}
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
      >{`Output is estimated. You will receive approximately ${poolShare?.amount.toSignificant(6, {
        groupSeparator: ',',
      })} ${pair.liquidityToken.symbol} or the transaction will revert.`}</Text>
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
          value={`${poolShare?.percent?.toSignificant(4)}%`}
        />
      </Box>

      {!approve0.approved && (
        <Button size="large" w="full" variant={'primary'} {...approve0.buttonProps} />
      )}

      {!approve1.approved && (
        <Button size="large" w="full" variant={'primary'} {...approve1.buttonProps} />
      )}

      {approve0.approved && approve1.approved && (
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
