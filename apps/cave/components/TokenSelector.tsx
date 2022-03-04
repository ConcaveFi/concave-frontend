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
  <Stack p={2} borderRadius="xl" shadow="down" bgColor="blackAlpha.300">
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
    address: 'd11f313qs',
    image: '/assets/tokens/eth.svg',
  },
  {
    name: 'ethereum',
    symbol: 'eth',
    decimals: 18,
    address: 'd11f313qs',
    image: '/assets/tokens/eth.svg',
  },
  {
    name: 'ethereum',
    symbol: 'eth',
    decimals: 18,
    address: 'd11f313qs',
    image: '/assets/tokens/eth.svg',
  },
  {
    name: 'ethereum',
    symbol: 'eth',
    decimals: 18,
    address: 'd11f313qs',
    image: '/assets/tokens/eth.svg',
  },
  {
    name: 'ethereum',
    symbol: 'eth',
    decimals: 18,
    address: 'd11f313qs',
    image: '/assets/tokens/eth.svg',
  },
]

function TokenSelector({}) {
  return (
    <Modal onClose={() => null} spacing="2" title="Select a Token" isOpen={true} blurOverlay>
      <Input variant="primary" placeholder="adada" />
      <TokensList tokens={tokens} />
    </Modal>
  )
}

export default TokenSelector
