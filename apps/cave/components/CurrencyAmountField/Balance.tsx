import { Currency, CurrencyAmount, Token } from '@concave/core'
import { Button, SkeletonText, Text } from '@concave/ui'
import { useCurrencyBalance } from 'hooks/useCurrencyBalance'
import { compactFormat } from 'utils/bigNumberMask'

export const PreSetAmount = ({
  isLoading,
  isIdle,
  isError,
  leftIcon,
  amount,
  onClick,
}: {
  isLoading?: boolean
  isIdle?: boolean
  isError?: boolean
  leftIcon: JSX.Element
  amount: CurrencyAmount<Currency | Token>
  onClick?: (amount: CurrencyAmount<Currency | Token>) => void
}) => {
  if (isIdle) return null
  if (isLoading) return <SkeletonText w="100px" h="14px" noOfLines={1} opacity={0.5} />
  if (isError)
    return (
      <Text fontSize="xs" color="text.low">
        Error fetching balance
      </Text>
    )

  return (
    <Button
      fontSize="xs"
      ml="auto"
      onClick={() => onClick(amount)}
      rightIcon={!!onClick && <Text textColor="#2E97E2">Max</Text>}
      leftIcon={leftIcon}
      iconSpacing={1}
      {...(!!onClick && {
        _hover: { transform: 'scale(1.01)', color: 'text.high' },
        _focus: { transform: 'scale(1.02)' },
      })}
      _active={!onClick && { transform: 'none' }}
      isDisabled={!onClick || amount.equalTo(0)}
    >
      <Text noOfLines={1} maxW="100px">
        {compactFormat(amount.quotient.toString())}
      </Text>
    </Button>
  )
}

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
