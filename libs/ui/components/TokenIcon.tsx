import { Avatar, AvatarProps } from '@chakra-ui/react'

export type TokenIconProps = {
  size?: string
  alt?: string
  symbol: string
  address: string
  logoURI?: string
} & AvatarProps

const getTokenLogoURI = (address: string) => {
  const networkName = 'ethereum'
  return `https://github.com/rainbow-me/assets/tree/master/blockchains/${networkName}/assets/${address}/logo.png`
}
export const TokenIcon = ({ symbol, address, size = 'sm', logoURI, ...props }: TokenIconProps) => {
  return (
    <Avatar
      src={logoURI ?? getTokenLogoURI(address)}
      name={symbol}
      size={size}
      bg="none"
      getInitials={(a) => a}
      {...props}
    />
  )
}
