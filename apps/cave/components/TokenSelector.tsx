import { Avatar, HStack, Input, Modal, Stack, Text } from '@concave/ui'

type Token = {
  name: string
  symbol: string
  decimals: number
  address: string
  image: string
}

const TokenItem = ({ name, image, symbol }) => (
  <HStack spacing={4} px={2} py={1} borderRadius="lg" _hover={{ bg: 'whiteAlpha.50' }}>
    <Avatar name={name} src={image} size="sm" />
    <Stack spacing={0}>
      <Text casing="uppercase" fontWeight="bold" fontSize="sm">
        {symbol}
      </Text>
      <Text casing="capitalize" color="text.low" fontSize="xs">
        {name}
      </Text>
    </Stack>
  </HStack>
)

const TokensList = ({ tokens }: { tokens: Token[] }) => (
  <Stack p={2} borderRadius="xl" shadow="Up Small" bgColor="blackAlpha.300">
    {tokens.map((token) => (
      <TokenItem key={token.address} {...token} />
    ))}
  </Stack>
)

const tokens = [
  {
    name: 'ethereum',
    symbol: 'eth',
    decimals: 18,
    address: 'd11f3313qs',
    image: '/assets/tokens/eth.svg',
  },
  {
    name: 'dai stablecoin',
    symbol: 'dai',
    decimals: 18,
    address: 'd11f31113qs',
    image: '/assets/tokens/dai.svg',
  },
  {
    name: 'ethereum',
    symbol: 'eth',
    decimals: 18,
    address: 'd11f3153qs',
    image: '/assets/tokens/eth.svg',
  },
  {
    name: 'ethereum',
    symbol: 'eth',
    decimals: 18,
    address: 'd11f376513qs',
    image: '/assets/tokens/eth.svg',
  },
  {
    name: 'ethereum',
    symbol: 'eth',
    decimals: 18,
    address: 'd2311f313qs',
    image: '/assets/tokens/eth.svg',
  },
]

function TokenSelector({}) {
  return (
    <Modal title="Select a Token" onClose={() => null} isOpen={true}>
      <Input placeholder="Search name or paste address" />
      <TokensList tokens={tokens} />
    </Modal>
  )
}

export default TokenSelector
