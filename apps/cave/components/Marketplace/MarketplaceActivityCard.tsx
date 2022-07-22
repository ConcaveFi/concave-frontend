import { Box, Card, Flex } from '@concave/ui'
import { useEffect, useState } from 'react'
import { MarketplaceTransactionCard } from './MarketplaceTransactionCard'

type Data = {
  type: 'sale' | `listing`
  date: number
  event: string
  length: string
  cnv: number
  transactionHash: string
}
const mockData: Data[] = [
  {
    type: 'listing',
    date: 1650615494,
    event: 'listed',
    length: '3 month',
    cnv: 700,
    transactionHash: '0xe15891caf71e104dc1f70a003ff60fc2160edc0a9a3040e98702874bc000a9b4',
  },
  {
    type: 'sale',
    date: 1650615494,
    event: 'sold',
    length: '6 month',
    cnv: 200,
    transactionHash: '0xe15891caf71e104dc1f70a003ff60fc2160edc0a9a3040e98702874bc000a9b4',
  },
  {
    type: 'listing',
    date: 1650615494,
    event: 'listed',
    length: '1 year',
    cnv: 340,
    transactionHash: '0xe15891caf71e104dc1f70a003ff60fc2160edc0a9a3040e98702874bc000a9b4',
  },
  {
    type: 'sale',
    date: 1650615494,
    event: 'listed',
    length: '1 year',
    cnv: 340,
    transactionHash: '0xe15891caf71e104dc1f70a003ff60fc2160edc0a9a3040e98702874bc000a9b4',
  },
  {
    type: 'sale',
    date: 1650615494,
    event: 'listed',
    length: '1 year',
    cnv: 340,
    transactionHash: '0xe15891caf71e104dc1f70a003ff60fc2160edc0a9a3040e98702874bc000a9b4',
  },
  {
    type: 'listing',
    date: 1650615494,
    event: 'listed',
    length: '1 year',
    cnv: 340,
    transactionHash: '0xe15891caf71e104dc1f70a003ff60fc2160edc0a9a3040e98702874bc000a9b4',
  },
  {
    type: 'sale',
    date: 1650615494,
    event: 'listed',
    length: '1 year',
    cnv: 340,
    transactionHash: '0xe15891caf71e104dc1f70a003ff60fc2160edc0a9a3040e98702874bc000a9b4',
  },
]

const MarketplaceActivityCard = () => {
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState<Data[]>([])
  const [error, setError] = useState(false)
  const [filter, setFilter] = useState<'all' | 'listing' | 'sale'>('all')

  useEffect(() => {
    handleClick(filter)
  }, [filter])

  // TODO create types for data later on
  const handleClick = (filter: string) => {
    // fetch with the trigger filter and setData
    setLoading(true)
    setData(
      mockData.filter((value) => {
        if (filter === 'all') return true
        else return value.type === filter
      }),
    )
    setLoading(false)
  }

  return (
    <Card
      width={{ base: '300px', md: '360px', xl: '300px' }}
      shadow="Block Up"
      height={642}
      position="relative"
      rounded="2xl"
      variant="secondary"
    >
      <Flex justify={'center'} align="center" height={'70px'} gap={1}>
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
      </Flex>
      <Box
        backdropFilter="blur(8px)"
        pos="relative"
        h="100%"
        overflowY={'auto'}
        width={'95%'}
        mx={'auto'}
        boxSizing="border-box"
        borderRadius="12px"
        px={'0.5rem'}
        py={'0.5rem'}
        __css={scrollBar}
        pt={0}
      >
        <div>
          {loading && <span>loading...</span>}
          {data &&
            !error &&
            data.map((e, index) => (
              <MarketplaceTransactionCard
                type={e.type as `listing` | `sale`}
                key={index}
                filter={e}
              />
            ))}
        </div>
      </Box>
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
      {label}
    </Flex>
  )
}

export default MarketplaceActivityCard

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
