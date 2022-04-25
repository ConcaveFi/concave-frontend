import { HStack, Spinner, Text } from '@concave/ui'
import { Currency } from 'gemswap-sdk'
import { useFiatPrice } from './hooks/useFiatPrice'
import { usePrice } from './hooks/usePrice'

const PairsError = () => (
  <Text mr="auto" fontSize="sm" color="#c32417" fontWeight="medium">
    Error Fetching Pairs
  </Text>
)

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
      {relativePrice.isLoading && <Text fontSize="sm">Updating prices</Text>}
      {relativePrice.isError && <PairsError />}
      {relativePrice.price && (
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
