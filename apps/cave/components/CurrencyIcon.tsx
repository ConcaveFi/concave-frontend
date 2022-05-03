import { Avatar, AvatarProps } from '@chakra-ui/react'
import { CHAIN_NAME, Currency } from 'gemswap-sdk'

export type CurrencyIconProps = {
  size?: string
  currency: Currency
} & AvatarProps

const concaveAssetsSrc = 'https://raw.githubusercontent.com/concavefi/assets/master/blockchains'
const getCurrencyLogoURI = (currency: Currency) => {
  const networkName = CHAIN_NAME[currency.chainId]
  if (networkName === 'ropsten') {
    return `/assets/tokens/${currency.symbol.toLowerCase()}.svg`
  }

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
