import { Image, ImageProps } from '@chakra-ui/react'

type TokenIcon = {
  size: string
  alt?: string
  tokenName: string
} & ImageProps

export const TokenIcon = ({ tokenName, ...props }: TokenIcon) => {
  const alt = props.alt || `${tokenName} token`
  return (
    <Image
      src={`https://cryptoicon-api.vercel.app/api/icon/${tokenName.toLowerCase()}`}
      width={props.size}
      height={props.size}
      alt={alt}
      {...props}
    />
  )
}
