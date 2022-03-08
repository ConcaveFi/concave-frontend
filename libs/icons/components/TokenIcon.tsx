import { Image } from '@chakra-ui/react'

type TokenIcon = {
  size: string
  alt?: string
  tokenName: string
}
export const TokenIcon = ({ tokenName, ...props }: TokenIcon) => {
  const alt = props.alt || `${tokenName} token`

  return (
    <Image
      src={`/assets/tokens/${tokenName.toLowerCase()}.svg`}
      width={props.size}
      height={props.size}
      alt={alt}
    />
  )
}
