import { Avatar, AvatarProps } from '@chakra-ui/react'
import { CHAIN_NAME, Currency } from '@concave/gemswap-sdk'
import { useReducer } from 'react'

export type CurrencyIconProps = {
  size?: string
  currency: Currency
} & AvatarProps

const concaveAssetsSrc = 'https://raw.githubusercontent.com/concavefi/assets/master/blockchains'
const getCurrencyLogoURI = (currency: Currency) => {
  const networkName = CHAIN_NAME[currency.chainId]
  if (networkName === 'RINKEBY') {
    return `/assets/tokens/${currency.symbol.toLowerCase()}.svg`
  }

  if (currency.isNative) return `${concaveAssetsSrc}/${networkName}/info/logo.png`
  return `${concaveAssetsSrc}/${networkName}/assets/${currency.wrapped.address}/logo.png`
}

export const CurrencyIcon = ({ currency, size = 'sm', ...props }: CurrencyIconProps) => {
  const [isBadSrc, setBadSrc] = useReducer(() => true, false)
  return (
    <Avatar
      {...props}
      src={currency && getCurrencyLogoURI(currency)}
      name={currency?.symbol}
      size={size}
      bg={isBadSrc ? 'text.low' : 'none'}
      onError={setBadSrc}
      getInitials={(a) => a}
      draggable={false}
      userSelect="none"
    />
  )
}
