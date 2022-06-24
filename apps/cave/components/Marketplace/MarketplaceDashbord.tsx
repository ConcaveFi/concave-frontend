import { Box, Flex } from '@concave/ui'
import { Loading } from 'components/Loading'
import { MarketplaceFilterContainer } from './MarketplaceFilterContainer'
import { NftPositionCard } from './NftPositionCard'
import { useMarketplaceDashbord } from './UseMarkeplaceState'

export function MarketplaceDashbord() {
  const { isLoading, salePositions, owner, setOwner } = useMarketplaceDashbord()

  const nftPositions = salePositions.map((marketInfo) => (
    <NftPositionCard key={+marketInfo.position.tokenId.toString()} marketInfo={marketInfo} />
  ))

  return (
    <Box
      bg={{
        base: '',
        md: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)',
      }}
      width={{ base: '330px', md: '440px', lg: '640px' }}
      height="950px"
      mt={'10px'}
      rounded="2xl"
      boxShadow={{ base: '', md: 'up' }}
      position="relative"
    >
      {/* This box is just to add the metal image on component */}
      <Box
        display={{ base: 'none', md: 'block' }}
        position={'absolute'}
        height="full"
        width={'full'}
        bgImage={'/assets/textures/metal.png'}
        bgSize="16% 16%"
        rounded={'2xl'}
      />
      <MarketplaceFilterContainer address={owner} setAddress={setOwner} />
      <Flex
        flex={1}
        pt={3}
        maxHeight="795px"
        mx={'auto'}
        mt={{ base: 0, md: 5 }}
        height={'full'}
        shadow={{ base: '', md: 'down' }}
        rounded={'xl'}
        overflowX="hidden"
        overflowY="scroll"
        __css={scrollBar}
        direction="column"
        width={{ base: '330px', md: '420px', lg: '600px' }}
        position={'relative'}
      >
        {!isLoading ? nftPositions : <Loading mt={10} size="lg"></Loading>}
      </Flex>
    </Box>
  )
}

const scrollBar = {
  '&::-webkit-scrollbar': {
    width: { base: '0px', md: '15px' },
    display: { base: 'none', md: 'flex' },
    boxShadow: `-1px 1px 3px rgba(126, 162, 255, 0.26), inset 0px -5px 5px rgba(255, 255, 255, 0.02), inset -9px 12px 24px rgba(13, 17, 23, 0.49)`,
    borderRadius: '26px',
    mt: '30px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)',
    boxShadow:
      '0px 5px 14px rgba(0, 0, 0, 0.47), 4px -7px 15px rgba(174, 177, 255, 0.13), inset -1px 1px 2px rgba(128, 186, 255, 0.24)',
    rounded: 'lg',
  },
}