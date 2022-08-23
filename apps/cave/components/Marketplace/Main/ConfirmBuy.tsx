import { CNV } from '@concave/core'
import { StakingPosition } from '@concave/marketplace'
import { Flex, HStack, Modal, Spinner, Text, VStack } from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'
import { usePositionDiscount } from 'components/StakingPositions/LockPosition/MarketLockInfo/hooks/usePositionDiscount'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { formatFixed } from 'utils/bigNumberMask'

export const ConfirmPurchaseModal = ({
  staking,
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose?: VoidFunction
  staking: StakingPosition
}) => {
  const market = staking.market
  const discount = usePositionDiscount(staking)
  const chainId = useCurrentSupportedNetworkId()
  const stakingPostion = CNV[chainId]
  if (!isOpen) return null
  return (
    <Modal bluryOverlay title="Confirm Purchase" hideClose isOpen={isOpen} onClose={onClose}>
      <VStack direction={'column'} w={`sm`} gap={2}>
        <Text as="em" fontSize={'sm'} textAlign={'center'} width={'full'}>
          You are buying a LSDCNV token, please review this transaction information before confirm.
        </Text>
        <VStack p={4} shadow={`Down Medium`} w={'full'} gap={1} borderRadius={'3xl'}>
          <ConfirmBuyInfo label="Position ID:" value={market.tokenId.toString()}></ConfirmBuyInfo>
          <ConfirmBuyInfo
            label="Stake period:"
            value={` ${staking.pool.days} days`}
          ></ConfirmBuyInfo>
          <ConfirmBuyInfo label="Current value:" value={formatFixed(staking.currentValue)}>
            <CurrencyIcon
              size={'xs'}
              currency={stakingPostion}
              title={stakingPostion.name}
            ></CurrencyIcon>
          </ConfirmBuyInfo>
          <ConfirmBuyInfo
            label="Listed price:"
            value={formatFixed(market.startPrice, { ...market.currency })}
          >
            <CurrencyIcon
              size={'xs'}
              currency={market.currency}
              title={market.currency.name}
            ></CurrencyIcon>
          </ConfirmBuyInfo>
          <ConfirmBuyInfo
            label="Discount:"
            isLoading={discount.isLoading}
            color={discount.discount > 0 ? '#7AF0CD' : `red.700`}
            value={formatFixed(discount.discount || 0, { decimals: 2 }) + `%`}
          />
        </VStack>
        <Text fontWeight={'bold'}>
          <Spinner size="xs" mr={2} />
          Waiting wallet confirmation
        </Text>
      </VStack>
    </Modal>
  )
}

const ConfirmBuyInfo = ({
  color = ``,
  labelColor = '',
  label = '',
  value,
  children = <></>,
  isLoading = false,
}) => (
  <Flex justify="space-between" align={'center'} w={'full'}>
    <Text>{label}</Text>
    <HStack gap={2} align={'center'} alignContent={'center'}>
      {isLoading && <Spinner size="xs" />}

      <Text fontWeight={'bold'} color={color}>
        {value}
      </Text>
      {children}
    </HStack>
  </Flex>
)
