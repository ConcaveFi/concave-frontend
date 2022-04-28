import { useEffect, useState } from 'react'
import { Box, Card, Flex, Text, Button, Image } from '@concave/ui'
import NewActivityCard from './MarketplaceTransactionCard'
import MarketplaceTransactionCard from './MarketplaceTransactionCard'

const MarketplaceActivityCard = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const filters = [{ name: 'All' }, { name: 'Listing' }, { name: 'Sale' }]

  useEffect(() => {
    handleClick('all')
  }, [])

  // TODO create types for data later on
  const handleClick = (trigger: string) => {
    // fetch with the trigger filter and setData
    setLoading(true)
    setData([
      {
        type: trigger,
        date: 1650615494,
        event: 'listed',
        length: '3 month',
        cnv: 700,
        link: '0xe15891caf71e104dc1f70a003ff60fc2160edc0a9a3040e98702874bc000a9b4',
      },
      {
        type: trigger,
        date: 1650615494,
        event: 'sold',
        length: '6 month',
        cnv: 200,
        link: '0xe15891caf71e104dc1f70a003ff60fc2160edc0a9a3040e98702874bc000a9b4',
      },
      {
        type: trigger,
        date: 1650615494,
        event: 'listed',
        length: '1 year',
        cnv: 340,
        link: '0xe15891caf71e104dc1f70a003ff60fc2160edc0a9a3040e98702874bc000a9b4',
      },
      {
        type: trigger,
        date: 1650615494,
        event: 'listed',
        length: '1 year',
        cnv: 340,
        link: '0xe15891caf71e104dc1f70a003ff60fc2160edc0a9a3040e98702874bc000a9b4',
      },
    ])
    setLoading(false)
  }

  return (
    <>
      <Box
        p={7}
        gap={6}
        h="642px" // h="fit-content"
        shadow="Block Up"
        w="300px" // w= "100%"
        maxW="420px"
        backgroundBlendMode={'screen'}
        backdropFilter="blur(15px)"
      >
        <Flex direction="row" gap={6} justify="center" mt={2}>
          {filters.map((e, k) => {
            return (
              <Box key={k} mx="auto" py={5} w="90px" h="37px" shadow="down" borderRadius="16px">
                <Button
                  onClick={() => handleClick(e.name)}
                  fontSize="s"
                  color="white"
                  fontWeight="bold"
                >
                  <Text color={e.name === 'All' && 'blue'}>{e.name}</Text>
                </Button>
              </Box>
            )
          })}
        </Flex>
        <Box
          pos="relative"
          h="100%"
          overflowY={'auto'}
          maxHeight={'100%'}
          borderRadius="12px"
          px={'0.5rem'}
          py={'0.5rem'}
          css={{
            background: 'rgba(113, 113, 113, 0.01)',
          }}
          shadow="down"
          __css={{
            '&::-webkit-scrollbar': {
              width: '20px',
              boxShadow: `-1px 1px 3px rgba(126, 162, 255, 0.26), inset 0px -5px 5px rgba(255, 255, 255, 0.02), inset -9px 12px 24px rgba(13, 17, 23, 0.49)`,
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)',
              boxShadow:
                '0px 5px 14px rgba(0, 0, 0, 0.47), 4px -7px 15px rgba(174, 177, 255, 0.13), inset -1px 1px 2px rgba(128, 186, 255, 0.24)',
              rounded: 'lg',
            },
          }}
        >
          {/* render Transaction cards from click value */}
          <div>
            {loading && <span>loading...</span>}
            {data &&
              !error &&
              data.map((e: any, k) => <MarketplaceTransactionCard key={k} filter={e} />)}
          </div>
        </Box>
      </Box>
    </>
  )
}

export default MarketplaceActivityCard
