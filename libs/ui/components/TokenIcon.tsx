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
  if (address === 'ETH')
    return `https://raw.githubusercontent.com/concavefi/assets/master/blockchains/ethereum/info/logo.png`
  return `https://raw.githubusercontent.com/concavefi/assets/master/blockchains/${networkName}/assets/${address}/logo.png`
}

export const TokenIcon = ({ symbol, address, size = 'sm', logoURI, ...props }: TokenIconProps) => {
  return (
    <Avatar
      {...props}
      src={logoURI ?? getTokenLogoURI(address)}
      name={symbol}
      size={size}
      bg="text.low"
      getInitials={(a) => a}
    />
  )
}
