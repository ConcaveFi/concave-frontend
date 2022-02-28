import { Image } from '@chakra-ui/react'

type TokenIcon = {
  size: string
  alt?: string
  tokenName: string
}
export const TokenIcon = (props: TokenIcon) => {
  const alt = props.alt || `${props.tokenName} token`
  return (
    <Image
      src={`/assets/tokens/${props.tokenName.toLowerCase()}.svg`}
      width={props.size}
      height={props.size}
      alt={alt}
    />
  )
}
