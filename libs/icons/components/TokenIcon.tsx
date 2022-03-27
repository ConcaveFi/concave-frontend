import { Avatar, AvatarProps } from '@chakra-ui/react'

type TokenIcon = {
  size?: string
  alt?: string
  symbol: string
  logoURI: string
} & AvatarProps

export const TokenIcon = ({ symbol, size = 'md', logoURI, ...props }: TokenIcon) => {
  const alt = props.alt || `${symbol} token`
  return <Avatar src={logoURI} size={size} alt={alt} bg="none" getInitials={(a) => a} {...props} />
}
