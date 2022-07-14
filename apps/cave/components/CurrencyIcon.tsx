import { CHAIN_NAME, Currency } from '@concave/core'
import { AvatarProps, Box, calc, Flex, Image } from '@concave/ui'

export type CurrencyIconProps = {
  size?: string
  currency: Currency
} & AvatarProps

const concaveAssetsSrc = 'https://cdn.jsdelivr.net/gh/concavefi/assets@latest/blockchains/'
export const getCurrencyLogoURI = (currency: Currency) => {
  const networkName = CHAIN_NAME[currency.chainId]

  if (networkName === 'rinkeby') return `/assets/tokens/${currency.symbol.toLowerCase()}.svg`
  if (currency.isNative) return `${concaveAssetsSrc}/${networkName}/info/logo.png`
  return `${concaveAssetsSrc}/${networkName}/assets/${currency.wrapped.address}/logo.png`
}

const sizes = {
  xs: '24px',
  sm: '32px',
}
export const CurrencyIcon = ({ currency, size = 'sm', ...props }: CurrencyIconProps) => {
  const src = currency && getCurrencyLogoURI(currency)
  const _size = sizes[size]
  return (
    <Box as="span" w={_size} {...props}>
      <Image
        src={src}
        alt={`${currency.symbol} icon`}
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
            {currency.symbol}
          </Flex>
        }
        fallbackStrategy="onError"
      />
    </Box>
  )
}
