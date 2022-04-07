import { Avatar, AvatarProps } from '@chakra-ui/react'
import { Currency, CHAIN_NAME, CNV } from 'gemswap-sdk'

export type CurrencyIconProps = {
  size?: string
  currency: Currency
} & AvatarProps

const rainbowAssetsSrc = 'https://raw.githubusercontent.com/rainbow-me/assets/master/blockchains'
const getCurrencyLogoURI = (currency: Currency) => {
  const networkName = CHAIN_NAME[currency.chainId]

  // is concave token? until we create or get added into a assets repo
  if (currency.equals(CNV[currency.chainId]))
    return 'https://assets.coingecko.com/coins/images/24492/large/concave.jpg'

  // use rainbow assets for other tokens
  if (currency.isNative) return `${rainbowAssetsSrc}/${networkName}/info/logo.png`
  return `${rainbowAssetsSrc}/${networkName}/assets/${currency.wrapped.address}/logo.png`
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
