import { HStack, Spinner, Text } from '@concave/ui'
import { Currency } from 'gemswap-sdk'
import { useFiatPrice } from './hooks/useFiatPrice'
import { usePrice } from './hooks/usePrice'
import { NoValidPairsError } from './hooks/usePair'

const PairsError = ({ error }) => {
  return (
    <Text mr="auto" fontSize="sm" color="#c32417" fontWeight="medium">
      {{
        [NoValidPairsError]: `No liquidity in pair`,
      }[error] || 'Error Fetching Pairs'}
    </Text>
  )
}

export const RelativePrice = ({
  currencyIn,
  currencyOut,
}: {
  currencyIn: Currency
  currencyOut: Currency
}) => {
  const relativePrice = usePrice(currencyIn.wrapped, currencyOut.wrapped)
  const outputFiat = useFiatPrice(currencyOut.wrapped)

  return (
    <HStack flexWrap="wrap" align="center" fontSize="xs" fontWeight="medium" mr="auto">
      {relativePrice.isFetching && <Spinner size="xs" />}
      {relativePrice.isLoading && <Text fontSize="sm">Searching trade routes</Text>}
      {relativePrice.isError && <PairsError error={relativePrice.error} />}
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
