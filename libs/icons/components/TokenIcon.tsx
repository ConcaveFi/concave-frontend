import { Image, ImageProps } from '@chakra-ui/react'

type TokenIcon = {
  size: string
  alt?: string
  symbol: string
  logoURI: string
} & ImageProps

export const TokenIcon = ({ symbol, logoURI, ...props }: TokenIcon) => {
  const alt = props.alt || `${symbol} token`
  return <Image src={logoURI} width={props.size} height={props.size} alt={alt} {...props} />
}
