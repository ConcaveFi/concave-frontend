import { Avatar, AvatarProps } from '@chakra-ui/react'
import { Currency, CHAIN_NAME } from 'gemswap-sdk'

export type CurrencyIconProps = {
  size?: string
  currency: Currency
} & AvatarProps

const concaveAssetsSrc = 'https://raw.githubusercontent.com/concavefi/assets/master/blockchains'
const getCurrencyLogoURI = (currency: Currency) => {
  const networkName = CHAIN_NAME[currency.chainId]

  if (currency.isNative) return `${concaveAssetsSrc}/${networkName}/info/logo.png`
  return `${concaveAssetsSrc}/${networkName}/assets/${currency.wrapped.address}/logo.png`
}

export const CurrencyIcon = ({ currency, size = 'sm', ...props }: CurrencyIconProps) => {
  return (
    <Avatar
      {...props}
      src={getCurrencyLogoURI(currency)}
      name={currency.symbol}
      size={size}
      bg="text.low"
      getInitials={(a) => a}
    />
  )
}
