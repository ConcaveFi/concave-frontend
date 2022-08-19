import { Currency, CurrencyAmount } from '@concave/core'
import { Button, SkeletonText, Text } from '@concave/ui'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'

export const Balance = ({
  currency,
  onMax,
}: {
  currency: Currency
  onMax?: (balance: CurrencyAmount<Currency>) => void
}) => {
  const balance = useCurrencyBalance(currency, { watch: true })

  if (balance.isIdle) return null
  if (balance.isLoading) return <SkeletonText w="100px" h="14px" noOfLines={1} opacity={0.5} />
  if (balance.isError)
    return (
      <Text fontSize="xs" color="text.low">
        Error fetching balance
      </Text>
    )
  return (
    <Button
      fontSize="xs"
      ml="auto"
      onClick={() => onMax(balance.data)}
      rightIcon={balance.data.greaterThan(0) && !!onMax && <Text textColor="#2E97E2">Max</Text>}
      leftIcon={<Text>Balance:</Text>}
      iconSpacing={1}
      {...(!!onMax && {
        _hover: { transform: 'scale(1.01)', color: 'text.high' },
        _focus: { transform: 'scale(1.02)' },
      })}
      _active={!onMax && { transform: 'none' }}
      isDisabled={!onMax || balance.data.equalTo(0)}
    >
      <Text noOfLines={1} maxW="100px">
        {balance.data?.toFixed(2, { groupSeparator: ',' })}
      </Text>
    </Button>
  )
}
