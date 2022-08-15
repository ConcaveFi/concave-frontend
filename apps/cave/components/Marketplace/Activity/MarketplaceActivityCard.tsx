import { LogStakingV1, Marketplace, marketplaceActivity, StakingPool } from '@concave/marketplace'
import { Card, Flex, HStack, Text, VStack } from '@concave/ui'
import { BigNumber } from '@ethersproject/bignumber'
import { Loading } from 'components/Loading'
import { useCurrentSupportedNetworkId } from 'hooks/useCurrentSupportedNetworkId'
import { concaveProvider } from 'lib/providers'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { MarketplaceTransactionCard } from './MarketplaceTransactionCard'

export type Data = {
  type: 'sale' | `listing`
  date: Date
  poolID: number
  amount: BigNumber
  transactionHash: string
}

export const MarketplaceActivityCard = () => {
  const [filter, setFilter] = useState<'all' | 'listing' | 'sale'>('all')
  const chainId = useCurrentSupportedNetworkId()

  const { data, isLoading, isFetching } = useQuery(
    ['marketplaceActivity', chainId],
    async () => {
      const provider = concaveProvider(chainId)
      const positions = await marketplaceActivity({ provider })
      return positions.map((item) => {
        const type = item.soldFor ? `sale` : `listing`
        const value = type === 'sale' ? item.soldFor : item.startPrice
        const data: Data & Marketplace & StakingPool & LogStakingV1 = {
          ...item,
          type,
          poolID: item.poolId,
          date: new Date(item.updated_at),
          amount: BigNumber.from(value),
          transactionHash: item.txHash,
        }
        return data
      })
    },
    { enabled: !!chainId, refetchOnWindowFocus: false },
  )
  const filtred = (data || []).filter((item) => {
    return filter === `all` || filter === item.type
  })
  return (
    <Card
      width={{ base: '380px' }}
      h={'auto'}
      px={2}
      py={4}
      gap={2}
      shadow="Block Up"
      height={'full'}
      position="relative"
      rounded="2xl"
      variant="secondary"
    >
      <HStack justify={'center'} align="center" height={'70px'} gap={1}>
        <TransactionButton onClick={() => setFilter('all')} active={filter === 'all'} label="All" />
        <TransactionButton
          onClick={() => setFilter('listing')}
          active={filter === 'listing'}
          label="Listing"
        />
        <TransactionButton
          onClick={() => setFilter('sale')}
          active={filter === 'sale'}
          label="Sale"
        />
      </HStack>
      <Loading size={'md'} label={'Loading activities'} isLoading={isLoading} />
      <VStack
        backdropFilter="blur(8px)"
        pos="relative"
        h="auto"
        overflowY={'scroll'}
        width={'full'}
        boxSizing="border-box"
        borderRadius="2xl"
        px={1}
        py={1}
        __css={scrollBar}
        gap={2}
        pt={0}
        flexDirection={'column'}
      >
        {filtred.map((data, index) => {
          return <MarketplaceTransactionCard key={index} data={data} />
        })}
      </VStack>
    </Card>
  )
}

interface TransactionButtonProps {
  label: string
  active?: boolean
  onClick: () => void
}

const TransactionButton = (props: TransactionButtonProps) => {
  const { label, active } = props
  const textColor = !!active ? 'white' : 'text.low'
  return (
    <Flex
      as={active ? Card : Flex}
      onClick={props.onClick}
      textColor={textColor}
      fontSize="14"
      fontWeight={700}
      cursor={'pointer'}
      transition="all"
      transitionDuration={'.3s'}
      _active={{ transform: 'scale(.9)' }}
      justify={'center'}
      align="center"
      rounded={'full'}
      width={'90px'}
      height="37px"
      shadow={'Up Big'}
      userSelect="none"
    >
      <Text>{label}</Text>
    </Flex>
  )
}

const scrollBar = {
  '&::-webkit-scrollbar': {
    width: '10px',
    boxShadow: `-1px 1px 3px rgba(126, 162, 255, 0.26), inset 0px -5px 5px rgba(255, 255, 255, 0.02), inset -9px 12px 24px rgba(13, 17, 23, 0.49)`,
    borderRadius: '10px',
    mt: '30px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)',
    boxShadow:
      '0px 5px 14px rgba(0, 0, 0, 0.47), 4px -7px 15px rgba(174, 177, 255, 0.13), inset -1px 1px 2px rgba(128, 186, 255, 0.24)',
    rounded: 'lg',
  },
}
