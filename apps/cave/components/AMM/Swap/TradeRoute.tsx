import { Currency } from '@concave/core'
import { Route } from '@concave/gemswap-sdk'
import { Box, Flex, HStack, Stack, Text } from '@concave/ui'
import { CurrencyIcon } from 'components/CurrencyIcon'

export const TradeRoute = ({ route }: { route: Route<Currency, Currency> }) => {
  return (
    <Stack fontFamily="heading" fontWeight="bold">
      <Text>Trade route:</Text>
      <HStack spacing={2}>
        <CurrencyIcon size="xs" currency={route.input} />
        <Box w="100%" h="2px" rounded="2px" bg="stroke.secondary" />
        {route.pairs?.map((pair) => (
          <Flex
            key={pair.liquidityToken.address}
            py={1}
            px={2}
            rounded="xl"
            shadow="down"
            bg="blackAlpha.400"
          >
            <CurrencyIcon size="xs" currency={pair.token1} />
            <CurrencyIcon ml={-2} size="xs" currency={pair.token0} />
          </Flex>
        ))}
        <Box w="100%" h="2px" rounded="full" bg="stroke.secondary" />
        <CurrencyIcon size="xs" currency={route.output} />
      </HStack>
      <Text fontFamily="body" fontSize="xs" color="text.low">
        This route optimizes your total output by considering multiple hops, and the gas cost of
        each step.
      </Text>
    </Stack>
  )
}
