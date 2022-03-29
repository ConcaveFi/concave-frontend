import { Avatar, AvatarProps } from '@chakra-ui/react'

export type TokenIconProps = {
  size?: string
  alt?: string
  symbol?: string
  address?: string
  logoURI?: string
} & AvatarProps

const getTokenLogoURI = (address: string) => {
  const networkName = 'ethereum'
  return `https://raw.githubusercontent.com/rainbow-me/assets/master/blockchains/${networkName}/assets/${address}/logo.png`
}
export const TokenIcon = ({ symbol, address, size = 'sm', logoURI, ...props }: TokenIconProps) => {
  return (
    <Avatar
      {...props}
      src={logoURI ?? getTokenLogoURI(address)}
      name={symbol}
      size={size}
      bg="none"
      getInitials={(a) => a}
    />
  )
}
