import { ChainId, CHAIN_NAME, Currency, Token } from '@concave/core'
import { AvatarProps, Box, calc, Flex, Image, Link } from '@concave/ui'

export type CurrencyIconProps = {
  size?: string
  currency: Currency
  link?: boolean
} & AvatarProps

const concaveAssetsSrc = 'https://cdn.jsdelivr.net/gh/concavefi/assets@latest/blockchains/'
export const getCurrencyLogoURI = (currency: Currency) => {
  const networkName = CHAIN_NAME[currency.chainId]
  if (networkName === 'rinkeby') return `/assets/tokens/${currency.symbol.toLowerCase()}.svg`
  if (currency.isNative) return `${concaveAssetsSrc}/${networkName}/info/logo.png`
  return `${concaveAssetsSrc}/${networkName}/assets/${currency.wrapped.address}/logo.png`
}

const etherscanCurrencyLink = (currency: Token) => {
  const base = `etherscan.io/token/${currency.address}`
  console.log(currency.chainId)
  if (currency.chainId === 1) return `https://${base}`
  return `https://${ChainId[currency.chainId].toLocaleLowerCase()}.${base}`
}

const sizes = {
  xs: '24px',
  sm: '32px',
}
export const CurrencyIcon = ({ currency, size = 'sm', link, ...props }: CurrencyIconProps) => {
  const src = currency && getCurrencyLogoURI(currency)
  const _size = sizes[size]
  return (
    <Box
      as={link ? Link : `span`}
      href={link && etherscanCurrencyLink(currency.wrapped)}
      w={_size}
      target="_blank"
      cursor={link && `pointer`}
      {...props}
    >
      <Image
        src={src}
        alt={`${currency?.symbol} icon`}
        w={_size}
        h={_size}
        maxW={_size}
        maxH={_size}
        draggable={false}
        userSelect="none"
        fallback={
          <Flex
            h={_size}
            w={_size}
            color="text.low"
            fontWeight="bold"
            fontSize={calc(_size).divide(3).toString()}
            align="center"
            justify="center"
            rounded="full"
            bg="whiteAlpha.200"
          >
            {currency?.symbol}
          </Flex>
        }
        fallbackStrategy="onError"
      />
    </Box>
  )
}
