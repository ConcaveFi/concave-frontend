import { Avatar, AvatarProps } from '@chakra-ui/react'
import { CHAIN_NAME, Currency } from '@concave/core'
import { useReducer } from 'react'

export type CurrencyIconProps = {
  size?: string
  currency: Currency
} & AvatarProps

const concaveAssetsSrc = 'https://cdn.jsdelivr.net/gh/concavefi/assets@latest/blockchains/'
export const getCurrencyLogoURI = (currency: Currency) => {
  const networkName = CHAIN_NAME[currency.chainId]
  if (networkName === 'rinkeby') {
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
