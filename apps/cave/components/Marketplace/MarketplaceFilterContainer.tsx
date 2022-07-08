import { Search2Icon } from '@concave/icons'
import { Box, Flex, Input, InputGroup, InputLeftElement } from '@concave/ui'

export function MarketplaceFilterContainer({
  address,
  setAddress,
}: {
  address: string
  setAddress: (address: string) => void
}) {
  return (
    <Flex
      width="full"
      direction={'column'}
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
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          defaultValue={address}
          onChange={(element) => {
            setAddress(element.target.value)
          }}
          placeholder="Address"
        />
      </InputGroup>
    </Flex>
  )
}
