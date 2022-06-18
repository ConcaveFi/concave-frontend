import { Search2Icon } from '@concave/icons'
import { Box, Flex, Text } from '@concave/ui'

interface MarketplaceFilterContainerProps {}

export default function MarketplaceFilterContainer(props: MarketplaceFilterContainerProps) {
  return (
    <Flex
      height={{ base: '140px', md: '100px' }}
      width="full"
      direction={'column'}
      mt={4}
      bg={{ base: 'linear-gradient(239.18deg, #19394C 27.18%, #0A161F 96.11%)', md: 'transparent' }}
      justify={'center'}
      align="center"
      rounded={'2xl'}
      position="relative"
      shadow={{ base: 'up', md: 'none' }}
    >
      <Box
        display={{ base: 'block', md: 'none' }}
        position={'absolute'}
        height="full"
        width={'full'}
        bgImage={'/assets/textures/metal.png'}
        bgSize="40% 50%"
        rounded={'2xl'}
      />
      {/* Search Container */}
      <Flex height={'40px'} justify="center">
        <Flex width={{ md: '380px', base: '280px' }} height="30px" rounded={'full'} shadow="down">
          <Search2Icon color="text.low" boxSize={'20px'} my="auto" ml={2} />
          <Text my={'auto'} fontWeight="bold" textColor={'text.low'} ml={3}>
            {/* Coming soon! */}
          </Text>
        </Flex>
      </Flex>

      {/* Filters Container */}
      <Flex
        justify={'center'}
        align="center"
        flex={{ base: 0, md: 1 }}
        gap={{ base: 0, md: 4 }}
      ></Flex>
    </Flex>
  )
}
