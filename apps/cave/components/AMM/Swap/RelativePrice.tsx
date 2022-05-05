import { Currency } from '@concave/gemswap-sdk'
import { HStack, Spinner, Text, StackProps } from '@concave/ui'
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
        [InsufficientLiquidityError]: `Very little liquidity in pair`,
      }[error] || 'Error Fetching Pairs'}
    </Text>
  )
}

const StatusIndicators = ({ query: { isFetching, isLoading, isError, error } }) => {
  if (isFetching) return <Spinner size="xs" />
  if (isLoading) return <Text fontSize="sm">Searching trade routes</Text>
  if (isError) return <PairsError error={error} />
  return null
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
      flexWrap="wrap"
      align="center"
      fontSize="xs"
      fontWeight="medium"
      {...props}
    >
      {indicators === 'all' && <StatusIndicators query={relativePrice} />}
      {relativePrice.isSuccess && (
        <>
          <Text>
            1 {relativePrice.price?.quoteCurrency.symbol} ={' '}
            {relativePrice.price?.invert().toFixed(2)} {relativePrice.price?.baseCurrency.symbol}
          </Text>
          {outputFiat.price && (
            <Text ml={1} textColor="text.low">
              (${outputFiat.price.toFixed(2, { groupSeparator: ',' })})
            </Text>
          )}
        </>
      )}
    </HStack>
  )
}
