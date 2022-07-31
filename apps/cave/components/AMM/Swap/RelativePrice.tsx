import { Currency } from '@concave/core'
import { Flex, HStack, Spinner, StackProps, Text } from '@concave/ui'
import { useReducer } from 'react'
import { useFiatPrice } from '../hooks/useFiatPrice'
import { NoValidPairsError } from '../hooks/usePair'
import { usePrice } from '../hooks/usePrice'
import { InsufficientLiquidityError } from '../hooks/useTrade'

const PairsError = ({ error }) => {
  return (
    <Text mr="auto" fontSize="sm" color="#c32417" fontWeight="medium">
      {{
        [NoValidPairsError]: `No liquidity in pair`,
        [InsufficientLiquidityError]: `No liquidity in pair`,
      }[error] || 'Error Fetching Pairs'}
    </Text>
  )
}

const StatusIndicators = ({ query: { isFetching, isLoading, isError, error } }) => {
  return (
    <>
      {isFetching && <Spinner size="xs" />}
      {isLoading && <Text fontSize="sm">Searching trade routes</Text>}
      {isError && <PairsError error={error} />}
    </>
  )
}

export const RelativePrice = ({
  currency0,
  currency1,
  indicators = 'all',
  ...props
}: {
  currency0: Currency
  currency1: Currency
  indicators?: 'all' | 'minimal'
} & StackProps) => {
  const [flipped, flip] = useReducer((s) => !s, false)
  const [base, quote] = flipped ? [currency0, currency1] : [currency1, currency0]

  const relativePrice = usePrice(base, quote)
  const outputFiat = useFiatPrice(quote)

  return (
    <HStack
      onClick={(e) => (e.stopPropagation(), flip())}
      align="center"
      fontSize="xs"
      fontWeight="medium"
      {...props}
    >
      {indicators === 'all' && <StatusIndicators query={relativePrice} />}
      {relativePrice.isSuccess && (
        <Flex gap={1} align="center" wrap="wrap">
          <Text>
            1 {relativePrice.price?.quoteCurrency.symbol} =
            {relativePrice.price?.invert().toFixed(2)} {relativePrice.price?.baseCurrency.symbol}
          </Text>
          {outputFiat.price && (
            <Text textColor="text.low">
              (${outputFiat.price.toFixed(2, { groupSeparator: ',' })})
            </Text>
          )}
        </Flex>
      )}
    </HStack>
  )
}
